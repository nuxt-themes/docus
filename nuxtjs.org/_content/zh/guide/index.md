---
title: 关于 Nuxt.js
description: '2016 年 10 月 25 日, zeit.co 背后的团队对外发布了 Next.js，一个 React 的服务端渲染应用框架。几小时后，与 Next.js 异曲同工，一个基于 Vue.js 的服务端渲染应用框架应运而生，我们称之为：Nuxt.js。'
category: prologue
position: 1
---

> 2016 年 10 月 25 日，[zeit.co](https://zeit.co/) 背后的团队对外发布了 [Next.js](https://zeit.co/blog/next)，一个 React 的服务端渲染应用框架。几小时后，与 Next.js 异曲同工，一个基于 [Vue.js](https://vuejs.org) 的服务端渲染应用框架应运而生，我们称之为：**Nuxt.js**。

## Nuxt.js 是什么？

Nuxt.js 是一个基于 Vue.js 的通用应用框架。

通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 **UI 渲染**。

我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有 Node.js 项目中使用 Nuxt.js。

Nuxt.js 预设了利用 Vue.js 开发**服务端渲染**的应用所需要的各种配置。

除此之外，我们还提供了一种命令叫：`nuxt generate` ，为基于 Vue.js 的应用提供生成对应的静态站点的功能。

我们相信这个命令所提供的功能，是向开发集成各种微服务（Microservices）的 Web 应用迈开的新一步。

作为框架，Nuxt.js 为 `客户端/服务端` 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等。

## Nuxt.js 框架是如何运作的？

![基于 Vue、Webpack 和 Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js 集成了以下组件/框架，用于开发完整而强大的 Web 应用：

- [Vue 2](https://github.com/vuejs/vue)
- [Vue-Router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex) (当配置了 [Vuex 状态树配置项](/docs/2.x/directory-structure/store) 时才会引入)
- [Vue 服务器端渲染](https://ssr.vuejs.org/en/) (排除使用 [`mode: 'spa'`](/api/configuration-mode))
- [Vue-Meta](https://github.com/nuxt/vue-meta)

压缩并 gzip 后，总代码大小为：**57kb** （如果使用了 Vuex 特性的话为 60kb）。

另外，Nuxt.js 使用 [Webpack](https://github.com/webpack/webpack) 和 [vue-loader](https://github.com/vuejs/vue-loader) 、 [babel-loader](https://github.com/babel/babel-loader) 来处理代码的自动化构建工作（如打包、代码分层、压缩等等）。

## 特性

- 基于 Vue.js
- 自动代码分层
- 服务端渲染
- 强大的路由功能，支持异步数据
- 静态文件服务
- ES2015+ 语法支持
- 打包和压缩 JS 和 CSS
- HTML 头部标签管理
- 本地开发支持热加载
- 集成 ESLint
- 支持各种样式预处理器： SASS、LESS、 Stylus 等等
- 支持 HTTP/2 推送

## 流程图

下图阐述了 Nuxt.js 应用一个完整的服务器请求到渲染（或用户通过 `<nuxt-link>` 切换路由渲染页面）的流程：

![nuxt-schema](/nuxt-schema.svg)

## 服务端渲染(通过 SSR)

您可以使用**Nuxt.js**作为框架来处理项目的所有 UI 呈现。

启动时`nuxt`，它将启动具有热更新加载的开发服务器，并且[Vue 服务器端渲染](https://ssr.vuejs.org/en/)配置为自动为服务器呈现应用程序。

### 单页应用程序 (SPA)

如果您不想使用服务器端渲染或需要应用程序提供静态托管，则可以使用 `nuxt --spa` 命令即可使用 `SPA` 模式。它为您提供了强大的 SPA 部署机制，无需使用 `Node.js` 来运行应用程序或任何特殊的服务器端处理。

可以查看 Nuxt.js 提供的各种 [命令](/guide/commands) 来了解更多相关使用信息。

如果你的项目有自己的 Web 服务器（例如用 Express.js 启动的 Web 服务），你仍然可以将 Nuxt.js 当作是中间件来使用，负责 UI 渲染部分的功能。在开发通用的 Web 应用过程中，Nuxt.js 是可插拔的，没有太多的限制，可通过 [开发编码中使用 Nuxt.js](/api/nuxt) 了解更多的信息。

## 静态化 (预渲染)

支持 Vue.js 应用的静态化算是 Nuxt.js 的一个创新点，通过 `nuxt generate` 命令实现。

该命令依据应用的路由配置将每一个路由静态化成为对应的 HTML 文件。

<div>
  <a href="https://vueschool.io/courses/static-site-generation-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
    <img src="/static-site-generation-with-nuxtjs.png" alt="Static Site Generation with Nuxt.js by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">使用Nuxt.js生成静态站点</h4>
      <p class="Promote__Content__Description">了解如何生成静态站点(预渲染)用来提高性能和搜索引擎优化(SEO)，同时减少站点托管成本。</p>
      <p class="Promote__Content__Signature">由VueSchool制作视频课程，用于支持Nuxt.js开发</p>
    </div>
  </a>
</div>

例如，以下文件结构：

```bash
-| pages/
----| about.vue
----| index.vue
```

静态化后变成：

```
-| dist/
----| about/
------| index.html
----| index.html
```

静态化可以让你在任何一个静态站点服务商托管你的 Web 应用。

Nuxt.js 的官网就是一个绝佳的例子, 它静态化后托管在 [Netlify](https://www.netlify.com) 上，也可以参考我们的 [源代码](https://github.com/nuxt/nuxtjs.org) 。

我们不希望每次更新部署 [@nuxt/docs 仓库](https://github.com/nuxt/docs) 的时候都要手工执行 `nuxt generate` 命令生成静态文件，它会触发 Netlify 的钩子应用：

1. 克隆 [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org)
2. 使用 `npm install` 命令安装依赖
3. 运行 `npm run generate`
4. 生成 `dist` 目录

我们现在就有了一个 **无服务端的自动静态化的 Web 应用** :)

我们进一步考虑下电商应用的场景，利用 `nuxt generate`，是不是可以将应用静态化后部署在 CDN 服务器，每当一个商品的库存发生变化时，就重新静态化下，更新下商品的库存。但是如果用户访问的时候恰巧更新了呢？我们可以通过调用电商的 API ，保证用户访问的是最新的数据。这样相对于传统的电商应用来说，这种静态化的方案可以大大节省服务器的资源。

<div class="Alert">

查看 [如何在 Netlify 上部署？](/docs/2.x/deployment/netlify-deployment) 来获取更多相关信息。

</div>
