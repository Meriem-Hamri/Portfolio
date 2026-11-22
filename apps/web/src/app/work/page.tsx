import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { getProjects } from "@/lib/projects";
import { getLocale, pick } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: pick(locale, "Projets", "Work"), description: pick(locale, "Stages et projets logiciels de Meriem Hamri.", "Meriem Hamri's internships and software projects.") };
}

export default async function WorkPage() {
  const locale = await getLocale();
  const projects = await getProjects(locale);
  const fr = locale === "fr";
  return <>
    <section className="work-index shell">
      <p className="eyebrow">{fr ? "Index" : "Index"}</p>
      <h1 className="display">{fr ? "Tous les projets" : "All projects"}</h1>
      <ul className="index-list">
        {projects.map((project, index) => <li key={project.slug} className={`case--${project.color}`} data-reveal style={{ "--d": index } as React.CSSProperties}>
          <Link href={`/work/${project.slug}`}>
            <span className="index-list__num">{String(index + 1).padStart(2, "0")}</span>
            <span className="index-list__title display">{project.title}</span>
            <span className="index-list__tag">{project.tag}</span>
            <span className="index-list__year">{project.year ?? "—"}</span>
            <span className="index-list__arrow" aria-hidden="true">→</span>
          </Link>
        </li>)}
      </ul>
    </section>
    <SiteFooter locale={locale} />
  </>;
}
