---
title: 自定义插件
description: 这个例子将告诉你怎么创建自己的插件
position: 404
category: plugins
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/plugins/custom-plugins?fontsize=14&hidenavigation=1&module=%2Fplugins%2Fnuxt-api.js&theme=dark&view=editor
---

这个例子将告诉你怎么创建自己的插件

<example-intro></example-intro>

`plugins/hello.js` - 使用动态信息将信息打印到控制台。

`store/index.js` - 存储输入的动态信息。

`pages/index.vue` 使用 hello 插件来:

- 在`mounted`生命周期时打印一条信息。
- 将包含我们输入值的信息打印。

`plugins/nuxt-api.js` - 从接口获取数据。

`pages/api-plugin.vue` - 使用我们的插件来获取并展示数据。

`nuxt.config.js` -使用`plugins`属性来注册我们的插件。

<base-alert type="next">

在以下目录中了解更多信息 [plugins](/docs/2.x/directory-structure/plugins#inject-in-root--context)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
