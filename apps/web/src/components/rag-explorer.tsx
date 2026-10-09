"use client";
import { useId, useState } from "react";

const scenes = [
  { label: "Les documents", title: "Une bibliothèque à interroger.", body: "La bibliothèque permet de rechercher par nom et de filtrer les documents par catégorie, service, type et année.", file: "Frontend/components/documents/DocumentsWorkspace.tsx", code: 'const EMPTY_FILTERS: DocumentFilterValues = {\n  category: "",\n  department: "",\n  document_type: "",\n  year: ""\n};' },
  { label: "La réponse", title: "Le texte et ses références.", body: "Le contrat de réponse associe le texte généré à une liste de sources structurées.", file: "Backend/app/rag/response.py", code: '@dataclass(frozen=True, slots=True)\nclass RAGResponse:\n    answer: str\n    sources: list[Source]' },
  { label: "Les sources", title: "Revenir au passage d’origine.", body: "Chaque source conserve le document, la page et le passage pour permettre de vérifier le contexte de la réponse.", file: "Backend/app/rag/response.py", code: 'document_id: str\ndocument_name: str\npage_number: int\nchunk_id: str\nexcerpt: str\ndistance: float' },
];

export function RagExplorer() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const scene = scenes[selected];
  return (
    <div className="rag-explorer">
      <div className="explorer-controls" aria-label="Explorer le fonctionnement">
        {scenes.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} aria-controls={id} onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.label}</button>)}
      </div>
      <div id={id} className="explorer-scene" key={selected} aria-live="polite" aria-atomic="true">
        <p className="explorer-label">Dans le code du projet</p>
        <h4>{scene.title}</h4>
        <p>{scene.body}</p>
        <pre tabIndex={0} aria-label="Extrait du code source"><code>{scene.code}</code></pre>
        <a href={`https://github.com/Meriem-Hamri/Ai_assistant/blob/main/${scene.file}`} target="_blank" rel="noreferrer">Voir le fichier source ↗<span className="sr-only"> (nouvel onglet)</span></a>
      </div>
      <p className="explorer-caption">Extraits du dépôt public · Les captures de l’application seront intégrées à cette présentation.</p>
    </div>
  );
}
