---
title: How to add webpack plugins?
description: How to add webpack plugins into my Nuxt.js application?
category: configuration
position: 6
---

In your `nuxt.config.js` file, under the `build` option, you can pass webpack `plugins`, the same way you would do it in [a `webpack.config.js` file](https://webpack.js.org/configuration/plugins/).

In this example we add the webpack built-in [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) for automatically loading JavaScript modules (_lodash_ and _jQuery_) instead of having to `import` or `require` them everywhere.

```js
import webpack from 'webpack'

export default {
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        $: 'jquery',
        _: 'lodash'
      })
    ]
  }
}
```

> Note: You might not need jQuery in a Vue-based app.

With Nuxt, you can also control plugins execution context: if they are meant to be run on the `client` or in the `server` builds (or differentiating `dev` and `prod` builds) within [`build.extend`](/docs/2.x/configuration-glossary/configuration-build#extend), where you can manually pass webpack plugins too.
