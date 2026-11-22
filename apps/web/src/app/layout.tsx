import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import { RevealObserver } from "@/components/reveal-observer";
import { getLocale } from "@/lib/locale";
import "./globals.css";
import "./home.css";
import "./visuals.css";
import "./case.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Meriem Hamri · Software engineer", template: "%s · Meriem Hamri" },
  description: "Meriem Hamri — ingénieure logiciel : IA locale (RAG) et applications full-stack.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const theme = (await cookies()).get("portfolio-theme")?.value === "dark" ? "dark" : "light";
  return (
    <html lang={locale} data-theme={theme} className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll reveals only when JavaScript runs, so content is never hidden without it. */}
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
