import { cookies } from "next/headers";

export type Locale = "fr" | "en";
export const pick = <T>(locale: Locale, fr: T, en: T): T => locale === "en" ? en : fr;

export async function getLocale(): Promise<Locale> {
  return (await cookies()).get("portfolio-locale")?.value === "en" ? "en" : "fr";
}
