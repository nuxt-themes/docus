---
title: 'nuxt.render(req, res)'
description: Vous pouvez utiliser Nuxt.js comme middleware pour votre serveur Node.js.
menu: nuxt.render
category: internals-glossary
position: 10
---

- Type: `Function`
- Arguments:
  1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- Returns: `Promise`

> Vous pouvez utiliser Nuxt.js avec `nuxt.render` comme middleware pour votre serveur Node.js.

Exemple avec [Express](https://github.com/expressjs/express):

```js
const { loadNuxt, build } = require('nuxt')

const app = require('express')()
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function start() {
  // Nous obtenons l'instance Nuxt
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // On fournit chaque route avec Nuxt.js
  app.use(nuxt.render)

  // Construit uniquement en mode développement avec rechargement à chaud
  if (isDev) {
    build(nuxt)
  }
  // Écoute le serveur
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}

start()
```

<div class="Alert">

Il est recommandé d'appeler `nuxt.render` à la fin de vos middlewares car il s'occupera du rendu de votre application web et n'appellera pas `next()`.

</div>
