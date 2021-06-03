---
title: '安装'
description: 'Nuxt.js 十分简单易用。一个简单的项目只需将 `nuxt` 添加为依赖组件即可。'
category: getting-started
position: 101
---

> Nuxt.js 十分简单易用。一个简单的项目只需将 `nuxt` 添加为依赖组件即可。

<div>
  <a href="https://vueschool.io/courses/nuxtjs-fundamentals/?friend=nuxt" target="_blank" class="Promote">
    <img src="/nuxt-fundamentals.png" srcset="/nuxt-fundamentals-2x.png 2x" alt="Nuxt Fundamentals by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Nuxt.js 基础知识</h4>
      <p class="Promote__Content__Description">了解如何在视频中快速使用Nuxt.js</p>
      <p class="Promote__Content__Signature">由VueSchool制作视频课程，用于支持Nuxt.js开发</p>
    </div>
  </a>
</div>

## 运行 create-nuxt-app

为了快速入门，Nuxt.js 团队创建了脚手架工具 [create-nuxt-app](https://github.com/nuxt/create-nuxt-app)。

确保安装了 npx（npx 在 npm 版本 5.2.0 默认安装了）：

```bash
$ npx create-nuxt-app <项目名>
```

或者用 yarn ：

```bash
$ yarn create nuxt-app <项目名>
```

它会让你进行一些选择:

1. 在集成的服务器端框架之间进行选择:

- None (Nuxt 默认服务器)
- [Express](https://github.com/expressjs/express)
- [Koa](https://github.com/koajs/koa)
- [Hapi](https://github.com/hapijs/hapi)
- [Feathers](https://github.com/feathersjs/feathers)
- [Micro](https://github.com/zeit/micro)
- [Fastify](https://github.com/fastify/fastify)
- [Adonis](https://github.com/adonisjs/adonis-framework) (WIP)

2. 选择您喜欢的 UI 框架:

- None (无)
- [Bootstrap](https://github.com/bootstrap-vue/bootstrap-vue)
- [Vuetify](https://github.com/vuetifyjs/vuetify)
- [Bulma](https://github.com/jgthms/bulma)
- [Tailwind](https://github.com/tailwindcss/tailwindcss)
- [Element UI](https://github.com/ElemeFE/element)
- [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)
- [Buefy](https://github.com/buefy/buefy)
- [iView](https://github.com/iview/iview)
- [Tachyons](https://github.com/tachyons-css/tachyons)

3. 选择您喜欢的测试框架:

- None (随意添加一个)
- [Jest](https://github.com/facebook/jest)
- [AVA](https://github.com/avajs/ava)

4. 选择你想要的 Nuxt 模式 (`Universal` or `SPA`)
5. 添加 [axios module](https://github.com/nuxt-community/axios-module) 以轻松地将 HTTP 请求发送到您的应用程序中。
6. 添加 [EsLint](https://eslint.org/) 以在保存时代码规范和错误检查您的代码。
7. 添加 [Prettier](https://prettier.io/) 以在保存时格式化/美化您的代码。

当运行完时，它将安装所有依赖项，因此下一步是启动项目:

```bash
$ cd <project-name>
$ npm run dev
```

应用现在运行在 http://localhost:3000 上运行。

<div class="Alert">

注意：Nuxt.js 会监听 `pages` 目录中的文件更改，因此在添加新页面时无需重新启动应用程序。

</div>

了解模板项目的目录结构： [目录结构](/guide/directory-structure)。

## 从头开始新建项目

如果不使用 Nuxt.js 提供的 starter 模板，我们也可以从头开始新建一个 Nuxt.js 应用项目，过程非常简单，只需要 _1 个文件和 1 个目录_。如下所示：

```bash
$ mkdir <项目名>
$ cd <项目名>
```

<div class="Alert Alert--nuxt-green">

<b>提示:</b> 将 <code>&lt;项目名&gt;</nom-du-projet></code> 替换成为你想创建的实际项目名。

</div>

### 新建 package.json 文件

`package.json` 文件用来设定如何运行 `nuxt`：

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

上面的配置使得我们可以通过运行 `npm run dev` 来运行 `nuxt`。

### 安装 `nuxt`

一旦 `package.json` 创建好， 可以通过以下 npm 命令将 `nuxt` 安装至项目中：

```bash
$ npm install --save nuxt
```

### pages 目录

Nuxt.js 会依据 `pages` 目录中的所有 `*.vue` 文件生成应用的路由配置。

创建 `pages` 目录：

```bash
$ mkdir pages
```

创建我们的第一个页面 `pages/index.vue`：

```html
<template>
  <h1>Hello world!</h1>
</template>
```

然后启动项目：

```bash
$ npm run dev
```

现在我们的应用运行在 http://localhost:3000 上运行。

<div class="Alert">

注意：Nuxt.js 会监听 `pages` 目录中的文件更改，因此在添加新页面时无需重新启动应用程序。

</div>

了解更多关于 Nuxt.js 应用的目录结构： [目录结构](/guide/directory-structure)。
