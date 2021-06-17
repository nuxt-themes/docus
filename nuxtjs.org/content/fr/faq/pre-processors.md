---
title: Comment utiliser des préprocesseurs?
description: Comment utiliser des préprocesseurs avec Nuxt.js ?
category: configuration
position: 2
---

Grâce à [Vue Loader](http://vue-loader.vuejs.org/fr/configurations/pre-processors.html), vous pouvez utiliser n'importe quel préprocesseur pour vos `<template>`, `<script>` ou `<style>` : il suffit d'utiliser l'attribut `lang`.

Exemple d'une `pages/index.vue` utilisant [Pug](https://github.com/pugjs/pug), [CoffeeScript](http://coffeescript.org) et [Sass](http://sass-lang.com/) :

```html
<template lang="pug"> h1.red Bonjour {{ name }}! </template>

<script lang="coffee">
  export default data: ->
    { name: 'le Monde' }
</script>

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

Pour être en mesure d'utiliser ces préprocesseurs, nous devons installer leurs loaders webpack :

```bash
npm install --save-dev pug@2.0.3 pug-plain-loader coffeescript coffee-loader sass sass-loader@10 fibers
```
