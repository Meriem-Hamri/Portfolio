import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import { getLocale, pick } from "@/lib/locale";
export async function generateMetadata(): Promise<Metadata> { const locale = await getLocale(); return { title: "Contact", description: pick(locale,"Contacter Meriem Hamri par e-mail, LinkedIn ou GitHub.","Contact Meriem Hamri via email, LinkedIn or GitHub.") }; }
export default async function ContactPage() {
  const locale = await getLocale();
  return <section className="contact-page"><div className="shell contact-page__grid"><div><p className="eyebrow eyebrow--light">Contact</p><h1>{pick(locale,"Une idée, un projet,","An idea, a project,")}<br /><em>{pick(locale,"une conversation.","a conversation.")}</em></h1><p className="contact-page__intro">{pick(locale,"Écrivez-moi pour échanger autour du développement logiciel, d’un projet ou d’une collaboration.","Get in touch about software development, a project or a collaboration.")}</p></div><div className="contact-links">
    <div className="contact-link-row"><span>01</span><div><p>{pick(locale,"Écrivez-moi","Email me")}</p><ArrowLink href="mailto:meriemhamri78@gmail.com" tone="light">meriemhamri78@gmail.com</ArrowLink></div></div>
    <div className="contact-link-row"><span>02</span><div><p>{pick(locale,"Réseau professionnel","Professional network")}</p><ArrowLink href="https://www.linkedin.com/in/meriem-hamri-b45637278" external tone="light">LinkedIn</ArrowLink></div></div>
    <div className="contact-link-row"><span>03</span><div><p>{pick(locale,"Code et projets publics","Code and public projects")}</p><ArrowLink href="https://github.com/Meriem-Hamri" external tone="light">GitHub</ArrowLink></div></div>
  </div><div className="contact-accent" aria-hidden="true" /></div></section>;
}
