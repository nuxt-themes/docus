---
title: 'nuxt.render(req, res)'
description: You can use Nuxt.js as a middleware for your Node.js server.
menu: render
category: internals-glossary
position: 10
---

- Type: `Function`
- Arguments:
  1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- Returns: `Promise`

> You can use Nuxt.js as a middleware with `nuxt.render` for your Node.js server.

Example with [Express](https://github.com/expressjs/express):

```js
const { loadNuxt, build } = require('nuxt')

const app = require('express')()
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function start() {
  // We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // Render every route with Nuxt.js
  app.use(nuxt.render)

  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }
  // Listen the server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}

start()
```

<div class="Alert">

It's recommended to call `nuxt.render` at the end of your middlewares since it will handle the rendering of your web application and won't call `next()`

</div>
