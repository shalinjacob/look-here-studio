"use client";

import { useEffect, useRef, useState } from "react";

// Live "how it will look" preview for the custom pet-parent tee. The text is
// real SVG, so it updates as the customer types. The sample dog is shown until
// they pick a photo of their own; the photo never leaves their device (we ask
// for it on WhatsApp after they order, and send a proof before printing).
//
// Geometry: the print is drawn in a 1128 x 1163 box that sits exactly where the
// print is on the blank-tee photo (see PRINT below, in % of that photo).

const BLANK_TEE = "/small-runs/pet-tee-blank.webp";
const SAMPLE_DOG = "/small-runs/pet-tee-sample-dog.webp";
const GOLD = "#bd9440";

// where the print sits on the (square) blank tee photo, in %
const PRINT = { left: 41.4, top: 23.2, width: 17.5, height: 18.0 };

const W = 1128;
const BASELINES = [270, 567, 864, 1161];
const CAP = 270;
const FONT_SIZE = CAP / 0.7; // Abril Fatface cap height = 0.7em
const CHAR_W = 113; // width of one letter when the line fills the box

// the sample dog, in the print's own coordinates
const DOG = { x: 268, y: 135, w: 630, h: 1013 };

export default function PetTeePreview({ name, who }: { name: string; who: string }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);
  // framing controls for the customer's photo (zoom 1-4x, pan in % of the frame)
  const [zoom, setZoom] = useState(1.6);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith("image/")) return;
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = URL.createObjectURL(f);
    setPhoto(urlRef.current);
    setZoom(1.6);
    setPanX(0);
    setPanY(0);
  }

  function clearPhoto() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setPhoto(null);
  }

  const n = (name.trim() || "LUCA").toUpperCase();
  const w = (who.trim() || "MOM").toUpperCase();
  const line = `${n}’S ${w}`;
  // short lines stay the same letter size (and centred); long ones shrink to fit
  const natural = line.length * CHAR_W;
  const shrink = natural > W ? Math.max(W / natural, 0.55) : 1;
  const textLength = Math.min(W, natural * shrink);
  const fontSize = FONT_SIZE * shrink;
  const shift = shrink < 1 ? (CAP - CAP * shrink) / 2 : 0;
  const typed = name.trim().length > 0;

  return (
    <div className="petprev">
      <div className="petprev__head">
        <span>LIVE PREVIEW</span>
        <span>{typed ? "YOURS" : "SAMPLE"}</span>
      </div>
      <div className="petprev__stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BLANK_TEE} alt="" className="petprev__tee" width={1254} height={1254} />
        <svg
          className="petprev__print"
          viewBox={`0 0 ${W} 1163`}
          style={{ left: `${PRINT.left}%`, top: `${PRINT.top}%`, width: `${PRINT.width}%`, height: `${PRINT.height}%` }}
          role="img"
          aria-label={`${line}, repeated four times, with your pet`}
        >
          {BASELINES.map((y) => (
            <text
              key={y}
              x={W / 2}
              y={y - shift}
              textAnchor="middle"
              fill={GOLD}
              fontFamily="var(--stack), Georgia, serif"
              fontSize={fontSize}
              textLength={textLength}
              lengthAdjust="spacingAndGlyphs"
            >
              {line}
            </text>
          ))}
          {photo ? (
            <>
              <defs>
                <radialGradient id="petfade" cx="50%" cy="50%" r="50%">
                  <stop offset="86%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
                <mask id="petmask" maskUnits="userSpaceOnUse" x={DOG.x} y={DOG.y} width={DOG.w} height={DOG.h}>
                  <ellipse cx={DOG.x + DOG.w / 2} cy={DOG.y + DOG.h / 2} rx={DOG.w / 2} ry={DOG.h / 2} fill="url(#petfade)" />
                </mask>
              </defs>
              <g mask="url(#petmask)">
                <image
                  href={photo}
                  x={DOG.x}
                  y={DOG.y}
                  width={DOG.w}
                  height={DOG.h}
                  preserveAspectRatio="xMidYMid slice"
                  transform={`translate(${DOG.x + DOG.w / 2 + (panX / 100) * DOG.w} ${DOG.y + DOG.h / 2 + (panY / 100) * DOG.h}) scale(${zoom}) translate(${-(DOG.x + DOG.w / 2)} ${-(DOG.y + DOG.h / 2)})`}
                  style={{ filter: "grayscale(1) contrast(1.15) brightness(1.05)" }}
                />
              </g>
            </>
          ) : (
            <image href={SAMPLE_DOG} x={DOG.x} y={DOG.y} width={DOG.w} height={DOG.h} />
          )}
        </svg>
      </div>

      <div className="petprev__photo">
        <label className="petprev__pick">
          <input type="file" accept="image/*" onChange={onFile} />
          <span>{photo ? "CHANGE PHOTO" : "TRY IT WITH YOUR PET'S PHOTO"}</span>
        </label>
        {photo && (
          <button type="button" className="petprev__clear" onClick={clearPhoto}>
            REMOVE
          </button>
        )}
      </div>
      {photo && (
        <div className="petprev__frame">
          <label>
            <span>ZOOM</span>
            <input type="range" min={1} max={4} step={0.05} value={zoom} onChange={(e) => setZoom(+e.target.value)} />
          </label>
          <label>
            <span>LEFT / RIGHT</span>
            <input type="range" min={-60} max={60} step={1} value={panX} onChange={(e) => setPanX(+e.target.value)} />
          </label>
          <label>
            <span>UP / DOWN</span>
            <input type="range" min={-60} max={60} step={1} value={panY} onChange={(e) => setPanY(+e.target.value)} />
          </label>
        </div>
      )}
      <small className="petprev__note">
        A rough preview. We cut your pet out and finish it in black and white, and send you a proof on
        WhatsApp before anything is printed. Your photo stays on your device until you send it to us.
      </small>
    </div>
  );
}
