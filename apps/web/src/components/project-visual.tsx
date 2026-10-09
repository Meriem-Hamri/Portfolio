import { RagExplorer } from "./rag-explorer";

type ProjectVisualProps = { kind: "rag" | "reporting"; compact?: boolean };

export function ProjectVisual({ kind }: ProjectVisualProps) {
  if (kind === "rag") return <RagExplorer />;
  return (
    <div className="reporting-preview">
      <p className="eyebrow">Reporting CSE</p>
      <p className="reporting-preview__title">Les écrans.<br />Les décisions.<br /><em>Le contexte.</em></p>
      <p>La présentation visuelle sera construite à partir des captures du projet, après anonymisation des données internes.</p>
    </div>
  );
}
