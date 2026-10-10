# Portfolio de Meriem Hamri

Première version publique du portfolio software engineer de Meriem Hamri.

La page d'accueil présente les deux stages (Telepac Technology et TGR), suivis de Skilo, TaskFlow et XploreIA. Les pages publiques existent en français et en anglais ; le sélecteur EN/FR conserve le choix dans le navigateur. Le contrôle clair/nuit conserve également sa préférence.

Les stages partagent un espace d’exploration à onglets : contexte, contribution, technologies et preuve technique. Le RAG expose un extrait du dépôt public ; le reporting propose une architecture interactive explicitement illustrative. GSAP et ScrollTrigger animent les entrées, les changements de stage et les reflets au scroll, sans lecture automatique ni blocage du défilement. Le mouvement réduit est respecté.

## Structure

- `apps/web` : application publique Next.js, React, TypeScript et Tailwind CSS.
- `apps/api` : emplacement réservé au futur backend NestJS.

Les données de projet sont locales et typées dans `apps/web/src/data`. Leur accès est centralisé dans `apps/web/src/lib/projects.ts` afin de pouvoir brancher l'API plus tard.

## Prérequis

- Node.js 20.9 ou plus récent
- npm 11

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

## Vérifications

```bash
npm run lint
npm run typecheck
npm run build
```

Pour vérifier les scènes animées dans un navigateur Edge isolé, lancer d’abord le serveur local, puis :

```bash
node scripts/verify-project-motion.mjs
```

Ce test vérifie les onglets au clavier, l’inspection du code, les couches de l’architecture, le mouvement réduit et les débordements à 1440, 390 et 320 px. Il capture aussi les versions FR/EN et le thème sombre dans `.npm-cache/visual-qa`, et signale les erreurs JavaScript ou d’hydratation. Il utilise un profil temporaire indépendant des onglets personnels. Sous Windows, Edge est détecté à son emplacement standard ; `EDGE_PATH` permet d’indiquer un autre exécutable Chromium, et `PORTFOLIO_QA_URL` une autre URL locale. Node.js 22 ou plus récent est nécessaire pour ce script de test.

Le script racine lance actuellement uniquement `apps/web`. Lorsque `apps/api` sera implémentée, un orchestrateur unique (Turborepo ou équivalent) sera ajouté pour démarrer le frontend et le backend ensemble.
