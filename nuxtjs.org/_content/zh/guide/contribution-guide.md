---
title: 开源贡献指引
description: 欢迎为 Nuxt.js 做出开源贡献！
category: prologue
position: 2
---

> 欢迎为 Nuxt.js 做出开源贡献！

## 提交问题

我们使用[CMTY](https://cmty.nuxtjs.org/)使贡献者和维护者更容易的提交问题和新功能改进。

请确保包含一个克隆仓库或[CodeSandBox](https://template.nuxtjs.org/)，以便可以更好地再现错误，我们开始修复它的速度越快！

## Pull Requests

欢迎大家提 PR（ `源码拉取请求` ），即便是修复一个拼写错误。

任何重大改进都应与现有[功能请求](https://feature.nuxtjs.org/)或[错误报告](https://bug.nuxtjs.org/)相关联。

### 开始

1. [Fork](https://help.github.com/articles/fork-a-repo/) 代码仓库到您自己的 GitHub 帐户，然后 [clone](https://help.github.com/articles/cloning-a-repository/) 到您的本地。
2. 运行 `npm install` 或 `yarn install` 来安装依赖。

> _请注意，**npm** 和 **yarn** 都被认为丢失依赖项。要解决此问题，您可以删除示例应用程序中的 node_modules 文件夹，然后重新安装或执行缺少的依赖项的本地安装。_

> 如果要添加依赖项，请使用`yarn add`。`yarn.lock`文件是所有 Nuxt 依赖项的最新源。

### 构建

在运行任何测试之前，请确保满足所有依赖项并构建所有依赖项：

```sh
yarn
yarn build
```

### 测试结构

一个伟大而出色的 PR，无论是包含错误修复还是新功能，都会包含测试。

要编写出色的测试，让我们解释一下我们的测试结构：

#### Fixtures

这个 fixtures (在 `tests/fixtures` 目录下) 包含几个 Nuxt 应用程序。为了使构建时间尽可能短，我们不会为每个测试构建一个自己的 Nuxt 应用程序。相反，在运行实际的单元测试之前，构造了(`yarn test:fixtures`)。

提交 PR 时，请确保 **更改** 或 **添加新 fixture** 用来正确反映更改（如果适用）。此外，不要忘记在更改后通过使用`jest test/fixtures/my-fixture/my-fixture.test.js`运行相应的测试来重新构建 fixtures。

#### Unit tests(单元测试)

单元测试可以在`tests/unit`中找到，并将在构建 fixtures 后执行。每次测试，将使用新的 Nuxt 服务器以便不存在共享状态（除了构建步骤的初始状态）。

添加单元测试后，您可以直接运行它们：

```sh
jest test/unit/test.js
```

或者您可以运行整个单元测试：

```sh
yarn test:unit
```

请再次注意，您可能需要重新构建您的 fixture！

### 测试您的更改

在处理 PR 时，您可能需要检查 fixture 是否设置正确或调试当前的更改。为此，您可以使用 Nuxt 脚本本身来启动例如您的 fixture 或示例应用：

```sh
yarn nuxt examples/your-app
yarn nuxt test/fixtures/your-fixture-app
```

> `npm link`也可以（并且在某种程度上）可以为此工作，但有时它会出现一些问题。这就是为什么我们建议直接调用`yarn nuxt`来运行示例。

### 例子

如果您正在开发更大的功能，请在 `examples/` 中设置一个示例应用程序。这将有助于理解变更，并帮助 Nuxt 用户深入了解您提交构建的功能。

### Linting

您可能已经注意到，我们正在使用 ESLint 来强制检查代码标准。请在提交之前运行`yarn lint`您的更改以检查代码样式是否标准。如果没有，你可以使用 `yarn lint --fix` 或 `npm run lint -- --fix` (没有拼错！)来修复大部分的样式风格变化。如果仍有错误，则必须手动更正。

### 文档

如果您要添加新功能，请进行重构或以任何其他方式更改 Nuxt 的行为，您可能会这样做想要记录变化。请提交 PR 到 [docs](https://github.com/nuxt/docs/pulls) 代码仓库。您不必立即编写文档（但请在 PR 足够严谨及检查后提交）。

### 提交过程

提交 PR 时，您需要填写一个简单的模板。

请勾选清单中的所有对应 "answers"。

#### 在 macOS 上调试测试

搜索`getPort()`将显示它用于在测试期间启动新的 Nuxt 进程。使用 macOS 它有时会停止，并且可能需要您手动设置端口进行测试。

另一个常见问题是 Nuxt 进程在运行 fixture 测试时可能会挂起内存。过程通常会阻止后续测试工作。运行`ps aux | grep -i node`如果您对发生这种情况不解，则检查任何挂起的测试过程。
