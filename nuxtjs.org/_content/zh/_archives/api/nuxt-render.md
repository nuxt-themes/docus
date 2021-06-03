---
title: 'API: nuxt.render(req, res)'
description: 你可以把 Nuxt.js 当做是中间件来集成到已有的 Node.js 应用中。
menu: render
category: programmatically
position: 202
---

# nuxt.render(req, res)

- 类型： `Function`
- 参数：
  1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- 返回： `Promise`

> 你可以通过 `nuxt.render` 函数，把 Nuxt.js 变成你 Node.js 服务端的中间件。

例如，结合 [Express.js](https://github.com/expressjs/express) 使用：

```js
const { Nuxt, Builder } = require('nuxt')

const app = require('express')()
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000

// 用指定的配置对象实例化 Nuxt.js
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// 用 Nuxt.js 渲染每个路由
app.use(nuxt.render)

// 在开发模式下启用编译构建和热加载
if (config.dev) {
  new Builder(nuxt).build().then(listen)
} else {
  listen()
}

function listen() {
  // 服务端监听
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}
```

<div class="Alert">

建议把 **nuxt.render** 放到中间件列表的最后面，因为它不会再调用 next() 方法，而是直接处理你 web 应用的页面渲染。

</div>
