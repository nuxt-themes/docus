---
title: 'nuxt.renderAndGetWindow(url, options)'
description: Récupère la `window` d'une URL donnée de l'application Nuxt.js.
menu: nuxt.renderAndGetWindow
category: internals-glossary
position: 12
---

- Type : `Function`
- Argument : `String`
  1. `String` : URL à afficher
  2. _Optional_, `Object` : options
  - virtualConsole: `Boolean` (par défaut : `true`)
- Renvois : `Promise`
  - Renvois : `window`

> Récupère la `window` d'une URL donnée de l'application Nuxt.js.

<base-alert>

Cette méthode est faite à des fins de test.

</base-alert>

Pour utiliser cette fonction, vous devez installer `jsdom` :

```bash
npm install --save-dev jsdom
```

Exemple :

```js
const { loadNuxt } = require('nuxt')

async function init() {
  // Assuming you've already built your project
  const nuxt = await loadNuxt({ for: 'start' })
  await nuxt.listen(3000)
  const window = await nuxt.renderAndGetWindow('http://localhost:3000')
  // Display the head `<title>`
  console.log(window.document.title)
  nuxt.close()
}

init()
```
