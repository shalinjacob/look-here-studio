import type { QA } from "@/lib/types";
import { Rich } from "@/lib/richText";

// Question/answer list. Answers are in the HTML (just collapsed), so search
// and answer engines read them all.
export default function Faq({ items, openFirst = false }: { items: QA[]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.q} className="faq__item" open={openFirst && i === 0}>
          <summary className="faq__q">{f.q}</summary>
          <p className="faq__a"><Rich text={f.a} /></p>
        </details>
      ))}
    </div>
  );
}
