---
title: Nuxt 生命周期
description: 无论使用哪种工具，当了解了该工具在幕后的工作方式时，那你就会充满信心。 Nuxt.js也是如此。
position: 5
category: concepts
img: /docs/2.x/nuxt-lifecycle.svg
imgAlt: understanding-nuxt-2-12-lifecycle-hooks
questions:
  - question: When does the Nuxt.js lifecycle start?
    answers:
      - When the response will be sent to the client
      - After the build phase
      - When running nuxt dev
    correctAnswer: After the build phase
  - question: On which main factors does the content of the lifecycle depend?
    answers:
      - Which time and date we have when starting the server
      - If server side rendering is enabled and if so, which type is used
      - What type of OS the Nuxt.js application is running on
    correctAnswer: If server side rendering is enabled and if so, which type is used
  - question: When is nuxtServerInit called?
    answers:
      - Server-side and client-side
      - After the Vue hydration
      - Only on the server side
    correctAnswer: Only on the server side
  - question: What are the three types of middleware?
    answers:
      - Global, Layout, Route
      - Global, Layout, Page
      - Global, Group, Route
    correctAnswer: Global, Layout, Route
  - question: What step can only happen on the client side?
    answers:
      - Vue Hydration
      - Middleware execution
      - Calling the fetch function
    correctAnswer: Vue Hydration
  - question: Which step never happens on the client side?
    answers:
      - Executing asyncData
      - Executing serverMiddleware
      - Executing fetch
    correctAnswer: Executing serverMiddleware
  - question: Which Vue methods are called on both, server and client side?
    answers:
      - mounted and beforeMount
      - beforeDestroy and destroyed
      - created and beforeCreate
    correctAnswer: created and beforeCreate
  - question: What step does not happen after navigating via <NuxtLink>?
    answers:
      - Calling fetch
      - Executing client-side Nuxt.js plugins
      - Calling beforeCreate
    correctAnswer: Executing client-side Nuxt.js plugins
  - question: What is the special difference between asyncData and fetch after navigating via <NuxtLink>?
    answers:
      - asyncData is faster than fetch
      - asyncData is called after fetch
      - asyncData is blocking while fetch is not
    correctAnswer: asyncData is blocking while fetch is not
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

无论使用哪种工具，当了解了该工具在幕后的工作方式时，那你就会充满信心。 Nuxt.js 也是如此。这个章节的目的是为向你介绍框架高阶部分的不同，它们的执行顺序以及它们如何协同工作。

Nuxt.js 生命周期描述了在开始构建之后发生的情况，在这个阶段，你的应用被打包，分块和压缩。在这个阶段之后会发生什么情况取决于您是否启用了服务器端渲染。如果有的话，它还取决于您选择的服务器端渲染类型：

动态 SSR (`nuxt start`)

或

生成静态网站 (`nuxt generate`).

## 生命周期

### 服务器端

`下面这段大部分都是api或者是内置对象，译者无法准确翻译它的意思，所以容易有歧义的部分就用作者原文来代替了。`

在服务器端渲染，应用的每个初始请求将执行以下步骤

- 服务启动 (`nuxt start`)

当使用生成静态网站时，服务启动步骤仅在构建时执行，但对于将要生成的每个页面都会执行一次

- 开始生成过程 (`nuxt generate`)

- Nuxt hooks
- serverMiddleware
- Server-side Nuxt plugins
  - 按照 nuxt.config.js 中定义的顺序
- nuxtServerInit
  - Vuex action that is called only on server-side to pre-populate the store
  - First argument is the **Vuex context**, second argument is the **Nuxt.js context**
    - Dispatch other actions from here → only "entry point" for subsequent store actions on server-side
  - can only be defined in `store/index.js`
- Middleware
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData
- beforeCreate (Vue 生命周期方法)
- created (Vue 生命周期方法)
- The new fetch (top to bottom, siblings = parallel)
- Serialization of state (`render:routeContext` Nuxt.js hook)

- HTML 开始渲染 (`render:route` Nuxt.js hook)

- `render:routeDone` HTML 已经全部发送到浏览器

- `generate:before` Nuxt.js hook
- 生成 HTML 文件
  - **全静态生成**
    - e.g. static payloads are extracted
  - `generate:page` (HTML 已经创建好了)
  - `generate:routeCreated` (路由已经创建好了)
- `generate:done` 已经生成好了所有的 HTML 文件

### Client

无论选择哪种 Nuxt.js 模式，这部分的生命周期都将在浏览器中完全执行。

- Receives the HTML
- Loading assets (e.g. JavaScript)
- Vue Hydration 激活 vue.js
- Middleware
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (blocking)
- client-side Nuxt.js plugin
  - 按照 nuxt.config.js 中定义的顺序
- beforeCreate (Vue 生命周期方法)
- created (Vue 生命周期方法)
- The new fetch (top to bottom, siblings = parallel) (non-blocking)
- beforeMount (Vue 生命周期方法)
- mounted (Vue 生命周期方法)

### Navigate using the NuxtLink component

与*client*部分相同，当通过`<NuxtLink>`进行导航时，一切都在浏览器中进行。 此外，在完成所有*blocking*任务之前，不会显示页面内容。

<base-alert type="info">

了解更多有关[`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component)。

</base-alert>

- middleware (blocking)
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (blocking)
- asyncData (blocking) [or full static payload loading]
- beforeCreate & created (Vue 生命周期方法)
- fetch (non-blocking)
- beforeMount & mounted

### What's next

<base-alert type="next">

查看这里[Features book](/docs/2.x/features/rendering-modes)

</base-alert>

<quiz :questions="questions"></quiz>
