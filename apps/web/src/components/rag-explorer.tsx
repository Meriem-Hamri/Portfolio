"use client";
import { useId, useState } from "react";
import type { Locale } from "@/lib/locale";

const scenes = [
  { label: "Les documents", title: "Une bibliothèque à interroger.", body: "La bibliothèque permet de rechercher par nom et de filtrer les documents par catégorie, service, type et année.", file: "Frontend/components/documents/DocumentsWorkspace.tsx", code: 'const EMPTY_FILTERS: DocumentFilterValues = {\n  category: "",\n  department: "",\n  document_type: "",\n  year: ""\n};' },
  { label: "La réponse", title: "Le texte et ses références.", body: "Le contrat de réponse associe le texte généré à une liste de sources structurées.", file: "Backend/app/rag/response.py", code: '@dataclass(frozen=True, slots=True)\nclass RAGResponse:\n    answer: str\n    sources: list[Source]' },
  { label: "Les sources", title: "Revenir au passage d’origine.", body: "Chaque source conserve le document, la page et le passage pour permettre de vérifier le contexte de la réponse.", file: "Backend/app/rag/response.py", code: 'document_id: str\ndocument_name: str\npage_number: int\nchunk_id: str\nexcerpt: str\ndistance: float' },
];

export function RagExplorer({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const translated = [
    { label: "Documents", title: "A library to explore.", body: "The library supports name search and filters by category, department, type and year." },
    { label: "Answer", title: "The answer and its references.", body: "The response contract pairs generated text with a structured list of sources." },
    { label: "Sources", title: "Return to the original passage.", body: "Each source retains its document, page and excerpt so the answer can be checked." },
  ];
  const scene = locale === "fr" ? scenes[selected] : { ...scenes[selected], ...translated[selected] };
  return (
    <div className="rag-explorer">
      <div className="explorer-controls" aria-label={locale === "fr" ? "Explorer le fonctionnement" : "Explore how it works"}>
        {scenes.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} aria-controls={id} onClick={() => setSelected(index)}><span>0{index + 1}</span>{locale === "fr" ? item.label : translated[index].label}</button>)}
      </div>
      <div id={id} className="explorer-scene" key={selected} aria-live="polite" aria-atomic="true">
        <p className="explorer-label">{locale === "fr" ? "Dans le code du projet" : "Inside the project code"}</p>
        <h4>{scene.title}</h4>
        <p>{scene.body}</p>
        <pre tabIndex={0} aria-label={locale === "fr" ? "Extrait du code source" : "Source code excerpt"}><code>{scene.code}</code></pre>
        <a href={`https://github.com/Meriem-Hamri/Ai_assistant/blob/main/${scene.file}`} target="_blank" rel="noreferrer">{locale === "fr" ? "Voir le fichier source" : "View source file"} ↗<span className="sr-only"> {locale === "fr" ? "(nouvel onglet)" : "(new tab)"}</span></a>
      </div>
      <p className="explorer-caption">{locale === "fr" ? "Extraits du dépôt public · Captures de l’application à intégrer." : "Excerpts from the public repository · Application screenshots to be added."}</p>
    </div>
  );
}
