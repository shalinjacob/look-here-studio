"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { cutOutPet } from "@/lib/petCutout";
import { petLine } from "@/lib/petTee";

// Live "how it will look" preview for the custom pet-parent tee. The text is
// real SVG, so it updates as the customer types. The sample dog is shown until
// they pick a photo of their own. The photo stays on their device; only the
// finished preview picture is emailed to the studio with the order (we ask for
// the original on WhatsApp and send a proof before printing).
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
const DOG = { x: 277, y: 140, w: 610, h: 1000 };

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = () => reject(new Error("image failed"));
    im.src = src;
  });
}

export default function PetTeePreview({
  name,
  who,
  captureRef,
  onReady,
}: {
  name: string;
  who: string;
  /** filled with a function that renders the preview to a JPEG data URL (for the cart and the studio email) */
  captureRef?: MutableRefObject<(() => Promise<string | null>) | null>;
  /** true once the customer's own photo is in and the pet has been found */
  onReady?: (ready: boolean) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);
  const cutRef = useRef<string | null>(null);
  // the pet cut out of the photo (null = not found / still working)
  const [cut, setCut] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [missed, setMissed] = useState(false);
  // framing controls for the customer's photo (zoom 1-4x, pan in % of the frame)
  const [zoom, setZoom] = useState(1.6);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    if (cutRef.current) URL.revokeObjectURL(cutRef.current);
  }, []);

  function dropCut() {
    if (cutRef.current) URL.revokeObjectURL(cutRef.current);
    cutRef.current = null;
    setCut(null);
    setMissed(false);
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith("image/")) return;
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = URL.createObjectURL(f);
    const mine = urlRef.current;
    dropCut();
    setPhoto(mine);
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setBusy(true);
    cutOutPet(mine)
      .then((u) => {
        if (urlRef.current !== mine) {
          if (u) URL.revokeObjectURL(u);
          return;
        }
        if (u) {
          cutRef.current = u;
          setCut(u);
        } else {
          setMissed(true);
          setZoom(1.6);
        }
      })
      .catch(() => {
        if (urlRef.current === mine) {
          setMissed(true);
          setZoom(1.6);
        }
      })
      .finally(() => {
        if (urlRef.current === mine) setBusy(false);
      });
  }

  function clearPhoto() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    dropCut();
    setBusy(false);
    setPhoto(null);
  }

  const { line, typed } = petLine(name, who);
  // short lines stay the same letter size (and centred); long ones shrink to fit
  const natural = line.length * CHAR_W;
  const shrink = natural > W ? Math.max(W / natural, 0.55) : 1;
  const textLength = Math.min(W, natural * shrink);
  const fontSize = FONT_SIZE * shrink;
  const shift = shrink < 1 ? (CAP - CAP * shrink) / 2 : 0;

  useEffect(() => {
    onReady?.(!!photo && !busy);
  }, [photo, busy, onReady]);

  // Draws the same picture as the SVG above onto a canvas, cropped to the print,
  // so the studio sees exactly what the customer saw.
  useEffect(() => {
    if (!captureRef) return;
    captureRef.current = async () => {
      if (!photo) return null;
      try {
        const S = 2400;
        const canvas = document.createElement("canvas");
        const tee = await loadImg(BLANK_TEE);
        canvas.width = S;
        canvas.height = S;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        ctx.drawImage(tee, 0, 0, S, S);
        const bx = (PRINT.left / 100) * S, by = (PRINT.top / 100) * S;
        const bw = (PRINT.width / 100) * S, bh = (PRINT.height / 100) * S;
        const k = Math.min(bw / W, bh / 1163);
        ctx.save();
        ctx.translate(bx + (bw - W * k) / 2, by + (bh - 1163 * k) / 2);
        ctx.scale(k, k);

        // the four lines of text, in the page's own display font
        await document.fonts.ready;
        const textEl = stageRef.current?.querySelector("text");
        const family = textEl ? getComputedStyle(textEl).fontFamily : "Georgia, serif";
        ctx.font = `${fontSize}px ${family}`;
        ctx.fillStyle = GOLD;
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        const measured = ctx.measureText(line).width || 1;
        for (const y of BASELINES) {
          ctx.save();
          ctx.translate(W / 2, y - shift);
          ctx.scale(textLength / measured, 1);
          ctx.fillText(line, 0, 0);
          ctx.restore();
        }

        // the pet: cut-out (or the whole photo in a soft oval), black and white
        const layer = document.createElement("canvas");
        layer.width = DOG.w;
        layer.height = DOG.h;
        const lc = layer.getContext("2d", { willReadFrequently: true });
        if (!lc) return null;
        const src = await loadImg(cut ?? photo);
        const fit = cut ? Math.min(DOG.w / src.width, DOG.h / src.height) : Math.max(DOG.w / src.width, DOG.h / src.height);
        lc.drawImage(src, (DOG.w - src.width * fit) / 2, (DOG.h - src.height * fit) / 2, src.width * fit, src.height * fit);
        if (!cut) {
          const g = lc.createRadialGradient(DOG.w / 2, DOG.h / 2, 0, DOG.w / 2, DOG.h / 2, Math.max(DOG.w, DOG.h) / 2);
          g.addColorStop(0, "#fff");
          g.addColorStop(0.86, "#fff");
          g.addColorStop(1, "rgba(255,255,255,0)");
          lc.save();
          lc.globalCompositeOperation = "destination-in";
          lc.translate(DOG.w / 2, DOG.h / 2);
          lc.scale(DOG.w / Math.max(DOG.w, DOG.h), DOG.h / Math.max(DOG.w, DOG.h));
          lc.translate(-DOG.w / 2, -DOG.h / 2);
          lc.fillStyle = g;
          lc.fillRect(0, 0, DOG.w, DOG.h);
          lc.restore();
        }
        const px = lc.getImageData(0, 0, DOG.w, DOG.h);
        const d = px.data;
        for (let i = 0; i < d.length; i += 4) {
          let v = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
          v = ((v - 128) * 1.15 + 128) * 1.05;
          d[i] = d[i + 1] = d[i + 2] = Math.max(0, Math.min(255, v));
        }
        lc.putImageData(px, 0, 0);
        const cx = DOG.x + DOG.w / 2, cy = DOG.y + DOG.h / 2;
        ctx.translate(cx + (panX / 100) * DOG.w, cy + (panY / 100) * DOG.h);
        ctx.scale(zoom, zoom);
        ctx.translate(-cx, -cy);
        ctx.drawImage(layer, DOG.x, DOG.y);
        ctx.restore();

        // crop to the print with a little tee around it
        const cw = Math.round(bw * 2.1);
        const out = document.createElement("canvas");
        out.width = cw;
        out.height = cw;
        const oc = out.getContext("2d");
        if (!oc) return null;
        oc.drawImage(canvas, bx + bw / 2 - cw / 2, by + bh / 2 - cw / 2, cw, cw, 0, 0, cw, cw);
        return out.toDataURL("image/jpeg", 0.85);
      } catch {
        return null;
      }
    };
    return () => {
      captureRef.current = null;
    };
  });

  return (
    <div className="petprev">
      <div className="petprev__head">
        <span>LIVE PREVIEW</span>
        <span>{busy ? "FINDING YOUR PET…" : typed ? "YOURS" : "SAMPLE"}</span>
      </div>
      <div className="petprev__stage" ref={stageRef}>
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
          {photo && cut ? (
            <image
              href={cut}
              x={DOG.x}
              y={DOG.y}
              width={DOG.w}
              height={DOG.h}
              preserveAspectRatio="xMidYMid meet"
              transform={`translate(${DOG.x + DOG.w / 2 + (panX / 100) * DOG.w} ${DOG.y + DOG.h / 2 + (panY / 100) * DOG.h}) scale(${zoom}) translate(${-(DOG.x + DOG.w / 2)} ${-(DOG.y + DOG.h / 2)})`}
              style={{ filter: "grayscale(1) contrast(1.15) brightness(1.05)" }}
            />
          ) : photo && !busy ? (
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
          ) : photo ? null : (
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
      {missed && (
        <small className="petprev__note">We couldn&apos;t spot your pet automatically, so the whole photo is shown. We&apos;ll cut your pet out properly before printing.</small>
      )}
      <small className="petprev__note">
        A rough preview: we pick out your pet's face and chest automatically, in black and white. When you
        order, this preview is emailed to us. We finish the cut-out by hand and send you a proof on WhatsApp before
        anything is printed.
      </small>
    </div>
  );
}
