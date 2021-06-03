---
title: 重复的 Meta 标签
description: 为什么 Nuxt.js 应用会出现重复的 Meta 标签？
category: development
position: 104
---

# 为什么 Nuxt.js 应用会出现重复的 Meta 标签？

这是 [vue-meta](https://github.com/nuxt/vue-meta) 组件的一个特性， 具体请参考 [HTML 头部设置指引](/docs/2.x/concepts/views#html-头部)。

> 为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 `hid` 键为 meta 标签配一个唯一的标识编号。请阅读[关于 `vue-meta` 的更多信息](https://vue-meta.nuxtjs.org/api/#tagidkeyname)。

拿下面的例子来说，对于描述 meta 标签， 我们给 `hid` 属性设定一个唯一的标识值为：`description`， 当有组件定义了相同 `hid` 的 meta 标签时， vue-meta 将知道覆盖父级的配置。

在应用配置文件 `nuxt.config.js` 中配置默认 meta：

```js
...head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'keyword 1, keyword 2'},
      { hid: 'description', name: 'description', content: 'This is the generic description.'}
    ],
  },
...
```

在页面页面组件中利用 `hid` 来覆盖指定的 meta 配置：

```js
export default {
  head() {
    return {
      title: `Page 1 (${this.name}-side)`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Page 1 description'
        }
      ]
    }
  }
}
```

想了解更多关于页面组件的 `head` 属性配置，请参考 [HTML 头部设置指引](/docs/2.x/concepts/views#html-头部)。
