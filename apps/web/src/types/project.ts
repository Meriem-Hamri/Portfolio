export type ProjectColor = "blue" | "orange" | "lime" | "violet" | "pink";
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
  /** Short label shown above the title: "Stage · Telepac Technology". */
  tag: string;
  organization: string | null;
  period: string | null;
  year: string | null;
  color: ProjectColor;
  visual: ProjectVisualKind;
  /** One punchy line that sells the project. */
  pitch: string;
  summary: string;
  role: string | null;
  /** Three key facts shown as chips. */
  badges: readonly string[];
  /** What I built, as concrete bullet points. */
  highlights: readonly string[];
  stack: readonly string[];
  repositoryUrl: string | null;
  liveUrl: string | null;
  problem: string;
  solution: string;
  flow: readonly string[];
  decisions: readonly EngineeringDecision[];
  /** Optional credit line, e.g. a collaborator. */
  credit: string | null;
};
