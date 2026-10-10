import { localizedProjects } from "@/data/projects-localized";
import type { Locale } from "@/lib/locale";
import type { Project } from "@/types/project";

// Point d'accès unique aux données. L'implémentation pourra être remplacée
// par des appels vers l'API NestJS sans modifier les pages consommatrices.
export async function getProjects(locale: Locale = "fr"): Promise<readonly Project[]> {
  return localizedProjects(locale);
}

export async function getFeaturedProjects(locale: Locale = "fr"): Promise<readonly Project[]> {
  return localizedProjects(locale).filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string, locale: Locale = "fr"): Promise<Project | null> {
  return localizedProjects(locale).find((project) => project.slug === slug) ?? null;
}
