import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";

export const metadata: Metadata = {
  title: "À propos",
  description: "Démarche de Meriem Hamri, étudiante en génie logiciel.",
};

export default function AboutPage() {
  return (
    <section className="about-page">
      <div className="shell">
        <header className="page-intro page-intro--about">
          <p className="eyebrow">À propos</p>
          <h1>Concevoir le système.<br /><em>Soigner son usage.</em></h1>
          <p>Je suis Meriem Hamri, étudiante en génie logiciel. Mon travail relie architecture, traitement de données et interfaces lisibles.</p>
        </header>

        <div className="about-statement">
          <div className="about-statement__color" aria-hidden="true" />
          <div>
            <p>Dans l’assistant documentaire public, cette approche prend la forme d’une chaîne complète : ingestion de fichiers, traitement asynchrone, recherche vectorielle, génération locale et restitution des sources.</p>
            <p>Ce portfolio est aussi un espace de documentation. Il montre ce qui existe, distingue les éléments à vérifier et laissera une place croissante aux décisions, contraintes et apprentissages derrière chaque projet.</p>
          </div>
        </div>

        <section className="practice" aria-labelledby="practice-title">
          <div>
            <p className="eyebrow">Terrains de travail</p>
            <h2 id="practice-title">Des compétences rendues concrètes par les projets.</h2>
          </div>
          <ol>
            <li><span>01</span><div><h3>Applications full-stack</h3><p>Découper les responsabilités entre interface, API, persistance et traitements asynchrones.</p></div></li>
            <li><span>02</span><div><h3>Données et IA locale</h3><p>Extraire, structurer, retrouver et citer l’information au sein d’un pipeline RAG.</p></div></li>
            <li><span>03</span><div><h3>Interfaces utiles</h3><p>Présenter des systèmes complexes avec une hiérarchie claire et des interactions accessibles.</p></div></li>
          </ol>
        </section>

        <div className="about-next">
          <p>La biographie détaillée, le parcours et les expériences datées seront ajoutés après validation des informations.</p>
          <ArrowLink href="/work">Voir les projets</ArrowLink>
        </div>
      </div>
    </section>
  );
}
