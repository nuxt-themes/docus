---
title: 异步请求
description: 使用异步请求从API中获取数据。
position: 1
category: dataFetching
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/data-fetching/async-data-hook?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

使用`asyncData`异步请求从 API 中获取数据。（在服务器端获取数据并渲染）

<example-intro></example-intro>

`pages/index.vue` 和 `pages/posts/_id` 使用`asyncData`和`$http`模块，从 API 中获取山脉列表并在服务器端渲染。

<base-alert type="next">

了解更多有关 [http module](https://http.nuxtjs.org/)的信息

</base-alert>

<base-alert type="next">

在以下目录中了解更多有关`asyncData`异步请求的信息[Data Fetching](/docs/2.x/features/data-fetching)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
