---
title: 'API: The render Property'
description: Nuxt.js允许您自定义渲染页面的运行时选项
menu: render
category: configuration
position: 122
---

# render 属性

> Nuxt.js 允许您自定义渲染页面的运行时选项

## bundleRenderer

- 类型: `Object`

> 使用此选项可自定义 vue SSR 渲染器。`spa`模式会跳过此选项。

```js
export default {
  render: {
    bundleRenderer: {
      directives: {
        custom1(el, dir) {
          // something ...
        }
      }
    }
  }
}
```

了解有关[Vue SSR API 参考](https://ssr.vuejs.org/en/api.html#renderer-options)的可用选项的更多信息。**建议不要使用此选项，因为 Nuxt.js 已经提供了最佳 SSR 默认值，错误配置可能导致 SSR 问题。**

## etag

- 类型: `Object`
  - 默认: `{ weak: true }`

禁用设置页面的 etag `etag: false`

查看 [etag](https://www.npmjs.com/package/etag) 文档来了解更多配置。

### compressor

- 类型 `Object`
  - 默认: `{ threshold: 0 }`

当提供对象（或虚假值）时，将使用[压缩](https://www.npmjs.com/package/compression)中间件（具有相应选项）。

如果您想使用自己的压缩中间件，可以直接引用它(例如： `otherComp({ myOptions: 'example' })`)。

## fallback

- 类型 `Object`
  - 默认: `{ dist: {}, static: { skipUnknown: true } }`

中间件配置选项[serve-placeholder](https://github.com/nuxt/serve-placeholder)。

如果要禁用其中一个或两者，则可以传递`false`。

### http2

- 类型 `Object`
  - 默认: `{ push: false }`

激活 HTTP2 push headers.

## resourceHints

- 类型: `boolean`
  - 默认: `true`

> 添加`prefetch`和`preload`，以加快初始页面加载时间。

如果有许多页面和路由，您可能只想禁用此选项。

## ssr

- 类型: `boolean`
  - 默认: `true` on universal 模式 或 `false` on spa 模式

> 开启 SSR rendering

如果未提供，则根据`mode`值自动设置此选项。这对于在映像构建之后在运行时动态启用/ 禁用 SSR 非常有用。（以 docker 为例）

## static

- 类型: `Object`
  - 默认: `{}`

查看 [serve-static](https://www.npmjs.com/package/serve-static) 文档来了解更多配置。

## dist

- 类型: `Object`
  - 默认: `{ maxAge: '1y', index: false }`

用于提供分发文件的选项。仅适用于生产环境(线上环境)。

查看 [serve-static](https://www.npmjs.com/package/serve-static) 文档来了解更多配置。

## csp

> 使用此配置来加载 Content-Security-Policy 外部资源

- 类型: `Boolean` 或 `Object`
  - 默认: `false`

例如 (`nuxt.config.js`)

```js
export default {
  render: {
    csp: true
  }
}

// 或

export default {
  render: {
    csp: {
      hashAlgorithm: 'sha256',
      allowedSources: undefined,
      policies: undefined
    }
  }
}
```
