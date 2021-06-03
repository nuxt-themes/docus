---
title: 'API: The Renderer Class'
description: Nuxt Renderer Class
menu: Renderer
category: internals
position: 303
---

# Renderer Class

- 来源: **[vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)**

此类正在导出连接中间件，该中间件处理和服务所有 SSR 和资源请求。

## Hooks

我们可以在某些生命周期事件中注册钩子。

| Hook                     | Arguments                | When                                                                                                                                                                                          |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `render:before`          | (renderer, options)      | 在为 Renderer 类设置中间件和资源之前，对重载某些方法或选项很有用。                                                                                                                            |
| `render:setupMiddleware` | (app) _connect instance_ | 在 Nuxt 添加它的中间件堆栈之前。我们可以用它来注册自定义服务器端中间件。                                                                                                                      |
| `render:errorMiddleware` | (app) _connect instance_ | 在添加 Nuxt 错误中间件之前，在使用 Nuxt 之前添加自己的中间件很有用。有关详细信息，请参阅[Sentry module](https://github.com/nuxt-community/sentry-module/blob/master/lib/module.js#L122)模块。 |
| `render:resourcesLoaded` | (resources)              | 在加载渲染器的资源之后调用。                                                                                                                                                                  |
| `render:done`            | (renderer)               | SSR 中间件和所有资源都准备就绪（渲染器就绪）                                                                                                                                                  |
| `render:routeContext`    | (context.nuxt)           | 每次路由是服务器渲染时和渲染之前：路由 hooks。在将`Nuxt`上下文序列化为窗口`__ NUXT__`之前调用，对于添加一些可以在客户端获取的数据很有用。                                                     |
| `render:route`           | (url, result, context)   | 每次路由都是服务器呈现的。在将请求发送回浏览器之前调用。                                                                                                                                      |
| `render:routeDone`       | (url, result, context)   | 每次路由都是服务器呈现的。响应发送到浏览器后调用。                                                                                                                                            |
