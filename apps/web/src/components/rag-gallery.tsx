"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Locale } from "@/lib/locale";

const captures = [
  { file: "assistant", width: 1917, height: 916, fr: "Accueil de l’assistant", en: "Assistant home" },
  { file: "context", width: 1917, height: 923, fr: "Choix du contexte documentaire", en: "Choosing the document context" },
  { file: "library", width: 1916, height: 898, fr: "Bibliothèque documentaire", en: "Document library" },
  { file: "import", width: 1897, height: 908, fr: "Import d’un document", en: "Importing a document" },
];

export function RagGallery({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const fr = locale === "fr";
  const capture = captures[selected];
  const go = (delta: number) => setSelected(value => (value + delta + captures.length) % captures.length);
  return <>
    <div className="gallery">
      {captures.map((item, index) => <button key={item.file} type="button" className="gallery__item" data-reveal style={{ "--d": index } as React.CSSProperties} aria-haspopup="dialog" onClick={() => { setSelected(index); dialog.current?.showModal(); }}>
        <span className="gallery__img"><Image src={`/images/rag/${item.file}.png`} width={item.width} height={item.height} sizes="(max-width: 700px) 100vw, 50vw" alt="" /></span>
        <span className="gallery__label">{fr ? item.fr : item.en}<span aria-hidden="true">⤢</span></span>
      </button>)}
    </div>
    <dialog ref={dialog} className="lightbox" aria-label={fr ? "Capture agrandie" : "Enlarged screenshot"}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={event => { if (event.key === "ArrowRight") go(1); if (event.key === "ArrowLeft") go(-1); }}>
      <div className="lightbox__head"><strong>{fr ? capture.fr : capture.en}</strong><span>{selected + 1} / {captures.length}</span><button type="button" onClick={() => dialog.current?.close()} autoFocus>{fr ? "Fermer" : "Close"} ×</button></div>
      <Image src={`/images/rag/${capture.file}.png`} width={capture.width} height={capture.height} sizes="95vw" alt={fr ? capture.fr : capture.en} />
      <div className="lightbox__nav"><button type="button" onClick={() => go(-1)}>← {fr ? "Précédente" : "Previous"}</button><button type="button" onClick={() => go(1)}>{fr ? "Suivante" : "Next"} →</button></div>
    </dialog>
  </>;
}
