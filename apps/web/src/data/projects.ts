import type { Locale } from "@/lib/locale";
import type { Project } from "@/types/project";

type L = { fr: string; en: string };
const l = (fr: string, en: string): L => ({ fr, en });

type Source = {
  slug: string;
  kind: Project["kind"];
  title: string;
  tag: L;
  organization: string | null;
  period: L | null;
  year: string | null;
  color: Project["color"];
  visual: Project["visual"];
  pitch: L;
  summary: L;
  role: L | null;
  badges: readonly L[];
  highlights: readonly L[];
  stack: readonly string[];
  repositoryUrl: string | null;
  liveUrl: string | null;
  problem: L;
  solution: L;
  flow: readonly L[];
  decisions: readonly { technology: string; title: L; body: L; watch: L }[];
  credit: L | null;
};

const source: readonly Source[] = [
  {
    slug: "assistant-documentaire-rag-local",
    kind: "internship",
    title: "AssistantAI",
    tag: l("Stage · Telepac Technology", "Internship · Telepac Technology"),
    organization: "Telepac Technology · Casablanca",
    period: l("Juil. — Sept. 2026", "Jul — Sep 2026"),
    year: "2026",
    color: "blue",
    visual: "rag",
    pitch: l("Vos documents répondent. Sources à l’appui.", "Your documents answer back. With sources."),
    summary: l(
      "Un assistant IA 100 % local qui lit des PDF, des documents Word et des images scannées, puis répond en langage naturel en citant le document et la page.",
      "A fully local AI assistant that reads PDFs, Word documents and scanned images, then answers in plain language, citing the document and page.",
    ),
    role: l("Stagiaire ingénieure logiciel", "Software engineering intern"),
    badges: [l("100 % local", "100% local"), l("PDF · Word · OCR", "PDF · Word · OCR"), l("Réponses sourcées", "Cited answers")],
    highlights: [
      l("Pipeline d’ingestion : extraction, OCR, nettoyage, découpage et métadonnées", "Ingestion pipeline: extraction, OCR, cleaning, chunking and metadata"),
      l("Recherche sémantique BGE-M3 + ChromaDB, filtrable par catégorie, département et année", "Semantic search with BGE-M3 + ChromaDB, filterable by category, department and year"),
      l("Réponses générées en local par Qwen via Ollama, avec la source citée", "Answers generated locally by Qwen via Ollama, with the source cited"),
    ],
    stack: ["Next.js", "FastAPI", "BGE-M3", "ChromaDB", "Ollama · Qwen", "PostgreSQL", "Celery"],
    repositoryUrl: "https://github.com/Meriem-Hamri/Ai_assistant",
    liveUrl: null,
    problem: l(
      "Un PDF, un document Word, une page scannée : l’information est éparpillée dans des formats qui ne se lisent pas de la même façon. Et une réponse seule ne suffit pas : il faut pouvoir retrouver le passage qui la justifie.",
      "A PDF, a Word document, a scanned page: information is scattered across formats that are not read the same way. And an answer alone is not enough: you need to find the passage that backs it up.",
    ),
    solution: l(
      "J’ai construit une chaîne RAG entièrement locale : les documents sont préparés et indexés, la question retrouve les passages pertinents, puis Qwen formule une réponse accompagnée de ses références. Aucune donnée ne quitte la machine.",
      "I built a fully local RAG pipeline: documents are prepared and indexed, the question retrieves the relevant passages, and Qwen writes an answer along with its references. No data leaves the machine.",
    ),
    flow: [l("Importer", "Import"), l("Extraire & OCR", "Extract & OCR"), l("Indexer", "Index"), l("Retrouver", "Retrieve"), l("Répondre & citer", "Answer & cite")],
    decisions: [
      {
        technology: "FastAPI · OCR",
        title: l("Un seul chemin pour tous les formats", "One path for every format"),
        body: l("Extraction, OCR, nettoyage et découpage donnent aux PDF, Word et images un traitement commun. FastAPI sépare ingestion, indexation et recherche : chaque étape a une responsabilité claire.", "Extraction, OCR, cleaning and chunking give PDFs, Word files and images a common path. FastAPI separates ingestion, indexing and retrieval, so each stage has a clear responsibility."),
        watch: l("La qualité d’un scan et le découpage des passages influencent directement le contexte retrouvé.", "Scan quality and chunk boundaries directly shape the retrieved context."),
      },
      {
        technology: "BGE-M3 · ChromaDB",
        title: l("Chercher par le sens, pas par mots-clés", "Search by meaning, not keywords"),
        body: l("BGE-M3 transforme les passages en vecteurs, ChromaDB retrouve ceux qui sont proches de la question. Les métadonnées gardent le lien avec le document d’origine et permettent de filtrer le contexte.", "BGE-M3 turns passages into vectors and ChromaDB finds those close to the question. Metadata keeps the link to the original document and lets users filter the context."),
        watch: l("Proche ne veut pas dire pertinent : les passages retrouvés doivent être évalués.", "Close does not mean relevant: retrieved passages need evaluation."),
      },
      {
        technology: "Ollama · Qwen",
        title: l("Générer en local, garder la trace", "Generate locally, keep the trail"),
        body: l("Le modèle tourne sur la machine via Ollama : les documents restent privés. Chaque réponse cite le document et la page pour être vérifiable en un clic.", "The model runs on the machine through Ollama, so documents stay private. Every answer cites the document and page so it can be checked in one click."),
        watch: l("Une réponse sourcée peut quand même se tromper : la source sert justement à vérifier.", "A cited answer can still be wrong, which is exactly why the source is there."),
      },
    ],
    credit: null,
  },
  {
    slug: "reporting-cse",
    kind: "internship",
    title: "Reporting CSE",
    tag: l("Stage PFE · Trésorerie Générale du Royaume", "Final-year internship · Treasury of the Kingdom"),
    organization: "Trésorerie Générale du Royaume · Rabat",
    period: l("Avr. — Juil. 2025", "Apr — Jul 2025"),
    year: "2025",
    color: "orange",
    visual: "reporting",
    pitch: l("Des comptes publics, lisibles en un coup d’œil.", "Public accounts, readable at a glance."),
    summary: l(
      "Une plateforme de reporting financier pour suivre et analyser les Comptes des Services de l’État, avec des vues adaptées à chaque rôle.",
      "A financial reporting platform to track and analyse State Service Accounts, with views tailored to each role.",
    ),
    role: l("Développeuse full-stack (PFE)", "Full-stack developer (final-year project)"),
    badges: [l("Full-stack", "Full-stack"), l("JWT + rôles", "JWT + roles"), l("Export Excel", "Excel export")],
    highlights: [
      l("Architecture full-stack Angular, Spring Boot et Oracle, conçue de bout en bout", "End-to-end full-stack architecture with Angular, Spring Boot and Oracle"),
      l("Authentification JWT et accès aux fonctionnalités selon le rôle", "JWT authentication and role-based access to features"),
      l("Tableaux de bord à filtres dynamiques et export des rapports en Excel", "Dashboards with dynamic filters and Excel report export"),
    ],
    stack: ["Angular", "Spring Boot", "Oracle", "JWT", "Excel"],
    repositoryUrl: null,
    liveUrl: null,
    problem: l(
      "Le suivi des Comptes des Services de l’État demande de parcourir beaucoup de données, de resserrer l’analyse et de produire des rapports, le tout avec des accès maîtrisés selon le profil de chacun.",
      "Tracking State Service Accounts means browsing a lot of data, narrowing the analysis and producing reports, all with access controlled by each user’s profile.",
    ),
    solution: l(
      "J’ai conçu et développé une application full-stack : on se connecte, on accède aux vues de son rôle, on filtre, on lit le tableau de bord et on exporte un rapport Excel. Un parcours continu, de l’accès au livrable.",
      "I designed and built a full-stack application: sign in, reach the views for your role, filter, read the dashboard and export an Excel report. One continuous journey, from access to deliverable.",
    ),
    flow: [l("Se connecter", "Sign in"), l("Vues par rôle", "Role views"), l("Filtrer", "Filter"), l("Analyser", "Analyse"), l("Exporter", "Export")],
    decisions: [
      {
        technology: "Angular",
        title: l("Les filtres comme point d’entrée", "Filters as the entry point"),
        body: l("L’interface part du besoin de l’utilisateur : choisir un périmètre, puis lire les indicateurs correspondants. Filtres et tableaux de bord se mettent à jour ensemble.", "The interface starts from the user’s need: pick a scope, then read the matching indicators. Filters and dashboards update together."),
        watch: l("États vides, filtres actifs et erreurs doivent rester lisibles.", "Empty states, active filters and errors must stay readable."),
      },
      {
        technology: "Spring Boot · JWT",
        title: l("Séparer identité et autorisation", "Separate identity from authorisation"),
        body: l("Spring Boot porte l’API. Le JWT identifie la session, les rôles décident des fonctionnalités accessibles, indépendamment de l’affichage côté Angular.", "Spring Boot powers the API. The JWT identifies the session and roles decide which features are available, independently of the Angular display."),
        watch: l("Les autorisations sont vérifiées côté serveur, pas seulement dans l’interface.", "Permissions are enforced on the server, not only in the interface."),
      },
      {
        technology: "Oracle · Excel",
        title: l("De l’analyse au livrable", "From analysis to deliverable"),
        body: l("Oracle stocke les données, l’export Excel permet de transmettre le rapport dans un format que tout le monde utilise déjà.", "Oracle stores the data, and Excel export hands the report over in a format everyone already uses."),
        watch: l("Le rapport exporté doit refléter exactement les filtres appliqués.", "The exported report must match the applied filters exactly."),
      },
    ],
    credit: null,
  },
  {
    slug: "skilo",
    kind: "collaboration",
    title: "Skilo",
    tag: l("Projet collaboratif · Échange de compétences", "Collaborative project · Skill exchange"),
    organization: null,
    period: null,
    year: null,
    color: "lime",
    visual: "skilo",
    pitch: l("Enseigne ce que tu sais. Apprends ce qui te manque.", "Teach what you know. Learn what you don’t."),
    summary: l(
      "Une plateforme où l’on enseigne une compétence pour gagner des crédits de temps, puis on les dépense pour en apprendre une autre.",
      "A platform where you teach a skill to earn time credits, then spend them to learn another one.",
    ),
    role: l("Développement full-stack, en binôme", "Full-stack development, in a pair"),
    badges: [l("Crédits de temps", "Time credits"), l("Matching", "Matching"), l("Full-stack TS", "Full-stack TS")],
    highlights: [
      l("Profils avec compétences proposées et compétences recherchées", "Profiles with skills offered and skills wanted"),
      l("Mise en relation entre membres complémentaires", "Matching between complementary members"),
      l("Système de crédits de temps pour équilibrer les échanges", "Time-credit system to balance exchanges"),
    ],
    stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
    repositoryUrl: "https://github.com/Meriem-Hamri/Skilo",
    liveUrl: null,
    problem: l(
      "Tout le monde a quelque chose à transmettre, mais payer des cours n’est pas toujours possible. Comment rendre l’échange de savoir équitable sans argent ?",
      "Everyone has something to teach, but paying for lessons isn’t always possible. How do you make knowledge exchange fair without money?",
    ),
    solution: l(
      "Skilo transforme le temps en monnaie : une heure enseignée rapporte un crédit, une heure apprise en coûte un. Les membres trouvent des partenaires complémentaires et organisent leurs échanges.",
      "Skilo turns time into currency: one hour taught earns a credit, one hour learned costs one. Members find complementary partners and arrange their exchanges.",
    ),
    flow: [l("Créer son profil", "Create a profile"), l("Trouver un match", "Find a match"), l("Échanger", "Exchange"), l("Gagner des crédits", "Earn credits")],
    decisions: [],
    credit: l("Développé avec Zakariae Bakkari", "Built with Zakariae Bakkari"),
  },
  {
    slug: "xploreia",
    kind: "collaboration",
    title: "XploreIA",
    tag: l("Projet d’équipe · Catalogue d’outils IA", "Team project · AI tool catalogue"),
    organization: null,
    period: null,
    year: null,
    color: "pink",
    visual: "xplore",
    pitch: l("Le bon outil IA, sans se perdre.", "The right AI tool, without getting lost."),
    summary: l(
      "Un catalogue pour découvrir, comparer et organiser des outils IA, avec avis, filtres avancés et playlists.",
      "A catalogue to discover, compare and organise AI tools, with reviews, advanced filters and playlists.",
    ),
    role: l("Développement full-stack, en équipe", "Full-stack development, in a team"),
    badges: [l("3 rôles", "3 roles"), l("Avis & notes", "Reviews & ratings"), l("Playlists", "Playlists")],
    highlights: [
      l("Catalogue avec filtres avancés pour comparer les outils", "Catalogue with advanced filters to compare tools"),
      l("Avis et notes laissés par les utilisateurs", "User reviews and ratings"),
      l("Playlists d’outils et trois rôles : Admin, User, Viewer", "Tool playlists and three roles: Admin, User, Viewer"),
    ],
    stack: ["React", "PHP", "MySQL"],
    repositoryUrl: "https://github.com/Meriem-Hamri/XploreAi",
    liveUrl: null,
    problem: l(
      "De nouveaux outils IA sortent chaque semaine. Difficile de savoir lequel choisir, ce qu’en pensent les autres, et de garder sous la main ceux qu’on utilise.",
      "New AI tools come out every week. It’s hard to know which one to pick, what others think, and to keep track of the ones you use.",
    ),
    solution: l(
      "XploreIA réunit découverte, comparaison et organisation : on filtre le catalogue, on lit les avis, puis on range ses outils favoris dans des playlists thématiques.",
      "XploreIA brings discovery, comparison and organisation together: filter the catalogue, read reviews, then save favourite tools into themed playlists.",
    ),
    flow: [l("Explorer", "Explore"), l("Filtrer", "Filter"), l("Comparer les avis", "Compare reviews"), l("Créer une playlist", "Build a playlist")],
    decisions: [],
    credit: null,
  },
  {
    slug: "taskflow",
    kind: "personal",
    title: "TaskFlow",
    tag: l("Projet Angular · Gestion de tâches", "Angular project · Task management"),
    organization: null,
    period: null,
    year: null,
    color: "violet",
    visual: "taskflow",
    pitch: l("L’équipe avance. Et ça se voit.", "The team moves forward. And you can see it."),
    summary: l(
      "Une application de suivi des tâches en équipe : assignation, validation, filtres et suivi de l’avancement.",
      "A team task tracker: assignment, validation, filtering and progress tracking.",
    ),
    role: l("Développement front-end", "Front-end development"),
    badges: [l("Angular", "Angular"), l("Validation", "Approval flow"), l("Suivi d’avancement", "Progress tracking")],
    highlights: [
      l("Assignation des tâches aux membres de l’équipe", "Task assignment to team members"),
      l("Circuit de validation des tâches terminées", "Approval flow for completed tasks"),
      l("Filtres et vue d’avancement en temps réel", "Filters and live progress view"),
    ],
    stack: ["Angular", "TypeScript", "json-server"],
    repositoryUrl: "https://github.com/Meriem-Hamri/Angular-TaskFlow",
    liveUrl: null,
    problem: l(
      "Dans une équipe, on perd vite de vue qui fait quoi, ce qui attend une validation et où en est le projet.",
      "In a team, it’s easy to lose track of who does what, what is waiting for approval and where the project stands.",
    ),
    solution: l(
      "TaskFlow centralise tout dans une interface Angular : on assigne, on valide, on filtre et l’avancement se lit d’un coup d’œil. Une API simulée avec json-server permet de prototyper rapidement.",
      "TaskFlow centralises everything in an Angular interface: assign, approve, filter, and progress is visible at a glance. A json-server mock API makes rapid prototyping possible.",
    ),
    flow: [l("Créer", "Create"), l("Assigner", "Assign"), l("Réaliser", "Do"), l("Valider", "Approve")],
    decisions: [],
    credit: null,
  },
];

export function localizedProjects(locale: Locale): readonly Project[] {
  const t = (value: L) => value[locale];
  return source.map((p) => ({
    ...p,
    tag: t(p.tag),
    period: p.period ? t(p.period) : null,
    pitch: t(p.pitch),
    summary: t(p.summary),
    role: p.role ? t(p.role) : null,
    badges: p.badges.map(t),
    highlights: p.highlights.map(t),
    problem: t(p.problem),
    solution: t(p.solution),
    flow: p.flow.map(t),
    decisions: p.decisions.map((d) => ({ technology: d.technology, title: t(d.title), body: t(d.body), watch: t(d.watch) })),
    credit: p.credit ? t(p.credit) : null,
  }));
}
