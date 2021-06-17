---
title: Configuration
description: Par défaut, Nuxt.js est configuré pour couvrir la plupart des cas d'usage. Cette configuration par défaut peut être écrasée par un fichier nuxt.config.js.
position: 7
category: features
csb_link_host_port: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_host_port?fontsize=14&hidenavigation=1&theme=dark
csb_link_pre-processors: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_pre-processors?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Nous pouvons utiliser axios-module dans le fichier nuxt.config.js
    answers:
      - vrai
      - faux
    correctAnswer: faux
  - question: Quel est le hôte par défaut de Nuxt.js en développement ?
    answers:
      - localhost
      - 3000
      - '0'
    correctAnswer: localhost
  - question: Quel attribut doit-on définir dans la balise de style pour pouvoir utiliser du SCSS ?
    answers:
      - lang="scss"
      - language="scss"
      - style="scss"
    correctAnswer: lang="scss"
  - question: Quel est le port par défaut de Nuxt.js en développement ?
    answers:
      - 8000
      - 3000
      - localhost
    correctAnswer: 3000
  - question: Dans le fichier nuxt.config.js, quel est la propriété que l'on utilise pour ajouter globalement des fichiers CSS ?
    answers:
      - styles
      - css
      - globalCss
    correctAnswer: css
  - question: Nous pouvons utiliser du JSX dans notre application Nuxt.js
    answers:
      - vrai
      - faux
    correctAnswer: vrai
  - question: Dans le fichier nuxt.config.js, quelle propriété utilise-t-on pour personnaliser la configuration de webpack ?
    answers:
      - webpack.extend
      - build.extend
      - extend.build
    correctAnswer: build.extend
  - question: Quel est le fichier qui nous permet de spécifier des fichiers à ignorer par notre application Nuxt.js ?
    answers:
      - .ignore
      - .nuxtignore
      - .ignorenuxt
    correctAnswer: .nuxtignore
  - question: Si nous souhaitons ignorer le fichier about dans notre application Nuxt.js, quel préfixe faut-il utiliser ?
    answers:
      - _about.vue
      - -about.vue
      - __about.vue
    correctAnswer: -about.vue
---

Par défaut, Nuxt.js est configuré pour couvrir la plupart des cas d'usage. Cette configuration par défaut peut être écrasée par un fichier nuxt.config.js.

## La propriété `css`

Nuxt.js nous permet de définir globalement les fichiers/modules/librairies CSS que nous voulons (ceux qui seront inclus dans chaque page).

<base-alert>

Dans le cas où nous souhaitons utiliser du `SASS`, il faut vérifier que nous avons bien installé les paquets `node-sass` et `sass-loader`.

</base-alert>

Dans notre fichier `nuxt.config.js`, il faut ajouter les ressources CSS:

```js{}[nuxt.config.js]
export default {
  css: [
    // charge un module Node.js directement (ici c'est un fichier SASS)
    'bulma',
    // fichier CSS dans notre projet
    '~/assets/css/main.css',
    // fichier SCSS dans notre projet
    '~/assets/css/main.scss'
  ]
}
```

<base-alert>

Nuxt.js va automatiquement deviner le type de fichier par son extension et utiliser le loader du pré-processeur adéquat pour webpack. Nous aurons cependant besoin d'installer le loader requis si nous avons besoin de l'utiliser.

</base-alert>

### Extensions de Style

Nous pouvons omettre l'extension de nos fichiers CSS/SCSS/Postcss/Less/Stylus/... listés dans notre tableau `css`.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<base-alert>

Si nous avons deux fichiers du même nom, par ex `main.scss` et `main.css` et si nous ne spécifions par l'extension dans notre tableau `css` par ex `css: ['~/assets/css/main']` alors seulement un fichier sera chargé en fonction de l'ordre défini par `styleExtensions`. Dans ce cas, le fichier `css` sera chargé et le `scss` sera ignoré parce que l'extension `css` arrive en premier dans le tableau `styleExtension`.

</base-alert>

Ordre par défaut: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`

<app-modal>
  <code-sandbox :src="csb_link_pre-processors"></code-sandbox>
</app-modal>

## Pré-processeurs

Grâce au [loader Vue](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), nous pouvons utiliser n'importe quel type de pré-processeur pour notre `<template>` ou `<style>`, il faut utiliser l'attribut `lang` pour cela.

Voici l'exemple d'un fichier `pages/index.vue` utilisant du [pug](https://github.com/pugjs/pug) et du [SASS](http://sass-lang.com/):

```html{}[pages/index.vue]
<template lang="pug"> h1.red Salut {{ name }} !</template>

<style lang="scss">
  .red {
    color: red;
  }
</style>
```

Pour utiliser ces pré-processeurs, nous avons besoin d'installer leurs loaders Webpack:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D pug pug-plain-loader
yarn add -D node-sass sass-loader
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev pug pug-plain-loader
npm install --save-dev node-sass sass-loader
```

  </code-block>
</code-group>

## JSX

Nuxt.js utilise [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app), qui est basé sur l'officiel [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) pour une configuration de Babel par défaut, afin que nous puissions utiliser du JSX dans nos composants.

Nous pouvons aussi utiliser du JSX dans la méthode `render` des composants:

```js
<script>
export default {
  data () {
    return { name: 'Le monde' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

Abréger `createElement` par `h` est une convention commune que nous pouvons voir dans l'écosystème Vue mais c'est en fait optionnel pour du JSX car ce dernier [injecte automatiquement](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` dans n'importe quelle méthode et getter (pas les fonctions ni les fonctions fléchées) à condition qu'ils soient définis dans la syntaxe ES2015. Si c'est le cas, nous pouvons omettre le paramètre `h` dans le cas où nous utilisons du JSX.

Nous pouvons en apprendre davantage sur le fonction du JSX dans cette [section](https://vuejs.org/v2/guide/render-function.html#JSX) de la documentation de Vue.

## Ignorer des fichiers

### .nuxtignore

Nous pouvons utiliser un fichier `.nuxtignore` pour dire à Nuxt.js d'ignorer des `layout`, `page`, `store` et/ou `middleware` à la racine de notre projet (`rootDir`) durant la phase de build. Le fichier `.nuxtignore` est sujet aux mêmes spécifications qu'un `.gitignore` ou un `.eslintignore`, dans le sens où chaque ligne est un schéma (glob pattern) indiquant quels fichiers devraient être ignorés.

```markdown{}[.nuxtignore]
# ignore le layout foo.vue

layouts/foo.vue

# ignore les fichiers layout dont le nom finit par -ignore.vue

layouts/\*-ignore.vue

# ignore la page bar.vue

pages/bar.vue

# ignore les pages à l'intérieur du répertoire ignore

pages/ignore/\*.vue

# ignore le store baz.js

store/baz.js

# ignore les fichiers du store qui correspondent avec _.test._

store/ignore/_.test._

# ignore les fichiers middleware à l'intérieur du répertoire foo sauf foo/bar.js

middleware/foo/\*.js !middleware/foo/bar.js
```

### La propriété ignorePrefix

N'importe quel fichier dans `pages/`, `layout/`, `middleware/` ou `store/` sera ignoré durant le build si son nom de fichier commence par le préfixe spécifié par `ignorePrefix`.

Par défaut, tous les fichiers qui commencent par un `-` seront ignorés, tels que `store/-foo.js` et `pages/-bar.vue`. Cela permet de laisser cohabiter des tests, des utilitaires et des composants avec les appelants sans pour autant les convertir en des routes, des stores etc.

### La propriété `ignore`

Plus configurable que `ignorePrefix`: tous les fichiers qui correspondent au schéma (glob pattern) seront ignorés durant le build.

```js{}[nuxt.config.js]
export default {
  ignore: 'pages/bar.vue'
}
```

### ignoreOptions

Derrière `.nuxtignore` se cache `node-ignore`, ainsi `ignoreOptions` peut être configuré avec les mêmes options que `node-ignore`.

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```

## Personnaliser la configuration Webpack

Nous pouvons personnaliser la configuration webpack de Nuxt via l'option `extend` dans notre fichier `nuxt.config.js`, cette option est une méthode qui accepte deux arguments. Le premier argument est l'objet `config` de webpack exporté depuis la configuration webpack de Nuxt.js. Le second paramètre est un objet `context` contenant les propriétés booléennes suivantes: `{ isDev, isClient, isServer, loaders }`.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ...
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      if (isDev) {
        // asse Webpack en mode développement si `isDev` est vrai.
        config.mode = 'development'
      }
    }
  }
}
```

La méthode `extend` est appelée deux fois, une fois pour le bundle du client et une fois pour celui du serveur.

### Personnaliser la configuration des fragments

Nous souhaiterions peut-être customiser un peu la [configuration d'optimisation](/docs/2.x/configuration-glossary/configuration-build#optimization), en évitant de ré-écrire l'objet par défaut.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}
```

### Exécuter ESLint à chaque build de webpack dans un environnement de développement

Pour être au courant d'erreurs de style de code, nous pourrions avoir envie d'exécuter [ESLint](https://github.com/webpack-contrib/eslint-loader) à chaque build dans un environnement de développement.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
```

## Éditer l'hôte et le port

Par défaut, l'environnement de développement du hôte de Nuxt.js est `localhost`, qui n'est accessible qu'au sein de la machine hôte. Afin d'admirer notre application sur un autre appareil nous aurons besoin de modifier l'hôte.

Le hôte `'0.0.0.0'` a pour but de dire à Nuxt.js de résoudre une adresse hôte, afin de lui permettre d'être accessible à d'autres appareils en _dehors_ de la machine hôte (ex: LAN). Si le hôte est défini sur la chaîne de caractère `'0'` (pas `0`, qui lui est falsy) ou bien `'0.0.0.0'`, notre adresse IP locale sera assignée à notre application Nuxt.js.

```js{}[nuxt.config.js]
export default {
  server: {
    host: '0' // par défaut: localhost
  }
}
```

Nous pouvons aussi changer le port par défaut.

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000 // par défaut: 3000
  }
}
```

<base-alert type="info">

Si le hôte est défini sur la chaîne de caractère `'0'` (pas `0`, qui lui est falsy), un port aléatoire sera assigné à notre application Nuxt.js.

</base-alert>

Même si nous pouvons modifier cela dans le fichier `nuxt.config.js`, ce n'est pas conseillé car cela peut causer des soucis lors de l'hébergement de notre site. Il sera plutôt conseillé de modifier l'hôte et le port directement dans notre commande `dev`.

```bash
HOST=0 PORT=8000 npm run dev
```

ou créer un script dans notre `package.json`

```json
"scripts": {
  "dev:host": "nuxt --hostname '0' --port 8000"
}
```

<app-modal>
  <code-sandbox :src="csb_link_host_port"></code-sandbox>
</app-modal>

## Configuration Asynchrone

Même s'il est conseillé d'utiliser la configuration normale `export default {}`, nous pouvons utiliser une configuration asynchrone en exportant une fonction asynchrone qui retourne l'objet de configuration.

```js{}[nuxt.config.js]
import axios from 'axios'

export default async () => {
  const data = await axios.get('https://api.nuxtjs.dev/posts')
  return {
    head: {
      title: data.title
      //... le reste de la configuration
    }
  }
}
```

<base-alert>

L'`axios-module` ne peut pas être utilisé dans le fichier `nuxt.config.js`. Nous aurons besoin d'importer axios et de le configurer à nouveau.

</base-alert>

## Configuration avancée

<base-alert type="next">

Le fichier `nuxt.config.js` a bien plus d'option de customisation et de configuration ! Se référer aux clés présentes dans le [glossaire de configuration](/docs/2.x/configuration-glossary/configuration-build).

</base-alert>

<quiz :questions="questions"></quiz>
