---
title: La propriété dev
description: Définit le mode, développement ou production.
menu: dev
category: configuration-glossary
position: 6
---

- Type: `Boolean`
- Par défaut: `true`

> Définit le mode, développement ou production.

Cette propriété est écrasée par les commandes `nuxt`:

- `dev` est forcé à `true` avec `nuxt`
- `dev` est forcé à `false` avec `nuxt build`, `nuxt start` et `nuxt generate`

Cette propriété devrait être utilisée lorsque l'on utilise Nuxt de [manière programmatique](/docs/2.x/internals-glossary/nuxt):

```js{}[nuxt.config.js]
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

```js{}[server.js]
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// on instancie Nuxt.js avec les options
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// on ne build qu'en mode développement
if (config.dev) {
  new Builder(nuxt).build()
}

// on écoute le serveur
app.listen(port, '0.0.0.0').then(() => {
  console.log(`Le serveur écoute sur le port: ${port}`)
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
