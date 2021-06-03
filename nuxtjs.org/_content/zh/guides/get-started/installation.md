---
title: 安装
description: 在这，你将知道如何通过4个步骤来运行Nuxt.js项目。
position: 1
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/01_installation?fontsize=14&hidenavigation=1&theme=dark
---

## 准备工具

- [node](https://nodejs.org) - 最低版本 v10.13，建议您安装最新的 LTS 版本。
- IDE(文本编辑器)，建议使用 [VS Code](https://code.visualstudio.com/) 并配合[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) 插件，或者使用[WebStorm](https://www.jetbrains.com/webstorm/)。
- 终端，建议使用 VS Code 的 [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal)或者 [WebStorm terminal](https://www.jetbrains.com/help/webstorm/terminal-emulator.html)。

## 用 create-nuxt-app 快速开启项目

想要快速开启项目，你可以使用[create-nuxt-app](https://github.com/nuxt/create-nuxt-app)。

确保你已安装 npx（自 NPM 5.2.0 起默认安装 npx）或 npm v6.1 或 yarn。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app <project-name>
```

  </code-block>
  <code-block label="NPX">

```bash
npx create-nuxt-app <project-name>
```

  </code-block>
    <code-block label="NPM">

```bash
npm init nuxt-app <project-name>
```

  </code-block>

</code-group>

启动项目后，将会提供给你一些启动选项，如（名称，Nuxt 选项，UI 框架，TypeScript，lint，测试框架等）。要了解有关所有选项的更多信息，请参阅 [Create Nuxt app](https://github.com/nuxt/create-nuxt-app/blob/master/README.md)。

选择完所有选项后，将安装所有依赖项。安装完后，`cd`到项目文件夹下启动：

<code-group>
  <code-block label="Yarn" active>

```bash
cd <project-name>
yarn dev
```

  </code-block>
  <code-block label="NPM">

```bash
cd <project-name>
npm run dev
```

  </code-block>
</code-group>

项目现在运行在 [http://localhost:3000](http://localhost:3000)上，干的漂亮 XD！

<base-alert type="info">

使用 Nuxt.js 的另一种方法是使用[CodeSandbox](https://template.nuxtjs.org) ，这是一个可以快速使用 Nuxt.js 和/或与他人共享代码的好方法。

</base-alert>

## 手动安装

从头开始创建 Nuxt.js 项目仅需要一个文件和一个目录。

我们将使用终端创建目录和文件，并使用你选择的编辑器来创建它们。

### 设置你的项目

使用项目名称创建一个空目录，然后`cd`到目录内：

```bash
mkdir <project-name>
cd <project-name>
```

_用你的项目名替换 `<project-name>`_

创建`package.json`文件:

```bash
touch package.json
```

在你的`package.json`文件内写入:

```json{}[package.json]
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "start": "nuxt start"
  }
}
```

`scripts`定义了 Nuxt.js 命令，这些命令将通过命令 npm run <command>或 yarn <command>启动。

#### **什么是 package.json 文件?**

`package.json`像是你项目的 ID 卡，它包含了所有项目依赖项以及其他更多内容。 如果你不知道 package.json 文件是什么，我们强烈建议你先快速阅读 NPM 文档[NPM documentation](https://docs.npmjs.com/creating-a-package-json-file)。

### 安装 Nuxt

一旦创建了`package.json`，就可以通过`npm`或`yarn`将`Nuxt`添加到您的项目中，如下所示：

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add nuxt
```

  </code-block>
  <code-block label="NPM">

```bash
npm install nuxt
```

  </code-block>
</code-group>

此命令会将`nuxt`作为依赖项添加到项目里，并添加到`package.json`文件中。同时还将创建`node_modules`目录，该目录将存储所有已安装的软件包和依赖项。

<base-alert type="info">

`yarn.lock`或`package-lock.json`也将被一起创建，它们可以确保在项目中安装的 npm 包具有一致的安装和兼容依赖项。

</base-alert>

### 开始写你的第一个页面

Nuxt.js 将`pages`目录中的每个`*.vue`文件转换为应用的路由。

在你的项目中创建`page`目录：

```bash
mkdir pages
```

然后，在`pages`目录下创建`index.vue`文件。

```bash
touch pages/index.vue
```

将这个页面命名为`index.vue`是非常重要的，因为这将是打开 Nuxt 应用时显示的默认主页。

在编辑器中打开`index.vue`文件并添加以下内容：

```html{}[pages/index.vue]
<template>
  <h1>Hello world!</h1>
</template>
```

### 运行项目

通过在终端中输入以下命令（之一）来运行项目：

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

<base-alert type="info">

使用`dev`命令，使应用运行在开发模式。

</base-alert>

现在项目运行在 **[http://localhost:3000](http://localhost:3000/).**

打开你的浏览器，并在终端中点击链接，你就能看到我们在上一步中复制的文本“Hello World”。

<base-alert type="info">

在开发模式下启动 Nuxt.js 时，它将能监听大多数目录中的文件更改。因此，例如在启动时无需重新启动应用程序。
如：添加新页面

</base-alert>

<base-alert type="warning">

当运行 dev 命令时，将会创建.nuxt 文件夹。此文件夹应从版本控制中忽略。你可以通过在文件夹根目录创建`.gitignore`文件并添加.nuxt 来忽略文件。

查看更多有关[.gitignore](https://git-scm.com/docs/gitignore)的信息。

</base-alert>

### 更进一步（Bonus step）

在`pages`目录下，创建一个文件命名`fun.vue`。

添加`<template></template>`标签并起一个有趣的标题。

然后回到浏览器，并打开你的新页面 **[http://localhost:3000/fun](http://localhost:3000/fun).**

<base-alert type="info">

创建一个名为`more-fun`的目录，并将`index.vue`文件放入其中。这和创建`more-fun.vue`文件有一样的效果。

</base-alert>
