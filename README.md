# Portfolio de Meriem Hamri

Première version publique du portfolio software engineer de Meriem Hamri.

La page d'accueil présente les deux stages (Telepac Technology et TGR), suivis de Skilo, TaskFlow et XploreIA. Les pages publiques existent en français et en anglais ; le sélecteur EN/FR conserve le choix dans le navigateur. Le contrôle clair/nuit conserve également sa préférence.

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

Le script racine lance actuellement uniquement `apps/web`. Lorsque `apps/api` sera implémentée, un orchestrateur unique (Turborepo ou équivalent) sera ajouté pour démarrer le frontend et le backend ensemble.
