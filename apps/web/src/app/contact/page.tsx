import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter Meriem Hamri et consulter son profil GitHub.",
};

export default function ContactPage() {
  return (
    <section className="contact-page">
      <div className="shell contact-page__grid">
        <div>
          <p className="eyebrow eyebrow--light">Contact</p>
          <h1>Une idée, un projet,<br /><em>une conversation.</em></h1>
          <p className="contact-page__intro">Le profil GitHub est disponible dès maintenant. L’adresse e-mail professionnelle et le profil LinkedIn seront ajoutés dès qu’ils auront été confirmés.</p>
        </div>
        <div className="contact-links">
          <div className="contact-link-row">
            <span>01</span>
            <div><p>Code et projets publics</p><ArrowLink href="https://github.com/Meriem-Hamri" external tone="light">GitHub</ArrowLink></div>
          </div>
          <div className="contact-link-row contact-link-row--pending">
            <span>02</span>
            <div><p>E-mail</p><strong>Adresse à confirmer</strong></div>
          </div>
          <div className="contact-link-row contact-link-row--pending">
            <span>03</span>
            <div><p>Réseau professionnel</p><strong>Lien LinkedIn à confirmer</strong></div>
          </div>
        </div>
        <div className="contact-accent" aria-hidden="true" />
      </div>
    </section>
  );
}
