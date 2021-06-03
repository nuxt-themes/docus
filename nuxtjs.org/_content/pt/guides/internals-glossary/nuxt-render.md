---
title: 'nuxt.render(req, res)'
description: Você pode usar Nuxt.js como um middleware para seu servidor Node.js.
menu: render
category: internals-glossary
position: 10
---

- Tipo: `Function`
- Argumentos:
  1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- Retorna: `Promise`

> Você pode usar Nuxt.js como um middleware com `nuxt.render` para seu servidor node.js.

Exemplo com [Express](https://github.com/expressjs/express):

```js
const { loadNuxt, build } = require('nuxt')

const app = require('express')()
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function start() {
  // Obtemos instância Nuxt
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // Renderiza todas as rotas com o Nuxt.js
  app.use(nuxt.render)

  // Build com hot-reloading, apenas no modo dev
  if (isDev) {
    build(nuxt)
  }

  // Ouça o servidor
  app.listen(port, '0.0.0.0')
  console.log('Servidor escutando em `localhost:' + port + '`.')
}

start()
```

<div class="Alert">

É recomendado chamar `nuxt.render` no final de seus middlewares, uma vez que ele irá lidar com a renderização de sua aplicação web e não chamará `next()`

</div>
