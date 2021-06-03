---
title: 'API: generate 属性配置'
description: 配置 Nuxt.js 应用生成静态站点的具体方式。
menu: generate
category: configuration
position: 110
---

# generate 属性配置

- 类型： `Object`

> 配置 Nuxt.js 应用生成静态站点的具体方式。

当运行 `nuxt generate` 命令或在编码中调用 `nuxt.generate()` 时，Nuxt.js 会使用 `generate` 属性的配置。

## dir

- 类型： 'String'
- 默认值： `'dist'`

`nuxt generate` 生成的目录名称。

## devtools

- 类型: `boolean`
- 默认: `false`

配置是否允许 [vue-devtools](https://github.com/vuejs/vue-devtools) 调试。

如果您已经通过 nuxt.config.js 或其他方式激活，则无论标志为 `true` 或者 `false`，devtools 都会启用。

## fallback

- 类型: `String` 或 `Boolean`
- 默认: `'200.html'`

在将生成的站点部署到静态主机时，可以使用此文件。它将回退到模式：`mode:'spa'`。

## interval

- 类型: `Number`
- 默认: `0`

两个渲染周期之间的间隔，以避免使用来自 Web 应用程序的 API 调用互相干扰。

## minify

- **不推荐使用!**
- 使用 [build.html.minify](/api/configuration-build#html-minify) 来替代。

## routes

- 类型： `Array`

在 Nuxt.js 执行 `generate` 命令时，[动态路由](/guide/routing#动态路由) 会被忽略。

例如：

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

上面的目录结构，Nuxt.js 只会生成路由 `/` 对应的静态文件。（译者注：因为 `/users/:id` 是动态路由）如果想让 Nuxt.js 为动态路由也生成静态文件，你需要指定动态路由参数的值，并配置到 `routes` 数组中去。

例如，我们可以在 `nuxt.config.js` 中为 `/users/:id` 路由配置如下：

```js
module.exports = {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

当我们运行 `nuxt generate` 命令时：

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

棒极了，但是如果路由**动态参数**的值是动态的而不是固定的，应该怎么做呢？

1. 使用一个返回 `Promise` 对象类型 的 `函数`。
2. 使用一个回调是 `callback(err, params)` 的 `函数`。

### 返回一个 Promise 对象的函数

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return '/users/' + user.id
        })
      })
    }
  }
}
```

### 返回回调函数

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes(callback) {
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => {
            return '/users/' + user.id
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  }
}
```

### 加速带有有效载荷(`payload`)的动态路由生成

在上面的示例中，我们使用来自服务器的`user.id`来生成路由，但抛弃其余的数据。通常，我们需要从`/users/_id.vue`中再次获取它。虽然我们可以这样做，但我们可能需要将`generate.interval`设置为`100`，以免通过调用来执行。因为这会增加生成脚本的运行时间，所以最好将整个用户对象传递给`_id.vue`中的`context`。我们通过将上面的代码修改为：

`nuxt.config.js`

```js
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return {
            route: '/users/' + user.id,
            payload: user
          }
        })
      })
    }
  }
}
```

现在我们可以从`/users/_id.vue`访问的`payload`，如下所示：

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- 类型: `Boolean`
- 默认: `true`

默认情况下，运行`nuxt generate`将为每个路由创建一个目录并生成`index.html`文件。

例如:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

设置为`false`时，将根据路由路径生成 HTML 文件：

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```

_注意：使用[Netlify](https://netlify.com)或使用 HTML 回退的任何静态托管服务器，此选项可能很有用。_

## 并发

- 类型: `Number`
- 默认: `500`

路由的生成是并发的，`generate.concurrency`指定在一个线程中运行的路由数量。
