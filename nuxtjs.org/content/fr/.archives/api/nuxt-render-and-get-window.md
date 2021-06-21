---
title: 'API: nuxt.renderAndGetWindow(url, options)'
description: Obtient la `window` depuis un URL donné d'une application Nuxt.js.
menu: renderAndGetWindow
category: programmatically
position: 204
---

- Type : `Function`
- Argument : `String`
  1. `String` : l'URL à rendre
  2. _Optional_, `Object` : options
  - virtualConsole : `Boolean` (par défaut : `true`)
- Valeur de retour : `Promise`
  - Valeur de retour : `window`

> Obtient la `window` à un URL donnée d'une application Nuxt.js.

<div class="Alert Alert--orange">

Cette méthode est faite pour les [tests](guide/development-tools#tests-de-bout-en-bout).

</div>

Pour utiliser cette fonction, vous devez installer `jsdom` :

```bash
npm install --save-dev jsdom
```

Exemple :

```js
const { Nuxt, Builder } = require('nuxt')

const config = require('./nuxt.config.js')
config.dev = false

const nuxt = new Nuxt(config)

nuxt.renderAndGetWindow('http://localhost:3000').then(window => {
  // Afficher l'entête `<title>`
  console.log(window.document.title)
})
```
