import { AssistantDemo, ReportingDemo } from "./project-demos";
import { RagScreenshots } from "./rag-screenshots";
import type { Locale } from "@/lib/locale";

type ProjectVisualProps = { kind: "rag" | "reporting"; compact?: boolean; locale?: Locale };

export function ProjectVisual({ kind, compact = false, locale = "fr" }: ProjectVisualProps) {
  return kind === "rag" ? <><AssistantDemo locale={locale} />{!compact && <RagScreenshots locale={locale} />}</> : <ReportingDemo locale={locale} />;
}
