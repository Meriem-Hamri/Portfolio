import type { Locale } from "@/lib/locale";

// Deliberately fictional content for the portfolio walkthrough, never internship data.
export const assistantScenario: Record<Locale, { steps: string[]; question: string; answer: string; excerpt: string; documents: string[] }> = {
  fr: {
    steps: ["Les documents", "La question", "La réponse", "La source"],
    question: "Comment préparer une revue de projet ?",
    answer: "Préparez une synthèse des avancées, identifiez les points bloquants et listez les décisions à prendre. Partagez ces éléments avec l’équipe avant la revue.",
    excerpt: "Avant chaque revue, le responsable prépare une synthèse des avancées, les points bloquants et les décisions attendues. Ces éléments sont partagés en amont avec l’équipe.",
    documents: ["guide-equipe.pdf", "procedure-projet.docx"],
  },
  en: {
    steps: ["Documents", "Question", "Answer", "Source"],
    question: "How do I prepare a project review?",
    answer: "Prepare a summary of progress, identify blockers and list the decisions to make. Share these items with the team before the review.",
    excerpt: "Before each review, the lead prepares a progress summary, blockers and expected decisions. These items are shared with the team in advance.",
    documents: ["team-guide.pdf", "project-procedure.docx"],
  },
};

export type DemoReportRow = { id: string; category: "digital" | "training"; budget: number; committed: number };
export const demoReportRows: readonly DemoReportRow[] = [
  { id: "Programme Alpha", category: "digital", budget: 80000, committed: 52000 },
  { id: "Programme Beta", category: "training", budget: 45000, committed: 18000 },
  { id: "Programme Gamma", category: "digital", budget: 60000, committed: 42000 },
];
