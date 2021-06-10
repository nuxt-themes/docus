---
title: 'The rootDir Property'
description: Define the workspace of Nuxt.js application
category: api-configuration
---

- Type: `String`
- Default: `process.cwd()`

> Define the workspace directory of your Nuxt.js application.

This property will be overwritten by the nuxt commands(nuxt start, nuxt build etc) if an argument is passed to them. Eg running `nuxt ./my-app/` will set the `rootDir` to the absolute path of `./my-app/` from the current/working directory.

Because of that its normally not needed to configure this option unless you will use [Nuxt.js programmatically](/docs/2.x/internals-glossary/nuxt).

<alert type="info"> Both `rootDir` as the package root containing the `node_modules` directory need to be within the same directory tree to be able to <NuxtLink to="https://nodejs.org/api/modules.html#modules_all_together">resolve dependencies.</NuxtLink> See the <NuxtLink to="/guides/configuration-glossary/configuration-srcdir">`srcDir` option</NuxtLink> for examples of directory structure when that is not the case.

</alert>
