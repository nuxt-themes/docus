---
title: 使用 Surge.sh 部署
description: 如何使用 Surge.sh 部署？
menu: Deploy on Surge
category: deployment
position: 211
---

# 如何使用 Surge.sh 部署？

Nuxt.js 允许你将静态化后的站点部署至任何静态站点托管服务中，例如 [surge.sh](https://surge.sh/)。

部署至 `surge.sh`，需先安装 `surge`：

```bash
npm install -g surge
```

然后， 我们需要告诉 Nuxt.js 生成应用的静态站点目录：

```bash
npm run generate
```

上述的命令会生成一个 `dist` 目录，该目录包含了待部署的所有资源文件。

最后，我们可以通过下面的命令将站点布置至 `surge.sh`：

```bash
surge dist/
```

搞定 :)

如果你的项目有[动态路由](/docs/2.x/features/file-system-routing#动态路由)，请参考 [generate 配置文档](/docs/2.x/configuration-glossary/) 告诉 Nuxt.js 如何静态化这些动态路由。

<div class="Alert">

使用 `nuxt generate` 命令生成应用的静态站点时，传给页面组件 [asyncData()](/docs/2.x/features/data-fetching#async-data) 或 [fetch()](/docs/2.x/directory-structure/store) 的 [上下文对象](/api) 是不会包含 `req` 和 `res` 属性的。

</div>
