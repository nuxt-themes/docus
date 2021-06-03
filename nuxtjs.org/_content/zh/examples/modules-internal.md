---
title: 本地模块
description: 使用ngrok建立隧道的本地模块。
position: 501
category: modules
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/modules/local-module?fontsize=14&hidenavigation=1&module=%2Fmodules%2Fngrok%2Findex.js&theme=dark&view=editor
---

使用 ngrok 建立隧道的本地模块。

<example-intro></example-intro>

- `modules/ngrok/index.js` 处于开发人员模式时，会将`ngrok`的公共 URL 添加到 Nuxt CLI。
- `pages/index.vue` 显示来自`ngrok`的公共 URL。
- `nuxt.config.js` 使用`buildModules`属性注册模块。

<base-alert type="next">

在以下目录中了解更多信息[modules](/docs/2.x/directory-structure/modules)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
