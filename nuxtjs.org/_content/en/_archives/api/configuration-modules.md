---
title: 'The modules Property'
description: Modules are Nuxt.js extensions which can extend its core functionality and add endless integrations.
menu: modules
category: configuration
position: 119
---

- Type: `Array`

> Modules are Nuxt.js extensions which can extend it's core functionality and add endless integrations. [Learn More](/guide/modules)

Example (`nuxt.config.js`):

```js
export default {
  modules: [
    // Using package name
    '@nuxtjs/axios',

    // Relative to your project srcDir
    '~/modules/awesome.js',

    // Providing options
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // Inline definition
    function () {}
  ]
}
```

Module developers usually provide additionally needed steps and details for usage.

Nuxt.js tries to resolve each item in the modules array using node require path (in the `node_modules`) and then will be resolved from project `srcDir` if `~` alias is used. Modules are executed sequentially so the order is important.

Modules should export a function to enhance nuxt build/runtime and optionally return a promise until their job is finished. Note that they are required at runtime so should be already transpiled if depending on modern ES6 features.

## Exploring Nuxt Modules

Discover our [list of modules](https://modules.nuxtjs.org) to supercharge your Nuxt project, created by the Nuxt team and community.

- 145+ Modules
- 89+ Maintainers

<base-alert type="next">

Check out [modules.nuxtjs.org](https://modules.nuxtjs.org)

</base-alert>

## `buildModules`

<div class="Alert Alert--info">

This feature is available since Nuxt v2.9

</div>

Some modules are only required during development and build time. Using `buildModules` helps to make production startup faster and also significantly decreasing `node_modules` size for production deployments. Please refer to each module docs to see if it is recommended to use `modules` or `buildModules`.

The usage difference is:

- Instead of adding to `modules` inside `nuxt.config.js`, use `buildModules`
- Instead of adding to `dependencies` inside `package.json`, use `devDependencies` (`yarn add --dev` or `npm install --save-dev`)
