---
title: Outils de développement
description: Nuxt.js vous aide à rendre votre développement web agréable.
category: getting-started
position: 114
---

> Le test de votre application fait partie du développement web. Nuxt.js vous aide à le rendre aussi facile que possible.

## Tests de bout en bout

[AVA](https://github.com/avajs/ava) est un framework JavaScript de test puissant, mixé avec [jsdom](https://github.com/tmpvar/jsdom), nous pouvons les utiliser pour écrire des tests de bout en bout facilement.

Tout d'abord, nous devons ajouter AVA et jsdom en tant que dépendances de développement :

```bash
npm install --save-dev ava jsdom
```

Puis ajouter un script de test à notre `package.json` et configurer AVA pour compiler les fichiers que nous importons dans nos tests.

```javascript
"scripts": {
  "test": "ava",
},
"ava": {
  "files": [
    "test/**/*"
  ]
}
```

Nous allons écrire nos tests dans le répertoire `test` :

```bash
mkdir test
```

Imaginons que nous avons une page dans `pages/index.vue` :

```html
<template>
  <h1 class="red">Hello {{ name }} !</h1>
</template>

<script>
  export default {
    data() {
      return { name: 'World' }
    }
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

Lorsque nous lançons notre application avec `npm run dev` et que nous visitons http://localhost:3000, nous voyons notre titre `Hello World !` rouge.

Nous ajoutons notre fichier de test `test/index.test.js` :

```js
import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'

// Nous gardons une référence à Nuxt pour fermer
// le serveur à la fin du test
let nuxt = null

// Initialiser Nuxt.js et démarrer l'écoute sur localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (e) {}
  config.rootDir = rootDir // dossier du projet
  config.dev = false // build de production
  config.mode = 'universal' // application isomorphique
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// Exemple de test uniquement sur le HTML généré
test('Route / exits and render HTML', async t => {
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello World !</h1>'))
})

// Exemple de test via la vérification du DOM
test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello World !')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// Arrêter le serveur Nuxt
test.after('Closing server', t => {
  nuxt.close()
})
```

Nous pouvons désormais lancer nos tests :

```bash
npm test
```

jsdom a certaines limitations parce qu'il n'utilise pas de navigateur. Cependant, cela couvrira la plupart de nos tests. Si vous souhaitez utiliser un navigateur pour tester votre application, vous pouvez consulter [Nightwatch.js](http://nightwatchjs.org).

## ESLint et Prettier

> [ESLint](http://eslint.org) est un excellent outil pour garder votre code propre.

> [Prettier](https://prettier.io) est un reformateur de code très populaire.

Vous pouvez ajouter ESLint assez facilement avec Nuxt.js. Ajouter les dépendances npm :

```bash
npm install --save-dev babel-eslint eslint eslint-config-prettier eslint-loader eslint-plugin-vue eslint-plugin-prettier prettier
```

Puis, configurez ESLint via un fichier `.eslintrc.js` à la racine de votre projet :

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // préférez utiliser `plugin:vue/strongly-recommended` ou `plugin:vue/recommended` pour des règles strictes.
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { semi: false }]
  }
}
```

Ensuite, vous pouvez ajouter les scripts `lint` et `lintfix` au `package.json` :

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
}
```

Vous pouvez alors lancer `lint` pour simplement vérifier les erreurs :

```bash
npm run lint
```

ou `lintfix` pour aussi réparer celles qui sont corrigeables

```bash
npm run lintfix
```

ESLint va linter tous vos fichiers JavaScript et Vue sauf ceux ignorés par `.gitignore`.

Il est également recommandé d'activer ESLint en mode rechargement à chaud via webpack. De cette manière ESLint va s'exécuter au moment de la sauvegarde pendant le `npm run dev`. Ajoutez simplement le code suivant à votre `nuxt.config.js` :

```js
...
  /*
   ** Configuration de build
  */
  build: {
   /*
    ** Vous pouvez étendre la configuration webpack ici
   */
   extend(config, ctx) {
      // Exécuter ESLint lors de la sauvegarde
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
```

<div class="Alert Alert--orange">

Une bonne pratique est également d'ajouter `"precommit": "npm run lint"` dans `package.json` afin de linter votre code automatiquement avant de l'acter.

</div>
