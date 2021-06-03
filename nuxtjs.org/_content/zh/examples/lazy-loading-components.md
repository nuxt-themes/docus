---
title: 懒加载组件
description: 在懒加载组件中使用`fetch()`从API接口获取数据，并引入这个组件
position: 6
category: miscellaneous
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/miscellaneous/lazy-loading-components?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

在懒加载组件中使用`fetch()`从 API 接口获取数据，并引入这个组件

<example-intro></example-intro>

`components/MountainsList.vue` 使用`fetch`从 API 获取数据并使用:

- `$fetchState.pending` 在等待数据加载时显示加载状态。
- `$fetchState.error` 在组件没有成功加载时显示错误消息。

`pages/index.vue` 展示如何通过在组件前面加上关键字`Lazy`用以懒加载组件。

`nuxt.config.js` 展示使用`components: true` 自动导入组件。

<base-alert type="next">

在以下目录中了解更多信息 [Components](/docs/2.x/directory-structure/components)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
