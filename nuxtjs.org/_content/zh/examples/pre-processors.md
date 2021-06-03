---
title: 预处理器
description: 使用`pug`和`sass`样式来配置您的应用，可以轻松地将变量添加到所有组件。
position: 2
category: assetManagement
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/asset-management/pre-processors?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

使用`pug`和`sass`样式来配置你的应用，可以方便地将变量添加到所有组件。

<example-intro></example-intro>

`pages/index.vue` 使用`pug`作为模板语言，并用`sass`设置样式。

`nuxt.config.js`展示了:

- 注册样式资源模块。
- 包含`styleResources`属性用以添加`assets / variables.scss`。
- 包含`css`属性用以添加`assets / main.scss`。

`package.json` 显示所需的依赖项。

<base-alert type="next">

在以下目录中了解更多信息 [Configuration](/docs/2.x/features/configuration#pre-processors)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
