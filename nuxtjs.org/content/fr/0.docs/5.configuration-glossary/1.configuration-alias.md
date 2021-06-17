---
title: 'La propriété alias'
description: Nuxt.js vous permet d'utiliser des alias pour accéder, dans votre JavaScript et CSS, à vos répertoires personnalisés
menu: alias
category: configuration-glossary
position: 0
---

> Nuxt.js vous permet d'utiliser des alias pour accéder, dans votre JavaScript et CSS, à vos répertoires personnalisés.

- Type: `Object`
- Default:
  ```js
  {
    '~~': `<rootDir>`,
    '@@': `<rootDir>`,
    '~': `<srcDir>`,
    '@': `<srcDir>`,
    'assets': `<srcDir>/assets`, // (unless you have set a custom `dir.assets`)
    'static': `<srcDir>/static`, // (unless you have set a custom `dir.static`)
  }
  ```

Cette option vous permet de définir des alias vers les répertoires de votre projet (en plus de ceux ci-dessus). Ces alias peuvent être utilisés dans votre JavaScript et CSS.

```js{}[nuxt.config.js]
import { resolve } from 'path'
export default {
  alias: {
    'images': resolve(__dirname, './assets/images'),
    'style': resolve(__dirname, './assets/style'),
    'data': resolve(__dirname, './assets/other/data')
  }
}
```

```html{}[components/example.vue]
<template>
  <img src="~images/main-bg.jpg">
</template>

<script>
import data from 'data/test.json'

// etc.
</script>

<style>
@import '~style/variables.scss';
@import '~style/utils.scss';
@import '~style/base.scss';

body {
  background-image: url('~images/main-bg.jpg');
}
</style>
```

<base-alert type="warning">Dans un contexte Webpack (sources d'images, CSS - mais _pas_ JavaScript), vous devez préfixer votre alias avec `~` (comme dans l'exemple ci-dessus).</base-alert>

<base-alert type="info">Si vous utilisez TypeScript et que vous voulez utiliser l'alias que vous définissez dans vos fichiers TypeScript, vous devrez ajouter les alias à votre objet `paths` dans `tsconfig.json`.</base-alert>
