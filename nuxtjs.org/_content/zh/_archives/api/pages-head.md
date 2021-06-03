---
title: 'API: head 方法'
description: Nuxt.js 使用了 vue-meta 更新应用的头部标签和html属性。
menu: head
category: pages
position: 23
---

# head 方法

> Nuxt.js 使用了 [`vue-meta`](https://github.com/nuxt/vue-meta) 更新应用的 `头部标签(Head)` 和 `html 属性`。

- **类型：** `Object` 或 `Function`

使用 `head` 方法设置当前页面的头部标签。

在 `head` 方法里可通过 `this` 关键字来获取组件的数据，你可以利用页面组件的数据来设置个性化的 `meta` 标签。

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello World!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
  }
</script>
```

<div class="Alert Alert--teal">

注意：为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 `hid` 键为 meta 标签配一个唯一的标识编号。请阅读[关于 `vue-meta` 的更多信息](https://vue-meta.nuxtjs.org/api/#tagidkeyname)。

</div>
