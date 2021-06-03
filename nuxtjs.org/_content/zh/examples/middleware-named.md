---
title: 指定(named)中间件
description: 使用命名中间件对使用商店的用户进行身份验证，并允许他们在验证通过后访问页面
position: 602
category: middleware
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/middleware/named-middleware?fontsize=14&hidenavigation=1&module=%2Fpages%2Fnamed-middleware.vue&theme=dark&view=editor
---

使用指定(named)中间件对使用商店的用户进行身份验证，并允许他们在验证通过后访问页面

<example-intro></example-intro>

`pages/named-middleware.vue` 包含具有`auth`值的`middleware`(`中间件`)属性，该属性在用户进入路由之前被调用。

`middleware/auth.js` 检查用户是否已通过身份验证，如果不是，则将用户重定向到验证页面。

`pages/auth.vue` 使用`store`[状态树]来验证用户。

`store/auth.js` 设置用户名和密码并重定向用户。

<base-alert type="next">

在以下目录中了解更多信息 [middleware](/docs/2.x/directory-structure/middleware#named-middleware)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
