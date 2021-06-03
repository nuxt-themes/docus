---
title: 异步数据
description: Nuxt.js 扩展了 Vue.js，增加了一个叫 `asyncData` 的方法，使得我们可以在设置组件的数据之前能异步获取或处理数据。
category: getting-started
position: 106
---

> Nuxt.js 扩展了 Vue.js，增加了一个叫 `asyncData` 的方法，使得我们可以在设置组件的数据之前能异步获取或处理数据。

<div>
  <a href="http://vueschool.io/?friend=nuxt" target="_blank" class="Promote">
    <img src="/async-data-with-nuxtjs.png" srcset="/async-data-with-nuxtjs-2x.png 2x" alt="AsyncData by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">使用Nuxt.js的异步数据</h4>
      <p class="Promote__Content__Description">了解如何使用Nuxt.js管理异步数据。</p>
      <p class="Promote__Content__Signature">由VueSchool制作视频课程，用于支持Nuxt.js开发。</p>
    </div>
  </a>
</div>

## asyncData 方法

`asyncData`方法会在组件（**限于页面组件**）每次加载之前被调用。它可以在服务端或路由更新之前被调用。在这个方法被调用的时候，第一个参数被设定为当前页面的[上下文对象](/api#上下文对象)，你可以利用 `asyncData`方法来获取数据，Nuxt.js 会将 `asyncData` 返回的数据融合组件 `data` 方法返回的数据一并返回给当前组件。

<div class="Alert Alert--orange">

注意：由于`asyncData`方法是在组件 **初始化** 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。

</div>

Nuxt.js 提供了几种不同的方法来使用 `asyncData` 方法，你可以选择自己熟悉的一种来用：

1. 返回一个 `Promise`, nuxt.js 会等待该`Promise`被解析之后才会设置组件的数据，从而渲染组件.
2. 使用 [async 或 await](https://github.com/lukehoban/ecmascript-asyncawait) ([了解更多](https://zeit.co/blog/async-and-await))

<div class="Alert Alert--grey">

我们使用 [axios](https://github.com/mzabriskie/axios) 重构 HTTP 请求, 我们 **强烈建议您** 使用我们的 [axios 模块](https://axios.nuxtjs.org/) 用于您的 Nuxt 项目中。

</div>

如果您的项目中直接使用了`node_modules`中的`axios`，并且使用`axios.interceptors`添加拦截器对请求或响应数据进行了处理，确保使用 `axios.create`创建实例后再使用。否则多次刷新页面请求服务器，服务端渲染会重复添加拦截器，导致数据处理错误。

```js
import axios from 'axios'
const myaxios = axios.create({
  // ...
})
myaxios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // ...
  }
)
```

### 返回 Promise

```js
export default {
  asyncData({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`).then(res => {
      return { title: res.data.title }
    })
  }
}
```

### 使用 async 或 await

```js
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### 使用 回调函数

```js
export default {
  asyncData({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`).then(res => {
      callback(null, { title: res.data.title })
    })
  }
}
```

### 返回 对象

如果组件的数据不需要异步获取或处理，可以直接返回指定的字面对象作为组件的数据。

```js
export default {
  data() {
    return { foo: 'bar' }
  }
}
```

### 数据的展示

`asyncData` 方法返回的数据在融合 `data` 方法返回的数据后，一并返回给模板进行展示，如：

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## 上下文对象

可通过 [API `context`](/docs/2.x/internals-glossary/context) 来了解该对象的所有属性和方法。

### 使用 `req`/`res`(`request`/`response`) 对象

在服务器端调用`asyncData`时，您可以访问用户请求的`req`和`res`对象。

```js
export default {
  async asyncData({ req, res }) {
    // 请检查您是否在服务器端
    // 使用 req 和 res
    if (process.server) {
      return { host: req.headers.host }
    }

    return {}
  }
}
```

### 访问动态路由数据

您可以使用`注入`asyncData 属性的`context`对象来访问动态路由数据。例如，可以使用配置它的文件或文件夹的名称访问动态路径参数。所以，如果你定义一个名为`_slug.vue`的文件，您可以通过`context.params.slug`来访问它。

```js
export default {
  async asyncData({ params }) {
    const slug = params.slug // When calling /abc the slug will be "abc"
    return { slug }
  }
}
```

### 监听 query 参数改变

默认情况下，query 的改变不会调用`asyncData`方法。如果要监听这个行为，例如，在构建分页组件时，您可以设置应通过页面组件的`watchQuery`属性监听参数。了解更多有关[API watchQuery](/api/pages-watchquery)的信息。

## 错误处理

Nuxt.js 在上下文对象`context`中提供了一个 `error(params)` 方法，你可以通过调用该方法来显示错误信息页面。`params.statusCode` 可用于指定服务端返回的请求状态码。

以返回 `Promise` 的方式举个例子：

```js
export default {
  asyncData({ params, error }) {
    return axios
      .get(`https://my-api/posts/${params.id}`)
      .then(res => {
        return { title: res.data.title }
      })
      .catch(e => {
        error({ statusCode: 404, message: 'Post not found' })
      })
  }
}
```

如果你使用 `回调函数` 的方式, 你可以将错误的信息对象直接传给该回调函数， Nuxt.js 内部会自动调用 `error` 方法：

```js
export default {
  asyncData({ params }, callback) {
    axios
      .get(`https://my-api/posts/${params.id}`)
      .then(res => {
        callback(null, { title: res.data.title })
      })
      .catch(e => {
        callback({ statusCode: 404, message: 'Post not found' })
      })
  }
}
```

如果你想定制 Nuxt.js 默认的错误提示页面，请参考 [页面布局](/docs/2.x/concepts/views#布局)。
