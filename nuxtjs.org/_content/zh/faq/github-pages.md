---
title: 如何部署至GitHub Pages？
description: 如何将 Nuxt.js 应用部署至GitHub Pages？
menu: Deploy on Github
category: deployment
position: 205
---

# 如何部署至 GitHub Pages？

Nuxt.js 允许你将静态化后的站点部署至任何静态站点托管服务中，例如 [GitHub Pages](https://pages.github.com/)。

部署至 GitHub Pages，首先需要将应用静态化：

```bash
npm run generate
```

上述的命令会生成一个 `dist` 目录，该目录包含了待部署的所有资源文件。如果是项目站点，可以将 `dist` 的内容提交至项目的 `gh-pages` 分支；如果是用户（github.com/user/user.github.io）或组织（github.com/org/org.github.io）站点，需提交至对应 GitHub 项目的 `master` 分支。

<div class="Alert Alert--nuxt-green">

<b>提示：</b> 如果你的 GitHub Pages 使用了自定义域名，建议将 `CNAME` 放在 Nuxt.js 应用的 `static` 目录。 可以移步 [`static`](/docs/2.x/directory-structure/static) 了解更多信息。

</div>

## 部署到 GitHub 页面并获取仓库

如果您要为一个特定的存储库创建 GitHub 页面，并且您没有任何自定义域，则该页面的 URL 将采用以下格式：`http://<username>.github.io/<repository-name>`。

如果您在没有添加 [router base](/docs/2.x/configuration-glossary/configuration-router#base) 的情况下部署了`dist`文件夹，那么当您访问已部署的站点时，您会发现该站点因缺失`assets`而无法正常工作。这是因为我们假设网站根目录是`/`，但在这种情况下它是`/<repository-name>`。

要解决此问题，我们需要在 `nuxt.config.js` 中添加 [router base](/docs/2.x/configuration-glossary/configuration-router#base) 配置：

```js
export default {
  router: {
    base: '/<repository-name>/'
  }
}
```

这样，所有生成的路径 assets 都将以`/<repository-name>/`为前缀，下次将代码部署到存储库 GitHub Pages 时，该站点会正常工作。

将 `router.base` 添加为 `nuxt.config.js` 中的默认设置有一个缺点，但是当你运行 `npm run dev` 时，由于基本路径改变，它将无法正常工作。要解决这个问题，我们为 `router.base` 创建一个条件是否包含 `<repository-name>` ：

```js
/* nuxt.config.js */
// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/<repository-name>/'
        }
      }
    : {}

export default {
  ...routerBase
}
```

现在我们只需要设置 `DEPLOY_ENV='GH_PAGES'` ：

```js
/* package.json */
"scripts": {
  "build:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt generate"
},
```

对于 Windows 用户，如果您不使用 `bash` ，则可能需要安装[cross-env](https://github.com/kentcdodds/cross-env)。

```sh
npm install cross-env --save-dev
```

然后以这种方式使用它：

```js
  "build:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt generate"
```

## 使用命令行进行部署

你也可以利用 [push-dir](https://github.com/L33T-KR3W/push-dir) npm 包来部署：

首先安装 `push-dir`：

```bash
npm install push-dir --save-dev
```

然后在 `package.json` 中添加一个 `deploy` 的命令如下：

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "deploy": "push-dir --dir=dist --branch=gh-pages --cleanup"
},
```

> 注：如果是个人或组织站点，需将上面 `deploy` 命令中的 `--branch` 设置成 `master`。

最后，我们可以通过以下命令来部署应用：

```bash
npm run generate
npm run deploy
```

## 构建服务器部署

您可以进一步部署，而不必手动编译和部署本地安装中的文件，您可以使用构建服务器来监视 GitHub 仓库以进行新提交，然后自动检出仓库，编译和部署所有内容。

在配置构建服务器之前，首先需要 [生成 GitHub 个人访问令牌](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token) 以授予构建服务器代表您执行任务的权限。 一旦您创建了令牌，请保留其安全副本，以便稍后使用。

### Travis CI

使用[Travis CI](https://travis-ci.org/)进行部署，免费开源项目构建服务器，通过您的 GitHub 帐户登录，授予 Travis 访问权限以查看您的存储库，然后启用构建服务器 通过在显示的列表中切换存储库名称旁边的开关来为您的存储库。

![Travis Builder Server Enable](/github_pages_travis_01.png)

接下来，单击存储库名称旁边的 cog 图标以配置构建服务器的常规设置，并通过切换开关启用 'Build only if .travis.yml is present' 功能。

![Travis Builder Server Settings](/github_pages_travis_02.png)

在同一屏幕上，向下滚动到 Environment Variables 部分并创建一个名为 `GITHUB_ACCESS_TOKEN` 的新变量，并在值字段中粘贴您之前创建的 GitHub 个人访问令牌的副本，然后单击 'Add' 按钮。

![Travis Builder Server Environment Variables](/github_pages_travis_03.png)

最后，使用以下内容在存储库的根目录中创建 `.travis.yml` 配置文件

```yaml
language: node_js
node_js:
  - '12'

cache:
  directories:
    - 'node_modules'

branches:
  only:
    - master

install:
  - npm install
  - npm run generate

script:
  - echo "Skipping tests"

deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_ACCESS_TOKEN # Set in travis-ci.org dashboard, marked secure https://docs.travis-ci.com/user/deployment/pages/#Setting-the-GitHub-token
  target-branch: gh-pages
  local-dir: dist
  on:
    branch: master
```

然后将其提交到您的存储库

```bash
git add .travis.yml
git commit -m "Adding travis deploy configuration"
git push origin
```

现在，无论何时从 Travis 中提交对存储库的任何更改，您都会看到新的构建打包并重新启动

![Travis Builder Server Output](/github_pages_travis_04.png)

完成后，您将看到您的 GitHub 页面站点自动更新。

### Appveyor

要通过 [Appveyor](https://www.appveyor.com) 进行部署，另一个免费的开源项目构建服务器，注册一个新帐户，选择 GitHub 身份验证选项来使用您的 GitHub 帐户登录。

登录后，单击 'New project' 链接，然后单击显示的列表中存储库名称旁边的 'Add' 按钮，以在存储库中启用构建服务器。

![Appveyor Builder Server Enable](/github_pages_appveyor_01.png)

接下来，在存储库的**根目录**中，创建一个包含以下内容的 `appveyor.yml` 配置文件

```yaml
environment:
  # Nuxt requires node v12 minimum
  nodejs_version: '12'
  # Encrypt sensitive data (https://ci.appveyor.com/tools/encrypt)
  github_access_token:
    secure: ENCRYPTED_GITHUB_ACCESS_TOKEN
  github_email:
    secure: ENCRYPTED_GITHUB_EMAIL

# Only run on master branch
branches:
  only:
    - master

# Install scripts. (runs after repo cloning)
install:
  # switch nodejs version
  - ps: Install-Product node $env:nodejs_version
  # install modules
  - npm install
  # generate static files
  - npm run generate
  # configure global git credentials store (https://www.appveyor.com/docs/how-to/git-push/)
  - git config --global credential.helper store
  - ps: Add-Content "$env:USERPROFILE\.git-credentials" "https://$($env:github_access_token):x-oauth-basic@github.com`n"
  - git config --global user.email $env:github_email
  # deploy to GitHub pages
  - npm run deploy

# No tests to run
test: off

# Don't actually build.
build: off
```

**_注意_**此配置假设您已根据 [命令行部署](#command-line-deployment) 说明配置了 `package.json` 文件

但是，在提交此文件之前，您需要使用之前的 GitHub 个人访问令牌和使用 [Appveyor 加密工具](https://ci.appveyor.com/tools/encrypt) 加密的 GitHub 电子邮件地址更改 `ENCRYPTED_GITHUB_ACCESS_TOKEN` 和 `ENCRYPTED_GITHUB_EMAIL` 变量

更新后，将文件提交到您的存储库

```bash
git add appveyor.yml
git commit -m "Adding appveyor deploy configuration"
git push origin
```

现在，每当您从 Appveyor 中提交对存储库的任何更改时，您都会看到新的构建打包并重新启动

![Appveyor Builder Server Output](/github_pages_appveyor_02.png)

完成后，您将看到您的 GitHub 页面站点自动更新。
