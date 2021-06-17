---
title: plugins
description: Le répertoire `plugins` contient les plugins JavaScript que l'on souhaite exécuter avant l'instantiation de l'application principale Vue.js.
position: 11
category: directory-structure
csb_link_plugins_client: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_client?fontsize=14&hidenavigation=1&theme=dark
csb_link_plugins_external: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_external?fontsize=14&hidenavigation=1&theme=dark
csb_link_plugins_custom: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_custom_plugin?fontsize=14&hidenavigation=1&theme=dark
csb_link_plugins_vue: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_vue?fontsize=14&hidenavigation=1&theme=dark
img: /guides/plugins.svg
imgAlt: modules-servermiddleware-plugins-in-nuxt-js
questions:
  - question: The `plugins` directory contains your Javascript plugins that you want to run Le répertoire `plugins` contient les plugins JavaScript que l'on souhaite exécuter
    answers:
      - avant l'instantiation de l'application principale Vue.js
      - pendant l'instantiation de l'application principale Vue.js
      - après l'instantiation de l'application principale Vue.js
    correctAnswer: avant l'instantiation de l'application principale Vue.js
  - question: Les hooks Vue.js beforeCreate et created sont appelés
    answers:
      - uniquement côté client
      - uniquement côté serveur
      - côté client et serveur
    correctAnswer: côté client et serveur
  - question: À chaque fois que l'on souhaite utiliser Vue.use(), on devrait créer un fichier dans le répertoire
    answers:
      - vue
      - plugins
      - vuePlugins
    correctAnswer: plugins
  - question: Où ajoute-t-on le plugin afin qu'il soit importé dans notre application principale ?
    answers:
      - dans notre page layouts
      - dans le fichier nuxt.config.js
      - nous n'avons pas besoin de l'importer, c'est fait automatiquement
    correctAnswer: dans le fichier nuxt.config.js
  - question: Certains plugins ne devraient marcher que dans le navigateur
    answers:
      - true
      - false
    correctAnswer: true
  - question: Quelle extension faut-il mettre si l'on souhaite que notre plugin s'exécute seulement côté serveur ?
    answers:
      - .serverside.js
      - .ssr.js
      - .server.js
    correctAnswer: .server.js
  - question: Quels sont les deux modes que l'on peut utiliser pour nos plugins ?
    answers:
      - server et client
      - ssr et client
      - server-side et client-side
    correctAnswer: server et client
  - question: Comment pouvons nous rendre nos fonctions/variables disponibles à travers toute notre application ?
    answers:
      - en créant un plugin
      - en utilisant la méthode inject
      - en créant un module
    correctAnswer: en utilisant la méthode inject
  - question: Quelle est la convention pour le préfixe des fonctions que l'on a injecté ?
    answers:
      - $
      - _
      - ':'
    correctAnswer: $
  - question: Pour changer l'ordre des plugins, quelle propriété faut-il utiliser ?
    answers:
      - orderPlugins
      - extendPlugins
      - plugins
    correctAnswer: extendPlugins
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Le répertoire `plugins` contient les plugins JavaScript que l'on souhaite exécuter avant l'instantiation de l'application principale Vue.js. C'est ici que l'on peut ajouter des plugins Vue.js et injecter des fonctions/constantes. À chaque fois que l'on a besoin d'utiliser `Vue.use()`, on peut créer un fichier dans `plugins/` et ajouter son chemin à la propriété `plugins` dans le fichier `nuxt.config.js`.

## Packages externes

On pourrait avoir envie d'utiliser des packages/modules externes dans notre application (ex: [axios](https://axios.nuxtjs.org/)) pour faire des requêtes HTTP côté client et serveur.

Premièrement, l'installer via npm ou Yarn.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxtjs/axios
```

  </code-block>
  <code-block label="npm">

```bash
npm install @nuxtjs/axios
```

  </code-block>
</code-group>

On peut par exemple configurer les intercepteurs d'axios pour réagir à de possibles erreurs lorsque l'on fait des appels à notre API et ce, à travers toute notre application. Dans l'exemple suivant, on redirige l'utilisateur sur une page d'erreur personnalisée appelée `sorry` lorsque l'on a une status d'erreur 500 de la part de notre API.

```js{}[plugins/axios.js]
export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if (error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
```

Il faut par la suite ajouter le module et les plugin fraîchement créé dans la configuration du projet.

```js{}[nuxt.config.js]
module.exports = {
  modules: ['@nuxtjs/axios'],
  plugins: ['~/plugins/axios.js']
}
```

Ensuite, on pourra l'utiliser directement dans nos composants page:

```js{}[pages/index.vue]
<template>
  <h1>{{ post.title }}</h1>
</template>

<script>
export default {
	async asyncData ({ $axios, params }) {
	    const  post  = await $axios.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
	    return { post }
	  }
}
</script>
```

<app-modal>
  <code-sandbox :src="csb_link_plugins_external"></code-sandbox>
</app-modal>

## Plugins Vue

Si on veut utiliser des plugins Vue.js, comme par exemple [v-tooltip](https://akryum.github.io/v-tooltip) pour afficher des tooltips dans notre application, nous avons besoin de configurer le plugin avant de lancer l'application.

Commençons par l'installer

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add v-tooltip
```

  </code-block>
  <code-block label="npm">

```bash
npm install v-tooltip
```

  </code-block>
</code-group>

Ensuite, créons le fichier `plugins/vue-tooltip.js`

```js{}[plugins/vue-tooltip.js]
import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
```

<app-modal>
  <code-sandbox :src="csb_link_plugins_vue"></code-sandbox>
</app-modal>

## La propriété plugins

Ensuite nous pouvons ajouter le chemin du fichier à l'intérieur de la propriété `plugins` du fichier `nuxt.config.js`. La propriété `plugins` permet d'ajouter facilement des plugins Vue.js à notre application principale. Tous les chemins définis dans la propriété `plugins` seront importés avant d'initialiser l'application principale.

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/vue-tooltip.js']
}
```

### Plugins ES6

Si le plugin est situé dans les `node_modules` et qu'il exporte un module en ES6, nous aurons besoin de l'ajouter à l'option de build `transpile`:

```js{}[nuxt.config.js]
module.exports = {
  build: {
    transpile: ['vue-tooltip']
  }
}
```

Pour davantage d'informations sur les options, veuillez vous référer à la [configuration du build](/docs/2.x/configuration-glossary/configuration-build#transpile).

## Côté client ou serveur seulement

Certains plugins ne devraient marcher que dans le navigateur car ils n'auront pas de support SSR (Server Side Rendering).

### Convention pour le nommage des plugins

Si un plugin est voué à être exécuté seulement du côté client ou seulement du côté serveur, on peut appliquer une extension `.client.js` ou `.server.js` à l'extension du fichier du plugin. Le fichier sera automatiquement inclus du côté client ou serveur seulement (respectivement).

```js{}[nuxt.config.js]
export default {
  plugins: [
    '~/plugins/foo.client.js', // seulement du côté client
    '~/plugins/bar.server.js', // seulement du côté serveur
    '~/plugins/baz.js' // sur le serveur et sur le client
  ]
}
```

### Syntaxe objet

On peut aussi utiliser la syntaxe objet avec la propriété mode (`'client'`  ou `'server'`) dans `plugins`.

```js{}[nuxt.config.js]
export default {
  plugins: [
    { src: '~/plugins/client-only.js', mode: 'client' }, // seulement du côté client
    { src: '~/plugins/server-only.js', mode: 'server' }, // seulement du côté serveur
    { src: '~/plugins/both-sides.js' } // sur le serveur et sur le client
  ]
}
```

<app-modal>
  <code-sandbox :src="csb_link_plugins_client"></code-sandbox>
</app-modal>

## Injection dans le `$root` et le `context`

Parfois, on souhaiterai rendre des fonctions ou des variables accessibles dans l'intégralité de notre application. On peut injecter ces variables dans notre instance Vue (côté client), dans le `context` (côté serveur) et même dans le store Vuex. La convention pour le préfixe des fonctions que l'on a injecté est `$`.

Nuxt.js nous fournit une méthode `inject(cle, valeur)` pour faire cela facilement. Le second paramètre donné à `inject` est la fonction que l'on souhaite exporter. Le `$` sera automatiquement préfixé à notre clé.

<base-alert type="info">

Il est important de savoir que dans tout [lifecycle](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) d'une instance Vue, seulement les hooks `beforeCreate` et `created` seront appellés du côté client et serveur. Les hooks restants seront appellés seulement du côté client.

</base-alert>

```js{}[plugins/hello.js]
export default ({ app }, inject) => {
  // Ceci injecte $hello(msg) dans Vue, dans le context et le store.
  inject('hello', msg => console.log(`Hello ${msg}!`))
}
```

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/hello.js']
}
```

Maintenant le service `$hello` est accessible depuis le `context` et `this` dans les pages, les composants, les plugins, et les actions du store.

```js{}[example-component.vue]
export default {
  mounted() {
    this.$hello('mounted')
    // Va console.log 'Hello mounted!'
  },
  asyncData({ app, $hello }) {
    $hello('asyncData')
    // Si la version de Nuxt.js <= 2.12, il faut utiliser 👇
    app.$hello('asyncData')
  }
}
```

```js{}[store/index.js]
export const state = () => ({
  someValue: ''
})

export const actions = {
  setSomeValueToWhatever({ commit }) {
    this.$hello('store action')
    const newValue = 'whatever'
    commit('changeSomeValue', newValue)
  }
}
```

<base-alert>

Il faut bien faire attention à ne pas utiliser `Vue.use()`, `Vue.component()` ou quoi que ce soit d'autre à l'**intérieur** de cette fonction dédiée à l'injection de Nuxt.js. Sinon, cela causerait des fuites de mémoire côté serveur.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link_plugins_custom"></code-sandbox>
</app-modal>

## La propriété extendPlugins

On pourrait avoir envie de personnaliser les plugins ou changer l'ordre des plugins créé par Nuxt.js. Cette fonction accepte un tableau d'objets [plugins](/docs/2.x/configuration-glossary/configuration-plugins) et retourne la même chose, réarrangé.

Un exemple de changement de l'ordre des plugins:

```js{}[nuxt.config.js]
export default {
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(
      ({ src }) => src === '~/plugins/shouldBeFirst.js'
    )
    const shouldBeFirstPlugin = plugins[pluginIndex]

    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)

    return plugins
  }
}
```

### Mixins globaux

Des mixins globaux peuvent être facilement ajoutés aux plugins de Nuxt.js mais peuvent causer des soucis et des fuites de mémoire s'ils sont mal gérés. À chaque fois que l'on ajoute un mixin global à l'application, if faut bien faire attention à lui passer un flag pour éviter de l'enregistrer plusieurs fois:

```js{}[plugins/my-mixin-plugin.js]
if (!Vue.__my_mixin__) {
	Vue.__my__mixin__ = true
  Vue.mixin({ ... }) // On peut ensuite configurer le mixin
}
```

<quiz :questions="questions"></quiz>
