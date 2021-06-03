---
title: 'nuxt.renderRoute(route, context)'
description: Renderiza una ruta específica con un contexto dado.
menu: renderRoute
category: internals-glossary
position: 11
---

- Tipo: `Function`
- Argumentos:
  1. `String` : Ruta a renderizar
  2. _Optional_, `Object`, contexto dado, llaves disponibles: `req` y `res`
- Devuelve: `Promise`
  - `html`: `String`
  - `error`: `null` o `Object`
  - `redirected`: `false` o `Object`

> Renderiza una ruta específica con un contexto dado.

Este método se debe utilizar principalmente con fines de prueba, así como con [`nuxt.renderAndGetWindow`](/docs/2.x/internals-glossary/nuxt-render-and-get-window).

<base-alert>

`nuxt.renderRoute` debe ejecutarse después del proceso de construcción en modo de producción.

</base-alert>

```js
const { loadNuxt, build } = require('nuxt')

async function start() {
  // Obtener la instancia de nuxt para iniciar (modo de producción)
  // Asegúrese de haber ejecutado `nuxt build` antes de ejecutar este script
  const nuxt = await loadNuxt({ for: 'start' })

  const { html, error, redirected } = await nuxt.renderRoute('/')

  // `html` siempre será un string

  // `error` no es nulo cuando se muestra el diseño de error, el formato de error es:
  // { statusCode: 500, message: 'My error message' }

  // `redirected` no es `false` cuando `redirect()` ha sido usado en `asyncData()` o `fetch()`
  // { path: '/other-path', query: {}, status: 302 }
}

start()
```

### Que sigue

<base-alert type="next">

Consulte el [glosario de componentes](/docs/2.x/components-glossary/pages-fetch)

</base-alert>
