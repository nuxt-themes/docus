---
title: 'La propiedad dev'
description: Define el modo desarrollo o producción.
menu: dev
category: configuration-glossary
position: 6
---

- Tipo: `Boolean`
- Por defecto: `true`

> Define el mode desarrollo o producción de Nuxt.js.

Esta propiedad es sobreescrita por los comandos nuxt:

- `dev` es forzado a `true` con `nuxt`
- `dev` es forzado a `false` con `nuxt build`, `nuxt start` y `nuxt generate`

Esta propiedad debería usarse al emplear [Nuxt.js programáticamente](/docs/2.x/internals-glossary/nuxt):

```js{}[nuxt.config.js]
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

```js{}[server.js]
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// Instanciamos Nuxt.js con las opciones
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build sólo en modo dev
if (config.dev) {
  new Builder(nuxt).build()
}

// El servidor escucha
app.listen(port, '0.0.0.0').then(() => {
  console.log(`El servidor está escuchando en el puerto: ${port}`)
})
```

```json{}[package.json]
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "NODE_ENV=production node server.js"
  }
}
```
