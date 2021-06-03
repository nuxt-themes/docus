---
title: Vue 插件
description: 这个例子展示了如何在应用里添加vue插件
position: 401
category: plugins
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/plugins/vue-plugins?fontsize=14&hidenavigation=1&module=%2Fplugins%2Fvue-tooltip.js&theme=dark&view=editor
---

这个例子展示了如何在应用里添加 vue 插件

<example-intro></example-intro>

`plugins/vue-toolitp.js` 导入我们的[tooltip 包]并告诉`vue`去使用。

`pages/index.vue` 使用插件。

`nuxt.config.js` 包含用于注册插件的`plugins`属性和用于添加工具提示样式的`css`属性。

`package.json` 可以看到[tooltip 包]已经被`npm`安装。

<base-alert type="next">

在以下目录中了解更多信息 [plugins](/docs/2.x/directory-structure/plugins#vue-plugins)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
