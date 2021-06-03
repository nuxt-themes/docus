---
title: 上下文对象 & 帮助对象
description: context[上下文对象]提供了有关应用请求时可选的*附加*信息。
position: 2
category: concepts
csb_link_context: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-context?fontsize=14&hidenavigation=1&theme=dark
csb_link_helpers: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-helpers?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/context.svg
imgAlt: nuxt-js-context-keys
questions:
  - question: What is the reason the context exists?
    answers:
      - Server-side rendering
      - Having global state
      - Laziness
    correctAnswer: Server-side rendering
  - question: Which key is not in the context?
    answers:
      - env
      - isDev
      - $store
    correctAnswer: $store
  - question: Which context key is only available on the *server* side?
    answers:
      - from
      - app
      - req
    correctAnswer: req
  - question: Which context key is only available on the *client* side?
    answers:
      - from
      - res
      - app
    correctAnswer: from
  - question: What can the `$nuxt` helper *not* do?
    answers:
      - Displaying the version of Nuxt
      - Providing info about the users internet connection status
      - Accessing exposed module functions
    correctAnswer: Displaying the version of Nuxt
  - question: What are the names of the process helpers
    answers:
      - global, client and server
      - server, client and static
      - ssr, spa and static
    correctAnswer: server, client and static
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

`context`上下文对象在特定的`Nuxt`方法中可用，例如[asyncData](/docs/2.x/features/data-fetching#async-data), [plugins](/docs/2.x/directory-structure/plugins), [middleware](/docs/2.x/directory-structure/middleware)和[nuxtServerInit](/docs/2.x/directory-structure/store#the-nuxtserverinit-action). 它提供了有关应用请求时可选的*附加*信息。

`context`上下文对象可以访问 Nuxt.js 应用中的其他功能，例如 `Vuex`或基础的`connect`实例。 在服务器端可用的上下文对象中，我们有`req`和`res`对象，而`store`始终可用。随着后续的更新，上下文对象还扩展了许多其他有用的变量和捷径。现在，我们可以在`development`开发模式下访问 HMR 功能，比如当前的`route`路由，页面`params`参数和`query`查询，以及通过上下文对象访问环境变量的选项。另外，可以通过上下文对象开放模块功能和帮助程序，以便在客户端和服务器端均可使用。

**默认情况下所有的上下文对象都存在**

```js
function (context) { // Could be asyncData, nuxtServerInit, ...
  // Always available
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
   $config
  } = context

  // Only available on the Server-side
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }

  // Only available on the Client-side
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

<base-alert>

这里所指的`context`请勿与[Vuex Actions](https://vuex.vuejs.org/guide/actions.html)中可用的 context 对象或与`nuxt.config.js`文件里 build.extend 方法中的 context 对象混淆。这些都不是相互关联的！

</base-alert>

在[Internals Glossary](/docs/2.x/internals-glossary/context)中了解有关上下文对象的更多关键信息。

### 使用页面参数进行 API 查询

`context`上下文对象通过`context.params`直接公开了路由的动态参数。在下面这个示例中我们通过`nuxt/http`模块，使用动态页面参数作为 URL 的一部分来调用 API。像[nuxt/http](https://http.nuxtjs.org/)模块一样，模块可以公开自己的方法然后通过[context.app](http://context.app)对象来使用这些功能。

另外，我们可以把 API 调用包裹在`try/catch`语法里来捕获错误。配合`context.error`方法，我们可以直接显示 Nuxt 的错误页面并传递发生的错误。

```js{}[pages/posts/_id.vue]
export default {
  async asyncData(context) {
    const id = context.params.id
    try {
      // Using the nuxtjs/http module here exposed via context.app
      const post = await context.app.$http.$get(
        `https://api.nuxtjs.dev/posts/${id}`
      )
      return { post }
    } catch (e) {
      context.error(e) // Show the nuxt error page with the thrown error
    }
  }
}
```

配合[ES6](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/)语法可以解构`context`上下文对象。直接传入想要访问的对象，然后在代码中使用它们即可。无需再使用`context`。

```js{}[pages/posts/_id.vue]
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      // Using the nuxtjs/http module here exposed via context.app
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (e) {
      error(e) // Show the nuxt error page with the thrown error
    }
  }
}
```

想要用请求参数来代替？你可以使用[context.query.id](/docs/2.x/internals-glossary/context#query)。

### 重定向用户&访问存储

可以通过`context`上下文对象来访问 Vuex 存储（设置过`store`存储目录的话）。它提供了一个`存储`对象，在 Vue 组件中可以把它看作`this.$store`。 另外，当`认证`状态错误的时候。可以使用`redirect`重定向方法（通过上下文对象公开的帮助对象）来重定向用户。

```js
export default {
  middleware({ store, redirect }) {
    // retrieving keys via object destructuring
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```

<base-alert type="next">

了解更多有关[redirect method](/docs/2.x/internals-glossary/context#redirect)的信息。

</base-alert>

## 一些对开发有帮助的对象

除了`context`上下文对象的提供的一些方法外，在 Nuxt.js 应用中还有一些对开发有帮助的对象。

## `$nuxt`: Nuxt.js 的好帮手

`$nuxt`是一个帮助对象，可以改善用户体验并在某些情况下帮助开发者。它可以通过 Vue 组件中的`this.$nuxt`和客户端上的`window.$nuxt`来访问。

### isOffline 检查网络连接状态

`$nuxt`对象提供了一个快速的方法来判断用户的网络连接状态是否在线：它公开了`isOffline`和`isOnline`对象，当用户离线时，我们可以使用它们来显示消息（比如下面这个例子）。

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <Nuxt />
  </div>
</template>
```

### window.$nuxt 访问根部实例

除了提供改善 DX/UX(用户体验/开发人员体验)的功能外，`$nuxt`帮助对象还提供了从其他组件访问到应用根部实例的方式。但这还不是全部——你还可以通过`window.$nuxt`来访问`$nuxt`帮助对象，可以将其用作最后的解决方案，比如从 Vue 组件外部访问`$axios`之类的模块方法。一定要理智的使用它，并且`作为最后的解决方案`。

### refresh 刷新页面数据

当你想要为用户刷新当前页面数据的时候，不要让用户重新加载页面，因为用户的再次访问，至少会重新初始化整个 Nuxt.js 应用。 大部分情况下你只需要刷新`asyncData`或`fetch`中提供的数据。

在这时，你就可以通过使用`this.$nuxt.refresh()`来实现这个需求！

```html
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Created at: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

### $loading 控制加载进度条

通过`$nuxt`，还可以使用`this.$nuxt.$loading`来用代码的方式控制 Nuxt 的加载进度条。

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

了解更多有关[loading feature chapter](../features/loading)。

## onNuxtReady 判断应用是否已经加载完成

如果你想要在 Nuxt.js 应用加载完后运行一些 scripts 脚本，你可以使用`window.onNuxtReady`方法。当你想在客户端执行一些方法而又不增加与网站交互的时间时，这个功能很有用。

```js
window.onNuxtReady(() => {
  console.log('Nuxt.js is ready and mounted')
})
```

## Process 检查运行状态

在 Nuxt.js 的全局`process`对象中，有三个布尔值状态，可以帮助你判断应用是跑在服务器上还是跑在客户端上，以及检查是否部署在静态网站上。这些帮助对象通常在`asyncData`代码块中使用。

```html{}[pages/about.vue]
<template>
  <h1>I am rendered on the {{ renderedOn }} side</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'client' : 'server' }
    }
  }
</script>
```

在这个示例中，当在服务器端运行时，renderOn 判断为`服务器`，并让用户直接访问页面。当用户从应用中的另一部分导航到这个页面时，例如通过`<NuxtLink>`，renderOn 将判断为运行在`客户端`。

<quiz :questions="questions"></quiz>
