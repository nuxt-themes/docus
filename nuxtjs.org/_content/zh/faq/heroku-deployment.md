---
title: 部署至 Heroku
description: 如何将 Nuxt 应用部署至 Heroku?
menu: Deploy on Heroku
category: deployment
position: 208
---

# 如何将 Nuxt 应用部署至 Heroku？

推荐先去了解下 [在 Heroku 里部署 node.js 应用的文档](https://devcenter.heroku.com/articles/nodejs-support)。

首先，我们需要告诉 Heroku 安装项目的开发依赖包 `devDependencies` (以便能在 Heroku 环境下运行 `npm run build`)：

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

同时，我们想让应用以 `生产模式` 运行，绑定的主机 IP 为 `0.0.0.0`：

```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

配置完毕后可以在 Heroku 管理后台看到以下内容 (设置界面)：

![nuxt 在 Heroku 的配置变量](https://i.imgur.com/EEKl6aS.png)

然后，通过在 `package.json` 里面添加 `heroku-postbuild` 脚本让 Heroku 运行 `npm run build` 命令：

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "heroku-postbuild": "npm run build"
}
```

Heroku 使用 [Procfile](https://devcenter.heroku.com/articles/procfile) (命名文件`Procfile`，没有文件扩展名)，指定 apps dynos 执行的命令。 启动 Procfile 会非常简单，并且需要包含以下行：

```
web: npm run start
```

这将指示运行`npm run start`命令并告诉 heroku 将外部 HTTP 流量引导到它。

最后，我们可以在 Heroku 上推送应用程序：

```bash
git push heroku master
```

要将**非主分支部署**到 Heroku，请使用：

```bash
git push heroku develop:master
```

其中`develop`是你的分支的名称。

您的 Nuxt.js 应用程序现在托管在 Heroku 上！
