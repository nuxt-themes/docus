---
title: 匿名中间件
description: 使用匿名中间件显示用户访问页面的次数分析。
position: 603
category: middleware
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/middleware/anonymous-middleware?fontsize=14&hidenavigation=1&module=%2Fpages%2Fanonymous-middleware.vue&theme=dark&view=editor
---

使用匿名中间件显示用户访问页面的次数分析。

<example-intro></example-intro>

`pages/anonymous-middleware.vue` 包含中间件方法，该函数使用`store`[状态树]来调用变量，并在页面上显示该`store`的值。

`store/analytics.js` 将`pageVisits`设置为 0，并在每次调用递增函数时增加访问次数。

<base-alert type="next">

在以下目录中了解更多信息 [middleware](/docs/2.x/directory-structure/middleware#anonymous-middleware)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
