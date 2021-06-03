---
title: 'API: Nuxt(options)'
description: 你可以把 Nuxt.js 当做是一个负责页面渲染的中间件，集成到已有的应用服务中去。
menu: Usage
category: programmatically
position: 201
---

# 以编程形式使用 Nuxt.js

如果你打算用自己的中间件和 API 运行你的服务端的话，你可以以编程的形式将 Nuxt.js 集成到你原有的应用中去。因为 Nuxt.js 基于 ES2015 编写，所以它的代码相对来说更有趣、更易读。它没用到任何的转译器，只依赖于 V8 内核中已经实现的功能。因此，Nuxt.js 需要 Node.js `4.0` 或更高的运行环境。

你可以这样引入 Nuxt.js:

```js
const { Nuxt } = require('nuxt')
```

### Nuxt(options)

想了解 Nuxt.js 所有的可选项，请查阅「配置」章节的文章。

```js
const options = {}

const nuxt = new Nuxt(options)
nuxt.build().then(() => {
  // 这里可以用 nuxt.render(req, res) 或者 nuxt.renderRoute(route, context)
})
```

你可以参考 [nuxt-express](https://github.com/nuxt/express) 和 [adonuxt](https://github.com/nuxt/adonuxt) 这两个新手应用项目以便快速入门。

### 调试信息

如果你想显示 Nuxt.js 的调试信息，你可以在应用入口文件的头部加入以下设置：

```js
process.env.DEBUG = 'nuxt:*'
```
