---
title: 生成静态网站
description: 生成静态网站，你就可以在构建阶段渲染应用并将其部署到任意一个静态托管服务上，例如Netlify，GitHub页面，Vercel等。
position: 4
category: concepts
questions:
  - question: You need a server to host your static site
    answers:
      - True
      - False
    correctAnswer: False
  - question: What command do you use to generate your static site?
    answers:
      - nuxt build
      - nuxt prerender
      - nuxt generate
    correctAnswer: nuxt generate
  - question: When is your API called?
    answers:
      - Every time you navigate to the page with the API content
      - When you generate your site
      - When you generate your site and every time you navigate to the page with the API content
    correctAnswer: When you generate your site
  - question: Which pages will fallback into single page application mode?
    answers:
      - The error page
      - Those that are excluded from generation with generate.excludes
      - All pages on navigation
    correctAnswer: Those that are excluded from generation with generate.excludes
  - question: How do you update the content to your site?
    answers:
      - It is updated automatically
      - You need to regenerate your site
    correctAnswer: You need to regenerate your site
---

生成静态网站，你就可以在构建阶段渲染应用并将其部署到任意一个静态托管服务上，例如 Netlify，GitHub 页面，Vercel 等。

这意味着不需要服务器即可部署你的应用。

### 生成你的网站

在使用[target:static](/docs/2.x/features/deployment-targets#static-hosting)部署网站时，所有`.vue`页面都会生成 HTML 和 JavaScript 文件。所有对 API 的调用都将在生成的内容内进行并缓存在一个名为 static 的文件夹中，因此无需在客户端导航上调用任何 API。

### Step 1: 浏览器到 CDN

当浏览器发送初始请求时，它将请求到 CDN。

### Step 2: CDN to Browser

CDN 将发送已经生成好的 HTML, JavaScript 和 static 资源到浏览器，页面开始显示，并激活 Vue.js。等这个过程完成后，就可以开始页面交互了。

### Step 3: Browser to Browser

最后使用[`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component)，这样在页面之间的导航，将全在客户端完成。因此无需再次点击 CDN 并调用所有 API，即使你强制刷新浏览器，也将从已缓存的静态文件夹中加载。

### 回到 SPA

通过使用`generate.exclude`属性可以将单个页面回到单页应用状态，并将该页面从期望生成的页面中排除。因此，这些页面在 CDN 中将不存在，并且一旦用户导航到该页面，它们就会在浏览器的客户端上渲染。

<base-alert type="next">

了解更多有关[generate property](/docs/2.x/configuration-glossary/configuration-generate#exclude)。

</base-alert>

### 更新内容

为了让网站能从 API 上获得新内容，网站需要重新生成。对于大多数静态站点托管提供商，你可以通过 git 命令或拉取请求将更改推送到 master 分支来实现。

（tips: 黑人运动后现在是 main 分支..）

### 预览模式

预览模式可以调用你的 API 或 CMS，放便你可以实时查看更改，然后再进行部署。有关如何启用此功能的信息，请参见[preview mode](/docs/2.x/features/live-preview)

<quiz :questions="questions"></quiz>
