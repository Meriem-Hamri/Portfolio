"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Locale } from "@/lib/locale";
import styles from "./rag-screenshots.module.css";

const captures = [
  { file: "assistant", width: 1917, height: 916, fr: "Accueil de l’assistant", en: "Assistant home" },
  { file: "context", width: 1917, height: 923, fr: "Sélection du contexte", en: "Context selection" },
  { file: "library", width: 1916, height: 898, fr: "Bibliothèque documentaire", en: "Document library" },
  { file: "import", width: 1897, height: 908, fr: "Import d’un document", en: "Document import" },
];

export function RagScreenshots({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const fr = locale === "fr";
  const capture = captures[selected];
  return <section className={styles.gallery} aria-label={fr ? "Captures réelles de l’assistant" : "Actual assistant screenshots"}>
    <div className={styles.heading}><div><p>{fr ? "DANS L’APPLICATION RÉELLE" : "INSIDE THE REAL APPLICATION"}</p><h3>{fr ? "Les écrans du projet." : "The project screens."}</h3></div><span>{fr ? "Captures fournies par Meriem · interface française" : "Screenshots supplied by Meriem · French interface"}</span></div>
    <div className={styles.thumbnails}>{captures.map((item,index) => <button type="button" key={item.file} onClick={() => { setSelected(index); dialog.current?.showModal(); }}><Image src={`/images/rag/${item.file}.png`} width={item.width} height={item.height} sizes="(max-width: 600px) 75vw, 25vw" alt="" /><span>{fr ? item.fr : item.en} <span aria-hidden="true">↗</span></span></button>)}</div>
    <dialog ref={dialog} className={styles.dialog} aria-label={fr ? "Capture agrandie de l’assistant" : "Enlarged assistant screenshot"} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><div className={styles.viewer}>
      <header><strong>{fr ? capture.fr : capture.en}</strong><button type="button" onClick={() => dialog.current?.close()} autoFocus>{fr ? "Fermer" : "Close"} ×</button></header>
      <Image src={`/images/rag/${capture.file}.png`} width={capture.width} height={capture.height} sizes="95vw" alt={fr ? capture.fr : capture.en} />
      <footer><button type="button" onClick={() => setSelected((selected + captures.length - 1) % captures.length)}>← {fr ? "Précédente" : "Previous"}</button><span>{selected + 1} / {captures.length}</span><button type="button" onClick={() => setSelected((selected + 1) % captures.length)}>{fr ? "Suivante" : "Next"} →</button><a href={`/images/rag/${capture.file}.png`} target="_blank" rel="noreferrer">{fr ? "Taille originale (nouvel onglet)" : "Original size (new tab)"} ↗</a></footer>
    </div></dialog>
  </section>;
}
