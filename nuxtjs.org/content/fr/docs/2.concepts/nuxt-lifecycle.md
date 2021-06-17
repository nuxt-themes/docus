---
title: Cycle de vie de Nuxt
description: Peu importe l'outil que nous utilisons, nous serons davantage en confiance lorsque nous serons capable de comprendre comment il marche dans les détails. Il en est de même pour Nuxt.js.
position: 5
category: concepts
img: /docs/2.x/nuxt-lifecycle.svg
imgAlt: understanding-nuxt-2-12-lifecycle-hooks
questions:
  - question: Quand commence le cycle de Nuxt.js ?
    answers:
      - Lorsque la réponse va être envoyée au client
      - Après la phase de build
      - Lors de l'exécution de nuxt dev
    correctAnswer: Après la phase de build
  - question: De quels facteurs principaux dépend le contenu du cycle de vie de Nuxt ?
    answers:
      - L'heure et la date à laquelle nous avons lancé le serveur
      - Si le rendu côté serveur est activé et si oui, quel est le type utilisé.
      - Sur quel type d'OS est-ce que l'application est en train de s'exécuter.
    correctAnswer: Si le rendu côté serveur est activé et si oui, quel est le type utilisé.
  - question: Quand est appelé nuxtServerInit ?
    answers:
      - Au rendu côté serveur et client
      - Lorsque l'hydratation par Vue.js s'est achevée
      - Uniquement du côté serveur
    correctAnswer: Uniquement du côté serveur
  - question: Quels sont les trois types de middleware ?
    answers:
      - Global, Layout, Route
      - Global, Layout, Page
      - Global, Group, Route
    correctAnswer: Global, Layout, Route
  - question: Quelle étape ne peut avoir lieu que du côté client ?
    answers:
      - Hydratation de Vue.js
      - Exécution du middleware
      - Appeler la fonction fetch
    correctAnswer: Hydratation de Vue.js
  - question: Quelle étape n'a jamais lieu du côté client ?
    answers:
      - Exécuter asyncData
      - Exécuter serverMiddleware
      - Exécuter fetch
    correctAnswer: Exécuter serverMiddleware
  - question: Quelles méthodes de Vue sont appelées sur le serveur et sur le client ?
    answers:
      - mounted et beforeMount
      - beforeDestroy et destroyed
      - created et beforeCreate
    correctAnswer: created et beforeCreate
  - question: Quelle étape n'a pas lieu après avoir navigué avec un <NuxtLink> ?
    answers:
      - Appeler fetch
      - Exécuter des plugins clients de Nuxt.js
      - Appeler beforeCreate
    correctAnswer: Exécuter des plugins clients de Nuxt.js
  - question: Quelle est la différence entre asyncData et fetch après avoir navigué via un <NuxtLink> ?
    answers:
      - asyncData est plus rapide que fetch
      - asyncData est appelé après fetch
      - asyncData est bloquant alors que fetch ne l'est pas
    correctAnswer: asyncData est bloquant alors que fetch ne l'est pas
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Peu importe l'outil que nous utilisons, nous serons davantage en confiance lorsque nous serons capable de comprendre comment il marche dans les détails. Il en est de même pour Nuxt.js. Le but de ce chapitre est de nous donner une vue d'ensemble des différentes parties du framework, leur ordre d'exécution ainsi que la façon dont ils intéragissent entre eux.

Le cycle de vie de Nuxt.js décrit les différentes étapes qui ont lieu après la phase de build, une fois que notre application a été bundlée, chunkée et minifiée. Ce qu'il se passe après cette phase dépend de si nous avons activé le rendu côté serveur ou pas. Si c'est le cas, il faut ensuite regarder le type de rendu serveur que nous avons choisi:

Rendu dynamique côté serveur (SSR) (`nuxt start`)

ou Génération statique de site (SSG) (`nuxt generate`).

## Cycle de vie

### Serveur

Pour le SSR, les étapes suivantes seront exécutées pour chaque requête sur notre app

- Le serveur démarre (`nuxt start`)

Lorsque nous utilisons la génération statique de notre site, les étapes qui ont lieu sur le serveur ne seront exécutées que lors de la phase de build et une fois pour chaque page générée.

- Le processus de génération commence (`nuxt generate`)

- Hooks Nuxt
- serverMiddleware
- Les plugins de Nuxt côté serveur
  - en suivant l'ordre défini dans nuxt.config.js
- nuxtServerInit
  - action Vuex qui est appelée seulement côté serveur pour pré-remplir le store
  - le premier argument dans le **context de Vuex**, le second argument dans le **context de Nuxt.js**
    - on dispatch les autres actions d'ici → c'est seulement le "point d'entrée" pour des actions ultérieures du côté serveur
  - peut seulement être défini dans le `store/index.js`
- Middleware
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData
- beforeCreate (cycle de vie de Vue)
- created (cycle de vie de Vue)
- Le nouveau fetch (du haut vers le bas, en parallèle si ce sont des voisins)
- Sérialisation du state (hook `render:routeContext` de Nuxt.js)

- le rendu HTML commence (hook `render:route` de Nuxt.js)

- `render:routeDone` hook quand le HTML a été envoyé au navigateur

- `generate:before` hook de Nuxt.js
- les fichiers HTML sont générés
  - **génération intégralement statique**
    - ex. les payloads statiques sont extraits
  - `generate:page` (HTML éditable)
  - `generate:routeCreated` (Route générée)
- `generate:done` quand tous les fichiers HTML ont été générés

### Client

Cette partie du cycle est entièrement exécutée dans le navigateur, peu importe le mode que nous avons choisi pour Nuxt.js.

- Reçoit le HTML
- Charge les ressources (ex. Javascript)
- Hydratation de Vue
- Middleware
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (bloquant)
- plugins clients de Nuxt.js
  - en suivant l'ordre défini dans nuxt.config.js
- beforeCreate (méthode du cycle de vie de Vue)
- created (méthode du cycle de vie de Vue)
- Le nouveau fetch (du haut vers le bas, en parallèle si ce sont des voisins)
- beforeMount (méthode du cycle de vie de Vue)
- mounted (méthode du cycle de vie de Vue)

### Naviguer en utilisant le composant NuxtLink

De la même façon que pour la partie _client_, tout se passe dans le navigateur mais seulement lors d'une navigation avec `<NuxtLink>`. De plus, aucun contenu n'est affiché sur la page tant qu'il reste des tâches _bloquantes_.

<base-alert type="info">

Se référer au chapitre sur les composants pour plus d'informations sur [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

</base-alert>

- middleware (bloquant)
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (bloquant)
- asyncData (bloquant) [ou chargement entièrement statique du payload]
- beforeCreate & created (méthode du cycle de vie de Vue)
- fetch (non-bloquant)
- beforeMount & mounted

### Ensuite ?

<base-alert type="next">

Plus d'informations dans le [recueil sur les features](/docs/2.x/features/rendering-modes).

</base-alert>

<quiz :questions="questions"></quiz>
