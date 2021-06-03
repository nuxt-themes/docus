---
title: SEO HTML 头部
description: Nuxt.js 的 SEO HTML 头部示例
category: seo
position: 3
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/seo/seo-html-head?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

Nuxt.js 的 SEO HTML 头部示例

<example-intro></example-intro>

`nuxt.config.js`文件内使用`head`属性来显示`title`，`titleTemplate`和`meta`，包括`description`。还能使用 link 属性添加外部字体，以及使用 script 属性添加外部 JS 文件。 通过 htmlAttrs 属性还能设置 lang 和 amp 属性。

`pages / index.vue`使用`head()`方法动态更新 title，并自定义了 Nunito 字体。

`pages / about.vue`使用`head`属性作为对象。

<base-alert type="next">

在[vue-meta]中了解有关 head 选项的更多信息  (https://vue-meta.nuxtjs.org/api/#metainfo-properties).

</base-alert>

<base-alert type="next">

在 [Meta Tags and SEO](/docs/2.x/features/meta-tags-seo) 中了解有关元 Meta & Tags & SEO 的更多信息

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
