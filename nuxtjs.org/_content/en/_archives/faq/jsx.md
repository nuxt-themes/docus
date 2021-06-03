---
title: How to use JSX?
description: How to use JSX with Nuxt.js?
category: configuration
position: 3
---

Nuxt.js uses [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app), which is based on the official [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) for babel default configuration, so you can use JSX in your components.

You can now use JSX in the `render` method of your components:

```html
<script>
  export default {
    data() {
      return { name: 'World' }
    },
    render(h) {
      return <h1 class="red">{this.name}</h1>
    }
  }
</script>
```

<div class="Alert Alert--orange">

Aliasing `createElement` to `h` is a common convention you’ll see in the Vue ecosystem but is actually optional for JSX since it [automatically injects](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` in any method and getter (not functions or arrow functions) declared in ES2015 syntax that has JSX so you can drop the (h) parameter.

</div>

You can learn more about how to use it in the [JSX section](https://vuejs.org/v2/guide/render-function.html#JSX) of the Vue.js documentation.
