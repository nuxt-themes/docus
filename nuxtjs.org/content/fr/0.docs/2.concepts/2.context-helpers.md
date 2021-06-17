---
title: Helpers et Contexte
description: Le contexte fournit des informations *additionnelles* et souvent optionnelles de la requête envoyée à l'application.
position: 2
category: concepts
csb_link_context: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-context?fontsize=14&hidenavigation=1&theme=dark
csb_link_helpers: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-helpers?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/context.svg
imgAlt: nuxt-js-context-keys
questions:
  - question: Pour quelle raison le contexte existe-il ?
    answers:
      - Le rendu côté serveur (SSR)
      - Pour avoir un state global
      - Par paresse
    correctAnswer: Le rendu côté serveur (SSR)
  - question: Quelle propriété n'est pas dans le contexte ?
    answers:
      - env
      - isDev
      - $store
    correctAnswer: $store
  - question: Quelle propriété du contexte est uniquement disponible du côté *serveur* ?
    answers:
      - from
      - app
      - req
    correctAnswer: req
  - question: Quelle propriété du contexte est uniquement disponible du côté *client* ?
    answers:
      - from
      - res
      - app
    correctAnswer: from
  - question: Que ne peut *pas* faire le helper `$nuxt` ?
    answers:
      - Afficher la version de Nuxt
      - Donner des informations sur le status de la connexion internet des utilisateurs
      - Accéder à des modules exposés de fonctions
    correctAnswer: Afficher la version de Nuxt
  - question: Quels sont les noms des helpers de process
    answers:
      - global, client and server
      - server, client and static
      - ssr, spa and static
    correctAnswer: server, client and static
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

L'object `context` est disponible dans des fonctions spécifiques de Nuxt comme [asyncData](/docs/2.x/features/data-fetching#async-data), [plugins](/docs/2.x/directory-structure/plugins), [middleware](/docs/2.x/directory-structure/middleware) et [nuxtServerInit](/docs/2.x/directory-structure/store#the-nuxtserverinit-action). Le contexte fournit des informations _additionnelles_ et souvent optionnelles de la requête envoyée à l'application.

Tout d'abord, le contexte est utilisé pour permettre un accès aux autres parties d'une application Nuxt.js, comme par exemple un store Vuex ou l'instance `connect` sous-jacente. Ainsi, nous avons les objets `req` et `res` disponibles dans le contexte du côté serveur et le `store` de toujours disponible. Avec le temps, le contexte fût étendu avec plein d'autres variables bien pratiques et de raccourcis. Ainsi, nous avons accès au fonctionnalités du HMR en mode `development`, la `route` actuelle, les `params` de la page, la `query` (URL), ainsi que la possibilité d'avoir accès à des variables d'environment à travers le contexte. En plus de cela, les modules de fonctions et les helpers peuvent être exposés à travers le contexte pour être disponibles sur les deux - côté client et serveur.

**Toutes les propriétés du contexte qui sont présents par défaut**

```js
function (context) {
  // toujours disponibles
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
   $config
  } = context

  // disponible uniquement côté serveur
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }

  // disponible uniquement côté client
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

<base-alert>

Le _context_ dont nous parlons ici ne doit pas être confondu avec l'objet `context` disponible dans les [Actions Vuex](https://vuex.vuejs.org/guide/actions.html) ou celui disponible dans la fonction `build.extend` dans notre `nuxt.config.js`. Ils n'ont absolument aucun rapport entre eux !

</base-alert>

Découvrez davantage de propriétés disponibles dans le contexte dans le [Glossaire des propriétés internes](/docs/2.x/internals-glossary/context)

## Exemples

### Utiliser les paramètres de la page pour notre requête API

Le contexte expose directement tous les paramètres dynamiques possibles de la route via `context.params`. Dans l'exemple suivant, on appelle une API grâce au module `nuxt/http` en utilisant un paramètre dynamique de la page dans l'URL. Les modules tels que [nuxt/http](https://http.nuxtjs.org/) peuvent exposer leurs propres fonctions qui peuvent par la suite être disponibles à travers l'objet `context.app`.

Nous allons de plus, entourer le call API d'une instruction `try/catch` pour gérer le cas d'erreurs potentielles. Avec la fonction `context.error`, nous pouvons directement afficher la page d'erreur de Nuxt et lui passer l'erreur survenue.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData(context) {
    const id = context.params.id
    try {
      // ici, on utilise le module nuxtjs/http disponible via context.app
      const post = await context.app.$http.$get(
        `https://api.nuxtjs.dev/posts/${id}`
      )
      return { post }
    } catch (error) {
      context.error(error) // affiche la page d'erreur de nuxt avec l'erreur correspondante
    }
  }
}
```

Grâce à l'[ES6](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/), on peut utiliser la syntaxe pour déstructurer l'objet `context`. On peut passer les objets auxquels nous voulons avoir accès et ensuite les utiliser dans notre code sans même utiliser le mot `context`.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      // ici on utilise le module nuxtjs/http depuis le contexte
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (error) {
      error(error) // affiche la page d'erreur de nuxt avec l'erreur correspondante
    }
  }
}
```

On préfère plutôt utiliser les paramètres de requête ? Nous pouvons alors utiliser `context.query.id`

### Rediriger les utilisateurs et accéder au store

Accéder au store Vuex (quand nous l'avons configuré dans le répertoire `store`) est aussi possible via le contexte. Cela fournit un objet `store` qui est équivalent à `this.$store` dans les composants Vue. De plus, on peut utiliser la méthode `redirect`, un helper disponible via le contexte, pour rediriger l'utilisateur dans le cas où le state `authenticated` est falsy.

```js
export default {
  middleware({ store, redirect }) {
    // on déstructure les objets avec leurs propriétés
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```

<app-modal>
  <code-sandbox :src="csb_link_context"></code-sandbox>
</app-modal>

## Les helpers

En plus des raccourcis dans le contexte, il y a aussi de petits helpers présents dans notre application Nuxt.js.

## `$nuxt`: Le helper Nuxt.js

Le helper `$nuxt` est prévu pour améliorer l'expérience utilisateur et peut être une trappe de secours dans certains cas. Il est accessible via `this.$nuxt` dans les composants Vue et via `window.$nuxt` du côté client.

### Vérification de la connexion

Le helper `$nuxt` fournit un moyen rapide pour voir si l'utilisateur a de la connexion ou pas: nous avons accès aux booléens `isOffline` et `isOnline`. On peut utiliser ceux-ci pour montrer un message dès que l'utilisateur est hors ligne (par exemple).

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">Vous êtes hors-ligne</div>
    <Nuxt />
  </div>
</template>
```

### Accéder à l'instance racine

Au delà de l'aspect DX/UX, le helper `$nuxt` fournit aussi un raccourci à l'instance racine de notre application à partir de n'importe quel composant. Mais ce n'est pas tout - nous pouvons aussi avoir accès au helper `$nuxt` via `window.$nuxt`, ce qui peut être pratique comme solution de secours pour avoir accès à des méthodes de module comme `$axios` depuis l'extérieur de nos composants Vue. Nous pouvons utiliser cela judicieusement et seulement en **dernier recours**.

### Actualiser la data de la page

Quand nous voulons actualiser la page actuelle pour l'utilisateur, nous ne voulons pas recharger la page intégralement et entraîner une nouvelle requête au serveur ainsi qu'une nouvelle initialisation de l'intégralité de notre application Nuxt.js. À la place, on préférera souvent juste actualiser la data, que l'on peut récupérer avec `asyncData` ou `fetch`.

Nous pouvons faire cela en utilisant `this.$nuxt.refresh()` !

```html
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Actualiser</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Créé le: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

### Contrôler la barre de progression

Avec `$nuxt`, nous pouvons aussi contrôler la barre de progression de manière programmatique via `this.$nuxt.$loading`.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

Plus d'informations sont disponibles dans le [chapitre sur le loader](../features/loading)

## Le helper onNuxtReady

Si nous voulons exécuter certains scripts _après_ que notre application Nuxt.js soit chargée et prête, nous pouvons utiliser la fonction `window.onNuxtReady`. Cela peut être utile si nous souhaitons exécuter une fonction côté client sans augmenter le temps à l'interactivité ([TTI](https://web.dev/tti/)).

```js
window.onNuxtReady(() => {
  console.log('Nuxt.js est monté et prêt')
})
```

## Les helpers de Process

Nuxt.js injecte trois valeurs booléennes dans l'objet global `process`, ce dernier va permettre de déterminer si l'app a été render côté serveur ou intégralement côté client, ainsi que vérifier la génération du site en version statique. Ces helpers sont disponibles à travers notre application et sont communément utilisés dans un bloc `asyncData`.

```html{}[pages/about.vue]
<template>
  <h1>Je suis render côté {{ renderedOn }}</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'client' : 'serveur' }
    }
  }
</script>
```

Dans l'exemple, `renderedOn` aura la valeur `'serveur'` dans le cas d'un render côté serveur quand un utilisateur arrivera sur la page directement. Quand l'utilisateur voudra naviguer jusqu'à la page à partir d'un autre endroit de l'application, par exemple en cliquant sur un `<NuxtLink>`, la valeur sera à `client`.

<app-modal>
  <code-sandbox :src="csb_link_helpers"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
