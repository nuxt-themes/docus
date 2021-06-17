---
title: modules
description: Nuxt.js fournit un système de modules d'ordre supérieur qui permet de personnaliser son fonctionnement interne. Les modules sont des fonctions qui sont appelées de manière séquentielle lors du démarrage de Nuxt.js.
position: 9
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/10_modules?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/modules.svg
imgAlt: modules-in-nuxt-js
questions:
  - question: Quand les modules sont-ils appellés ?
    answers:
      - avant que Nuxt.js ne démarre
      - pendant que Nuxt.js s'exécute
      - au démarrage de Nuxt.js
    correctAnswer: avant que Nuxt.js ne démarre
  - question: Les modules de Nuxt.js peuvent être intégrés dans des packages npm
    answers:
      - true
      - false
    correctAnswer: true
  - question: Dans le fichier nuxt.config.js, à quelle propriété ajoute-t-on nos modules ?
    answers:
      - nuxtModules
      - modules
      - plugins
    correctAnswer: modules
  - question: Dans le fichier nuxt.config.js, l'ordre dans lequel on ajoute nos modules est important.
    answers:
      - true
      - false
    correctAnswer: true
  - question: Où devons-nous ajouter les modules qui sont seulement requis durant le développement et lors du build ?
    answers:
      - modules
      - build
      - buildModules
    correctAnswer: buildModules
  - question: Que sont concrètement les modules ?
    answers:
      - des tableaux
      - des fonctions
      - des plugins
    correctAnswer: des fonctions
  - question: Que faut-il utiliser lorsque l'on veut faire certaines choses mais seulement dans des conditions spécifiques et pas seulement durant l'initialisation de Nuxt.js ?
    answers:
      - plugins
      - hooks
      - asyncData
    correctAnswer: hooks
  - question: Les modules peuvent
    answers:
      - seulement être utilisés en tant que packages npm
      - peuvent être seulement inclus directement dans le code source de notre projet
      - les deux
    correctAnswer: les deux
  - question: Quelle ligne est requise si l'on publie notre module en tant que package npm ?
    answers:
      - module.exports
      - module.exports.meta
      - module.exports.module
    correctAnswer: module.exports.meta
  - question: On peut dire à Nuxt.js de charger des modules en passant des paramètres optionnels en tant qu'options
    answers:
      - true
      - false
    correctAnswer: true
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Lors du développement d'applications complexes avec Nuxt.js, on pourrait finir par trouver que les fonctionnalités principales du framework ne sont pas suffisantes. Nuxt.js peut donc être personnalisé avec des options de configuration et des plugins, mais maintenir ces personnalisations à travers plusieurs projets est pénible, répétitif et chronophage. D'autre part, supporter les besoin de n'importe quel projet par défaut rendrait Nuxt.js très complexe et difficile à utiliser.

Ces raisons font que Nuxt.js nous fournit un système de modules d'ordre supérieur qui permet de personnaliser son fonctionnement interne. Les modules sont des fonctions qui sont appelées de manière séquentielle lors du démarrage de Nuxt.js. Le framework attend que chaque module ait fini avant de procéder. Ainsi, les modules peuvent personnaliser presque n'importe quel aspect du projet. Grâce au design modulaire de Nuxt.js (basé sur [Tapable](https://github.com/webpack/tapable) de Webpack), les modules peuvent facilement utiliser des hooks pour certains points d'entrée tel que l'initialisation du builder. Les modules peuvent aussi écraser les templates, paramétrer les loaders de Webpack, ajouter des librairies CSS et faire plein d'autres tâches utiles.

Et surtout, les modules de Nuxt.js peuvent être intégrés dans des packages npm. Cela rend possible leur réutilisation à travers plusieurs projets ainsi que la possibilité de partager avec la communauté, en créant un écosystème d'add-ons de haute qualité.

## La propriété modules

Les modules sont des extensions Nuxt.js qui peuvent personnaliser le fonctionnement interne du framework et ajouter un nombre infini d'intégrations. Une fois le module installé, on peut l'ajouter au fichier `nuxt.config.js` à la propriété `modules`.

```js{}[nuxt.config.js]
export default {
  modules: [
    // en utilisant le nom du package
    '@nuxtjs/axios',

    // de manière relative par rapport au répertoire source du projet (srcDir)
    '~/modules/awesome.js',

    // on peut lui passer des options
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // ou le définir directement
    function () {}
  ]
}
```

<base-alert type="info">

Les développeurs fournissent la plupart du temps des étapes et détails additionnels pour l'utilisation des modules.

</base-alert>

Nuxt.js essaie de résoudre chaque élément qui est présent dans le tableau des modules en utilisant `require path` de Node (dans les `node_modules`) et résout ensuite en partant du `srcDir` du projet si un alias `@` est utilisé.

<base-alert>

Les modules sont exécutés de manière séquentielle, l'ordre est donc important.

</base-alert>

Les modules doivent exporter une fonction pour permettre d'améliorer le build/runtime et peuvent (optionnel) aussi retourner une promesse en attendant que leur job ne soit terminé. À noter qu'ils seront importés au runtime, donc ils doivent déjà être transpilés s'ils utilisent des fonctionnalités modernes (ex: ES6).

## Écrire votre propre Module

Les modules sont des fonctions. Ils peuvent être emballés en tant que modules npm ou directement ajoutés dans le code source du projet.

```js{}[nuxt.config.js]
export default {
  exampleMsg: 'salut',
  modules: [
    // Usage simple
    '~/modules/example',
    // Ici, on passe des options directement
    ['~/modules/example', { token: '123' }]
  ]
}
```

```js{}[modules/example.js]
export default function ExampleModule(moduleOptions) {
  console.log(moduleOptions.token) // '123'
  console.log(this.options.exampleMsg) // 'salut'

  this.nuxt.hook('ready', async nuxt => {
    console.log('Nuxt est prêt')
  })
}

// REQUIS si l'on publie le module en tant que package npm
module.exports.meta = require('./package.json')
```

## 1) ModuleOptions

`moduleOptions`: c'est l'objet passé par l'utilisateur au travers du tableau `modules`. On peut l'utiliser pour personnaliser son comportement.

### Options de niveau supérieur

Parfois, il est plus pratique d'utiliser des options de niveau supérieur lors de la déclaration des modules dans le fichier `nuxt.config.js`. Cela nous permet de combiner plusieurs sources d'options.

```js{}[nuxt.config.js]
export default {
  modules: [['@nuxtjs/axios', { uneAutreOption: true }]],

  // le module axios est au courant de ceci car il utilise `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```

## 2) this.options

`this.options`: on peut directement accéder aux options de Nuxt.js en utilisant cette référence. Cela contient le contenu du fichier `nuxt.config.js` de l'utilisateur avec toutes les options par défaut qui lui sont assignées. Cela peut être utilisé pour partager des options entre les modules.

```js{}[module.js]
export default function (moduleOptions) {
  // `options` va contenir option1, option2 et uneAutreOption
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```

### Ajouter une librairie CSS

Si votre module fournit une librairie CSS, il faut s'assurer de vérifier si l'utilisateur l'a déjà inclus pour éviter des doublons ainsi qu'ajouter une option pour la désactiver.

```js{}[module.js]
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Ajoute Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Émettre des ressources

We can register webpack plugins to emit assets during build.
On peut paramétrer les plugins de Webpack afin qu'ils émettent des ressources durant le build.

```js{}[module.js]
export default function (moduleOptions) {
  const info = 'Buildé par un super module - 1.3 alpha le ' + Date.now()

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // Cela va générer un `.nuxt/dist/info.txt' avec le contenu de la variable info.
        // La source peut aussi être un buffer
        compilation.assets['info.txt'] = {
          source: () => info,
          size: () => info.length
        }

        cb()
      })
    }
  })
}
```

## 3) this.nuxt

`this.nuxt`: ceci est une référence à l'instance actuelle de Nuxt.js. On peut attacher des hooks à certains événements du lifecycle.

- **Ready** : Nuxt est prêt à être utilisé (ModuleContainer et Renderer sont prêts).

```js
nuxt.hook('ready', async nuxt => {
  // Votre code personnalisé ici
})
```

- **Error**: une erreur non générée est survenue durant un hook.

```js
nuxt.hook('error', async error => {
  // Votre code personnalisé ici
})
```

- **Close**: l'instance de Nuxt.js s'arrête proprement.

```js
nuxt.hook('close', async nuxt => {
  // Votre code personnalisé ici
})
```

- **Listen**: le serveur interne de Nuxt.js commence à écouter (lorsque l'on utilise `nuxt start` ou `nuxt dev`).

```js
nuxt.hook('listen', async (server, {host, port})) => {
  // Votre code personnalisé ici
})
```

`this`: le contexte des modules. Tous les modules seront appelés au sein du contexte de l'instance de `ModuleContainer`.

Plus d'informations pour les méthodes disponibles sont présents dans la documentation du [ModuleContainer](/docs/2.x/internals-glossary/internals-module-container).

### Exécuter certaines actions lors de hooks spécifiques

Notre module pourrait avoir besoin de faire des choses seulement dans des conditions spécifiques et pas seulement durant l'initialisation de Nuxt.js. On peut utiliser les puissants hooks de Nuxt.js grâce à [hookable](https://github.com/nuxt-contrib/hookable). Nuxt.js attendra la fin de la fonction si elle retourne une Promesse ou qu'elle est définie en tant que fonction asynchrone.

Voici quelques exemples basiques:

```js{}[modules/myModule.js]
export default function myModule() {
  this.nuxt.hook('modules:done', moduleContainer => {
    // Ceci sera appelé lorsque tous les modules auront fini de charger
  })

  this.nuxt.hook('render:before', renderer => {
    // Ceci sera appelé après que le renderer soit créé
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // Ceci sera appelé avant que le compilateur (par défaut: Webpack) ne commence
  })

  this.nuxt.hook('generate:before', async generator => {
    // Ceci sera appelé avant que Nuxt.js ne génère nos pages
  })
}
```

### Ajouter des plugins

Il est commun que des modules arrivent avec un ou plusieurs plugins lorsqu'ils sont ajoutés. Par exemple, le module [bootstrap-vue](https://bootstrap-vue.js.org/) demandera à être enregistré dans Vue. Dans ces cas là, on peut utiliser le helper `this.addPlugin`.

```js{}[plugin.js]
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

```js{}[module.js]
import path from 'path'

export default function nuxtBootstrapVue(moduleOptions) {
  // Enregistrer le template `plugin.js`
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### Les plugins de template

Les templates et plugins enregistrés peuvent peuvent bénéficier des [templates lodash](https://lodash.com/docs/4.17.4#template) pour changer conditionnellement les plugins finaux à être enregistrés.

```js{}[plugin.js]
// Définition du code UA pour Google Analytics
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Code uniquement disponible en développement
<% } %>
```

```js{}[module.js]
import path from 'path'

export default function nuxtGoogleAnalytics(moduleOptions) {
  // Enregistrer le template `plugin.js`
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt.js remplacera `options.ua` avec `123` lors de la copie du plugin dans le projet
      ua: 123,

      // les parties conditionnelles lors du développement seront enlevées du code du plugin lors d'un build en production
      debug: this.options.dev
    }
  })
}
```

### Enregistrer des loaders personnalisés pour Webpack

On peut faire pareil que `build.extend` dans le fichier `nuxt.config.js` en utilisant `this.extendBuild`.

```js{}[module.js]
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // Loader `.bidule`
      config.module.rules.push({
        test: /\.bidule$/,
        use: [...]
      })

      // Personnalisation de loaders existants
      // Se référer au code source du fonctionnement interne de Nuxt:
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## Modules asynchrones

Tous les modules ne feront pas des choses synchrones. Par exemple, on pourrait avoir envie de développer un module qui a besoin de récupérer de la data depuis une API. C'est pour cela que Nuxt.js supporte les modules asynchrones qui peuvent retourner une Promesse ou appeler un callback.

### Use async/await

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // On peut écrire du code asynchrone ici en utilisant `async`/`await`
  const pages = await fse.readJson('./pages.json')
}
```

### Retourner une promesse

```js
export default function asyncModule($http) {
  return $http
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Faire quelques de personnalisé avec les routes de Nuxt.js
    })
}
```

<base-alert type="info">

Il y a beaucoup de hooks et de possibilités pour les modules. Se référer au [fonctionnement interne](/docs/2.x/internals-glossary/internals) pour comprendre davantage l'API de Nuxt.js.

</base-alert>

## Publication de votre module

`module.exports.meta`: Cette ligne est requise si l'on veut publier le module en tant que package npm. Nuxt.js utilise `meta` en interne afin de fonctionner au mieux avec votre package.

```js{}[modules/myModule.js]
module.exports.meta = require('./package.json')
```

## buildModules

Certains modules sont importés seulement lors du développement et du build. Utiliser `buildModules` permet de démarrer un projet en production plus rapidement et réduit aussi significativement la taille des `node_modules` pour les déploiements en production. Se référer à la documentation de chaque module pour voir s'il est recommandé d'utiliser `modules` ou `buildModules`.

La différence à l'utilisation est la suivante:

- Au lieu d'ajouter aux `modules` à l'intérieur du fichier `nuxt.config.js`, il faut utiliser `buildModules`

```js{}[nuxt.config.js]
export default {
  buildModules: ['@nuxtjs/eslint-module']
}
```

- Au lieu d'ajouter aux `dependencies` à l'intérieur du fichier `package.json`, il faut utiliser `devDependencies`

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D @nuxtjs/eslint-module
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev @nuxtjs/eslint-module
```

  </code-block>
</code-group>

<base-alert type="info">

Si l'on est l'auteur d'un module, il est hautement recommandé de suggérer à vos utilisateurs d'installer votre package en tant que `devDependency` et d'utiliser `buildModules` au lieu de `modules`.

</base-alert>

Un module est un `buildModule` à moins que:

- il fournit un `serverMiddleware`
- il y a besoin d'enregistrer un runtime hook de Node.js (tel que [Sentry](https://sentry.io/))
- il affecte le comportement de `vue-renderer` ou utilise un hook avec un de ces deux namespaces: `server:` ou `vue-renderer:`.
- tout ce qui est en dehors du scope de Webpack (astuce: les plugins et les templates sont compilés, ils font donc partie du scope de Webpack)

<base-alert> 

Si vous vous apprêtez à offrir un `buildModules`, veuillez noter que cette fonctionnalité est disponible depuis seulement la version 2.9. Les versions plus anciennes devront mettre à jour Nuxt.js ou utiliser la section `modules`.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
