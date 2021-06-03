---
title: How to extend webpack config?
description: How to extend webpack config into my Nuxt.js application?
category: configuration
position: 5
---

You can extend nuxt's webpack configuration via the `extend` option in your `nuxt.config.js`. The `extend` option of the `build` property is a method that accepts two arguments. The first argument is the webpack `config` object exported from nuxt's webpack config. The second parameter is a context object with the following boolean properties: `{ isDev, isClient, isServer, loaders }`.

```js
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
```

The `extend` method gets called twice - Once for the client bundle and the other for the server bundle.

## Examples

#### Customize chunks configuration

You may want to tweak a bit [optimization configuration](/docs/2.x/configuration-glossary/configuration-build#optimization), avoiding to rewrite default object.

```js
export default {
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}
```
