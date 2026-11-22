/**
 * Colour pairing used by a project's compositions, always taken from the
 * validated palette: dominant surface + deep tone (text/structure).
 */
export type ProjectTone = "olive" | "terracotta" | "sable" | "blush" | "sauge";
export type ProjectVisualKind = "rag" | "reporting" | "skilo" | "taskflow" | "xplore";

export type EngineeringDecision = {
  technology: string;
  title: string;
  body: string;
  watch: string;
};

export type Project = {
  slug: string;
  kind: "internship" | "collaboration" | "personal";
  title: string;
  /** Short context label: "Stage · Telepac Technology". */
  tag: string;
  organization: string | null;
  period: string | null;
  year: string | null;
  tone: ProjectTone;
  visual: ProjectVisualKind;
  /** Two factual lines: what the product lets people do. */
  headline: readonly [string, string];
  summary: string;
  role: string | null;
  /** What I built, as concrete points. */
  highlights: readonly string[];
  stack: readonly string[];
  repositoryUrl: string | null;
  liveUrl: string | null;
  problem: string;
  solution: string;
  flow: readonly string[];
  decisions: readonly EngineeringDecision[];
  /** Improvements considered next (engineering reading). */
  nextSteps: readonly string[];
  /** Collaborators, with names verified by Meriem. */
  credit: string | null;
};
