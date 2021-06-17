---
title: pages
description: Le répertoire `pages` contient les vues et les routes de vos applications. Nuxt.js lit tous les fichiers `.vue` à l'intérieur de ce répertoire et crée automatiquement la configuration du routeur pour vous.
position: 10
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/11_pages?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Dans quel répertoire placez-vous les éléments de votre page ?
    answers:
      - views
      - pages
      - vues
    correctAnswer: pages
  - question: Pour créer des routes, vous devez configurer manuellement un fichier router.js
    answers:
      - vrai
      - faux
    correctAnswer: faux
  - question: Vous pouvez créer des routes avec des fichiers .js et des fichiers .ts
    answers:
      - vrai
      - faux
    correctAnswer: vrai
  - question: Quand `asyncData` est-il appelé ?
    answers:
      - avant d'avoir chargé le composant
      - pendant que le composant est chargé
      - après avoir chargé le composant
    correctAnswer: avant d'avoir chargé le composant
  - question: Dans quelle propriété ajoutez-vous vos méta-tags ?
    answers:
      - head
      - meta
      - metaTags
    correctAnswer: head
  - question: Quelle propriété utilisez-vous pour ajouter une mise en page différente à votre page ?
    answers:
      - layouts
      - page
      - layout
    correctAnswer: layout
  - question: Comment paramétrer la propriété scrollToTop si vous voulez dire à Nuxt.js de faire défiler vers le haut lors du rendu de la route de votre enfant ?
    answers:
      - "scrollToTop: 'scroll'"
      - 'scrollToTop: true'
      - "scroll: 'top'"
    correctAnswer: 'scrollToTop: true'
  - question: Comment ajouter le middleware/auth.js à votre page ?
    answers:
      - 'middleware: true'
      - "middleware: 'auth'"
      - "import auth from 'middleware/auth.js'"
    correctAnswer: "middleware: 'auth'"
  - question: Pour mettre en place un `watcher` pour les requêtes, quel propriété utilisez-vous ?
    answers:
      - watcher
      - queryWatcher
      - watchQuery
    correctAnswer: watchQuery
  - question: Le `watcher` est désactivé par défaut.
    answers:
      - vrai
      - faux
    correctAnswer: vrai
---

Le répertoire `pages` contient les vues et les routes de vos applications. Nuxt.js lit tous les fichiers `.vue` à l'intérieur de ce répertoire et crée automatiquement la configuration du routeur pour vous.

<base-alert type="info">

Vous pouvez également créer des routes avec des fichiers .js et .ts

</base-alert>

Chaque composant de Page est un composant Vue mais Nuxt.js ajoute des attributs et des fonctions spéciales pour rendre le développement de votre application universelle aussi facile que possible.

```html{}[pages
<template>
  <h1 class="red">Bonjour {{ name }}!</h1>
</template>

<script>
  export default {
    // les propriétés de la page vont ici
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## Pages dynamiques

Les pages dynamiques peuvent être créées lorsque vous ne connaissez pas le nom de la page parce qu'il provient d'une API ou que vous ne voulez pas avoir à créer la même page encore et encore. Pour créer une page dynamique, vous devez ajouter un underscore (\_) avant le nom du fichier .vue ou avant le nom du répertoire, si vous souhaitez que le répertoire soit dynamique. Vous pouvez nommer le fichier ou le répertoire comme vous le souhaitez, mais vous devez le faire précéder d'un underscore .

Si nous avons défini un fichier nommé `_slug.vue` dans notre répertoire `pages`, nous pouvons accéder à la valeur en utilisant le contexte avec `params.slug`

```html{}[pages/_slug.vue]
<template>
  <h1>{{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const slug = params.slug // En appelant /abc, le slug sera "abc".
      return { slug }
    }
  }
</script>
```

Si nous avons défini un fichier nommé `\_slug.vue` dans un répertoire appelé `\_book`, nous pouvons accéder à la valeur en utilisant le contexte avec `params.slug` et `params.book`

```html{}[pages/_book/_slug.vue]
<template>
  <h1>{{ this.book }} / {{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const book = params.book
      const slug = params.slug
      return { book, slug }
    }
  }
</script>
```

## Propriétés

### asyncData

AsyncData est appelé à chaque fois avant le chargement du composant. Elle peut être asynchrone et reçoit le contexte en argument. L'objet renvoyé sera fusionné avec votre objet de données.

```js{}[pages/index.vue]
export default {
  asyncData (context) {
    return { name: 'World' }
  }
```

<base-alert type="next">

Pour en savoir plus sur le fonctionnement d'asyncData, consultez notre chapitre [Data Fetching](/docs/2.x/features/data-fetching#async-data)

</base-alert>

### fetch

Chaque fois que vous avez besoin d'obtenir des données asynchrones, vous pouvez utiliser `fetch()`. Fetch est appelé côté serveur lors du rendu de la route, et côté client lors de la navigation.

```html
<script>
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
    }
  }
</script>
```

<base-alert type="next">

Pour en savoir plus sur le fonctionnement de l'extraction, consultez notre chapitre [Data Fetching](/docs/2.x/features/data-fetching)

</base-alert>

### head

Définissez des balises <meta> pour la page en cours. Nuxt.js utilise `vue-meta` pour mettre à jour l'en-tête du document et les méta attributs de votre application.

```js{}[pages/index.vue]
export default {
  head() {
    // Définit les balises Méta pour cette page
  }
}
```

<base-alert type="next">

Pour en savoir plus, consultez notre chapitre [Balises meta et référencement SEO](/docs/2.x/features/meta-tags-seo)

</base-alert>

### layout

Précisez une mise en page définie dans le répertoire des mises en page.

```js{}[pages/index.vue]
export default {
  layout: 'blog'
}
```

<base-alert type="next">

Pour en savoir plus sur les mises en page, consultez notre chapitre sur les [Vues](/docs/2.x/concepts/views#layouts).

</base-alert>

### loading

Si ce paramètre est défini sur false, il empêche une page d'appeler automatiquement `this.$nuxt.$loading.finish()` lorsque vous l'entrez et `this.$nuxt.$loading.start()` lorsque vous la quittez, ce qui vous permet de contrôler manuellement le comportement, comme le montre [cet exemple](/examples/custom-loading-component).

```js{}[pages/index.vue]
export default {
  loading: false
}
```

<base-alert type="info">

S'applique uniquement si la propriété loading est également défini dans le fichier nuxt.config.js.

</base-alert>

<base-alert type="next">

Pour en savoir plus, consultez notre chapitre sur le [Chargement](/docs/2.x/features/loading).

</base-alert>

### transition

Définit une transition spécifique pour la page.

```js{}[pages/index.vue]
export default {
  transition: 'fade'
}
```

<base-alert type="next">

Pour en savoir plus, consultez notre chapitre sur les [Transitions](/docs/2.x/features/transitions)

</base-alert>

### scrollToTop

La propriété `scrollToTop` vous permet de dire à Nuxt.js de faire défiler la page vers le haut avant de la rendre. Par défaut, Nuxt.js fait défiler la page vers le haut lorsque vous allez sur une autre page, mais avec les routes enfant, Nuxt.js garde la position de défilement. Si vous voulez dire à Nuxt.js de faire défiler la page vers le haut lors du rendu de votre route fille, mettez `scrollToTop` à `true`

```js{}[pages/index.vue]
export default {
  scrollToTop: true
}
```

Inversement, vous pouvez aussi régler manuellement `scrollToTop` à `false` sur les routes parentes.

Si vous souhaitez remplacer le comportement de défilement par défaut de Nuxt.js, consultez l'option [scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior).

### middleware

Définit le middleware pour cette page qui sera appelé avant le rendu de la page.

```js{}[pages/index.vue]
export default {
  middleware: 'auth'
}
```

<base-alert type="next">

Pour en savoir plus, consultez notre chapitre sur les [Middleware](/docs/2.x/directory-structure/middleware)

</base-alert>

### La propriété watchQuery

Utilisez la propriété `WatchQuery` pour configurer un observateur (watcher) pour les chaînes de requête. Si les chaînes définies changent, toutes les méthodes du composants (asyncData, fetch, validate, layout, ...) seront appelées. Le `watcher` est désactivée par défaut pour améliorer les performances.

```js{}[pages/index.vue]
export default {
  watchQuery: ['page']
}
```

<base-alert type="info">

Si vous voulez mettre en place un `watcher` pour toutes les chaînes de requête, définissez `watchQuery` sur `true`.

</base-alert>

```js{}[pages/index.vue]
export default {
  watchQuery: true
}
```

Vous pouvez également utiliser la fonction `watchQuery(newQuery, oldQuery)` pour avoir des observateurs plus raffinés.

```js{}[pages/index.vue]
export default {
  watchQuery(newQuery, oldQuery) {
    // Exécute les méthodes du composants que si l'ancienne chaîne de requête contenait `bar`.
    // et que la nouvelle chaîne de requête contient `foo`.
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert type="next">

Pour en savoir plus sur la propriété d'observation, consultez notre chapitre [Data Fetching](/docs/2.x/features/data-fetching) chapter

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

## Ignorer des pages

Si vous voulez ignorer des pages afin qu'elles ne soient pas généré dans le fichier `router.js`, alors vous pouvez les ignorer en les préfixant par un `-`.

Par exemple, `pages/-about.vue` sera ignorée.

<base-alert type="next">

Pour en savoir plus, consultez notre chapitre sur l'option [ignore](/docs/2.x/configuration-glossary/configuration-ignore)

</base-alert>

## Configuration

Vous pouvez renommer le répertoire `pages/` en quelque chose de différent en définissant l'option `dir.pages` :

```js{}[nuxt.config.js]
export default {
  dir: {
    // Renommer le répertoire `pages` en `routes`.
    pages: 'routes'
  }
}
```

<base-alert type="next">

Pour en savoir plus, consultez notre chapitre sur l'option [dir](/docs/2.x/configuration-glossary/configuration-dir)

</base-alert>

<quiz :questions="questions"></quiz>
