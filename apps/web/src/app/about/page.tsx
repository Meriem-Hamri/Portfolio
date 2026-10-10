import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import { getLocale, pick } from "@/lib/locale";
export async function generateMetadata(): Promise<Metadata> { const locale = await getLocale(); return { title: pick(locale,"À propos","About"), description: pick(locale,"Parcours et pratique de Meriem Hamri.","Meriem Hamri's background and approach.") }; }
export default async function AboutPage() {
  const locale = await getLocale();
  return <section className="about-page"><div className="shell">
    <header className="page-intro page-intro--about"><p className="eyebrow">{pick(locale,"À propos","About")}</p><h1>{pick(locale,"Concevoir le système.","Design the system.")}<br /><em>{pick(locale,"Soigner son usage.","Care for its use.")}</em></h1><p>{pick(locale,"Je suis Meriem Hamri, étudiante en génie logiciel à la FSTM. Je relie architecture, traitement de données et interfaces lisibles.","I'm Meriem Hamri, a software engineering student at FSTM. My work connects architecture, data processing and clear interfaces.")}</p></header>
    <div className="about-statement"><div className="about-statement__color" aria-hidden="true" /><div><p>{pick(locale,"Chez Telepac Technology, j’ai travaillé sur un assistant documentaire local. À la Trésorerie Générale du Royaume, j’ai développé une application de reporting financier.","At Telepac Technology, I worked on a local document assistant. At the General Treasury of the Kingdom, I developed a financial reporting application.")}</p><p>{pick(locale,"Ces deux stages m’ont amenée à travailler de l’interface jusqu’aux données : extraction documentaire, recherche, API, rôles utilisateurs et tableaux de bord.","These two internships took me from interfaces to data: document extraction, retrieval, APIs, user roles and dashboards.")}</p></div></div>
    <section className="practice" aria-labelledby="practice-title"><div><p className="eyebrow">{pick(locale,"Parcours","Background")}</p><h2 id="practice-title">{pick(locale,"Apprendre en construisant.","Learning by building.")}</h2></div><ol>
      <li><span>01</span><div><h3>{pick(locale,"Cycle ingénieur ILISI","Software engineering degree")}</h3><p>FSTM · {pick(locale,"depuis 2025","since 2025")}</p></div></li>
      <li><span>02</span><div><h3>{pick(locale,"Licence Informatique, Réseaux et Multimédia","Bachelor's in Computer Science, Networks and Multimedia")}</h3><p>FSTM · 2024–2025</p></div></li>
      <li><span>03</span><div><h3>{pick(locale,"DEUST Mathématiques, Informatique et Physique","DEUST in Mathematics, Computer Science and Physics")}</h3><p>FSTM · 2022–2024</p></div></li>
    </ol></section>
    <div className="about-next"><p>{pick(locale,"Le détail de mon travail se lit dans les études de cas des deux stages.","Explore the two internship case studies for a closer look at my work.")}</p><ArrowLink href="/#projets">{pick(locale,"Explorer les projets","Explore the work")}</ArrowLink></div>
  </div></section>;
}
