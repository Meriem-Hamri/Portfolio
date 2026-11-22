# Portfolio de Meriem Hamri

Portfolio software engineer de Meriem Hamri, en français et en anglais (sélecteur EN/FR), avec mode clair et sombre.

**Direction visuelle** : fond blanc cassé, palette tirée de la photo de Meriem (olive, terracotta, sable), Bodoni Moda pour le nom et DM Sans pour le texte. Mode sombre « serre de nuit » (vert nuit, lin, olive clair).

- **Accueil (one-page)** : « Bonjour, je suis Meriem Hamri. » avec sa photo entourée d'étiquettes de technologies flottantes, puis `/ à propos` (texte + éditeur de code animé à onglets), `/ expérience` (onglets Telepac / TGR), `/ projets` (carrousel des stages + cartes) et contact (email copiable).
- **Études de cas** (`/work/[slug]`) : double lecture Produit / Ingénierie (besoin, réalisations, écrans, parcours ; architecture interactive, choix techniques, améliorations envisagées).
- **Animations** : entrée du titre, apparitions au scroll, étiquettes flottantes, éditeur qui s'écrit, maquettes animées. Tout respecte `prefers-reduced-motion`.

Les maquettes de Skilo, XploreIA, TaskFlow et du reporting sont des illustrations ; le reporting affiche « données fictives ». Seules les captures du RAG sont réelles.

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

Le build utilise `next/font/google` et nécessite un accès à Google Fonts lors de la compilation. Les polices sont ensuite servies par Next.js. En environnement réseau restreint, autoriser ce téléchargement ou prévoir leur hébergement local.

Le script racine lance actuellement uniquement `apps/web`. Lorsque `apps/api` sera implémentée, un orchestrateur unique (Turborepo ou équivalent) sera ajouté pour démarrer le frontend et le backend ensemble.
