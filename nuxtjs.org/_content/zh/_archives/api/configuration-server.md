---
title: 'API: server 属性'
description: Nuxt.js允许您为应用程序内部定义服务器访问变量 `nuxt.config.js`.
menu: server
category: configuration
position: 126
---

# server 属性

- 类型: `Object`

> Nuxt.js 允许您为应用程序内部`nuxt.config.js`中定义服务器访问主机和端口.

## Basic example (`nuxt.config.js`):

```js
export default {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost,
  }
}
```

这允许您指定 Nuxt.js 服务器实例的[主机和端口](/docs/2.x/features/configuration#edit-host-and-port)。

## 使用 HTTPS 配置的示例

```js
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

## 使用 sockets 配置的示例

```js
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```

## timing

- 类型: `Object` or `Boolean`
- 默认: `false`

启用`server.timing`选项会添加一个中间件来测量服务器端渲染过程中经过的时间，并将其作为'Server-Timing'添加到标头中

### 使用时序配置的示例

`server.timing`可以是提供选项的对象。目前，支持`total`(直接跟踪服务器端渲染所花费的全部时间)

```js
export default {
  server: {
    timing: {
      total: true
    }
  }
}
```

### 使用 timing api

当启用`server.time`时，`timing` api 也被注入服务器端的`response`。

#### Syntax

```js
res.timing.start(name, description)
res.timing.end(name)
```

#### 在 servermiddleware 中使用计时的示例

```js
export default function (req, res, next) {
  res.timing.start('midd', 'Middleware timing description')
  // server side operation..
  // ...
  res.timing.end('midd')
  next()
}
```

然后`server-timing`头将包含在响应头中，如：

```bash
Server-Timing: midd;desc="Middleware timing description";dur=2.4
```

请参阅 [Server-Timing MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) 来获取更多详细信息。
