import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

// Point d'accès unique aux données. L'implémentation pourra être remplacée
// par des appels vers l'API NestJS sans modifier les pages consommatrices.
export async function getProjects(): Promise<readonly Project[]> {
  return projects;
}

export async function getFeaturedProjects(): Promise<readonly Project[]> {
  return projects.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return projects.find((project) => project.slug === slug) ?? null;
}
