"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locale";

export function CopyEmail({ email, locale }: { email: string; locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const fr = locale === "fr";
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }
  return <button type="button" className="copy" data-copied={copied} onClick={copy}>
    <span role="status">{copied ? (fr ? "Adresse copiée" : "Address copied") : (fr ? "Copier l’adresse" : "Copy address")}</span>
  </button>;
}
