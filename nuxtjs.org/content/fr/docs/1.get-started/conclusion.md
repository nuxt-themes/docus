---
title: Conclusion
description: Félicitations, nous avons maintenant créé notre première application Nuxt.js et nous pouvons maintenant nous considérer comme un Nuxter. Mais il y a tellement plus à apprendre et tellement plus que nous pouvons faire avec Nuxt.js. Voici quelques recommandations.
position: 4
category: get-started
questions:
  - question: Quel est le nom du répertoire dont nous avons besoin pour que Nuxt.js fonctionne ?
    answers:
      - nuxt
      - pages
      - index
    correctAnswer: pages
  - question: Quel est le nom de notre fichier ID de projet ?
    answers:
      - package.vue
      - package.json
      - package.js
    correctAnswer: package.json
  - question: Quelle est la commande que nous devons taper dans le terminal pour lancer notre projet Nuxt.js ?
    answers:
      - npm dev
      - npm run dev
      - nuxt dev
    correctAnswer: npm run dev
  - question: Quelle est l'adresse dans le navigateur où nous pouvons voir notre page en mode développement ?
    answers:
      - http://localhost:3000/
      - http://localhost:3000/project-name:3000
      - http://localhost:3000/nuxt:3000/
    correctAnswer: http://localhost:3000/
  - question: Où mettons-nous notre configuration ?
    answers:
      - nuxt.config.json
      - config.js
      - nuxt.config.js
    correctAnswer: nuxt.config.js
  - question: Quel répertoire ne convient pas aux fichiers `.vue` ?
    answers:
      - pages
      - static
      - components
    correctAnswer: static
  - question: Dans quel répertoire mettons-nous les styles ?
    answers:
      - styles
      - components
      - assets
    correctAnswer: assets
  - question: Dans quel répertoire mettons-nous un fichier robots.txt ou un favicon ?
    answers:
      - assets
      - components
      - static
    correctAnswer: static
  - question: Quel composant utilisons-nous pour naviguer entre les pages ?
    answers:
      - '<Nuxt>'
      - '<RouterLink>'
      - '<NuxtLink>'
    correctAnswer: '<NuxtLink>'
  - question: "`<NuxtLink>` est utilisé pour les liens internes appartenant à l'application Nuxt.js ?"
    answers:
      - True
      - False
    correctAnswer: True
---

Félicitations, nous avons maintenant créé notre première application Nuxt.js et nous pouvons maintenant nous considérer comme un Nuxter. Mais il y a tellement plus à apprendre et tellement plus que nous pouvons faire avec Nuxt.js. Voici quelques recommandations.

<base-alert type="next">

Consulter le [guide des concepts](../concepts/views)

</base-alert>

<base-alert type="next">

Travailler avec [asyncData](/docs/2.x/features/data-fetching#async-data)

</base-alert>

<base-alert type="next">

Choisir entre les différents [modes de rendu](/docs/2.x/features/rendering-modes)

</base-alert>

<base-alert type="star">

Vous aimez Nuxt.js jusqu'à présent ? N'oubliez pas de [mettre en favoris notre projet](https://github.com/nuxt/nuxt.js) sur GitHub

</base-alert>

<quiz :questions="questions"></quiz>
