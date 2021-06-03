---
title: 'nuxt.renderAndGetWindow(url, options)'
description: Obtenha o `window` de um determinado URL de uma aplicação Nuxt.js.
menu: renderAndGetWindow
category: internals-glossary
position: 12
---

- Tipo: `Function`
- Argumento: `String`
  1. `String`: URL para renderizar
  2. _Opcional_, `Object`: options
  - virtualConsole: `Boolean` (padrão: `true`)
- Retorna: `Promise`
  - Retorna: `window`

> Obtenha o window de um determinado URL de uma aplicação Nuxt.js.

<base-alert>

Este método é feito para fins de teste.

</base-alert>

Para usar esta função, você deve instalar `jsdom`:

```bash
npm install --save-dev jsdom
```

Example:

```js
const { Nuxt, Builder } = require('nuxt')

const config = require('./nuxt.config.js')
config.dev = false

const nuxt = new Nuxt(config)

nuxt.renderAndGetWindow('http://localhost:3000').then(window => {
  // Exibe a head `<title>`
  console.log(window.document.title)
})
```
