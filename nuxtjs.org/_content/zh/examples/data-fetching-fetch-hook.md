---
title: fetch Hook
description: 使用`fetch`方法从组件和页面中获取数据
position: 2
category: dataFetching
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/data-fetching/fetch-hook?fontsize=14&hidenavigation=1&module=%2Fcomponents%2FMountains.vue&theme=dark&view=editor
---

使用`fetch`方法从组件和页面中获取数据

<example-intro></example-intro>

`pages/index.vue` imports `components/Mountains.vue` 使用获取`fetch`和`$http`模块在组件中获取数据，而`pages/mountains/_slug`在当前页面中获取数据，包括：

- `$fetchState.pending` 在数据加载时显示加载信息。
- `$fetchState.error` 当我们数据获取失败时显示错误信息。
- `$fetch` 当点击时再次获取数据。

<base-alert type="next">

了解更多有关 [http module](https://http.nuxtjs.org/)的信息

</base-alert>

<base-alert type="next">

在以下目录中了解更多有关`fetch hook` 的信息[Data Fetching](/docs/2.x/features/data-fetching)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
