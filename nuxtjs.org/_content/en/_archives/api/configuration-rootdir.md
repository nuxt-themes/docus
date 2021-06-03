---
title: 'The rootDir Property'
description: Define the workspace of Nuxt.js application
menu: rootDir
category: configuration
position: 123
---

- Type: `String`
- Default: `process.cwd()`

> Define the workspace directory of your Nuxt.js application.

This property will be overwritten by [nuxt commands](/guide/commands) if an argument is passed to them. Eg running `nuxt ./my-app/` will set the `rootDir` to the absolute path of `./my-app/` from the current/working directory

Because of that its normally not needed to configure this option unless you will use [Nuxt.js programmatically](/api/nuxt).

<div class="Alert Alert--blue">

Both `rootDir` as the package root containing the `node_modules` directory need to be within the same directory tree to be able to [resolve dependencies](https://nodejs.org/api/modules.html#modules_all_together).

See the [`srcDir` option](/api/configuration-srcdir) for examples of directory structure when thats not the case

</div>
