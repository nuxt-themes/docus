---
title: 命令与部署
description: Nuxt.js自带一组有用的命令，用于部署开发和生产环境。
position: 4
category: get-started
---

Nuxt.js 自带一组有用的命令，用于部署开发和生产环境。

## 使用`package.json`

你需要将这些命令放在`package.json`文件里:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

然后，你可以通过`yarn <command>` 或 `npm run <command>`来启动命令。(例如： `yarn dev` / `npm run dev`).

## 开发环境

以开发模式来启动 Nuxt [热更新模块](https://webpack.js.org/concepts/hot-module-replacement/) 运行在`http://localhost:3000`上:

<code-group>

  <code-block label="Yarn" active>

```bash
yarn dev
```

  </code-block>

  <code-block label="NPM">

```bash
npm run dev
```

  </code-block>
</code-group>

## 命令列表

您可以根据[部署目标](/docs/2.x/features/deployment-targets)运行不同的命令

### 部署目标: `server`服务器端渲染 (默认值)

- **nuxt dev** - 启动开发环境服务器。
- **nuxt build** - 使用 webpack 构建和优化应用，使其可以应用于生产环境。
- **nuxt start** - 启动生产环境服务器（运行`nuxt build`之后）。将其用于诸如 Heroku，Digital Ocean 等的 Node.js 托管。

### 部署目标: `static`静态应用托管

- **nuxt dev** - 启动开发环境服务器。
- **nuxt generate** - 构建应用（如果需要），将为每个页面生成 HTML 文件，并静态导出到`dist/`目录下（用于静态托管）。
- **nuxt start** - 像静态主机一样运行`dist/`目录（Netlify，Vercel，Surge 等），非常适合在部署前进行测试。

## 生产环境部署

Nuxt.js 让你可以在服务器部署或静态应用部署之间进行选择。

### 服务端渲染应用部署

为了部署 SSR(Server Side Rendering 服务器端渲染)应用，可以使用`target：server`，其中 server 是默认值。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn build
```

  </code-block>
  <code-block label="NPM">

```bash
npm run build
```

  </code-block>
</code-group>

Nuxt.js 将创建一个`.nuxt`目录，其中的所有内容都可以部署在你的托管服务器上。

<base-alert type="info">

我们建议将`.nuxt`放在`.npmignore`或`.gitignore`文件中。

</base-alert>

构建应用程序后，可以使用`start`命令查看应用的生产环境版本。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn start
```

  </code-block>
  <code-block label="NPM">

```bash
npm run start
```

  </code-block>
</code-group>

### 静态应用部署（预渲染）

Nuxt.js 使你能够在任何静态主机上托管您的 Web 应用。

要部署一个静态应用的站点，请确保在您的`nuxt.config.js`中有配置`target：static`（需要 Nuxt> = 2.13)

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

<code-group>
  <code-block label="Yarn" active>

```bash
yarn generate
```

  </code-block>
  <code-block label="NPM">

```bash
npm run generate
```

  </code-block>
</code-group>

Nuxt.js 将创建一个`dist/`目录，其中的所有内容都可以部署在静态托管服务上。

从 v2.13 开始，Nuxt 安装了一个爬虫，当使用`nuxt generate`命令时，他会搜索你的链接标签并生成相对应的路由。

<base-alert>

**警告:** 使用的 Nuxt 版本 <= v2.12 时，`generate`命令将忽略动态路由 [API Configuration generate](/docs/2.x/configuration-glossary/configuration-generate)

</base-alert>

<base-alert type="info">

使用 `nuxt generate` 静态化应用的时候, 传给 [asyncData()](/docs/2.x/features/data-fetching#async-data) 和 [fetch()](/docs/2.x/directory-structure/store) 方法的[context](/docs/2.x/internals-glossary/context) 对象不会包含 `req` 和 `res` 两个属性。

</base-alert>

#### **错误状态**

若要在页面遇到错误时, 通过返回非零状态码来让 CI/CD 部署或编译失败, 可以使用`--fail-on-error`参数。

tips: 这个功能在`v2.14`版本测试下来有[问题](https://github.com/nuxt/nuxt.js/pull/7948)，并不会打断编译，需要等后续官方修复。所以建议在上线前需要在测试环境做好完整测试。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn generate --fail-on-error
```

  </code-block>
  <code-block label="NPM">

```bash
npm run generate --fail-on-error
```

  </code-block>

</code-group>

## 下一步？

<base-alert type="next">

阅读我们的[FAQ](/docs/2.x/deployment/deploying-to-21yunbox) 查找有关当下流行的部署托管的示例。

</base-alert>

</div>
