---
title: SEO HTML Head
description: In this example we use the head property to show how to get good SEO.
position: 3
category: seo
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/seo/seo-html-head?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

<example-intro></example-intro>

`nuxt.config.js` uses the `head` property to show a `title`, `titleTemplate`, and `meta` including `description`. It also shows how to add an external google font using the link property and some JS using the script property. The lang and amp attributes are set with the `htmlAttrs` property.

`pages/index.vue` uses the head property as a function with dynamic data and uses the google font.

`pages/about.vue` uses the head property as an object.

<base-alert type="next">

Learn more about the options available for `head`, in the [vue-meta documentation](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

</base-alert>

<base-alert type="next">

Learn more about meta tags in the Features book in the [Meta Tags and SEO](/docs/2.x/features/meta-tags-seo) chapter.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
