---
title: 动态页面
description: 通过API获取数据并构建页面
position: 104
category: routing
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/routing/dynamic-pages?fontsize=14&hidenavigation=1&module=%2Fpages%2F_continent%2F_mountain.vue&theme=dark&view=editor
---

通过 API 获取数据并构建页面

<example-intro></example-intro>

`pages/_slug.vue` 通过路径参数[route params]获取数据。

`pages/index.vue` 通过 API 获取[山脉]数据.

`pages/_continent/_mountain.vue` 展示大陆上每个山脉的详细信息。

<base-alert type="next">

在以下目录中了解更多信息 [pages](/docs/2.x/directory-structure/pages)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
