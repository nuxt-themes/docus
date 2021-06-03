---
title: 自定义Nuxt加载图标
description: 当SSR设置为false的时候，自定义Nuxt加载图标
position: 2
category: loading
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/loading/customize-loading-indicator?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

当`ssr`设置为`false`的时候，自定义 Nuxt 加载图标

<example-intro></example-intro>

`nuxt.config.js` 包含:

- `ssr: false`只在客户端渲染。
- `loadingIndicator`属性可修改默认加载图标。

<base-alert type="next">

在以下目录中了解更多信息 [Loading](/docs/2.x/features/loading)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
