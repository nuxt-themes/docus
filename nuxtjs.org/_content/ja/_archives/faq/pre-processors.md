---
title: CSS プリプロセッサを使うには？
description: Nuxt.js でプリプロセッサを使うには？
category: configuration
position: 2
---

[vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html) のおかげで、ただ `lang` 属性を使うだけで `<template>` や `<script>` あるいは `<style>` などのためのプリプロセッサを使うことができます。

[Pug](https://github.com/pugjs/pug) 及び [Sass](http://sass-lang.com/) を使った `pages/index.vue` の例:

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

これらのプリプロセッサを使うために Webpack のローダーをインストールする必要があります。

```bash
npm install --save-dev pug pug-plain-loader
```

```bash
npm install --save-dev sass sass-loader@10 fibers
```
