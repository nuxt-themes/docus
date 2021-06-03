---
title: 布局
description: 使用布局显示不同的页面结构方式
category: miscellaneous
position: 205
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/miscellaneous/layouts?fontsize=14&hidenavigation=1&module=%2Fpages%2Fprofile.vue&theme=dark&view=editor
---

使用布局显示不同的页面结构方式

<example-intro></example-intro>

- `layouts/default.vue`默认在 home 页面中使用，不需要在`layout`属性中定义。
- `layouts/auth.vue` 在`/login`页面中的`layout`属性里加入`auth`。
- `layouts/profile.vue` 在`/profile`页面中的`layout`属性里加入`profile`。

<base-alert type="next">

了解更多有关的[Views](/docs/2.x/concepts/views)的内容，或在以下目录中了解更多信息 [Layouts](/docs/2.x/directory-structure/layouts)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
