---
title: 'API : nuxt.renderRoute(route, context)'
description: Faire le rendu d'une route spécifique avec un contexte donné.
menu: renderRoute
category: programmatically
position: 203
---

- Type : `Function`
- Arguments :
  1. `String` : route sur laquelle faire le rendu
  2. _Optionnel_, `Object`, donne le contexte, propriétés disponibles : `req` & `res`
- Valeur de retour : `Promise`
  - `html`: `String`
  - `error`: `null` ou `Object`
  - `redirected`: `false` ou `Object`

> Faire le rendu d'une route spécifique avec un contexte donné.

Cette méthode devrait être utilisée en particulier pour les [tests](guide/development-tools#tests-de-bout-en-bout) aussi bien que [`nuxt.renderAndGetWindow`](/api/nuxt-render-and-get-window).

<div class="Alert Alert--orange">

`nuxt.renderRoute` devrait être exécuté après le processus de build en mode production (`dev: false`).

</div>

Exemple :

```js
const { Nuxt, Builder } = require('nuxt')

const config = require('./nuxt.config.js')
config.dev = false

const nuxt = new Nuxt(config)

new Builder(nuxt)
  .build()
  .then(() => nuxt.renderRoute('/'))
  .then(({ html, error, redirected }) => {
    // `html` sera toujours une chaine de caractères
    // `error` sera non `null` quand le layout d'erreur est affiché, le format d'erreur est :
    // { statusCode: 500, message: 'Mon message d\'erreur' }
    // `redirected` n'est pas `false` quand `redirect()` est utilisé dans `asyncData()` ou `fetch()`
    // { path: '/other-path', query: {}, status: 302 }
  })
```
