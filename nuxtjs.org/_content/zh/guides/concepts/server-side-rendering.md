---
title: 服务器端渲染
description: 服务器端渲染（SSR）是指：应用程序在服务器上渲染页面而不是在浏览器中渲染页面的能力。
position: 3
category: concepts
questions:
  - question: What kinda of server do you need for Server Side Rendering?
    answers:
      - PHP server
      - JavaScript server
      - Node.js server
    correctAnswer: Node.js server
  - question: What do you use to extend and control the server?
    answers:
      - Middleware
      - ServerMiddleware
      - It is not possible to control the server
    correctAnswer: ServerMiddleware
  - question: You can host a server side rendered application on a serverless hosting provider
    answers:
      - true
      - false
    correctAnswer: false
  - question: Do we have access to  document on the server-side?
    answers:
      - yes, it is always available
      - No, The object belongs to the browser and is not available on the server
    correctAnswer: No, The object belongs to the browser and is not available on the server
  - question: When does your page become interactive?
    answers:
      - When the browser receives the rendered HTML from the server
      - When the Vue.js hydration kicks in
      - When a browser sends the initial request
    correctAnswer: When the Vue.js hydration kicks in
  - question: Navigating between pages using <NuxtLink> is done
    answers:
      - Client side
      - Server side
    correctAnswer: Client side
  - question: What are the correct steps?
    answers:
      - browser → server, server → browser, browser → browser
      - server → browser, browser → server, server → server
      - browser → server, server → browser, browser → server
    correctAnswer: browser → server, server → browser, browser → browser
---

服务器端渲染（SSR）是指：应用程序在服务器上渲染页面而不是在浏览器中渲染页面的能力。服务器端将完全渲染好的页面发送给客户端，然后让客户端的 JavaScript 包接管页面，并允许 Vue.js 应用进行[hydrate](https://ssr.vuejs.org/guide/hydration.html)激活。

## 需要 Node.js 服务器

渲染页面需要 JavaScript 环境。

需要将 Node.js 服务器配置为可以运行 Vue.js 应用。

## 扩展服务器

可以使用`serverMiddleware`扩展服务器，并使用中间件控制路由。

```js{}[api/logger.js]
export default function (req, res, next) {
  console.log(req.url)
  next()
}
```

```js{}[nuxt.config.js]
export default {
  serverMiddleware: ['~/api/logger']
}
```

## 服务器环境与浏览器环境对比

在 Node.js 环境中，可以访问例如`req`和`res`对象，但是不能访问`window`或`document`对象，因为它们属于浏览器环境。

你可以使用`beforeMount`或`mounted`生命周期钩子来使用`window`或`document`对象。

```js
beforeMount () {
  window.alert('hello');
}
mounted () {
  window.alert('hello');
}
```

## Nuxt.js 的服务器端渲染步骤

### 步骤 1：浏览器到服务器

当浏览器发送初始请求时，它将访问 Node.js 内部的服务器。Nuxt.js 会生成 HTML，并将已执行函数的结果返回给浏览器（例如， `asyncData`，`nuxtServerInit`或`fetch`）。生命周期函数也已被执行。

### 步骤 2：服务器到浏览器

浏览器通过接收服务器端生成的 HTML 来渲染页面，页面开始显示，并激活 Vue.js。等这个过程完成后，就可以开始页面交互了。

### Step 3: 浏览器到浏览器

最后使用[`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component)，这样在页面之间的导航，将全在客户端完成。除非强制刷新浏览器，否则不会再次访问服务器。

<quiz :questions="questions"></quiz>
