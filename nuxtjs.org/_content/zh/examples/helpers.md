---
title: Nuxt帮助程序
description: 使用`$nuxt`帮助程序, 包含`$nuxt.isOnline`，`renderedOn`，`refresh()`，`onNuxtReady`
position: 8
category: miscellaneous
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/miscellaneous/nuxt-helpers?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

使用`$nuxt`帮助程序, 包含`$nuxt.isOnline`，`renderedOn`，`refresh()`，`onNuxtReady`

<example-intro></example-intro>

`pages/index.vue` shows:

- `$nuxt.isOnline` 和 `$nuxt.isOffline` - 告诉用户是`在线`还是`离线`状态。
- `renderedOn` - 打印信息告诉我们页面是渲染在服务端还是客户端。
- `$nuxt.refresh()` - 刷新数据且不用刷新页面。

`plugins/nuxt-ready.client.js` 展示了:

- `window.onNuxtReady` - 当 Nuxt 准备好并开始渲染时，将信息打印到控制台。

<base-alert type="next">

在以下目录中了解更多信息 [Context and Helpers](/docs/2.x/concepts/context-helpers#helpers)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
