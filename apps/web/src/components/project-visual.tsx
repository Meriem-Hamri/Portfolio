import { RagExplorer } from "./rag-explorer";
import type { Locale } from "@/lib/locale";

type ProjectVisualProps = { kind: "rag" | "reporting"; compact?: boolean; locale?: Locale };

export function ProjectVisual({ kind, locale = "fr" }: ProjectVisualProps) {
  if (kind === "rag") return <RagExplorer locale={locale} />;
  return (
    <div className="reporting-preview">
      <p className="eyebrow">Reporting CSE</p>
      <p className="reporting-preview__title">{locale === "fr" ? "Les écrans." : "The screens."}<br />{locale === "fr" ? "Les décisions." : "The decisions."}<br /><em>{locale === "fr" ? "Le contexte." : "The context."}</em></p>
      <p>{locale === "fr" ? "Cette étude de cas sera illustrée avec des vues autorisées ou recréées avec des données synthétiques." : "This case study will use approved visuals or recreations with synthetic data."}</p>
    </div>
  );
}
