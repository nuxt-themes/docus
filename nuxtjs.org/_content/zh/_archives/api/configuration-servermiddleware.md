---
title: 'API: serverMiddleware 属性'
description: 定义服务器端渲染中间件。
menu: serverMiddleware
category: configuration
position: 127
---

# 服务器端渲染中间件(serverMiddleware) 属性

- 类型: `Array`
  - Items: `String` 或 `Object` 或 `Function`

Nuxt 在内部创建一个[连接](https://github.com/senchalabs/connect)实例，所以我们可以将我们的中间件注册到它的堆栈，并有机会提供更多的路由，如 API，而无需**外部服务器**。因为连接本身是一个中间件，所以注册的中间件既可以用于`nuxt start`，也可以用作具有编程用法的中间件，如[express-template](https://github.com/nuxt-community/express-template)。Nuxt [Modules](/guide/modules)还可以使用[this.addServerMiddleware()](/api/internals-module-container#addservermiddleware-middleware-)设置`serverMiddleware`。

## 服务器端渲染中间件(serverMiddleware) vs 中间件(middleware)!

不要将它与客户端或 SSR 中 Vue 在每条路由之前调用的[routes middleware](/guide/routing#middleware)混淆。`serverMiddleware`只是在 vue-server-renderer**之前**在服务器端运行，可用于服务器特定的任务，如处理 API 请求或服务资产。

## 用法

如果中间件是`String`，Nuxt.js 将尝试自动解析它。

例如 (`nuxt.config.js`):

```js
import serveStatic from 'serve-static'

export default {
  serverMiddleware: [
    // Will register redirect-ssl npm package
    'redirect-ssl',

    // Will register file from project api directory to handle /api/* requires
    { path: '/api', handler: '~/api/index.js' },

    // We can create custom instances too
    { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ]
}
```

<p class="Alert Alert--danger">
    <b>提示! </b>
    如果您不希望中间件注册所有路由，则必须使用具有特定路径的`object`，否则nuxt默认处理程序将不起作用！
</p>

## 自定义服务器端渲染中间件 (Server Middleware)

编写自定义中间件也是可能的。有关更多信息，请参阅 [Connect Docs](https://github.com/senchalabs/connect#appusefn).

Middleware (`server-middleware/logger.js`):

```js
export default function (req, res, next) {
  // req 是 Node.js http request 对象
  console.log(req.path)

  // res 是 Node.js http response 对象

  // next是一个调用下一个中间件的函数
  // 如果您的中间件不是最终执行，请不要忘记在最后调用next！
  next()
}
```

Nuxt 配置 (`nuxt.config.js`):

```js
serverMiddleware: ['~/api/logger']
```
