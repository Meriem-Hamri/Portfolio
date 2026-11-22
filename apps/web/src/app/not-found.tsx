import Link from "next/link";
import { getLocale, pick } from "@/lib/locale";

export default async function NotFound() {
  const locale = await getLocale();
  return (
    <section className="not-found shell">
      <p className="kicker">{pick(locale, "Erreur 404", "Error 404")}</p>
      <h1 className="title">{pick(locale, "Cette page n’existe pas.", "This page does not exist.")}</h1>
      <p>{pick(locale, "Le lien est peut-être incomplet. Les projets, eux, sont toujours là.", "The link may be incomplete. The projects are still here, though.")}</p>
      <Link href="/#projets" className="link link--accent">{pick(locale, "Voir les projets", "See the work")} <span className="arrow" aria-hidden="true">→</span></Link>
    </section>
  );
}
