---
title: serverMiddleware
description: Define server-side middleware.
menu: serverMiddleware
category: configuration-glossary
position: 27
---

- Type: `Array`
  - Items: `String` or `Object` or `Function`

Nuxt internally creates a [connect](https://github.com/senchalabs/connect) instance that you can add your own custom middleware to. This allows us to register additional routes (typically `/api` routes) **without need for an external server**.

Because connect itself is a middleware, registered middleware will work with both `nuxt start` and also when used as a middleware with programmatic usages like [express-template](https://github.com/nuxt-community/express-template). Nuxt [Modules](/docs/2.x/directory-structure/modules) can also provide `serverMiddleware` using [this.addServerMiddleware()](/docs/2.x/internals-glossary/internals-module-container#addservermiddleware-middleware)

Additional to them, we introduced a `prefix` option which defaults to `true`. It will add the router base to your server middlewares.

**Example:**

- Server middleware path: `/server-middleware`
- Router base: `/admin`
- With `prefix: true` (default): `/admin/server-middleware`
- With `prefix: false`: `/server-middleware`

## serverMiddleware vs middleware!

Don't confuse it with [routes middleware](/docs/2.x/directory-structure/middleware) which are called before each route by Vue in Client Side or SSR. Middleware listed in the `serverMiddleware` property runs server-side **before** `vue-server-renderer` and can be used for server specific tasks like handling API requests or serving assets.

<base-alert>

Do not add serverMiddleware to the middleware/ directory.

Middleware, are bundled by webpack into your production bundle and run on beforeRouteEnter. If you add serverMiddleware to the middleware/ directory it will be wrongly picked up by Nuxt as middleware and will add wrong dependencies to your bundle or generate errors.

</base-alert>

## Usage

If middleware is String Nuxt.js will try to automatically resolve and require it.

```js{}[nuxt.config.js]
import serveStatic from 'serve-static'

export default {
  serverMiddleware: [
    // Will register redirect-ssl npm package
    'redirect-ssl',

    // Will register file from project server-middleware directory to handle /server-middleware/* requires
    { path: '/server-middleware', handler: '~/server-middleware/index.js' },

    // We can create custom instances too
    { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ]
}
```

<base-alert type="warn">

If you don't want middleware to register for all routes you have to use Object form with specific path, otherwise nuxt default handler won't work!

</base-alert>

## Custom Server Middleware

It is also possible to write custom middleware. For more information See [Connect Docs](https://github.com/senchalabs/connect#appusefn).

Middleware (`server-middleware/logger.js`):

```js{}[server-middleware/logger.js]
export default function (req, res, next) {
  // req is the Node.js http request object
  console.log(req.url)

  // res is the Node.js http response object

  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  next()
}
```

```js{}[nuxt.config.js]
serverMiddleware: ['~/server-middleware/logger']
```

## Custom API endpoint

A server middleware can also extend Express. This allows the creation of REST endpoints.

```js{}[server-middleware/rest.js]
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())
app.all('/getJSON', (req, res) => {
  res.json({ data: 'data' })
})

module.exports = app
```

```js{}[nuxt.config.js]
serverMiddleware: [
  { path: "/server-middleware", handler: "~/server-middleware/rest.js" },
],
```

## Object Syntax

If your server middleware consists of a list of functions mapped to paths:

```js
export default {
  serverMiddleware: [
    { path: '/a', handler: '~/server-middleware/a.js' },
    { path: '/b', handler: '~/server-middleware/b.js' },
    { path: '/c', handler: '~/server-middleware/c.js' }
  ]
}
```

You can alternatively pass an object to define them, as follows:

```js
export default {
  serverMiddleware: {
    '/a': '~/server-middleware/a.js',
    '/b': '~/server-middleware/b.js',
    '/c': '~/server-middleware/c.js'
  }
}
```
