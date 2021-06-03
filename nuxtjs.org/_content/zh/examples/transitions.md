---
title: Nuxt 过渡动画
description: 使用默认或自定义过渡动画添加到到页面或布局里
position: 201
category: transitions
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/transitions/nuxt-transitions?fontsize=14&hidenavigation=1&module=%2Flayouts%2Fdefault.vue&theme=dark&view=editor
---

使用`默认`或`自定义过渡动画`用来添加到到页面或布局里

<example-intro></example-intro>

- `pages/index.vue` and `pages/fade.vue` 使用默认页面过渡。
- `pages/bounce.vue` 将`transition`属性和`bounce`过渡一起使用。
- `pages/slide.vue` 将`transition`属性和`slide-bottom`过渡一起使用。
- `layout/default.vue` 包含所有过渡方法。

<base-alert type="next">

在以下目录中了解更多信息 [Transitions](/docs/2.x/features/transitions)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
