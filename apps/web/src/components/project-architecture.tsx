"use client";

import { useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/locale";
import styles from "./project-architecture.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Layer = { id: string; role: string; name: string; description: string; responsibility: string };
type Architecture = { client: Layer; api: Layer; services: Layer[]; note: string };

// A logical view of documented components, not a claim about deployment topology.
function architectureFor(slug: string, locale: Locale): Architecture {
  const t = (fr: string, en: string) => locale === "fr" ? fr : en;
  if (slug === "assistant-documentaire-rag-local") return {
    client: { id: "interface", role: t("Interface", "Interface"), name: t("Espace documentaire", "Document workspace"), description: t("La bibliothèque, le contexte sélectionné et la conversation donnent un point d’entrée commun aux documents et aux réponses.", "The library, selected context and conversation provide a shared entry point to documents and answers."), responsibility: t("Entrée : documents et question. Sortie : réponse et références.", "Input: documents and a question. Output: an answer and references.") },
    api: { id: "api", role: t("Orchestration", "Orchestration"), name: "FastAPI", description: t("Le backend sépare ingestion, indexation et recherche. Il relie la demande de l’interface aux étapes de traitement documentaire et de génération.", "The backend separates ingestion, indexing and retrieval. It connects requests from the interface with document processing and generation."), responsibility: t("Responsabilité : coordonner les étapes, sans confondre extraction et génération.", "Responsibility: coordinate stages without conflating extraction and generation.") },
    services: [
      { id: "extraction", role: t("Préparation", "Preparation"), name: t("Extraction · OCR", "Extraction · OCR"), description: t("Les PDF, documents Word et images passent par l’extraction, l’OCR, le nettoyage et le découpage. Les métadonnées permettent de conserver le contexte du document.", "PDFs, Word documents and images undergo extraction, OCR, cleaning and chunking. Metadata preserves document context."), responsibility: t("Sortie : passages de texte et métadonnées exploitables pour l’indexation.", "Output: text passages and metadata ready for indexing.") },
      { id: "retrieval", role: t("Recherche sémantique", "Semantic retrieval"), name: "BGE-M3 · ChromaDB", description: t("BGE-M3 produit les représentations vectorielles. ChromaDB indexe les passages et permet de rechercher le contexte proche de la question.", "BGE-M3 produces vector representations. ChromaDB indexes passages and retrieves context close to the question."), responsibility: t("Sortie : contexte retrouvé, associé à ses références documentaires.", "Output: retrieved context associated with document references.") },
      { id: "generation", role: t("Génération locale", "Local generation"), name: "Ollama · Qwen", description: t("Le modèle reçoit le contexte retrouvé pour formuler une réponse. Le résultat est présenté avec ses références au document et à la page.", "The model receives retrieved context to formulate an answer. The result is presented with document and page references."), responsibility: t("Point de vigilance : les sources facilitent la vérification, elles ne garantissent pas l’exactitude.", "Consideration: sources support verification; they do not guarantee correctness.") },
    ],
    note: t("Vue logique simplifiée : les branches représentent des responsabilités, pas des microservices.", "Simplified logical view: branches are responsibilities, not microservices."),
  };
  if (slug === "reporting-cse") return {
    client: { id: "interface", role: t("Présentation", "Presentation"), name: "Angular", description: t("L’interface rassemble tableaux de bord et filtres dynamiques, avec des vues adaptées aux rôles utilisateurs.", "The interface brings together dashboards and dynamic filters, with views suited to user roles."), responsibility: t("Responsabilité : rendre le périmètre d’analyse lisible et manipulable.", "Responsibility: make the analysis scope readable and adjustable.") },
    api: { id: "api", role: t("API · identité · rôles", "API · identity · roles"), name: "Spring Boot · JWT", description: t("L’API constitue la couche applicative. L’authentification JWT et la gestion des rôles encadrent les fonctionnalités accessibles.", "The API forms the application layer. JWT authentication and role management govern accessible features."), responsibility: t("Point de vigilance : les autorisations doivent être vérifiées côté serveur, pas seulement dans l’interface.", "Consideration: permissions must be checked on the server, not only in the interface.") },
    services: [
      { id: "data", role: t("Données", "Data"), name: "Oracle", description: t("La base relationnelle porte les données utilisées pour le suivi et l’analyse des Comptes des Services de l’État.", "The relational database holds the data used to track and analyse the State Service Accounts."), responsibility: t("Responsabilité : persistance et requêtes d’analyse.", "Responsibility: persistence and analysis queries.") },
      { id: "export", role: t("Livrable", "Deliverable"), name: t("Export Excel", "Excel export"), description: t("L’application exporte un rapport Excel pour prolonger l’analyse hors de l’interface.", "The application exports an Excel report to continue the analysis outside the interface."), responsibility: t("Point de contrôle : cohérence entre les filtres, les données affichées et le rapport exporté.", "Checkpoint: consistency between filters, displayed data and the exported report.") },
    ],
    note: t("Vue logique simplifiée, sans schéma interne ni données réelles.", "Simplified logical view, with no internal schema or real data."),
  };
  if (slug === "skilo") return {
    client: { id: "interface", role: t("Interface web", "Web interface"), name: "Next.js", description: t("La partie web présente l’échange de compétences et les crédits de temps décrits par le projet collaboratif.", "The web application presents the skill exchange and time credits described by the collaborative project."), responsibility: t("Responsabilité : profils, compétences et mise en relation.", "Responsibility: profiles, skills and matching.") },
    api: { id: "api", role: "API", name: "NestJS", description: t("NestJS constitue la partie backend identifiée dans le dépôt du projet.", "NestJS is the backend identified in the project repository."), responsibility: t("Responsabilité : règles métier, crédits de temps et API REST.", "Responsibility: business rules, time credits and REST API.") },
    services: [{ id: "data", role: t("Accès aux données", "Data access"), name: "Prisma · PostgreSQL", description: t("Prisma et PostgreSQL composent la couche d’accès aux données décrite dans le dépôt.", "Prisma and PostgreSQL form the data-access layer described in the repository."), responsibility: t("Responsabilité : modèle de données typé et migrations.", "Responsibility: typed data model and migrations.") }],
    note: t("Vue logique simplifiée.", "Simplified logical view."),
  };
  if (slug === "taskflow") return {
    client: { id: "interface", role: t("Interface · TypeScript", "Interface · TypeScript"), name: "Angular", description: t("L’interface couvre l’assignation, la validation, le filtrage et le suivi de l’avancement des tâches.", "The interface covers task assignment, validation, filtering and progress tracking."), responsibility: t("Périmètre : gestion de tâches en équipe.", "Scope: team task management.") },
    api: { id: "api", role: t("API simulée", "Simulated API"), name: "json-server", description: t("json-server fournit une API REST simulée : l’interface se développe et se teste sans attendre un backend.", "json-server provides a simulated REST API, so the interface can be built and tested without waiting for a backend."), responsibility: t("Choix assumé : prototyper vite les interactions, backend remplaçable ensuite.", "Deliberate choice: prototype interactions fast, swap in a real backend later.") },
    services: [], note: t("Vue logique simplifiée.", "Simplified logical view."),
  };
  return {
    client: { id: "interface", role: t("Interface web", "Web interface"), name: "React", description: t("L’interface rassemble découverte, comparaison, avis, filtres et organisation d’outils IA dans des playlists.", "The interface combines discovery, comparison, reviews, filters and AI tool organisation in playlists."), responsibility: t("Responsabilité : catalogue, filtres, avis et playlists.", "Responsibility: catalogue, filters, reviews and playlists.") },
    api: { id: "api", role: "API", name: "PHP", description: t("Une API PHP complète l’interface React dans le projet d’équipe documenté.", "A PHP API complements the React interface in the documented team project."), responsibility: t("Responsabilité : API, rôles Admin / User / Viewer.", "Responsibility: API, Admin / User / Viewer roles.") },
    services: [{ id: "data", role: t("Données", "Data"), name: "MySQL", description: t("MySQL est la base de données identifiée pour l’application.", "MySQL is the database identified for the application."), responsibility: t("Responsabilité : outils, avis, utilisateurs et playlists.", "Responsibility: tools, reviews, users and playlists.") }],
    note: t("Vue logique simplifiée.", "Simplified logical view."),
  };
}

export function ProjectArchitecture({ slug, locale }: { slug: string; locale: Locale }) {
  const architecture = architectureFor(slug, locale);
  const layers = [architecture.client, architecture.api, ...architecture.services];
  const [selected, setSelected] = useState("api");
  const active = layers.find(layer => layer.id === selected) ?? architecture.api;
  const root = useRef<HTMLDivElement>(null);
  const detailId = useId();
  const fr = locale === "fr";
  const count = architecture.services.length;
  const slots = count === 3 ? [65, 195, 325] : count === 2 ? [110, 280] : [195];

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-architecture-line]", { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 1.1, stagger: .12, ease: "power2.inOut",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    });
    return () => media.revert();
  }, { scope: root });

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-architecture-detail]", { y: 9, opacity: .4 }, { y: 0, opacity: 1, duration: .35, clearProps: "transform,opacity" });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [selected], revertOnUpdate: true });

  function node(layer: Layer, className: string, index?: number) {
    return <button key={layer.id} type="button" className={`${styles.node} ${className}`} data-layer={layer.id} aria-pressed={selected === layer.id} aria-controls={detailId} onClick={() => setSelected(layer.id)} style={index !== undefined ? { gridRow: index + 1 } : undefined}>
      <span>{layer.role}</span><strong>{layer.name}</strong><span className={styles.nodeAction} aria-hidden="true">{selected === layer.id ? "−" : "+"}</span>
    </button>;
  }

  return <div className={styles.architecture} ref={root} data-architecture={slug}>
    <p className={styles.instructions}>{fr ? "Sélectionnez un composant pour comprendre sa responsabilité." : "Select a component to understand its responsibility."}</p>
    <div className={styles.diagram} data-branches={count} role="group" aria-label={fr ? "Composants de l’architecture" : "Architecture components"}>
      <svg className={styles.wires} viewBox="0 0 1000 390" preserveAspectRatio="none" aria-hidden="true">
        <path d={count === 0 ? "M400 195 H600" : "M240 195 H380"} pathLength="1" data-architecture-line />
        {architecture.services.map((layer, index) => <path key={layer.id} d={`M620 195 H700 V${slots[index]} H790`} pathLength="1" data-architecture-line data-active={selected === layer.id} />)}
      </svg>
      {node(architecture.client, styles.client)}
      {node(architecture.api, styles.api)}
      <div className={styles.services}>{architecture.services.map((layer, index) => node(layer, styles.service, index))}</div>
    </div>
    <div id={detailId} className={styles.detail} aria-live="polite" aria-atomic="true">
      <div data-architecture-detail><p>{active.role}</p><h3>{active.name}</h3></div>
      <div data-architecture-detail><p>{active.description}</p><p className={styles.responsibility}>{active.responsibility}</p></div>
    </div>
    <p className={styles.note}>{architecture.note}</p>
  </div>;
}
