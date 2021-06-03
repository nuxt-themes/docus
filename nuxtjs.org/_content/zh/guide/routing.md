---
title: 路由
description: Nuxt.js 依据页面文件的目录结构来生成应用的路由配置， 和上世纪宇宙最强开发语言PHP创建路由的方式一样的简单。
category: getting-started
position: 104
---

> Nuxt.js 依据 `pages` 目录结构自动生成 [vue-router](https://github.com/vuejs/vue-router) 模块的路由配置。

<div class="Alert Alert--grey">

要在页面之间使用路由，我们建议使用[`<nuxt-link>`](/api/components-nuxt-link) 标签。

</div>

例如:

```html
<template>
  <nuxt-link to="/">首页</nuxt-link>
</template>
```

## 基础路由

假设 `pages` 的目录结构如下：

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

那么，Nuxt.js 自动生成的路由配置如下：

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## 动态路由

在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的**以下划线作为前缀**的 Vue 文件 或 目录。

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/nuxtjs-dynamic-routes?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      观看Vue School出品的 <strong>动态路由</strong> 免费课程
    </p>
  </a>
</div>

以下目录结构：

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

Nuxt.js 生成对应的路由配置表为：

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

你会发现名称为 `users-id` 的路由路径带有 `:id?` 参数，表示该路由是可选的。如果你想将它设置为必选的路由，需要在 `users/_id` 目录内创建一个 `index.vue` 文件。

：API Configuration generate

<div class="Alert Alert--orange">

<b>警告：</b>`generate` 命令会忽略动态路由: [API Configuration generate](/docs/2.x/configuration-glossary/configuration-generate)

</div>

### 路由参数校验

Nuxt.js 可以让你在动态路由组件中定义参数校验方法。

举个例子： `pages/users/_id.vue`

```js
export default {
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  }
}
```

如果校验方法返回的值不为 `true`或`Promise`中 resolve 解析为`false`或抛出 Error ， Nuxt.js 将自动加载显示 404 错误页面或 500 错误页面。

想了解关于路由参数校验的信息，请参考 [页面校验 API](/api/pages-validate)。

## 嵌套路由

你可以通过 vue-router 的子路由创建 Nuxt.js 应用的嵌套路由。

创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个**与该文件同名**的目录用来存放子视图组件。

<div class="Alert Alert--orange">

<b>Warning:</b> 别忘了在父组件(`.vue`文件) 内增加 `<nuxt-child/>` 用于显示子视图内容。

</div>

假设文件结构如：

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

Nuxt.js 自动生成的路由配置如下：

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## 动态嵌套路由

这个应用场景比较少见，但是 Nuxt.js 仍然支持：在动态路由下配置动态子路由。

假设文件结构如下：

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

Nuxt.js 自动生成的路由配置如下：

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

### 未知嵌套深度的动态嵌套路由

如果您不知道 URL 结构的深度，您可以使用`_.vue`动态匹配嵌套路径。这将处理与*更具体*请求不匹配的情况。

文件结构:

```bash
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

将处理这样的请求：

| Path                     | File               |
| ------------------------ | ------------------ |
| `/`                      | `index.vue`        |
| `/people`                | `people/index.vue` |
| `/people/123`            | `people/_id.vue`   |
| `/about`                 | `_.vue`            |
| `/about/careers`         | `_.vue`            |
| `/about/careers/chicago` | `_.vue`            |

**Note:** 处理 404 页面，现在符合`_.vue`页面的逻辑。 [有关 404 重定向的更多信息，请点击此处](/docs/2.x/features/data-fetching#async-data).

### 命名视图

要渲染命名视图，您可以在`布局(layout) / 页面(page)`中使用 `<nuxt name="top"/>` 或 `<nuxt-child name="top"/>` 组件。要指定页面的**命名视图**，我们需要在`nuxt.config.js`文件中扩展路由器配置：

```js
export default {
  router: {
    extendRoutes(routes, resolve) {
      const index = routes.findIndex(route => route.name === 'main')
      routes[index] = {
        ...routes[index],
        components: {
          default: routes[index].component,
          top: resolve(__dirname, 'components/mainTop.vue')
        },
        chunkNames: {
          top: 'components/mainTop'
        }
      }
    }
  }
}
```

它需要使用**两个属性** `components` 和 `chunkNames` 扩展路由。此配置示例中的命名视图名称为 `top` 。看一个例子:[命名视图 例子](/examples/named-views)。

### SPA fallback

您也可以为动态路由启用`SPA fallback`。在使用`mode:'spa'`模式下，Nuxt.js 将输出一个与`index.html`相同的额外文件。如果没有文件匹配，大多数静态托管服务可以配置为使用 SPA 模板。生成文件不包含头信息或任何 HTML，但它仍将解析并加载 API 中的数据。

我们在`nuxt.config.js`文件中启用它：

```js
export default {
  generate: {
    fallback: true, // if you want to use '404.html'
    fallback: 'my-fallback/file.html' // if your hosting needs a custom location
  }
}
```

#### 在 Surge 上实现

Surge [可以处理](https://surge.sh/help/adding-a-custom-404-not-found-page)`200.html` 和 `404.html`，`generate.fallback`默认设置为`200.html`，因此无需更改它。

#### 在 GitHub Pages 和 Netlify 上实现

GitHub Pages 和 Netlify 自动识别 `404.html`文件，所以我们需要做的就是将 `generate.fallback` 设置为 `true`！

#### 在 Firebase Hosting 上实现

要在 Firebase Hosting 上使用，请将 `generate.fallback` 配置为 `true` 并使用以下配置 ([more info](https://firebase.google.com/docs/hosting/url-redirects-rewrites#section-rewrites))：

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/404.html"
      }
    ]
  }
}
```

## 过渡动效

Nuxt.js 使用 Vue.js 的[&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components)组件来实现路由切换时的过渡动效。

### 全局过渡动效设置

<div class="Alert Alert--nuxt-green">

<b>提示 :</b>Nuxt.js 默认使用的过渡效果名称为 `page`

</div>

如果想让每一个页面的切换都有淡出 (fade) 效果，我们需要创建一个所有路由共用的 CSS 文件。所以我们可以在 `assets/` 目录下创建这个文件：

在全局样式文件 `assets/main.css` 里添加一下样式：

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
```

然后添加到 `nuxt.config.js` 文件中：

```js
module.exports = {
  css: ['assets/main.css']
}
```

关于过渡效果 `transition` 属性配置的更多信息可参看 [页面过渡效果 API](/api/pages-transition)。

### 页面过渡动效设置

如果想给某个页面自定义过渡特效的话，只要在该页面组件中配置 `transition` 字段即可：

在全局样式 `assets/main.css` 中添加一下内容：

```css
.test-enter-active,
.test-leave-active {
  transition: opacity 0.5s;
}
.test-enter,
.test-leave-active {
  opacity: 0;
}
```

然后我们将页面组件中的 `transition` 属性的值设置为 `test` 即可：

```js
export default {
  transition: 'test'
}
```

关于过渡效果 `transition` 属性配置的更多信息可参看 [页面过渡效果 API](/api/pages-transition)。

## 中间件

> 中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。

每一个中间件应放置在 `middleware/` 目录。文件名的名称将成为中间件名称 (`middleware/auth.js`将成为 `auth` 中间件)。

一个中间件接收 [context](/api#上下文对象) 作为第一个参数：

```javascript
export default function (context) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

中间件执行流程顺序：

1. `nuxt.config.js`
2. 匹配布局
3. 匹配页面

中间件可以异步执行,只需要返回一个 `Promise` 或使用第 2 个 `callback` 作为第一个参数：

`middleware/stats.js`

```javascript
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

然后在你的 `nuxt.config.js` 、 layouts 或者 pages 中使用中间件:

`nuxt.config.js`

```javascript
module.exports = {
  router: {
    middleware: 'stats'
  }
}
```

现在，`stats` 中间件将在每个路由改变时被调用。

您也可以将 middleware 添加到指定的布局或者页面:

`pages/index.vue` 或者 `layouts/default.vue`

```js
export default {
  middleware: 'stats'
}
```

如果你想看到一个使用中间件的真实例子，请参阅在 GitHub 上的[example-auth0](https://github.com/nuxt/example-auth0)。
