---
title: 'nuxt.render(req, res)'
description: Puedes usar Nuxt.js como middleware para tu servidor Node.js.
menu: render
category: internals-glossary
position: 10
---

- Tipo: `Function`
- Argumentos:
  1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- Devuelve: `Promise`

> Puedes usar Nuxt.js como middleware con `nuxt.render` para tu servidor de node.js.

Ejemplo con [Express](https://github.com/expressjs/express):

```js
const { loadNuxt, build } = require('nuxt')

const app = require('express')()
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function start() {
  // Obtenemos la instancia de Nuxt
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // Renderizamos cada ruta con Nuxt.js
  app.use(nuxt.render)

  // Compila solo en modo dev con recarga en caliente
  if (isDev) {
    build(nuxt)
  }
  // Escucha el servidor
  app.listen(port, '0.0.0.0')
  console.log('Servidor escuchando en `localhost:' + port + '`.')
}

start()
```

<div class="Alert">

Se recomienda llamar a `nuxt.render` al final de sus middlewares ya que manejará la representación de su aplicación web y no llamará a`next ()`

</div>
