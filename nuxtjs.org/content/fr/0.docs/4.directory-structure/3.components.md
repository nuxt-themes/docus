---
title: components
description: Le répertoire des composants contient les composants Vue.js. Les composants sont les éléments qui constituent les différentes parties d'une page et peuvent être réutilisés et importés dans des pages, layouts ou même d'autres composants.
position: 3
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/03_components?fontsize=14&hidenavigation=1&theme=dark
img: /guides/components.png
imgAlt: nuxt components module
questions:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
---

Le répertoire des composants contient les composants Vue.js. Les composants sont les éléments qui constituent les différentes parties d'une page et peuvent être réutilisés et importés dans des pages, layouts ou même d'autres composants.

### Récupérer de la data

Pour récupérer de la data depuis une API de manière asynchrone dans les composants, on peut utiliser le hook [`fetch()`](/docs/2.x/features/data-fetching#the-fetch-method) de Nuxt.js.

En utilisant `$fetchState.pending`, on peut afficher un message pendant le chargement de la data. En utilisant `$fetchState.error`, on peut afficher un message d'erreur s'il y a une erreur lors de la récupération des données. Lorsque l'on utilise `fetch`, il faut définir la data dans la propriété `data`, celle-ci sera par la suite remplie une fois que les données auront été récoltées.

```html{}[components/MountainsList.vue]
<template>
  <div>
    <p v-if="$fetchState.pending">Chargement....</p>
    <p v-else-if="$fetchState.error">
      Erreur lors de la récupération des montagnes
    </p>
    <ul v-else>
      <li v-for="(mountain, index) in mountains" :key="index">
        {{ mountain.title }}
      </li>
    </ul>
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

<base-alert type="next">

Se référer au chapitre sur [fetch()](/docs/2.x/features/data-fetching#the-fetch-method) pour avoir davantage d'informations sur son fonctionnement.

</base-alert>

## Découverte des composants

<app-modal :src="img" :alt="imgAlt"></app-modal>

À partir de la version `2.13`, Nuxt.js peut automatiquement importer les composants lorsqu'ils sont utilisés dans les templates. Pour activer cette feature, il suffit de définir `components: true` dans le fichier de configuration:

```js{}[nuxt.config.js]
export default {
  components: true
}
```

Ainsi, lors de la création de composants dans le répertoire `components`, ils seront importés et directement disponibles.

```bash
components/
  TheHeader.vue
  TheFooter.vue
```

```html{}[layouts/default.vue]
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>
```

### Imports dynamiques

Pour importer dynamiquement un composant - le "lazy load" (le charger paresseusement) - il suffit juste de le préfixer par un `Lazy` dans les templates.

```html{}[layouts/default.vue]
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <LazyTheFooter />
  </div>
</template>
```

Utiliser le préfixe `Lazy` permet aussi d'importer dynamiquement un composant lorsqu'un évènement est déclenché.

```html{}[pages/index.vue]
<template>
  <div>
    <h1>Montagnes</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="showList">Montrer la liste</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      showList() {
        this.show = true
      }
    }
  }
</script>
```

### Répertoires imbriqués

Si on a des composants dans des répertoires imbriqués comme ceci:

```bash
components/
  base/
    Button.vue
```

Le nom du composant sera basé sur le nom du fichier, ainsi le composant sera:

```html
<button />
```

Nous recommandons d'utiliser le nom du répertoire dans le nom du fichier pour plus de clarté.

```bash
components/
  base/
    BaseButton.vue
```

Cependant, si l'on souhaite garder `Button.vue`, on peut utiliser l'option `prefix` dans le fichier de configuration `nuxt.config.js` pour ajouter un préfixe à tous les composants dans un répertoire donné.

```bash
components/
  base/
   Button.vue
```

```bash{}[nuxt.config.js]
components: {
  dirs: [
    '~/components',
      {
        path: '~/components/base/',
        prefix: 'Base'
      }
  ]
}
```

Ainsi, on pourra utiliser `BaseButton` dans le template or lieu de `Button` sans pour autant devoir changer le nom du fichier `Button.vue`.

```html{}[pages/index.vue]
<BaseButton />
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<base-alert type="next">

Pour en apprendre davantage, se référer au chapitre sur le [module des composants Nuxt](/blog/improve-your-developer-experience-with-nuxt-components).

</base-alert>
