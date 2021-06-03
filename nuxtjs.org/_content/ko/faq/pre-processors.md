---
title: 프리프로세서
description: Nuxt.js 에서 프리프로세서를 사용하려면?
category: configuration
position: 2
---

# 프리프로세서를 사용하려면?

<!-- Thanks to [vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), you can use any kind of pre-processors for your `<template>`, `<script>` or `<style>`: simply use the `lang` attribute. -->

[vue-loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html) 덕분에 그냥 `lang` 속성을 사용하는 것만으로 `<template>`, `<script>`, `<style>` 을 위한 프리프로세서를 사용할 수 있습니다.

[Pug](https://github.com/pugjs/pug), [CoffeeScript](http://coffeescript.org), [Sass](http://sass-lang.com/)를 사용한 `pages/index.vue` 예제:

```html
<template lang="pug"> h1.red Hello {{ name }}! </template>

<script lang="coffee">
  module.exports = data: ->
    { name: 'World' }
</script>

<style lang="sass">
  .red
    color: red
</style>
```

이런 프리프로세서를 사용하기 위해서는 Webpack 로더들을 설치해야 합니다.

```bash
npm install --save-dev pug@2.0.0-beta6 pug-loader coffeescript coffee-loader sass sass-loader
```
