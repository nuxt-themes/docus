---
title: 路由中间件
description: 使用路由中间件在`store`[状态树]全局设置一个类，这样可以根据路由设置不同的风格样式
position: 601
category: middleware
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/middleware/router-middleware?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

使用路由中间件在`store`[状态树]全局设置一个类，这样可以根据路由设置不同的风格样式

<example-intro></example-intro>

`store/class.js` 在`store`[状态树]设置一个类。

`middleware/class.js` 使用路由中间件在进入路由之前修改路由名(route.name)。

`components/Navigation.vue` 使用`router-middleware`的路由名来更改当前路由的字体大小。

`nuxt.config.js` 包含`router`属性用以激活(使用)中间件。

<base-alert type="next">

在以下目录中了解更多信息 [middleware](/docs/2.x/directory-structure/middleware#router-middleware)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
