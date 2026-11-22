import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import { RevealObserver } from "@/components/reveal-observer";
import { getLocale } from "@/lib/locale";
import "./globals.css";
import "./home.css";
import "./visuals.css";
import "./case.css";

// Brief: Bodoni Moda for the name and a few titles, DM Sans for everything else.
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap", style: ["normal", "italic"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Meriem Hamri · Software engineer", template: "%s · Meriem Hamri" },
  description: "Meriem Hamri, software engineer : applications web full-stack et outils d’IA locale.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const theme = (await cookies()).get("portfolio-theme")?.value === "dark" ? "dark" : "light";
  return (
    <html lang={locale} data-theme={theme} className={`${bodoni.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Scroll reveals only apply when JavaScript runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#contenu">{locale === "fr" ? "Aller au contenu" : "Skip to content"}</a>
        <SiteHeader locale={locale} theme={theme} />
        <main id="contenu">{children}</main>
        <RevealObserver />
      </body>
    </html>
  );
}
