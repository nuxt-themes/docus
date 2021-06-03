---
title: 'API: router 属性配置'
description: router 属性让你可以个性化配置 Nuxt.js 应用的路由。
menu: router
category: configuration
position: 124
---

# router 属性配置

> router 属性让你可以个性化配置 Nuxt.js 应用的路由（[vue-router](https://router.vuejs.org/zh-cn/)）。

## base

- 类型： `String`
- 默认值： `'/'`

应用的根 URL。举个例子，如果整个单页面应用的所有资源可以通过 `/app/` 来访问，那么 `base` 配置项的值需要设置为 `'/app/'`。

例如 (`nuxt.config.js`)：

```js
module.exports = {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">

`base` 被设置后，Nuxt.js 会自动将它添加至页面中： `<base href="{{ router.base }}"/>`。

</div>

> 该配置项的值会被直接传给 vue-router 的[构造器](https://router.vuejs.org/zh-cn/api/options.html)。

## routeNameSplitter

- 类型: `String`
- 默认: `'-'`

您可能希望更改 Nuxt.js 使用的路由名称之间的分隔符。您可以通过配置文件中的`routeNameSplitter`选项执行此操作。想象一下，我们有页面文件`pages/posts/_id.vue`。Nuxt 将以编程方式生成路由名称，在本例中为`posts-id`。因此，将`routeNameSplitter`配置修改为`/`，这样路由名称生成为`posts/id`。

例如 (`nuxt.config.js`):

```js
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

## extendRoutes

- 类型: `Function`

您可能希望扩展`Nuxt.js`创建的路由。您可以通过`extendRoutes`选项执行此操作。

例如添加自定义路由:

`nuxt.config.js`

```js
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

路由的模式应该遵循[vue-router](https://router.vuejs.org/en/)模式。

## linkActiveClass

- 类型： `String`
- 默认值： `'nuxt-link-active'`

全局配置 [`<nuxt-link>`](/api/components-nuxt-link) 组件默认的激活类名。

例如 (`nuxt.config.js`)：

```js
module.exports = {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> 该配置项的值会被直接传给 vue-router 的[构造器](https://router.vuejs.org/zh-cn/api/options.html)。

## linkExactActiveClass

- 类型: `String`
- 默认: `'nuxt-link-exact-active'`

全局配置 [`<nuxt-link>`](/api/components-nuxt-link) 默认的 active class。

例如 (`nuxt.config.js`):

```js
export default {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> 此选项直接提供给 vue-router [linkexactactiveclass](https://router.vuejs.org/api/#linkexactactiveclass).

## linkPrefetchedClass

- 类型: `String`
- 默认: `false`

全局配置[`<nuxt-link>`](/api/components-nuxt-link)默认值(默认情况下禁用功能)

例子 (`nuxt.config.js`):

```js
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

## middleware

- 类型： `String` 或 `Array`
  - 数值元素类型: `String`

为应用的每个页面设置默认的中间件。

例如：

`nuxt.config.js`

```js
module.exports = {
  router: {
    // 在每页渲染前运行 middleware/user-agent.js 中间件的逻辑
    middleware: 'user-agent'
  }
}
```

`middleware/user-agent.js`

```js
export default function (context) {
  // 给上下文对象增加 userAgent 属性（增加的属性可在 `asyncData` 和 `fetch` 方法中获取）
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

了解更多关于中间件的信息，请参考 [中间件指引文档](/guide/routing#中间件)。

## mode

- 类型：`String`
- 默认值：`'history'`

配置路由的模式，鉴于服务端渲染的特性，不建议修改该配置。

示例 (`nuxt.config.js`):

```js
module.exports = {
  router: {
    mode: 'hash'
  }
}
```

> 该配置项的值会被直接传给 vue-router 的[构造器](https://router.vuejs.org/zh-cn/api/options.html)。

## scrollBehavior

- 类型： `Function`

`scrollBehavior` 配置项用于个性化配置跳转至目标页面后的页面滚动位置。每次页面渲染后都会调用 `scrollBehavior` 配置的方法。

`scrollBehavior` 的默认配置为：

```js
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (
          typeof window.CSS !== 'undefined' &&
          typeof window.CSS.escape !== 'undefined'
        ) {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn(
            'Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).'
          )
        }
      }
      resolve(position)
    })
  })
}
```

举个例子，我们可以配置所有页面渲染后滚动至顶部：

`nuxt.config.js`：

```js
module.exports = {
  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  }
}
```

> 该配置项的值会被直接传给 vue-router 的[构造器](https://router.vuejs.org/zh-cn/api/options.html)。

## parseQuery / stringifyQuery

- 类型: `Function`

提供自定义查询字符串解析/字符串化功能。覆盖默认值。

> 此选项直接提供在 vue-router [parseQuery / stringifyQuery](https://router.vuejs.org/api/#parsequery-stringifyquery).

## prefetchLinks

> Nuxt v2.4.0 添加

- 类型: `Boolean`
- 默认: `true`

在视图中检测到时，配置`<nuxt-link>`用来预获取*代码分割*页面。需要支持[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)( 参阅 [CanIUse](https://caniuse.com/#feat=intersectionobserver))。

我们建议使用[Polyfill.io](https://polyfill.io)等服务有条件地填充此功能：

`nuxt.config.js`

```js
export default {
  head: {
    script: [
      {
        src: 'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver',
        body: true
      }
    ]
  }
}
```

要禁用特定链接上的预取，可以使用`no-prefetch` 属性：

```html
<nuxt-link to="/about" no-prefetch>About page not pre-fetched</nuxt-link>
```

要全局禁用所有链接上的预取，请将`prefetchLinks`设置为`false`：

```js
// nuxt.config.js
export default {
  router: {
    prefetchLinks: false
  }
}
```

## fallback

- 类型: `boolean`
- 默认: `false`

当浏览器不支持 history.pushState 但模式设置为 history 时，控制路由器是否应回退。

将此设置为`false`实质上会使每个路由器链接导航在 IE9 中刷新整页。当应用程序是服务器呈现并且需要在 IE9 中工作时，这很有用，因为**hash 模式**URL 不适用于 SSR。

> 此选项直接提供在 vue-router [fallback](https://router.vuejs.org/api/#fallback).
