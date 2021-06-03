---
title: 在Google App Engine上部署
description: 如何将Nuxt.js部署至 Google App Engine？
category: deployment
position: 206
---

# 如何将 Nuxt.js 部署至 Google App Engine？

部署到 [Google App Engine](https://cloud.google.com/appengine/) 是在 Google 云服务上托管通用 Nuxt 应用程序的快速而简单的解决方案。

在本指南中，我们在本地构建应用程序，然后将整个项目文件夹上传到 Google App Engine。 上传后，Google App Engine 将自动启动 package.json 中的 `start` 脚本，您的应用程序将立即可用。

## 入门

确保您在 [Google App Engine](https://cloud.google.com/appengine/) 上设置了 Google 云帐户，项目和空的 Google App Engine 应用程序。 此外，请务必按照 [此处](https://cloud.google.com/sdk/) 中的说明从 Google 下载并安装 Cloud SDK (CLI)，然后登录您的 Google Cloud 帐户。

## 配置您的应用程序

您需要添加名为 `app.yaml` 的文件到通用 Nuxt 应用程序将其部署到 App Engine 上。在根项目目录中创建具有该名称的新文件，并添加以下内容：

```yaml
runtime: nodejs10

instance_class: F2

handlers:
  - url: /_nuxt
    static_dir: .nuxt/dist/client
    secure: always

  - url: /(.*\.(gif|png|jpg|ico|txt))$
    static_files: static/\1
    upload: static/.*\.(gif|png|jpg|ico|txt)$
    secure: always

  - url: /.*
    script: auto
    secure: always

env_variables:
  HOST: '0.0.0.0'
  NODE_ENV: 'production'
```

## 构建和部署应用程序

现在用 `npm run build` 构建你的应用程序。

此时，您的应用已准备好上传到 Google App Engine。 现在运行以下命令：

```
gcloud app deploy app.yaml --project <project-id>
```

您的 Nuxt.js 应用程序现在托管在 Google App Engine 上！

## 更多信息

- app.yaml 文件中的 `instance_class` 属性设置应用实例的类。 Instance F2 不是完全免费的，但具有运行 Nuxt 应用程序所需的最小内存。
- 确保将 project-id 而不是 project-name 放在 deploy 命令中。 这是两件不同的事情，但容易混淆。
