---
title: 'API : nuxt.render(req, res)'
description: Vous pouvez utiliser Nuxt.js comme un middleware pour votre serveur Node.js.
menu: render
category: programmatically
position: 202
---

- Type : `Function`
- Arguments :
  1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- Valeur de retour : `Promise`

> Vous pouvez utiliser Nuxt.js comme un middleware avec `nuxt.render` pour votre serveur Node.js.

Exemple avec [Express](https://github.com/expressjs/express) :

```js
const { Nuxt, Builder } = require('nuxt')

const app = require('express')()
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000

// Nous instancions Nuxt.js avec les options
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// Faire le rendu chaque route avec Nuxt.js
app.use(nuxt.render)

// Faire le build seulement en mode de développement avec du rechargement à chaud
if (config.dev) {
  new Builder(nuxt).build().then(listen)
} else {
  listen()
}

function listen() {
  // Écouter le serveur
  app.listen(port, '0.0.0.0')
  console.log('Le serveur écoute sur `localhost:' + port + '`.')
}
```

<div class="Alert">

Il est recommandé d'appeler `nuxt.render` à la fin de vos middlewares ainsi il fera le rendu de votre application web et n'appellera pas `next()`.

</div>
