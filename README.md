# Portfolio de Meriem Hamri

Portfolio software engineer de Meriem Hamri, en français et en anglais (sélecteur EN/FR), avec mode clair et sombre.

**Direction visuelle « clair et audacieux »** : fond crème, typographie Bricolage Grotesque très grande, une couleur forte par projet (bleu, orange, citron, rose, lilas).

- **Accueil (one-page)** : hero avec accroche claire et chiffres clés, bandeau de technologies défilant, projets en cartes colorées qui s'empilent au défilement, à propos (parcours + compétences), contact (email copiable, LinkedIn, GitHub).
- **Études de cas** (`/work/[slug]`) : problème, ce que j'ai construit, captures réelles (RAG), étapes, architecture interactive, décisions techniques, lien GitHub et projet suivant.
- **Animations** : entrée du hero en CSS, apparitions au scroll, mini-interfaces animées par projet, empilement des cartes avec GSAP ScrollTrigger. Tout est désactivé si `prefers-reduced-motion` est activé ; aucun défilement n'est détourné.

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
