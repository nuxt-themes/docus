---
title: Modules
description: Les modules sont des extensions de Nuxt.js qui peuvent étendre ses fonctionnalités de base et d'y ajouter des intégrations.
category: getting-started
position: 109
---

> Les modules sont des extensions de Nuxt.js qui peuvent étendre ses fonctionnalités de base et d'y ajouter des intégrations.

## Introduction

Lors du développement d'applications de production avec Nuxt, vous découvrirez bientôt que les fonctionnalités de base du framework ne sont pas suffisantes. Nuxt peut être étendu avec des options de configuration et des plugins, mais maintenir ces personnalisations à travers plusieurs projets est fastidieux, répétitif et prend du temps. D'un autre côté, prendre en charge les besoins de chaque projet en dehors de son conteneur rendrait Nuxt très complexe et difficile à utiliser.

C'est l'une des raisons pour lesquelles Nuxt fournit un système de modules d'ordre supérieur qui facilite l'extension du cœur. Les modules sont des fonctions simples qui sont appelées séquentiellement lors du démarrage de Nuxt. Le framework attend la fin de chaque module avant de continuer. De cette façon, les modules peuvent presque personnaliser tous les  
aspects de Nuxt. Grâce à la conception modulaire de Nuxt (basé sur [Tapable](https://github.com/webpack/tapable) de webpack), les modules peuvent facilement enregistrer des écouteurs pour certains points d'entrée comme l'initialisation du générateur. Les modules peuvent également remplacer les modèles, configurer webpack, ajouter des bibliothèques CSS et effectuer de nombreuses autres tâches utiles.

Mieux encore, les modules de Nuxt peuvent être injecté à l'intérieur de paquets npm. Cela les rends facile d'être réutiliser dans tous les projets et partager avec la communauté Nuxt, contribuant ainsi à créer un eco-système de modules complémentaires de bonne qualité.

Les modules sont parfaits si vous:

- Êtes un membre d'une **équipe agile** qui doit démarrer rapidement de nouveaux projets.
- Êtes fatigué de **ré-inventer** la roue pour des tâches communes comme l'intégration de Google Analytics.
- Êtes un adèpte de **l'Open Source** qui souhaite **partager** facilement son travail avec la communauté.
- Êtes un membre d'une **entreprise** qui valorise **la qualité** et **la ré-utilisabilité**.
- Êtes souvent contre les délais courts et que vous n'avez pas le temps d'entrer dans les détails de chaque nouvelle bibliothèque ou intégration.
- En avez assez de devoir gérer les modifications apportées aux interfaces de bas niveau, et avez besoin de chose qui **fonctionne simplement™**

## Liste des modules de Nuxt.js

L'équipe de Nuxt.js offre des modules **officielles** :

- [@nuxt/http](https://http.nuxtjs.org): Manière légère et universelle de réaliser des requêtes HTTP, basé sur [ky-universal](https://github.com/sindresorhus/ky-universal)
- [@nuxtjs/axios](https://axios.nuxtjs.org): Intégration sécurisée et facile d'Axios avec Nuxt.js pour effectuer des requêtes HTTP
- [@nuxtjs/pwa](https://pwa.nuxtjs.org): Boostez Nuxt avec une solution PWA fortement testée, mise à jour et stable
- [@nuxtjs/auth](https://auth.nuxtjs.org): Module d'authentification pour Nuxt.js, offrant différents schémas et stratégies

Une liste des modules de Nuxt.js créés par la communauté est disponible sur https://github.com/topics/nuxt-module

## Écrire un module basique

Comme déjà mentionné, les modules ne sont que des fonctions simples. Ils peuvent être empaquetés sous forme de module npm ou directement inclus dans le code source d'un projet.

**modules/simple.js**

```js
export default function SimpleModule(moduleOptions) {
  // Écrire votre code ici
}

// REQUIS si vous publiez le module en tant que paquet npm
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

Il s'agit de l'objet transmis à l'aide d'un tableau dans `modules` par l'utilisateur qui peut être utilisé pour personnalisé son comportement.

**`this.options`**

Vous pouvez accéder directement aux options de Nuxt à l'aide de cette référence. Il s'agit du contenu de l'utilisateur du fichier `nuxt.config.js` avec toutes les options par défaut assignés. Cela peut être utilisé pour partager les options entre les modules.

**`this.nuxt`**

Ceci est une référence à l'instance courante de Nuxt. Se référer à [la documentation de la classe Nuxt pour les méthodes disponibles](/api/internals-nuxt).

**`this`**

Contexte des modules. Veuillez consulter la documentation de la classe [ModuleContainer](/api/internals-module-container) pour les méthodes disponibles.

**`module.exports.meta`**

Cette ligne est **obligatoire** si vous publiez votre module en tant que paquet npm. Nuxt utilise en interne la méta-données pour mieux travailler avec votre paquet.

**nuxt.config.js**

```js
export default {
  modules: [
    // Utilisation simple
    '~/modules/simple'[
      // Passer des options directement
      ('~/modules/simple', { token: '123' })
    ]
  ]
}
```

Nous demandons ensuite à Nuxt de charger certains modules spécifiques pour un projet avec des paramètres optionnels comme options. Veuillez consulter la documentation [de configuration de modules](/api/configuration-modules) pour plus d'informations !

## Modules asynchrones

Tous les modules ne feront pas tout de manière synchrone. Par exemple, vous voudrez peut-être développer un module qui doit récupérer des données d'une API ou faire des appels asynchrones entrées/sorties. Pour ça, Nuxt supporte les modules asynchrones qui peuvent renvoyer une promesse ou un appel de retour.

## Modules de construction uniquement

Généralement, les modules ne sont requis que pendant le développement et la construction. Utiliser `buildModules` permet d'accélérer le démarrage de la production et de réduire considérablement la taille du `node_modules` pour les déploiements de production. Si vous êtes un auteur de module, il est fortement recommandé de suggérer aux utilisateurs d'installer votre paquet en tant que `devDependency` et d'utiliser `buildModules` à la place de `modules` dans `nuxt.config.js`.

Votre module est un `buildModule` sauf si:

- Il fournit un serveur
- Il doit enregistrer un écouteur d'execution à Node.js (Comme sentry)
- Il affecte le comportant de vue-renderer ou utilise un écouteur depuis l'espace de nom `server:` ou `vue-renderer:`
- Tout ce qui est en dehors de la portée de webpack (Astuce: les plugins et les modèles sont compilés et dans la portée de webpack)

<div class="Alert Alert--orange">

<b>NOTE:</b> Si vous comptez utiliser <code>buildModules</code> veuillez mentionner que cette fonctionnalité n'est disponible que depuis la version de Nuxt <b>v2.9</b>. Les utilisateurs disposant d'une version antérieure doivent mettre à jour Nuxt ou utiliser la section <code>modules</code>.

</div>

### Utiliser async/await

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // Vous pouvez faire des appels asynchrones ici en utilisant `async`/`await`
  const pages = await fse.readJson('./pages.json')
}
```

### Retourner une Promesse

```js
import axios from 'axios'

export default function asyncModule() {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Faire quelque chose en étandant les routes de Nuxt
    })
}
```

## Extraits courants

### Options de haut niveau

Parfois, il est plus pratique d'utiliser des options de premier niveau lors de l'enregistrement des modules dans `nuxt.config.js`. Cela nous permet de combiner plusieurs sources d'options.

**nuxt.config.js**

```js
export default {
  modules: [['@nuxtjs/axios', { anotherOption: true }]],

  // Le module axios en est conscient en utilisant `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```

**module.js**

```js
export default function (moduleOptions) {
  // `options` contiendra option1, option2 et anotherOption
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```

### Fournir des plugins

Il est courant que les modules fournissent un ou plusieurs plugins lorsqu'ils sont ajoutés. Par exemple, le module [bootstrap-vue](https://bootstrap-vue.js.org) nécessiterait de s'enregistrer dans Vue. Dans de telles situations, nous pouvons utiliser l'aide de `this.addPlugin`.

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue(moduleOptions) {
  // Enregistre le modèle `plugin.js`
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### Modèle de plugins

Les modèles et plugins enregistrés peuvent exploiter les [modèles lodash](https://lodash.com/docs/4.17.4#template) pour modifier conditionnellement la sortie des plugins enregistrés.

**plugin.js**

```js
// Modifier Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Code de développement uniquement
<% } %>
```

**module.js**

```js
import path from 'path'

export default function nuxtGoogleAnalytics(moduleOptions) {
  // Enregistre le modèle `plugin.js`
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt remplacera `options.ua` par `123` lors de la copie du plugin dans le projet
      ua: 123,

      // les parties conditionnelles du code de développement seront supprimées du code du plugin sur les builds de production
      debug: this.options.dev
    }
  })
}
```

### Ajouter une bibliothèque CSS

Si votre module fournit une bibliothèque CSS, assurez-vous de vérifier si l'utilisateur a déjà inclus la bibliothèque pour éviter les doublons, et ajoutez **une option pour désactiver** la bibliothèque CSS dans le module.

**module.js**

```js
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Ajout de Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Émettre des ressources

<!-- todo: up2date? -->

Nous pouvons enregistrer des plugins webpack pour émettre des ressources lors de la construction.

**module.js**

```js
export default function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // Cela générera `.nuxt/dist/info.txt' avec le contenu de la variable info.
        // La source peut aussi être tampon
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

### Enregistrer des chargements personnalisés webpack

Nous pouvons faire la même chose que `build.extend` dans`nuxt.config.js` en utilisant `this.extendBuild`.

**module.js**

```js
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // chargement de `.foo`
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Personnalisez les chargements existants
      // Reportez-vous au code source des composants internes de Nuxt:
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## Exécuter des tâches sur des écouteurs spécifiques

Votre module peut avoir besoin de faire des choses uniquement dans certaines conditions spécifiques et pas seulement lors de l'initialisation de Nuxt. Nous pouvons utiliser le puissant système d'écouteurs de Nuxt.js pour effectuer des tâches sur des événements spécifiques (basés sur [Hookable](https://github.com/nuxt-contrib/hookable)). Nuxt attendra votre fonction si elle retourne une promesse ou est définie en tant que `async`.

Voici quelques exemples de base :

```js
export default function myModule() {
  this.nuxt.hook('modules:done', moduleContainer => {
    // Cela sera appelé lorsque tous les modules auront fini de charger
  })

  this.nuxt.hook('render:before', renderer => {
    // Appelé après la création du moteur de rendu
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // Appelé avant le démarrage du compilateur (par défaut: webpack)
  })

  this.nuxt.hook('generate:before', async generator => {
    // Ce sera appelé avant que Nuxt génère vos pages
  })
}
```

## Commandes de paquets de module

**Expérimentale**

À partir de la version `v2.4.0`, vous pouvez ajouter des commandes nuxt personnalisées via le paquet d'un module Nuxt. Pour ce faire, vous devez suivre l'API `NuxtCommand` lors de la définition de votre commande. Un exemple simple placé hypothétiquement dans `my-module/bin/command.js` ressemble à ceci :

```js
#!/usr/bin/env node

const consola = require('consola')
const { NuxtCommand } = require('@nuxt/cli')

NuxtCommand.run({
  name: 'command',
  description: 'My Module Command',
  usage: 'command <foobar>',
  options: {
    foobar: {
      alias: 'fb',
      type: 'string',
      description: 'Simple test string'
    }
  },
  run(cmd) {
    consola.info(cmd.argv)
  }
})
```

Quelques points importants ici. Tout d'abord, notez l'appel à `/usr/bin/env` pour récupérer l'exécutable Node. Notez également que la syntaxe du module ES ne peut pas être utilisée pour les commandes, sauf si vous incorporez manuellement [`esm`](https://github.com/standard-things/esm) dans votre code.

Ensuite, vous remarquerez comment `NuxtCommand.run()` est utilisé pour spécifier les paramètres et le comportement de la commande. Les options sont définies dans `options`, qui sont analysées via [`minimist`](https://github.com/substack/minimist). Une fois les arguments analysés, `run()` est automatiquement appelé avec l'instance `NuxtCommand` comme premier paramètre.

Dans l'exemple ci-dessus, `cmd.argv` est utilisé pour récupérer les arguments de ligne de commande analysés. Il y a plus de méthodes et de propriétés dans `NuxtCommand` - une documentation à leur sujet sera fournie à mesure que cette fonctionnalité sera testée et améliorée.

Pour rendre votre commande reconnaissable par la CLI Nuxt, répertoriez-la dans la section `bin` de votre package.json, en utilisant la convention `nuxt-module`, où `module` se rapporte au nom de votre paquet. Avec ce binaire central, vous pouvez utiliser `argv` pour analyser plus de `sous-commandes` pour votre commande si vous le souhaitez.

```js
{
  "bin": {
    "nuxt-foobar": "./bin/command.js"
  }
}
```

Une fois votre paquet installé (via npm ou Yarn), vous pourrez exécuter `nuxt foobar ...` sur la ligne de commande.

<div class="Alert">

Il y a beaucoup plus d'écouteurs et de possibilités pour les modules. Veuillez lire [Nuxt Internes](/api/internals) pour en savoir plus sur l'API interne de Nuxt.

</div>
