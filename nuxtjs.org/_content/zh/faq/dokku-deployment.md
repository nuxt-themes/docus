---
title: Dokku 部署
description: 如何在Dokku上部署Nuxt.js应用程序？
menu: Deploy on Dokku
category: deployment
position: 204
---

# 如何在 Dokku 上部署 Nuxt.js 应用程序？

我们建议阅读[Dokku 文档的设置](http://dokku.viewdocs.io/dokku/getting-started/installation/)和[使用 Dokku 部署 Node.js 应用程序](http://jakeklassen.com/post/deploying-a-node-app-on-digital-ocean-using-dokku/)

例如，我们将调用我们的 Nuxt.js 应用程序`my-nuxt-app`。

我们需要告诉 Dokku 安装项目的`devDependencies`(能够启动`npm run build`)：

```bash
// on Dokku Server
dokku config:set my-nuxt-app NPM_CONFIG_PRODUCTION=false
```

此外，我们希望我们的应用程序监听主机`0.0.0.0`并在生产模式下运行：

```bash
// on Dokku Server
dokku config:set my-nuxt-app HOST=0.0.0.0 NODE_ENV=production
```

当你输入`dokku config my-nuxt-app`时，你会看到这 3 行

![nuxt config vars Dokku](https://i.imgur.com/9FNsaoQ.png)

然后，我们告诉 Dokku 通过我们的项目`app.json`中的`scripts.dokku.predeploy`脚本启动`npm run build`：

`在我们的项目根文件夹中创建一个文件名app.json`

```js
{
  "scripts": {
    "dokku": {
      "predeploy": "npm run build"
    }
  }
}
```

要启动应用程序，我们使用[Procfile](http://dokku.viewdocs.io/dokku/deployment/methods/dockerfiles/#procfiles-and-multiple-processes)运行`npm run start` :

```
web: npm run start
```

最后，我们可以在 Dokku 上推送我们的应用：

```bash
// commit your change before push.
git remote add dokku dokku@yourServer:my-nuxt-app
git push dokku master
```

瞧！ 我们的 Nuxt.js 应用程序现在托管在 Dokku 上！
