import type { Project } from "@/types/project";

export const projects = [
  {
    slug: "assistant-documentaire-rag-local",
    title: "Assistant documentaire RAG local",
    eyebrow: "Recherche documentaire · Projet public",
    summary:
      "Une application locale qui transforme des documents en contexte vérifiable pour interroger un modèle de langage.",
    description:
      "Le dépôt réunit une interface Next.js et une API FastAPI. Les documents PDF, DOCX, images ou scans passent par une chaîne d’extraction et d’OCR, puis par un index vectoriel avant la génération locale d’une réponse accompagnée de ses sources.",
    year: null,
    role: null,
    stack: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Celery",
      "Redis",
      "ChromaDB",
      "BGE-M3",
      "Ollama / Qwen",
    ],
    status: "documented",
    featured: true,
    repositoryUrl: "https://github.com/Meriem-Hamri/Ai_assistant",
    liveUrl: null,
    flow: [
      "Importer le document",
      "Extraire et nettoyer",
      "Découper et vectoriser",
      "Rechercher les passages",
      "Répondre avec les sources",
    ],
    sections: [
      {
        title: "Le problème traité",
        body: "Retrouver une information dans un ensemble de documents, puis conserver le lien avec les passages qui ont servi à construire la réponse.",
      },
      {
        title: "La chaîne logicielle",
        body: "Le traitement documentaire est asynchrone avec Celery et Redis. Les métadonnées et conversations sont persistées dans PostgreSQL, tandis que ChromaDB stocke les représentations vectorielles produites avec BGE-M3.",
      },
      {
        title: "L’expérience proposée",
        body: "L’interface permet de charger et filtrer des documents, de suivre leur état de traitement, d’ouvrir une conversation et de consulter les sources associées à une réponse.",
      },
      {
        title: "Le choix local",
        body: "La génération s’appuie sur Ollama et Qwen exécutés sur la machine. Le dépôt organise séparément extraction, embeddings, recherche, construction du prompt et génération afin de rendre le pipeline testable.",
      },
    ],
    missingInformation: [
      "Rôle individuel et éventuelles contributions à confirmer",
      "Année et contexte précis du projet à ajouter",
      "Captures réelles et démonstration reproductible à fournir",
      "Résultats observés, limites et compromis techniques à documenter",
    ],
  },
  {
    slug: "reporting-cse",
    title: "Reporting CSE",
    eyebrow: "Reporting métier · Informations à compléter",
    summary:
      "Un projet de reporting dont le périmètre public et les éléments démontrables restent à confirmer.",
    description:
      "Cette entrée réserve la place du second cas d’étude sans inventer de fonctionnalités, de résultats ou de visuels. Les pistes techniques Angular, Spring et Oracle proviennent de la roadmap et doivent encore être validées avant publication définitive.",
    year: null,
    role: null,
    stack: ["Angular — à confirmer", "Spring — à confirmer", "Oracle — à confirmer"],
    status: "incomplete",
    featured: true,
    repositoryUrl: null,
    liveUrl: null,
    flow: [],
    sections: [
      {
        title: "État du contenu",
        body: "La page est volontairement explicite sur ses limites. Elle deviendra une étude de cas lorsque le besoin, les utilisateurs, les responsabilités et l’architecture auront été vérifiés.",
      },
      {
        title: "Cadre de publication",
        body: "Les données internes devront être anonymisées. Les captures seront réelles, autorisées, redacted ou clairement présentées comme des reconstitutions lorsque les informations sources seront disponibles.",
      },
    ],
    missingInformation: [
      "Contexte, besoin métier et utilisateurs concernés",
      "Rôle exact et contributions personnelles",
      "Architecture et technologies réellement utilisées",
      "Captures autorisées ou vues recréées avec données synthétiques",
      "Résultats, contraintes et enseignements vérifiables",
      "Lien public éventuel",
    ],
  },
] as const satisfies readonly Project[];
