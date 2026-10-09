export type ProjectStatus = "documented" | "incomplete";

export type ProjectSection = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  year: string | null;
  role: string | null;
  stack: readonly string[];
  status: ProjectStatus;
  featured: boolean;
  repositoryUrl: string | null;
  liveUrl: string | null;
  flow: readonly string[];
  sections: readonly ProjectSection[];
  missingInformation: readonly string[];
};
