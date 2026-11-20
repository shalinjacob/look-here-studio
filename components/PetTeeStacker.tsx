"use client";

import { useState } from "react";
import Link from "next/link";
import { petLine } from "@/lib/petTee";

// Homepage mini-preview for the custom pet-parent tee. Same print geometry as
// PetTeePreview, but text-only: type a name, see it stacked in gold, then go to
// the product page (name carried over) to add a photo and order.

const BLANK_TEE = "/small-runs/pet-tee-blank.webp";
const SAMPLE_DOG = "/small-runs/pet-tee-sample-dog.webp";
const GOLD = "#bd9440";
const PRINT = { left: 41.4, top: 23.2, width: 17.5, height: 18.0 };
const W = 1128;
const BASELINES = [270, 567, 864, 1161];
const CAP = 270;
const FONT_SIZE = CAP / 0.7;
const CHAR_W = 113;
const DOG = { x: 277, y: 140, w: 610, h: 1000 };

export default function PetTeeStacker({ href }: { href: string }) {
  const [name, setName] = useState("");
  const [who, setWho] = useState("MOM");
  const { line } = petLine(name, who);
  const natural = line.length * CHAR_W;
  const shrink = natural > W ? Math.max(W / natural, 0.55) : 1;
  const textLength = Math.min(W, natural * shrink);
  const fontSize = FONT_SIZE * shrink;
  const shift = shrink < 1 ? (CAP - CAP * shrink) / 2 : 0;
  const typed = name.trim().replace(/['’]s$/i, "");
  const q = new URLSearchParams();
  if (typed) q.set("name", typed);
  if (who.trim()) q.set("who", who.trim());
  const to = q.toString() ? `${href}?${q.toString()}` : href;

  return (
    <div className="petfeat__stacker">
      <div className="petfeat__stage">
        <div className="petfeat__zoom">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BLANK_TEE} alt="" className="petprev__tee" width={1254} height={1254} loading="lazy" decoding="async" />
        <svg
          className="petprev__print"
          viewBox={`0 0 ${W} 1163`}
          style={{ left: `${PRINT.left}%`, top: `${PRINT.top}%`, width: `${PRINT.width}%`, height: `${PRINT.height}%` }}
          role="img"
          aria-label={`${line}, repeated four times, with a sample dog`}
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
          <image href={SAMPLE_DOG} x={DOG.x} y={DOG.y} width={DOG.w} height={DOG.h} />
        </svg>
        </div>
      </div>

      <div className="petfeat__form">
        <label>
          <span>YOUR PET&rsquo;S NAME</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Luca"
            maxLength={12}
            autoComplete="off"
          />
        </label>
        <label>
          <span>YOU ARE</span>
          <input value={who} onChange={(e) => setWho(e.target.value)} placeholder="MOM" maxLength={10} autoComplete="off" />
        </label>
        <Link className="cta cta--stamp" href={to}>
          <span className="cta__label">MAKE YOURS</span>
          <span className="cta__arrow" aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
