---
title: 'API: The hooks Property'
description: hooks是Nuxt模块中通常使用的Nuxt事件的监听器，但也可以在`'Nuxt.config.js'`中使用。
menu: hooks
category: configuration
position: 113
---

# hooks 属性

- 类型: `Object`
  > hooks 是[Nuxt 事件的监听器](/api/internals)，这些事件通常在 Nuxt 模块中使用，但也可以在 nuxt.config.js 中使用。[了解更多](/api/internals)

例如 (`nuxt.config.js`):

```js
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(
          builder.nuxt.options.buildDir,
          'extra-file'
        )
        fs.writeFileSync(extraFilePath, 'Something extra')
      }
    }
  }
}
```

在内部，hooks 遵循使用冒号的命名模式(例如，`build:done`)。为了便于配置，当使用`nuxt.config.js`(如上所示)设置自己的钩子时，可以将它们构造为分层对象。有关它们如何工作的更多详细信息，请参考[Nuxt Internals](/api/internals)。

## hooks 列表

- [Nuxt hooks](https://nuxtjs.org/api/internals-nuxt#hooks)
- [Renderer hooks](https://nuxtjs.org/api/internals-renderer#hooks)
- [ModulesContainer hooks](https://nuxtjs.org/api/internals-module-container#hooks)
- [Builder hooks](https://nuxtjs.org/api/internals-builder#hooks)
- [Generator hooks](https://nuxtjs.org/api/internals-generator#hooks)

## 例子

### 不在 root 上时重定向到 router.base

Let´s say you want to serve pages as `/portal` instead of `/`. 假设您希望将页面作为 `/portal` 而不是 `/` 来提供。这可能是一个边缘情况， _nuxt.config.js_’ `router.base`用于当 Web 服务器,服务 Nuxt 而不是域根目录时。

但是当在本地开发时，遇到 _localhost_，当 router.base 不是 / 返回 404 时。为了防止这种情况，你可以设置一个 Hook。

也许重定向不是生产网站的最佳用例，但这将有助于您利用 Hooks。

首先，你[可以 改变 `router.base`](/api/configuration-router#base);更新你的 nuxt.config.js：

```js
// nuxt.config.js
import hooks from './hooks'
export default {
  router: {
    base: '/portal'
  }
  hooks: hooks(this)
}
```

然后，创建一些文件;

1. `hooks/index.js`, Hooks 模块

   ```js
   // file: hooks/index.js
   import render from './render'

   export default nuxtConfig => ({
     render: render(nuxtConfig)
   })
   ```

2. `hooks/render.js`, 渲染 hook

   ```js
   // file: hooks/render.js
   import redirectRootToPortal from './route-redirect-portal'

   export default nuxtConfig => {
     const router = Reflect.has(nuxtConfig, 'router') ? nuxtConfig.router : {}
     const base = Reflect.has(router, 'base') ? router.base : '/portal'

     return {
       /**
        * 'render:setupMiddleware'
        * {@link node_modules/nuxt/lib/core/renderer.js}
        */
       setupMiddleware(app) {
         app.use('/', redirectRootToPortal(base))
       }
     }
   }
   ```

3. `hooks/route-redirect-portal.js`, 中间件本身

   ```js
   // file: hooks/route-redirect-portal.js

   /**
    * Nuxt middleware hook to redirect from / to /portal (or whatever we set in nuxt.config.js router.base)
    *
    * Should be the same version as connect
    * {@link node_modules/connect/package.json}
    */
   import parseurl from 'parseurl'

   /**
    * Connect middleware to handle redirecting to desired Web Applicatin Context Root.
    *
    * Notice that Nuxt docs lacks explaning how to use hooks.
    * This is a sample router to help explain.
    *
    * See nice implementation for inspiration:
    * - https://github.com/nuxt/nuxt.js/blob/dev/examples/with-cookies/plugins/cookies.js
    * - https://github.com/yyx990803/launch-editor/blob/master/packages/launch-editor-middleware/index.js
    *
    * [http_class_http_clientrequest]: https://nodejs.org/api/http.html#http_class_http_clientrequest
    * [http_class_http_serverresponse]: https://nodejs.org/api/http.html#http_class_http_serverresponse
    *
    * @param {http.ClientRequest} req Node.js internal client request object [http_class_http_clientrequest]
    * @param {http.ServerResponse} res Node.js internal response [http_class_http_serverresponse]
    * @param {Function} next middleware callback
    */
   export default desiredContextRoot =>
     function projectHooksRouteRedirectPortal(req, res, next) {
       const desiredContextRootRegExp = new RegExp(`^${desiredContextRoot}`)
       const _parsedUrl = Reflect.has(req, '_parsedUrl') ? req._parsedUrl : null
       const url = _parsedUrl !== null ? _parsedUrl : parseurl(req)
       const startsWithDesired = desiredContextRootRegExp.test(url.pathname)
       const isNotProperContextRoot = desiredContextRoot !== url.pathname
       if (isNotProperContextRoot && startsWithDesired === false) {
         const pathname = url.pathname === null ? '' : url.pathname
         const search = url.search === null ? '' : url.search
         const Location = desiredContextRoot + pathname + search
         res.writeHead(302, {
           Location
         })
         res.end()
       }
       next()
     }
   ```

然后，每当开发中的同事到达开发 Web 开发服务`/`时，发生了意外情况，Nuxt 将自动重定向到`/portal`
