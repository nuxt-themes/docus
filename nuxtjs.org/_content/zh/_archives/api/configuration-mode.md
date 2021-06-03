---
title: 'API: The mode Property'
description: 更改nuxt中默认模式
menu: mode
category: configuration
position: 117
---

# mode 属性

- 类型: `string`
  - 默认: `universal`
  - 可以设置的值:
    - `'spa'`: 没有服务器端渲染（只有客户端路由导航等）
    - `'universal'`: 同构应用程序（服务器端呈现+客户端路由导航等）

> 您可以使用此选项更改项目的`nuxt.config.js`中默认 nuxt 模式
