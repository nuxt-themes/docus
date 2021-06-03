---
title: Directory Structure
description: The default Nuxt.js application structure is intended to provide a great starting point for both large and small applications.
category: getting-started
position: 102
---

> The default Nuxt.js application structure is intended to provide a great starting point for both small and large applications. Of course, you are free to organize your application however you like.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/guided-nuxtjs-project-tour?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Watch a free lesson about <strong>the Nuxt.js directory structure</strong> on Vue School
    </p>
  </a>
</div>

## Directories

### The Assets Directory

The `assets` directory contains your un-compiled assets such as Stylus or Sass files, images, or fonts.

[More documentation about Assets integration](/guide/assets)

### The Components Directory

The `components` directory contains your Vue.js Components.

<div class="Alert Alert--orange">

Components in this directory will not have access to [asyncData](/guide/async-data).

</div>

### The Layouts Directory

The `layouts` directory includes your application layouts. Layouts are used to change the look and feel of your page (for example by including a sidebar).

[More documentation about Layouts integration](/guide/views#layouts)

_This directory cannot be renamed without extra configuration._

### The Middleware Directory

The `middleware` directory contains your Application Middleware. Middleware lets you define custom functions that can be run before rendering either a page or a group of pages (layouts).

[More documentation about Middleware integration](/guide/routing#middleware)

### The Pages Directory

The `pages` directory contains your Application Views and Routes. The framework reads all the `.vue` files inside this directory and creates the application router.

_This directory cannot be renamed without extra configuration._

[More documentation about Pages integration](/guide/views)

### The Plugins Directory

The `plugins` directory contains your Javascript plugins that you want to run before instantiating the root Vue.js Application. This is the place to register components globally and to inject functions or constants.

[More documentation about Plugins integration](/guide/plugins)

### The Static Directory

The `static` directory is directly mapped to the server root (`/static/robots.txt` is accessible under `http://localhost:3000/robots.txt`) and contains files that likely won't be changed (e.g. the favicon)

**Example:** `/static/robots.txt` is mapped as `/robots.txt`

_This directory cannot be renamed without extra configuration._

[More documentation about Static integration](/guide/assets#static)

### The Store Directory

The `store` directory contains your [Vuex Store](http://vuex.vuejs.org/en/) files. The Vuex Store comes with Nuxt.js out of the box but is disabled by default. Creating an `index.js` file in this directory enables the store.

_This directory cannot be renamed without extra configuration._

[More documentation about Store integration](/guide/vuex-store)

### The nuxt.config.js File

The `nuxt.config.js` file contains your Nuxt.js custom configuration.

_This file cannot be renamed without extra configuration._

[More documentation about `nuxt.config.js` integration](/guide/configuration)

### The package.json File

The `package.json` file contains your Application dependencies and scripts.

_This file cannot be renamed._

## Aliases

| Alias        | Directory                             |
| ------------ | ------------------------------------- |
| `~` or `@`   | [srcDir](/api/configuration-srcdir)   |
| `~~` or `@@` | [rootDir](/api/configuration-rootdir) |

By default, `srcDir` is the same as `rootDir`.

<div class="Alert Alert--nuxt-green">

<b>Info:</b> Inside your `vue` templates, if you need to link to your `assets` or `static` directory, use `~/assets/your_image.png` and `~/static/your_image.png`.

</div>
