---
title: 命令
description: Nuxt.js 提供了一系列常用的命令, 用于开发或发布部署。
category: getting-started
position: 113
---

> Nuxt.js 提供了一系列常用的命令, 用于开发或发布部署。

## 命令列表

| 命令          | 描述                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------- |
| nuxt          | 启动一个热加载的 Web 服务器（开发模式） [http://localhost:3000](http://localhost:3000)。 |
| nuxt build    | 利用 webpack 编译应用，压缩 JS 和 CSS 资源（发布用）。                                   |
| nuxt start    | 以生产模式启动一个 Web 服务器 (需要先执行`nuxt build`)。                                 |
| nuxt generate | 编译应用，并依据路由配置生成对应的 HTML 文件 (用于静态站点的部署)。                      |

如果使用了 Koa/Express 等 Node.js Web 开发框架，并使用了 Nuxt 作为中间件，可以自定义 Web 服务器的启动入口：

| 命令                                         | 描述                                                            |
| -------------------------------------------- | --------------------------------------------------------------- |
| NODE_ENV=development nodemon server/index.js | 启动一个热加载的自定义 Web 服务器（开发模式）。                 |
| NODE_ENV=production node server/index.js     | 以生产模式启动一个自定义 Web 服务器 (需要先执行 `nuxt build`)。 |

#### 参数

您可以使用 `--help` 命令来获取详细用法。常见的命令有：

- **`--config-file` 或 `-c`:** 指定 `nuxt.config.js` 的文件路径。
- **`--spa` 或 `-s`:** 禁用服务器端渲染，使用 SPA 模式
- **`--unix-socket` 或 `-n`:** 指定 UNIX Socket 的路径。

你可以将这些命令添加至 `package.json`：

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

这样你可以通过 `npm run <command>` 来执行相应的命令。如: `npm run dev`。

<div class="Alert Alert--nuxt-green">

<b>提示:</b> 要将参数传递给 npm 命令，您需要一个额外的<code>--</code>脚本名称(例如：<code>npm run dev --参数 --spa</code>)

</div>

## 开发模式

可通过以下命令以开发模式启动带热加载特性的 Nuxt 服务：

```bash
nuxt
// 或
npm run dev
```

## 发布部署

Nuxt.js 提供了两种发布部署应用的方式：服务端渲染应用部署 和 静态应用部署。

### 服务端渲染应用部署

部署 Nuxt.js 服务端渲染的应用不能直接使用 `nuxt` 命令，而应该先进行编译构建，然后再启动 Nuxt 服务，可通过以下两个命令来完成：

```bash
nuxt build
nuxt start
```

推荐的 `package.json` 配置如下：

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

提示： 建议将 `.nuxt` 加入 `.npmignore` 和 `.gitignore` 文件中。

### 静态应用部署

Nuxt.js 可依据路由配置将应用静态化，使得我们可以将应用部署至任何一个静态站点主机服务商。

可利用下面的命令生成应用的静态目录和文件：

```bash
npm run generate
```

这个命令会创建一个 `dist` 文件夹，所有静态化后的资源文件均在其中。

如果你的项目需要用到[动态路由](/docs/2.x/features/file-system-routing#动态路由)，请移步 [generate 配置 API](/docs/2.x/configuration-glossary/configuration-generate) 了解如何让 Nuxt.js 生成此类动态路由的静态文件。

<div class="Alert">

注意：使用 `nuxt generate` 静态化应用的时候, 传给 [asyncData()](/docs/2.x/features/data-fetching#async-data) 和 [fetch()](/docs/2.x/directory-structure/store) 方法的[上下文对象](/docs/2.x/internals-glossary/context) 不会包含 `req` 和 `res` 两个属性。

</div>

### 单页面应用程序部署 (SPA)

`nuxt generate` 在 build/generate 时间内仍然需要 SSR 引擎，同时具有预渲染所有页面的优势，并具有较高的 SEO 优化和页面加载能力。 内容在构建时生成。例如，我们不能将它用于内容依赖于用户身份验证或实时 API 的应用程序（至少对于第一次加载）。

SPA 应用的想法很简单！ 使用时启用 SPA 模式 `mode: 'spa'` 或 `--spa`，并且我们运行打包，生成在导报后自动启动，生成包含常见的 meta 和资源链接，但不包含页面内容。

因此，对于 SPA 部署，您必须执行以下操作：

- 将`nuxt.config.js`中的`mode`更改为`spa`。
- 运行 `npm run build`.
- 自动生成`dist/`文件夹，部署到您的服务器，如 Surge，GitHub Pages 或 nginx。

另一种可能的部署方法是在`spa`模式下将 Nuxt 用作框架中的中间件。这有助于减少服务器负载，并在无法进行 SSR 的项目中使用 Nuxt。

<div class="Alert">

请参考 [如何在 Heroku 上部署?](/docs/2.x/deployment/heroku-deployment) 来查看更多部署信息。

</div>

<div class="Alert">

请参考 [如何在 GitHub Pages 上部署?](/docs/2.x/deployment/github-pages) 查看如何部署到 GitHub 页面的更多详细信息。

</div>
