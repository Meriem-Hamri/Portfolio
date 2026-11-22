"use client";

import { useEffect, useRef, useState } from "react";

type Reading = "produit" | "ingenierie";

/**
 * Two readings of the same case study (brief): Product, then Engineering.
 * Accessible tabs, linkable through #produit / #ingenierie.
 */
export function CaseReading({ product, engineering, labels }: {
  product: React.ReactNode;
  engineering: React.ReactNode;
  labels: { product: string; engineering: string; productHint: string; engineeringHint: string; group: string };
}) {
  const [reading, setReading] = useState<Reading>("produit");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => { if (window.location.hash === "#ingenierie") setReading("ingenierie"); else if (window.location.hash === "#produit") setReading("produit"); };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  function choose(next: Reading) {
    setReading(next);
    history.replaceState(null, "", `#${next}`);
    const top = bar.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * .6) bar.current?.scrollIntoView({ block: "start" });
  }

  const tabs: { id: Reading; label: string; hint: string }[] = [
    { id: "produit", label: labels.product, hint: labels.productHint },
    { id: "ingenierie", label: labels.engineering, hint: labels.engineeringHint },
  ];

  return <>
    <div ref={bar} className="reading" id="lecture">
      <div className="shell reading__inner">
        <div role="tablist" aria-label={labels.group} className="reading__tabs"
          onKeyDown={event => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              const next = reading === "produit" ? "ingenierie" : "produit";
              choose(next);
              document.getElementById(`tab-${next}`)?.focus();
            }
          }}>
          {tabs.map(tab => <button key={tab.id} id={`tab-${tab.id}`} type="button" role="tab" aria-selected={reading === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={reading === tab.id ? 0 : -1} onClick={() => choose(tab.id)}>
            <span>{tab.label}</span><small>{tab.hint}</small>
          </button>)}
        </div>
      </div>
    </div>
    <div id="panel-produit" role="tabpanel" aria-labelledby="tab-produit" hidden={reading !== "produit"} className="reading__panel">{product}</div>
    <div id="panel-ingenierie" role="tabpanel" aria-labelledby="tab-ingenierie" hidden={reading !== "ingenierie"} className="reading__panel">{engineering}</div>
  </>;
}
