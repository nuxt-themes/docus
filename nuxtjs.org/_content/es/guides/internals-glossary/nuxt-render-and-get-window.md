---
title: 'nuxt.renderAndGetWindow(url, options)'
description: Obtener `window` de una URL determinada de una aplicación Nuxt.js.
menu: renderAndGetWindow
category: internals-glossary
position: 12
---

- Tipo: `Function`
- Argumento: `String`
  1. `String`: URL para renderizar
  2. _Optional_, `Object`: opciones
  - virtualConsole: `Boolean` (por defecto: `true`)
- Devulve: `Promise`
  - Devuelve: `window`

> Obtenga la ventana de una URL determinada de una aplicación Nuxt.js.

<base-alert>

Este método está hecho para propósitos de prueba.

</base-alert>

Para usar esta función debes instalar `jsdom`:

```bash
npm install --save-dev jsdom
```

Ejemplo:

```js
const { Nuxt, Builder } = require('nuxt')

const config = require('./nuxt.config.js')
config.dev = false

const nuxt = new Nuxt(config)

nuxt.renderAndGetWindow('http://localhost:3000').then(window => {
  // Muestra `<title>` en head
  console.log(window.document.title)
})
```
