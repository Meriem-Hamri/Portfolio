import type { Locale } from "@/lib/locale";
import type { Project } from "@/types/project";

type Localized = { fr: string; en: string };
type SourceProject = Omit<Project, "eyebrow" | "summary" | "description" | "role" | "flow" | "sections" | "missingInformation"> & {
  eyebrow: Localized; summary: Localized; description: Localized; role: Localized | null;
  flow: readonly Localized[]; sections: readonly { title: Localized; body: Localized }[];
  missingInformation: readonly Localized[];
};

const both = (fr: string, en: string): Localized => ({ fr, en });
const source: readonly SourceProject[] = [
  {
    slug: "assistant-documentaire-rag-local", kind: "internship", organization: "Telepac Technology · Casablanca", period: "Jul — Sep 2026", year: "2026",
    title: "Assistant documentaire RAG local", eyebrow: both("Stage ingénierie logicielle · Telepac Technology", "Software engineering internship · Telepac Technology"),
    summary: both("Un assistant local pour retrouver l’information dans des PDF, documents Word et images, puis répondre avec des références aux sources.", "A local assistant that retrieves information from PDFs, Word documents and images, then answers with references to its sources."),
    description: both("Lors de mon stage chez Telepac Technology à Casablanca, j’ai développé un pipeline documentaire combinant extraction, OCR, nettoyage, découpage et métadonnées. La recherche sémantique utilise BGE-M3 et ChromaDB ; Qwen via Ollama produit des réponses contextualisées avec références au document et à la page.", "During my internship at Telepac Technology in Casablanca, I built a document pipeline combining extraction, OCR, cleaning, chunking and metadata. Semantic retrieval uses BGE-M3 and ChromaDB; Qwen through Ollama generates contextual answers with document and page references."),
    role: both("Stagiaire en ingénierie logicielle", "Software engineering intern"), stack: ["Next.js", "FastAPI", "BGE-M3", "ChromaDB", "Ollama / Qwen", "PostgreSQL", "Celery"], status: "documented", featured: true,
    repositoryUrl: "https://github.com/Meriem-Hamri/Ai_assistant", liveUrl: null,
    flow: [both("Importer", "Import"), both("Extraire et nettoyer", "Extract and clean"), both("Indexer", "Index"), both("Retrouver", "Retrieve"), both("Répondre et citer", "Answer and cite")],
    sections: [
      { title: both("Le besoin", "The need"), body: both("Retrouver des informations dispersées dans plusieurs formats de documents et pouvoir remonter au passage d’origine.", "Find information scattered across document formats and trace each answer back to its source passage.") },
      { title: both("Ma contribution", "My contribution"), body: both("J’ai développé l’ingestion documentaire, la chaîne d’extraction et d’OCR, la recherche sémantique et l’intégration du modèle local. Le backend FastAPI sépare ingestion, indexation et recherche.", "I developed document ingestion, extraction and OCR, semantic retrieval and local model integration. The FastAPI backend separates ingestion, indexing and retrieval.") },
      { title: both("Une décision technique", "A technical decision"), body: both("BGE-M3 génère les représentations vectorielles recherchées dans ChromaDB. Les réponses sont accompagnées de références au document et à la page pour faciliter leur vérification.", "BGE-M3 creates embeddings queried in ChromaDB. Answers include document and page references so readers can verify them.") },
    ],
    missingInformation: [both("Captures réelles de l’application et démonstration reproductible", "Real application screenshots and a reproducible demo"), both("Mesures et limites observées à documenter", "Observed measurements and limitations to document")],
  },
  {
    slug: "reporting-cse", kind: "internship", organization: "Trésorerie Générale du Royaume · Rabat", period: "Apr — Jul 2025", year: "2025",
    title: "Reporting CSE", eyebrow: both("Stage PFE · Trésorerie Générale du Royaume", "Final-year internship · General Treasury of the Kingdom"),
    summary: both("Une plateforme de reporting financier pour suivre et analyser les Comptes des Services de l’État.", "A financial reporting platform for tracking and analysing the State Service Accounts."),
    description: both("Lors de mon stage PFE à la Trésorerie Générale du Royaume, j’ai développé une application Angular, Spring Boot et Oracle. Elle comprend l’authentification JWT, des rôles utilisateurs, des tableaux de bord avec filtres dynamiques et un export Excel.", "During my final-year internship at the General Treasury of the Kingdom, I developed an Angular, Spring Boot and Oracle application. It includes JWT authentication, user roles, dashboards with dynamic filters and Excel export."),
    role: both("Stagiaire développeuse full-stack", "Full-stack development intern"), stack: ["Angular", "Spring Boot", "Oracle", "JWT", "Excel"], status: "documented", featured: true, repositoryUrl: null, liveUrl: null,
    flow: [both("S’authentifier", "Sign in"), both("Accéder à son rôle", "Access role-specific views"), both("Filtrer les données", "Filter data"), both("Explorer le tableau de bord", "Explore dashboards"), both("Exporter un rapport", "Export a report")],
    sections: [
      { title: both("Le contexte", "The context"), body: both("Les Comptes des Services de l’État nécessitent des vues de suivi et d’analyse adaptées aux profils utilisateurs.", "State Service Accounts require tracking and analysis views tailored to user roles.") },
      { title: both("Ma contribution", "My contribution"), body: both("J’ai conçu et développé une architecture full-stack, l’authentification JWT, la gestion des rôles, des tableaux de bord interactifs et l’export Excel.", "I designed and developed a full-stack architecture, JWT authentication, role management, interactive dashboards and Excel export.") },
      { title: both("Publication responsable", "Responsible publication"), body: both("Les données financières internes et les écrans de ce stage ne sont pas publiés ici. Les visuels devront être autorisés ou recréés avec des données synthétiques.", "Internal financial data and internship screens are not published here. Visuals must be authorised or recreated using synthetic data.") },
    ],
    missingInformation: [both("Visuels autorisés ou recréés avec données synthétiques", "Approved visuals or recreations with synthetic data"), both("Résultats et contraintes vérifiables", "Verifiable outcomes and constraints")],
  },
  {
    slug: "skilo", kind: "collaboration", organization: "Projet collaboratif", period: null, year: null, title: "Skilo",
    eyebrow: both("Projet collaboratif · Échange de compétences", "Collaborative project · Skill exchange"),
    summary: both("Une plateforme où l’on enseigne une compétence pour gagner des crédits et en apprendre une autre.", "A platform where people teach a skill to earn credits and learn another."),
    description: both("Projet développé avec Zakariae Bakkari. Le dépôt décrit une plateforme de mise en relation autour des compétences et des crédits de temps, avec Next.js, NestJS, Prisma et PostgreSQL.", "Developed with Zakariae Bakkari. The repository describes a skill-matching platform with time credits, built with Next.js, NestJS, Prisma and PostgreSQL."),
    role: null, stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL"], status: "documented", featured: false,
    repositoryUrl: "https://github.com/Meriem-Hamri/Skilo", liveUrl: null, flow: [],
    sections: [{ title: both("Le concept", "The concept"), body: both("Les membres proposent des compétences, découvrent des partenaires et utilisent des crédits de temps pour organiser leurs échanges.", "Members offer skills, find matches and use time credits to arrange exchanges.") }],
    missingInformation: [both("Contribution individuelle à préciser", "Individual contribution to specify"), both("Vérifier la disponibilité de la démo avant publication", "Verify demo availability before publication")],
  },
  {
    slug: "taskflow", kind: "personal", organization: null, period: null, year: null, title: "TaskFlow",
    eyebrow: both("Projet Angular · Gestion de tâches", "Angular project · Task management"),
    summary: both("Une application de suivi des tâches en équipe : assignation, validation, filtres et avancement.", "A team task tracker with assignments, validation, filtering and progress views."),
    description: both("Le CV décrit une application de gestion de tâches en équipe. Le dépôt public contient une interface Angular et une API simulée avec json-server.", "The CV describes a team task management application. Its public repository contains an Angular interface and a simulated API using json-server."),
    role: null, stack: ["Angular", "TypeScript", "json-server"], status: "documented", featured: false,
    repositoryUrl: "https://github.com/Meriem-Hamri/Angular-TaskFlow", liveUrl: null, flow: [],
    sections: [{ title: both("Le fonctionnement", "How it works"), body: both("Le projet organise l’assignation, le filtrage, la validation et le suivi de l’avancement des tâches.", "The project covers task assignment, filtering, validation and progress tracking.") }],
    missingInformation: [both("Captures et contribution détaillée", "Screenshots and detailed contribution")],
  },
  {
    slug: "xploreia", kind: "collaboration", organization: "Projet d’équipe", period: null, year: null, title: "XploreIA",
    eyebrow: both("Projet d’équipe · Découverte d’outils IA", "Team project · AI tool discovery"),
    summary: both("Un catalogue pour découvrir et comparer des outils IA avec avis, filtres et playlists.", "A catalogue to discover and compare AI tools using reviews, filters and playlists."),
    description: both("Projet d’équipe réunissant une interface React et une API PHP avec MySQL. Les CV décrivent des rôles Admin, User et Viewer, des avis, des filtres avancés et des playlists.", "A team project combining a React interface and a PHP API with MySQL. The CVs describe Admin, User and Viewer roles, reviews, advanced filters and playlists."),
    role: null, stack: ["React", "PHP", "MySQL"], status: "documented", featured: false,
    repositoryUrl: "https://github.com/Meriem-Hamri/XploreAi", liveUrl: null, flow: [],
    sections: [{ title: both("Le produit", "The product"), body: both("L’application rassemble découverte, comparaison, avis et organisation d’outils dans des playlists.", "The application combines discovery, comparison, reviews and organisation of tools into playlists.") }],
    missingInformation: [both("Contribution personnelle et captures à détailler", "Personal contribution and screenshots to detail")],
  },
];

export function localizedProjects(locale: Locale): readonly Project[] {
  const t = (value: Localized) => value[locale];
  return source.map(project => ({
    ...project,
    eyebrow: t(project.eyebrow), summary: t(project.summary), description: t(project.description),
    role: project.role ? t(project.role) : null,
    flow: project.flow.map(t),
    sections: project.sections.map(section => ({ title: t(section.title), body: t(section.body) })),
    missingInformation: project.missingInformation.map(t),
  }));
}
