---
title: 'API: head 属性配置'
description: Nuxt.js 让你可以在 nuxt.config.js 中配置应用的 meta 信息。
menu: head
category: configuration
position: 112
---

# head 属性配置

> 借助 `head` 属性，Nuxt.js 让你可以在 nuxt.config.js 中配置应用的 meta 信息。

- 类型： `Object`

```js
module.exports = {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

想了解 `head` 属性的可用配置，可以参考 [vue-meta 配置文档](https://vue-meta.nuxtjs.org/api/#metainfo-properties)。

<div class="Alert Alert--teal">

<b>提示：</b> 你也可以在页面组件中使用 `head` 配置并通过 `this` 关键字来获取组件的数据，具体请参考 [页面组件的 head 属性配置](/api/pages-head)。

</div>
