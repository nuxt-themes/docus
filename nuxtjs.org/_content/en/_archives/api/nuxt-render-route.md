---
title: 'nuxt.renderRoute(route, context)'
description: Render a specific route with a given context.
menu: renderRoute
category: programmatically
position: 203
---

- Type: `Function`
- Arguments:
  1. `String` : route to render
  2. _Optional_, `Object`, context given, available keys: `req` & `res`
- Returns: `Promise`
  - `html`: `String`
  - `error`: `null` or `Object`
  - `redirected`: `false` or `Object`

> Render a specific route with a given context.

This method should be used mostly for [test purposes](/guide/development-tools#end-to-end-testing) as well with [`nuxt.renderAndGetWindow`](/api/nuxt-render-and-get-window).

<div class="Alert Alert--orange">

`nuxt.renderRoute` should be executed after the build process in production mode.

</div>

Example:

```js
const { loadNuxt, build } = require('nuxt')

async function start() {
  // Get nuxt instance for start (production mode)
  // Make sure to have run `nuxt build` before running this script
  const nuxt = await loadNuxt({ for: 'start' })

  const { html, error, redirected } = await nuxt.renderRoute('/')

  // `html` will always be a string

  // `error` not null when the error layout is displayed, the error format is:
  // { statusCode: 500, message: 'My error message' }

  // `redirected` is not `false` when `redirect()` has been used in `asyncData()` or `fetch()`
  // { path: '/other-path', query: {}, status: 302 }
}

start()
```
