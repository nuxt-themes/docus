---
title: 搜索引擎优化 Twitter 和 Open Graph
description: 在此示例中，我们创建了一个组件，用于在社交媒体上共享时添加`Twitter`和`Open Graph`标签。
position: 4
category: seo
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/seo/seo-twitter-og?fontsize=14&hidenavigation=1&module=%2Fcomponents%2FSocialHead.vue&theme=dark&view=editor
---

`众所周知，国内不存在这两个网站~`

<example-intro></example-intro>
我们创建了一个组件，用于在社交媒体上共享时添加`Twitter`和`Open Graph`标签。

`components/SocialHead` 使用 head 属性向 Twitter 和 Open Graph 社交平台传递使用`meta`标签。

`pages/mountains/slug.vue` 使用`SocialHead`组件传递`山峰`的`title`，`description`, `image`作为标签的值。并还使用`head()`方法设置标签链接。

当不使用`SocialHead`组件以及标签链接时，`nuxtconfig.js`会展示带有用于社交平台共享的默认`meta`的`head`标签。

<base-alert type="next">

在`vue-meta`文档中了解有关于`head`属性的更多信息  [vue-meta documentation](https://vue-meta.nuxtjs.org/api/#metainfo-properties)

</base-alert>

<base-alert type="next">

在以下目录中了解更多有关  [Meta Tags and SEO](/docs/2.x/features/meta-tags-seo)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
