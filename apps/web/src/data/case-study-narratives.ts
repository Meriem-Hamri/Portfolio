import type { Locale } from "@/lib/locale";
import type { Project } from "@/types/project";

export type EngineeringDecision = { technology: string; intent: string; rationale: string; consideration: string };
export type CaseStudyNarrative = {
  headline: string; challengeTitle: string; challenge: string; objective: string;
  solutionTitle: string; solution: string; decisions: readonly EngineeringDecision[];
  delivery: string; evidence: string; limits: readonly string[];
};

// Editorial reasoning based on the documented implementation, not measured results.
export function getCaseStudyNarrative(project: Project, locale: Locale): CaseStudyNarrative {
  const t = (fr: string, en: string) => locale === "fr" ? fr : en;
  if (project.slug === "assistant-documentaire-rag-local") return {
    headline: t("Une réponse utile. Une source que l’on peut vérifier.", "A useful answer. A source you can verify."),
    challengeTitle: t("L’information existe. Encore faut-il la retrouver.", "The information exists. Finding it is the challenge."),
    challenge: t("Un PDF, un document Word, une page numérisée : l’information est dispersée entre des formats qui ne se lisent pas de la même manière. Une réponse seule ne suffit pas ; il faut aussi pouvoir retrouver le passage qui la justifie.", "A PDF, a Word document, a scanned page: information is spread across formats that cannot all be read in the same way. An answer alone is not enough; readers also need to find the passage supporting it."),
    objective: t("Passer d’une collection de fichiers à une recherche en langage naturel, avec le document et la page comme points de vérification.", "Turn a collection of files into natural-language search, with the document and page as verification points."),
    solutionTitle: t("Relier la question au bon passage, puis à sa source.", "Connect the question to a relevant passage — and its source."),
    solution: t("J’ai développé une chaîne RAG locale : préparer les documents, indexer leurs passages, retrouver le contexte pertinent, puis le transmettre à Qwen via Ollama. L’interface réunit la question, la réponse et les références ; l’utilisateur garde un chemin vers le document d’origine.", "I developed a local RAG pipeline: prepare documents, index their passages, retrieve relevant context, then pass it to Qwen through Ollama. The interface brings together the question, answer and references, keeping a path back to the original document."),
    decisions: [
      { technology: "FastAPI · extraction · OCR", intent: t("Préparer des entrées hétérogènes.", "Prepare heterogeneous inputs."), rationale: t("L’extraction, l’OCR, le nettoyage et le découpage donnent aux différents formats un parcours de traitement commun. FastAPI sépare l’ingestion, l’indexation et la recherche : chaque étape a une responsabilité identifiable.", "Extraction, OCR, cleaning and chunking give different formats a common processing path. FastAPI separates ingestion, indexing and retrieval, giving each stage an identifiable responsibility."), consideration: t("La qualité d’un scan et le découpage des passages influencent le contexte disponible. Ces points restent à évaluer sur un corpus de test documenté.", "Scan quality and passage boundaries influence the available context. These points still need evaluation on a documented test corpus.") },
      { technology: "BGE-M3 · ChromaDB", intent: t("Rechercher par proximité de sens.", "Retrieve by semantic similarity."), rationale: t("BGE-M3 représente les passages sous forme de vecteurs ; ChromaDB permet de rechercher ceux qui sont proches de la question. Les métadonnées conservent le lien entre le passage indexé et son document.", "BGE-M3 represents passages as vectors; ChromaDB retrieves those close to the question. Metadata preserves the connection between an indexed passage and its document."), consideration: t("Une proximité vectorielle ne prouve pas la pertinence. Il faut vérifier les passages récupérés avant de conclure sur la qualité des réponses.", "Vector similarity does not prove relevance. Retrieved passages must be checked before drawing conclusions about answer quality.") },
      { technology: "Ollama · Qwen · sources", intent: t("Générer localement, garder la trace.", "Generate locally, preserve the trail."), rationale: t("Qwen reçoit le contexte retrouvé via Ollama. La réponse est accompagnée de références au document et à la page : le résultat est consultable avec ses éléments de vérification.", "Qwen receives the retrieved context through Ollama. Answers include document and page references, so the result can be read alongside its verification points."), consideration: t("Une réponse sourcée peut encore être incorrecte. La latence, les ressources nécessaires et la fidélité au contexte ne sont pas quantifiées ici.", "A sourced answer can still be incorrect. Latency, resource requirements and faithfulness to context are not quantified here.") },
    ],
    delivery: project.sections[1]?.body ?? project.description,
    evidence: t("Le dépôt public documente l’implémentation. Les captures fournies montrent la bibliothèque, le choix du contexte documentaire et une réponse accompagnée de sa source.", "The public repository documents the implementation. Supplied screenshots show the library, document-context selection and an answer accompanied by its source."),
    limits: [t("Documenter un jeu de questions avec des réponses attendues et leurs passages sources.", "Document a question set with expected answers and their source passages."), t("Mesurer la qualité de récupération, la fidélité des réponses et les temps de traitement avant d’annoncer des résultats.", "Measure retrieval quality, answer faithfulness and processing times before reporting results.")],
  };
  if (project.slug === "reporting-cse") return {
    headline: t("Rendre les comptes lisibles. Garder l’accès maîtrisé.", "Make accounts readable. Keep access controlled."),
    challengeTitle: t("La donnée financière a besoin de contexte.", "Financial data needs context."),
    challenge: t("Le suivi des Comptes des Services de l’État nécessite des vues adaptées aux profils utilisateurs. Il faut pouvoir parcourir les données, resserrer l’analyse avec des filtres et produire un rapport exploitable, tout en encadrant les accès.", "Tracking State Service Accounts requires views suited to user roles. Users need to browse the data, narrow their analysis with filters and produce a usable report, while access remains controlled."),
    objective: t("Construire un parcours cohérent : s’authentifier, accéder aux vues de son rôle, filtrer, analyser et exporter.", "Build a coherent journey: sign in, access role-specific views, filter, analyse and export."),
    solutionTitle: t("Une chaîne continue, de l’accès au rapport.", "One continuous journey, from access to report."),
    solution: t("J’ai conçu et développé une application full-stack avec Angular, Spring Boot et Oracle. Les tableaux de bord et filtres dynamiques portent la lecture des données ; l’authentification JWT et les rôles encadrent les fonctionnalités accessibles. L’export Excel prolonge le travail au-delà de l’interface.", "I designed and developed a full-stack application with Angular, Spring Boot and Oracle. Dashboards and dynamic filters support data exploration; JWT authentication and roles control accessible features. Excel export carries the work beyond the interface."),
    decisions: [
      { technology: "Angular", intent: t("Faire des filtres une porte d’entrée.", "Make filters the starting point."), rationale: t("L’interface réunit filtres dynamiques et tableaux de bord. Le besoin de l’utilisateur est traduit en un parcours de consultation : sélectionner un périmètre, puis lire les données correspondantes.", "The interface combines dynamic filters and dashboards. The user’s need becomes a browsing journey: select a scope, then read the corresponding data."), consideration: t("La lisibilité des états vides, des filtres actifs et des erreurs doit faire partie de la validation fonctionnelle.", "Empty states, active filters and error readability should be part of functional validation.") },
      { technology: "Spring Boot · JWT", intent: t("Distinguer identité et autorisation.", "Separate identity from authorisation."), rationale: t("Spring Boot porte l’API. L’authentification JWT identifie une session ; les rôles déterminent les fonctionnalités autorisées. Ces responsabilités sont distinctes de l’affichage des données dans Angular.", "Spring Boot provides the API. JWT authentication identifies a session; roles determine allowed features. These responsibilities are separate from displaying data in Angular."), consideration: t("La présence de JWT n’est pas une preuve d’audit de sécurité. Les contrôles d’accès restent à vérifier, rôle par rôle, côté serveur.", "Using JWT is not evidence of a security audit. Access controls still need server-side verification for each role.") },
      { technology: "Oracle · Excel", intent: t("Relier l’analyse à un livrable.", "Connect analysis to a deliverable."), rationale: t("Oracle porte les données de l’application et l’export Excel permet de produire des rapports. L’interface sert ainsi à explorer l’information, mais aussi à la transmettre dans un format de travail connu.", "Oracle holds the application data, while Excel export produces reports. The interface supports both exploring information and sharing it in a familiar working format."), consideration: t("La cohérence entre filtres appliqués, données affichées et contenu exporté constitue un point de contrôle à documenter.", "Consistency between active filters, displayed data and exported content is a checkpoint that needs documentation.") },
    ],
    delivery: project.sections[1]?.body ?? project.description,
    evidence: t("Le périmètre est décrit dans mon CV. La démonstration du portfolio utilise un jeu de données fictif ; elle ne représente ni des comptes réels ni une capture du système interne.", "The scope is described in my CV. The portfolio demo uses fictional data; it represents neither real accounts nor a screenshot of the internal system."),
    limits: [t("Aucun chiffre de performance ou d’impact métier n’est publié sans mesure vérifiable.", "No performance or business-impact figures are published without verifiable measurements."), t("Les écrans et données internes nécessitent une autorisation avant toute publication.", "Internal screens and data require authorisation before publication.")],
  };
  return {
    headline: project.summary,
    challengeTitle: t("Un usage à rendre plus simple.", "An everyday task to make simpler."),
    challenge: project.sections[0]?.body ?? project.summary,
    objective: project.summary,
    solutionTitle: t("Du concept à une application structurée.", "From a concept to a structured application."),
    solution: project.description,
    decisions: [],
    delivery: project.role ?? t("Mon périmètre individuel reste à préciser dans cette étude de cas.", "My individual scope still needs to be specified in this case study."),
    evidence: t("Le dépôt public permet de consulter l’implémentation. Les résultats, les captures et la répartition détaillée des contributions restent à documenter.", "The public repository provides access to the implementation. Results, screenshots and the detailed breakdown of contributions still need documentation."),
    limits: project.missingInformation,
  };
}
