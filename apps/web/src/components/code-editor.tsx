"use client";

import { useEffect, useRef, useState } from "react";

/** A token is [text, kind]; kind maps to a syntax colour. */
type Token = [string, "k" | "s" | "p" | "c" | "t"];
export type EditorFile = { name: string; lines: Token[][] };

/**
 * Small code editor that "types" a file when it scrolls into view.
 * Tabs switch files; reduced motion shows the whole file at once.
 */
export function CodeEditor({ files, label }: { files: EditorFile[]; label: string }) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const file = files[active];

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { const id = setTimeout(() => setShown(file.lines.length), 0); return () => clearTimeout(id); }
    if (shown >= file.lines.length) return;
    const id = setTimeout(() => setShown(value => value + 1), shown === 0 ? 300 : 260);
    return () => clearTimeout(id);
  }, [visible, shown, file.lines.length]);

  const choose = (index: number) => { setActive(index); setShown(0); };

  return <div ref={root} className="editor" role="group" aria-label={label}>
    <div className="editor__bar">
      <span className="editor__dots" aria-hidden="true"><i /><i /><i /></span>
      <div className="editor__tabs" role="tablist" aria-label={label}>
        {files.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={index === active} onClick={() => choose(index)}>{item.name}</button>)}
      </div>
    </div>
    <pre className="editor__code" aria-live="off">
      {file.lines.map((line, index) => <span key={index} className="editor__line" data-hidden={index >= shown}>
        <span className="editor__num" aria-hidden="true">{index + 1}</span>
        <code>{line.length ? line.map(([text, kind], i) => <span key={i} className={`tok-${kind}`}>{text}</span>) : " "}</code>
      </span>)}
      <span className="editor__cursor" aria-hidden="true" data-done={shown >= file.lines.length} />
    </pre>
  </div>;
}
