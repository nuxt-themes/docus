---
title: Comment utiliser JSX ?
description: Comment utiliser JSX avec Nuxt.js ?
category: configuration
position: 3
---

Nuxt.js utilise [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app), basée sur [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) comme configuration par default, ce qui vous permet d'utiliser JSX dans vos composants.

Vous pouvez maintenant utiliser JSX dans la méthode `render` de vos composants :

```html
<script>
  export default {
    data() {
      return { name: 'Le Monde' }
    },
    render(h) {
      return <h1 class="red">{this.name}</h1>
    }
  }
</script>
```

<div class="Alert Alert--orange">

Créer un alias `h` pour `createElement` est une convention commune que vous rencontrerez dans l'écosystème Vue mais n'est pas nécessaire pour JSX depuis qu'il [injecte automatiquement](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` dans toutes les méthodes et les accesseurs (ce n'est pas le cas pour les fonctions et les fonctions fléchées) déclarés avec la syntaxe ES2015 supportant JSX. Vous pouvez alors laisser tomber le paramètre `h`.

</div>

Vous pouvez en savoir plus dans la [section JSX](https://vuejs.org/v2/guide/render-function.html#JSX) de la documentation Vue.js.
