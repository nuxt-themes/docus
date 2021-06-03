---
title: How to use CSS pre-processors?
description: How to use pre-processors with Nuxt.js?
category: configuration
position: 2
---

Thanks to [Vue Loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), you can use any kind of pre-processor for your `<template>`, `<script>` or `<style>`: simply use the `lang` attribute.

Example of our `pages/index.vue` using [Pug](https://github.com/pugjs/pug) and [Sass](http://sass-lang.com/):

```html
<template lang="pug"> h1.red Hello World! </template>

<style lang="sass">
  .red
    color: red
</style>

<style lang="scss">
  .red {
    color: red;
  }
</style>
```

To use these pre-processors, we need to install their webpack loaders:

```bash
npm install --save-dev pug pug-plain-loader
```

```bash
npm install --save-dev sass sass-loader fibers
```

<base-alert type="info">Synchronous compilation with `sass` (2x speed increase) [is enabled automatically](https://github.com/webpack-contrib/sass-loader) when `fibers` is installed.</base-alert>
