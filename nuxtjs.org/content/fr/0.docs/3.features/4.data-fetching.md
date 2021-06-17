---
title: Récupération de la data
description: Dans Nuxt.js, nous avons 2 façons de récupérer de la data depuis une API. Nous pouvons utiliser la méthode fetch ou bien asyncData.
position: 4
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/04_data_fetching?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Où pouvons-nous utiliser le hook `fetch` de Nuxt.js ?
    answers:
      - dans les pages et les composants
      - seulement dans les pages
      - seulement dans les composants
    correctAnswer: dans les pages et les composants
  - question: On a accès à `this` dans le hook `fetch` de Nuxt.js
    answers:
      - vrai
      - faux
    correctAnswer: vrai
  - question: Quand le hook fetch de Nuxt.js est-il appelé ?
    answers:
      - après l'instanciation du composant
      - avant l'instanciation du composant
      - durant l'instanciation du composant
    correctAnswer: après l'instanciation du composant
  - question: Qu'est-ce qui nous permet d'afficher un placeholder lorsque `fetch` est en cours d'appel *côté client* ?
    answers:
      - $fetchState.timestamp
      - $fetchState.error
      - $fetchState.pending
    correctAnswer: $fetchState.pending
  - question: Comment peut-on sauvegarder les appels fait avec fetch sur les pages que l'on a déjà visité ?
    answers:
      - keep-alive
      - save-fetch
      - cache-fetch
    correctAnswer: keep-alive
  - question: Dans le hook `activated`, quel propriété nous permet d'ajouter un cache de 30 secondes à fetch ?
    answers:
      - $fetchState.pending
      - $fetchState.timestamp
      - $fetchState.cache
    correctAnswer: $fetchState.timestamp
  - question: Quand `asyncData` est-il appelé ?
    answers:
      - après l'instanciation du composant
      - pendant l'instanciation du composant
      - avant l'instanciation du composant
    correctAnswer: avant l'instanciation du composant
  - question: Nous avons accès à `this` dans asyncData
    answers:
      - vrai
      - faux
    correctAnswer: faux
  - question: Avec asyncData, on peut utiliser le paramètre `context` pour accéder à des infos sur la route dynamique
    answers:
      - vrai
      - faux
    correctAnswer: vrai
  - question: Nous avons accès au status code en cas d'erreur dans asyncData
    answers:
      - vrai
      - faux
    correctAnswer: vrai
---

Nuxt.js prend en charge les modèles Vue traditionnels pour le chargement de données dans votre application côté client, comme la récupération de données dans le hook `mounted()` d'un composant. Cependant, les applications universelles doivent utiliser des hooks spécifiques à Nuxt.js pour pouvoir restituer les données lors du rendu côté serveur. Cela permet à votre page de s'afficher avec toutes ses données requises présentes.

Nuxt a deux hooks pour le chargement asynchrone des données:

- Le hook `fetch` (Nuxt 2.12+). Ce hook peut être placé sur n'importe quel composant et fournit des raccourcis pour le rendu des états de chargement (pendant le rendu côté client) et des erreurs.
- Le hook `asyncData`. Ce hook ne peut être placé que sur les composants _page_. Contrairement à `fetch`, ce hook n'affiche pas d'espace réservé de chargement pendant le rendu côté client: à la place, ce hook bloque la navigation de l'itinéraire jusqu'à ce qu'il soit résolu, affichant une erreur de page en cas d'échec.

<base-alert>

Dans les versions de Nuxt antérieures à la 2.12, le hook `fetch` fonctionnait un peu comme `asyncData` aujourd'hui. Cette fonctionnalité est toujours supportée aujourd'hui pour des raisons de rétrocompatibilité: si un argument `context` est accepté dans votre `fetch()`, il sera considéré comme un hook de récupération "hérité". Cette fonctionnalité est obsolète et doit être remplacée par `asyncData(context)` ou par un [middleware anonyme](/docs/2.x/directory-structure/middleware#anonymous-middleware) en utilisant `middleware(context)`.

</base-alert>

Ces hooks peuvent être utilisés avec _toute bibliothèque de récupération de données_ que vous choisissez. Nous vous recommandons d'utiliser [@nuxt/http](https://http.nuxtjs.org/) ou [@nuxt/axios](https://axios.nuxtjs.org/) pour faire des requêtes HTTP aux API. Vous trouverez plus d'informations sur ces bibliothèques, telles que des guides de configuration, des en-têtes d'authentification, dans leur documentation respective.

## Le hook fetch

<base-alert type="info">

Ce hook est uniquement disponible à partir de Nuxt `2.12+`.

</base-alert>

Le hook `fetch` de Nuxt.js est appelé après que l'instanciation du composant soit faite côté serveur: `this` est disponible à l'intérieur.

```js
export default {
  async fetch() {
    console.log(this)
  }
}
```

<base-alert>

`fetch(context)` a été déprécié dans nos pages, il faut utiliser un [middleware anonyme](/docs/2.x/directory-structure/middleware#anonymous-middleware) à la place: `middleware(context)`

</base-alert>

### Quand utiliser fetch?

À chaque fois que nous avons besoin d'avoir de la data asynchrone. `fetch` est appelé côté serveur lors du render de la route et côté client lors de la navigation.

Cela expose `$fetchState` au niveau du composant et avec les propriétés suivantes:

- `pending` est un Booléen, il permet d'afficher un placeholder quand `fetch` est appelé _côté client_.
- `error`, il peut être soit à `null` soit à `Error` et nous permet d'afficher un message
- `timestamp` est l'horodatage du dernier `fetch`, cela peut s'avérer utile pour faire du [cache avec `keep-alive`](#caching)

Nous avons aussi accès à `this.$fetch()`, utile si nous voulons appeler le hook `fetch` dans notre composant.

```html{}[components/NuxtMountains.vue]
<template>
  <p v-if="$fetchState.pending">Récupération des montagnes... ⛰️</p>
  <p v-else-if="$fetchState.error">Une erreur est survenue :(</p>
  <div v-else>
    <h1>Montagnes Nuxt</h1>
    <ul v-for="mountain of mountains">
      <li>{{ mountain.title }}</li>
    </ul>
    <button @click="$fetch">Actualiser</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
```

<base-alert type="info">

On peut accéder au [contexte](/docs/2.x/concepts/context-helpers) Nuxt à l'intérieur du hook `fetch` avec `this.$nuxt.context`.

</base-alert>

### Options

`fetchOnServer`: Un booléen ou une fonction (par défaut: `true`), utile si on veut appeler `fetch()` lors du render de la page côté serveur.

`fetchDelay`: Un entier (par défaut: `200`), définit une limite minimale exprimée en millisecondes de temps d'exécution (pour éviter les flashs).

Lorsque `fetchOnServer` est falsy (`false` ou retourne quelque chose de faux), `fetch` sera appelé uniquement côté client et `$fetchState.pending` retournera `true` lors du render du composant côté serveur.

```js
export default {
  data() {
    return {
      posts: []
    }
  },
  async fetch() {
    this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
      res.json()
    )
  },
  // on appelle fetch uniquement du côté client
  fetchOnServer: false
}
```

### Écoute des modifications des query strings

Le hook `fetch` n'est pas appelé sur les modifications des query strings par défaut. Pour surveiller ces modifications, nous pouvons ajouter un watcher sur `$route.query` et appeler `$fetch`:

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // appelé aussi lors des modifications de query
  }
}
```

### Mise en cache

Nous pouvons utiliser la directive `keep-alive` dans les composants `<nuxt/>` et `<nuxt-child>` pour sauvegarder le résultat des appels de `fetch` dans les pages déjà visitées:

```html{}[layouts/default.vue]
<template>
  <nuxt keep-alive />
</template>
```

Nous pouvons aussi spécifier les [props](https://vuejs.org/v2/api/#keep-alive) passées à `<keep-alive>` en passant la prop `keep-alive-props` au composant `<nuxt>`.

```html{}[layouts/default.vue]
<nuxt keep-alive :keep-alive-props="{ max: 10 }" />
```

Le code ci-dessus va garder en mémoire 10 composants `page`.

### Utiliser le hook `activated`

Nuxt va directement remplir `this.$fetchState.timestamp` (horodatage) avec le dernier appel de `fetch` (cela inclut le SSR). Nous pouvons utiliser cette propriété en combinaison avec le hook `activated` pour ajouter 30 secondes de cache à `fetch`:

```html{}[pages/posts/_id.vue]
<template> ... </template>

<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    activated() {
      // appeller fetch de nouveau si le dernier appel date de plus de 30 secondes
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
      }
    },
    async fetch() {
      this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
        res.json()
      )
    }
  }
</script>
```

La navigation à la même page ne va pas rappeler `fetch` tant que le dernier call ne date pas d'au moins 30 secondes.

## Async Data

<base-alert>

`asyncData` est seulement disponible pour les [pages](/docs/2.x/directory-structure/pages) et nous n'avons donc pas accès à `this` à l'intérieur du hook.

</base-alert>

La différence principale avec `fetch` est que vous n'avez pas à gérer les status d'erreur ou en cours. Nuxt.js va attendre que le hook `asyncData` soit terminé avant de procéder à la navigation sur la page suivante ou afficher la [page d'erreur](/docs/2.x/directory-structure/layouts#error-page)

Ce hook reçoit [le contexte](/docs/2.x/concepts/context-helpers) en tant que premier argument. Nous pouvons l'utiliser pour aller chercher de la data et Nuxt.js va automatiquement fusionner l'object retourné avec le `data` du composant.

```html{}[pages/index.vue]
<template>
  <h1>{{ project }}</h1>
</template>

<script>
  export default {
    async asyncData(context) {
      return {
        project: 'nuxt'
      }
    }
  }
</script>
```

Dans les exemples qui suivent nous utilisons [@nuxt/http](https://http.nuxtjs.org/), que nous recommandons pour aller récupérer de la data d'une API.

D'abord, nous devons l'installer:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxt/http
```

  </code-block>
  <code-block label="npm">

```bash
npm install @nuxt/http
```

  </code-block>
</code-group>

Ensuite, nous allons l'ajouter à notre fichier `nuxt.config.js` à la section `modules`:

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxt/http']
}
```

```html{}[pages/posts/_id.vue]
<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.description }}</p>
  </div>
</template>

<script>
  export default {
    async asyncData({ params, $http }) {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    }
  }
</script>
```

### Écouter les changements de query

La méthode `asyncData` n'est pas appelée par défaut sur les modifications liées aux query strings. Si nous souhaitons changer ce comportement, pour par exemple créer un composant de pagination, nous pouvons configurer des paramètres qui seront par la suite écoutés grâce à la propriété `watchQuery` sur le composant de notre page.

<base-alert type="next">

Pour en apprendre davantage sur la [propriété watchQuery](/docs/2.x/components-glossary/pages-watchquery) et voir la liste des [clés disponibles dans le contexte](/docs/2.x/concepts/context-helpers).

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
