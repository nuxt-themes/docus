---
title: 嵌套页面
description: 使用Nuxt Child组件创建包含父页面和子页面的嵌套页面。
position: 105
category: routing
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/routing/nested-pages?fontsize=14&hidenavigation=1&module=%2Fpages%2Fparent.vue&theme=dark&view=editor
---

使用 Nuxt Child 组件创建包含父页面和子页面的嵌套页面。

<example-intro></example-intro>

`pages/parent.vue` 包含`<NuxtChild>`组件。 此页面上的所有内容均可在父页面和子页面上看到。

`pages/parent/index.vue` 包含子链接被点击时将替换的文本。

`pages/parent/child.vue` and `pages/parent/child2.vue` 将被渲染为`parent / child`和`parent / child2`。

<base-alert type="next">

在以下目录中了解更多信息 [Nuxt 组件](/docs/2.x/features/nuxt-components#the-nuxtchild-component)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
