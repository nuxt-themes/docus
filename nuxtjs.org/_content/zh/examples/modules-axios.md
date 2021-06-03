---
title: Axios用法
description: 展示如何在`nuxt.config.js` 文件内使用env属性来添加API的Url，以便让我们方便调用，而不用在页面上写入URL
position: 503
category: modules
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/modules/axios-usage?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

展示如何在`nuxt.config.js` 文件内使用 env 属性来添加 API 接口的 Url，以便让我们方便调用而不用在页面上写入 URL

<example-intro></example-intro>

`nuxt.config.js` 包含 :

- `publicRuntimeConfig` 属性来添加 API 接口的 URL。
- `modules` 属性注册`@nuxtjs/axios`模块.

`pages/index.vue` - 使用`$axios`获取数据，并用`$config`获取 API 接口的 URL.

<base-alert type="next">

了解更多关于[axios module](https://axios.nuxtjs.org/)的信息

</base-alert>

<base-alert type="next">

在以下目录中了解更多信息 [nuxt-config](/docs/2.x/directory-structure/nuxt-config)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
