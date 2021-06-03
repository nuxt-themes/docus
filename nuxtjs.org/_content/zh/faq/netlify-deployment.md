---
title: Netlify 部署
description: 如何将 Nuxt.js 部署至 Netlify？
category: deployment
position: 209
---

# 如何将 Nuxt.js 部署至 Netlify？

部署到 [Netlify](https://www.netlify.com) 是一个低成本选项，可以快速在线获取 **statically generated** 的 Nuxt.js 网站。

该过程的核心在部署期间利用 `nuxt generate` 命令将 Nuxt.js 应用程序的静态版本构建到 `dist` 目录中。 然后将此目录的内容部署到生产 URL。

## 入门

按 Netlify 仪表板上的 _"New site from Git"_ 按钮。使用存储库主机进行身份验证，选择要部署的存储库，然后继续。你应该执行第 3 步：_"Build options, and deploy!"_

## 配置:

1. **Branch to deploy:** `master`, 或者你喜欢哪个分支
1. **Build command:** `npm run generate`
1. **Publish directory:** `dist`

> 或者，您可以通过 _"Advanced"_ 按钮添加其他 ENV 变量。 这些有助于交换替代 API 凭据等。 Netlify 还提供了[默认 ENV 变量](https://www.netlify.com/docs/build-settings/#build-environment-variables)，您可以在构建时由 Nuxt.js 应用程序读取。

单击 _"Deploy site"_ 来立即触发部署。 您的 Netlify 站点将被分配一个随机 URL 并使用`nuxt generate`命令进行部署。

现在，您的 Nuxt.js 应用程序现在托管在 Netlify 上！
