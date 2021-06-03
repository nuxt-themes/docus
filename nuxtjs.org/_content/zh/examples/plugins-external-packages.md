---
title: 外部插件
description: 这个示例展示了如何将插件与外部模块包一起使用 - 如axios
position: 403
category: plugins
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/plugins/external-packages-plugin?fontsize=14&hidenavigation=1&module=%2Fplugins%2Faxios.js&theme=dark&view=editor
---

这个示例展示了如何将插件与外部依赖包一起使用 - 如`axios`

<example-intro></example-intro>

`plugins/axios.js` 使用`onError()`方法拦截`$axios`请求，如果请求出错跳转到 404 页面。

`pages/index.vue` 使用`$axios`从接口请求数据。

`pages/mountains/_slug.vue` 使用`$axios`从接口获取数据，其 ID 来自` route params`（路由参数）。

`pages/404.vue` 出现错误时返回的页面。

`nuxt.config.js` 包含用于注册模块和插件的`module`属性和`plugin`属性。

`package.json` 可以看到模块`@nuxtjs/axios` 已经被`npm`安装

<base-alert type="next">

在以下目录中了解更多信息 [plugins](/docs/2.x/directory-structure/plugins#external-packages)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
