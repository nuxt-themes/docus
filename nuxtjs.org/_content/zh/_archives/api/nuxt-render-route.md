---
title: 'API: nuxt.renderRoute(route, context)'
description: 使用指定的上下文对象渲染指定的路由路径。
menu: renderRoute
category: programmatically
position: 203
---

# nuxt.renderRoute(route, context = {})

- 类型： `Function`
- 参数：
  1. `String`，带渲染的路由路径
  2. _可选_, `Object`， 指定的上下文对象，可用的属性键： `req` 和 `res`
- 返回： `Promise`
  - `html`: `String`
  - `error`: `null` 或 `Object`
  - `redirected`: `false` 或 `Object`

> 使用指定的上下文对象渲染指定的路由路径。

和 [nuxt.renderAndGetWindow](/api/nuxt-render-and-get-window) 类似，该方法只用于 [测试目的](guide/development-tools#end-to-end-testing)。

<div class="Alert Alert--orange">

`nuxt.renderRoute` 需在生产模式（dev: false）的编译过程之后才可调用。

</div>

例如：

```js
const Nuxt = require('nuxt')
const config = require('./nuxt.config.js')
config.dev = false
const nuxt = new Nuxt(config)

nuxt
  .build()
  .then(() => {
    return nuxt.renderRoute('/')
  })
  .then(({ html, error, redirected }) => {
    // html 类型为 string
    // 当显示 error 视图时，error 的值不为 null。error 对象的格式为:
    // { statusCode: 500, message: 'My error message' }
    // redirected is not false when redirect() has been used in data() or fetch()
    // 如果 `redirect` 方法已在 `asyncData` 或 `fetch` 方法中调用，redirected 的值非 false，其格式如下：
    // { path: '/other-path', query: {}, status: 302 }
  })
```
