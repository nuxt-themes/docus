---
title: middleware
description: Le répertoire `middleware` contient les middlewares de l'application. Un middleware nous permet de définir des fonctions personnalisées qui peuvent s'exécuter avant de render une page ou un groupe de pages (layout).
position: 8
category: directory-structure
csb_link_anonymous: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_anonymous?fontsize=14&hidenavigation=1&theme=dark
csb_link_named: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_named?fontsize=14&hidenavigation=1&theme=dark
csb_link_router: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_router?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Un middleware nous permet de définir une fonction qui va s'exécuter
    answers:
      - avant de render une page
      - pendant le render d'une page
      - après le render d'une page
    correctAnswer: avant de render une page
  - question: Dans quel répertoire mettons-nous les middlewares partagés ?
    answers:
      - middleware
      - shared-middleware
      - shared
    correctAnswer: middleware
  - question: Quel est le premier argument que reçoit un middleware ?
    answers:
      - req
      - res
      - context
    correctAnswer: context
  - question: En mode universel, quand le middleware est-il appelé ?
    answers:
      - côté serveur à la première requête puis côté serveur lors de la navigation
      - côté client à la première requête puis côté client lors de la navigation
      - côté serveur à la première requête puis côté client lors de la navigation
    correctAnswer: côté serveur à la première requête puis côté client lors de la navigation
  - question: En mode SPA, quand le middleware est-il appelé ?
    answers:
      - côté serveur à la première requête puis côté serveur lors de la navigation
      - côté client à la première requête puis côté client lors de la navigation
      - côté serveur à la première requête puis côté client lors de la navigation
    correctAnswer: côté client à la première requête puis côté client lors de la navigation
  - question: Dans quel ordre est exécuté le middleware ?
    answers:
      - les pages qui match ⇒  les layouts qui match ⇒ nuxt.config.js
      - nuxt.config.js ⇒ les layouts qui match ⇒ les pages qui match
      - les layouts qui match ⇒ les pages qui match ⇒ nuxt.config.js
    correctAnswer: nuxt.config.js ⇒ les layouts qui match ⇒ les pages qui match
  - question: Quelle propriété utilise-t-on pour ajouter notre middleware à chacune de nos routes ?
    answers:
      - middleware.router
      - router.middleware
      - routes.middleware
    correctAnswer: router.middleware
  - question: Peut-on ajouter plusieurs middlewares à une page spécifique ou à un layout ?
    answers:
      - true
      - false
    correctAnswer: true
  - question: Comment ajoute-t-on un middleware nommé `middleware/authenticated.js` à notre page ?
    answers:
      - 'middleware: authenticated'
      - 'middleware: true'
      - "middleware: 'authenticated'"
    correctAnswer: "middleware: 'authenticated'"
  - question: Comment utilise-t-on un middleware anonyme pour une page bien spécifique ?
    answers:
      - créer un middleware nommé et le sauvegarder dans le répertoire des middlewares
      - créer une fonction `middleware` dans le composant page
      - ajouter un fichier _.vue au répertoire des middlewares
    correctAnswer: créer une fonction `middleware` dans le composant page
---

Le répertoire `middleware` contient les middlewares de l'application. Un middleware nous permet de définir des fonctions personnalisées qui peuvent s'exécuter avant de render une page ou un groupe de pages (layout).

Les middlewares partagés devraient être placés dans le répertoire `middleware/`. Le nom du fichiers sera aussi le nom du middleware (un fichier `middleware/auth.js` sera appelé avec middleware `auth`). On peut aussi utiliser des middlewares spécifiques à des pages en utilisant directement une fonction, voir [middlewares anonymes](/docs/2.x/components-glossary/pages-middleware#anonymous-middleware).

Un middleware reçoit le [context](/docs/2.x/internals-glossary/context) en tant que premier argument.

```js{}[middleware/user-agent.js]
export default function (context) {
  // Ajouter la propriété userAgent au contexte
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

Dans le mode universel, les middlewares seront appelés une fois côté serveur (à la première requête à l'application Nuxt.js, ex: lorsque l'on accède directement à l'application ou lors du rafraîchissement de la page) et du côté client lors de la navigation sur des routes supplémentaires. En mode SPA, les middlewares seront appelés côté client dans les deux situations.

Les middlewares seront appelés en série dans cet ordre:

1. `nuxt.config.js` (en suivant l'ordre définit dans le fichier)
2. Les layouts qui match
3. Les pages qui match

## Le middleware du routeur

Un middleware peut être asynchrone. Pour cela, il faut renvoyer une `Promesse` ou utiliser `async`/`await`.

```js{}[middleware/stats.js]
import http from 'http'

export default function ({ route }) {
  return http.post('http://mes-stats-api.com', {
    url: route.fullPath
  })
}
```

Ensuite, dans le fichier `nuxt.config.js`, il faut utiliser la propriété `router.middleware`.

```js{}[nuxt.config.js]
export default {
  router: {
    middleware: 'stats'
  }
}
```

Maintenant, le middleware `stats` sera appelé pour chaque changement de route.

On peut ajouter notre middleware (plusieurs même) pour un layout spécifique mais aussi une page.

```js{}[pages/index.vue / layouts/default.vue]
export default {
  middleware: ['auth', 'stats']
}
```

<app-modal>
  <code-sandbox :src="csb_link_router"></code-sandbox>
</app-modal>

## Middleware nommé

On peut nommer un middleware en créant un fichier à l'intérieur du répertoire `middleware/`, le nom du fichier sera aussi le nom du middleware.

```js{}[middleware/authenticated.js]
export default function ({ store, redirect }) {
  // Si l'utilisateur n'est pas authentifié
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Page secrète</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

<app-modal>
  <code-sandbox :src="csb_link_named"></code-sandbox>
</app-modal>

## Middleware anonyme

Si l'on a besoin d'un middleware pour seulement une page spécifique, on peut directement utiliser une fonction pour cela (voire un tableau de fonctions):

```html{}[pages/secret.vue]
<template>
  <h1>Page secrète</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // Si l'utilisateur n'est pas authentifié
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```

<app-modal>
  <code-sandbox :src="csb_link_anonymous"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
