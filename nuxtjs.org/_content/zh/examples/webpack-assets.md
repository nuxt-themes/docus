---
title: webpack 资源依赖
description: 使用`assets` 文件夹来添加`css`, `image`, `fonts`到你的应用里
position: 1
category: assetManagement
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/asset-management/webpack-assets?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

使用`assets` 文件夹来添加`css`, `image`, `fonts`到你的应用里

<example-intro></example-intro>

`pages/index.vue` 展示了:

- 如何从`assets`文件夹内添加一张图片。
- 如何使用`css`样式从`assets`文件夹内添加一张背景图片。
- 如何使用`data()`从`assets`文件夹内添加动态图片。

`nuxt.config.js` 包含`css` 属性，可以添加作用于全局的`.css`文件。

`assets/main.css` 展示了如何使用`@font-face`规则从`assets`文件夹内引用 DM Sans 字体。

<base-alert type="next">

在以下目录中了解更多信息 [Assets](/docs/2.x/directory-structure/assets)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
