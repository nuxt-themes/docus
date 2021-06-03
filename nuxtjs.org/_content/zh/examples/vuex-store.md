---
title: Vuex 状态树
description: Nuxt.js 的 Vuex 状态树示例
github: vuex-store
category: miscellaneous
position: 306
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/14_store?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

Nuxt.js 的 Vuex 状态树示例

<example-intro></example-intro>

`store/todos.js` 状态树储存待办列表的`state`和`mutations`

`pages/index.vue` 从状态树导入 mapMutations，并使用`computed`属性和`methods`从状态树中添加和删除待办事项。

<base-alert type="next">

在以下目录中了解更多信息 [store](/docs/2.x/directory-structure/store)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
