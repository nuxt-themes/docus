---
title: 自定义加载组件
description: 创建一个自定义加载组件，修改默认加载样式和图标。
position: 3
category: loading
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/loading/custom-loading-component?fontsize=14&hidenavigation=1&module=%2Fcomponents%2FLoadingBar.vue&theme=dark&view=editor
---

创建一个自定义加载组件，修改默认加载样式和图标。

<example-intro></example-intro>

`components/LoadingBar.vue` 用自定义加载组件代替默认的加载进度条。

`nuxt.config.js` 包含`loading`属性，可以导入自定义加载组件。

`pages/loading.vue` 用代码方式启动加载，强制页面加载 2 秒。

<base-alert type="next">

在以下目录中了解更多信息 [Loading](/docs/2.x/features/loading)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
