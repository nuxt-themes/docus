---
title: JSX
description: 如何在 Nuxt.js 中使用 JSX？
category: configuration
position: 3
---

# 如何在 Nuxt.js 中使用 JSX？

Nuxt.js 使用 Vue.js 官方的 [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app) 做 babel 的默认配置。

你可以在组件的 `render` 方法中直接使用 `JSX` 而不需要做额外的配置：

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

这里的 `h` 为 `createElement` 的简化别名，你会在 Vue 生态系统中看到它，但它实际上是 JSX 的可选项，因为它会在**ES2015+语法**中 **声明的任何方法和 getter（不是函数或箭头函数）** 中自动注入`const h = this.$createElement` ，所以你可以删除`(h)`参数。

</div>

更多关于 `JSX` 的使用信息，请移步 Vue.js 官方文档的 [JSX 章节](https://vuejs.org/v2/guide/render-function.html#JSX)
