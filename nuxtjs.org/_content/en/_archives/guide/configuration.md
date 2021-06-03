---
title: Configuration
description: By default, Nuxt.js is configured to cover most use cases. This default configuration can be overwritten by using the `nuxt.config.js` file.
category: getting-started
position: 103
---

> By default, Nuxt.js is configured to cover most use cases. This default configuration can be overwritten with the `nuxt.config.js` file.

### build

This option lets you configure various settings for the `build` step, including `loaders`, `filenames`, the `webpack` config and `transpilation`.

[Documentation about `build` integration](/api/configuration-build)

### css

This option lets you define the CSS files, modules, and libraries you want to include globally (on every page).

[Documentation about `css` integration](/api/configuration-css)

### dev

This option lets you define the `development` or `production` mode of Nuxt.js (important when you use Nuxt.js programatically)

[Documentation about `dev` integration](/api/configuration-dev)

### env

This option lets you define environment variables that are available to both client and server.

[Documentation about `env` integration](/api/configuration-env)

### generate

This option lets you set up parameter values for every dynamic route in your application that will be transformed into HTML files by Nuxt.js.

[Documentation about generate integration](/api/configuration-generate)

### head

This option lets you define all default meta tags for your application.

[Documentation about head integration](/api/configuration-head)

### loading

This option lets you customize the loading component that Nuxt.js uses by default.

[Documentation about `loading` integration](/api/configuration-loading)

### modules

With this option you can add Nuxt.js modules to your project.

[Documentation about `modules` integration](/api/configuration-modules)

### modulesDir

This option lets you define the node_modules folder of your Nuxt.js Application.

[Documentation about `modulesDir` integration](/api/configuration-modulesdir)

### plugins

This option lets you define JavaScript plugins that should be run before instantiating the root Vue.js application.

[Documentation about `plugins` integration](/api/configuration-plugins)

### rootDir

This option lets you define the workspace of your Nuxt.js application.

[Documentation about `rootDir` integration](/api/configuration-rootdir)

### router

With the `router` option you overwrite the default Nuxt.js configuration of Vue Router.

[Documentation about `router` integration](/api/configuration-router)

### server

This option lets you configure the connection variables for the server instance of your Nuxt.js application.

[Documentation about `server` integration](/api/configuration-server)

### srcDir

This option lets you define the source directory of your Nuxt.js application.

[Documentation about `srcDir` integration](/api/configuration-srcdir)

### dir

This option lets you define the custom directories of your Nuxt.js application.

[Documentation about `dir` integration](/api/configuration-dir)

### transition

This option lets you define the default properties of the page transitions.

[Documentation about `transition` integration](/api/configuration-transition)

## Asynchronous Configuration

If you need to populate some options (e.g. the head) with asynchronous data (e.g. coming from an API), you have the possibility to return a promise. Here is an example:

```js
/*
axios-module cannot be used in nuxt.config.js
You need to import axios and configure it again
*/
import axios from 'axios'

export default async () => {
  const data = await axios.get('endpoint')
  return {
    head: {
      title: data.head.title
      //... rest of config
    }
  }
}
```
