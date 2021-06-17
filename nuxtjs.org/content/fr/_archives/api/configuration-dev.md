---
title: 'API : La propriété dev'
description: Défini le mode développement ou le mode production.
menu: dev
category: configuration
position: 106
---

- Type : `Boolean`
- Par défaut : `true`

> Défini le mode développement ou le mode production de Nuxt.js.

Cette propriété est surchargée par les [commandes `nuxt`](/guide/commands) :

- `dev` est forcé à `true` avec `nuxt`
- `dev` est forcé à `false` avec `nuxt build`, `nuxt start` et `nuxt generate`

Cette propriété devrait être utilisée [programmatiquement avec Nuxt.js](/api/nuxt) :

Exemple :

`nuxt.config.js`

```js
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

`server.js`

```js
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// Nous instancions Nuxt.js avec les options
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build seulement en mode dev
if (config.dev) {
  new Builder(nuxt).build()
}

// Écouter le serveur
app.listen(port, '0.0.0.0').then(() => {
  console.log(`Server is listening on port: ${port}`)
})
```

Puis dans votre `package.json` :

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server.js"
  }
}
```

Note : vous devez lancer `npm install --save-dev cross-env` pour faire fonctionner l'exemple ci-dessus. Si vous **ne** développez **pas** sur Windows vous pouvez retirer `cross-env` de vos scripts `start` et directement définir `NODE_ENV`.
