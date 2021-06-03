---
title: 模块
description: 模块是Nuxt.js扩展，可以扩展其核心功能并添加无限的集成。
category: getting-started
position: 109
---

> 模块是 Nuxt.js 扩展，可以扩展其核心功能并添加无限的集成。

## 介绍

在使用 Nuxt 开发应用程序时，您很快就会发现框架的核心功能还不够。 Nuxt 可以使用配置选项和插件进行扩展，但是在多个项目中维护这些自定义是繁琐、重复和耗时的。 另一方面，开箱即用支持每个项目的需求将使 Nuxt 非常复杂且难以使用。

这就是 Nuxt 提供更高阶**模块系统**的原因，可以轻松扩展核心。 模块只是在引导 Nuxt 时按顺序调用的**函数**。 框架在加载之前等待每个模块完成。 如此，模块几乎可以自定义 Nuxt 的任何地方。 我们可以使用功能强大的 [Hookable](https://github.com/nuxt-contrib/hookable) Nuxt.js 系统来完成特定事件的任务。

最重要的是, Nuxt 模块可以合并到 npm 包中。 这使得它们易于跨项目开发重用并与 Nuxt 社区共享, 我们可以创建一个高质量的 Nuxt 附加组件生态系统。

如果你：

- 是**优秀团队**的成员，需要快速引导新项目。
- 厌倦了为集成 Google Analytics 等常见任务重新造轮子。
- 是一个优秀的**开源**爱好者，希望轻松与社区分享您的工作。
- 是一家重视**质量**和**可重用性**的**企业**公司的成员。
- 通常是在短期限内完成，没有时间深入了解每个新库或集成的细节。
- 厌倦了处理对低级接口的重大改变，并且需要能够正常工作的东西。

## Nuxt.js 模块列表

Nuxt.js 团队提供 **官方** 模块:

- [@nuxt/http](https://http.nuxtjs.org): 基于[ky-universal](https://github.com/sindresorhus/ky-universal)的轻量级和通用的 HTTP 请求
- [@nuxtjs/axios](https://axios.nuxtjs.org): 安全和使用简单 Axios 与 Nuxt.js 集成用来请求 HTTP
- [@nuxtjs/pwa](https://pwa.nuxtjs.org): 使用经过严格测试，更新且稳定的 PWA 解决方案来增强 Nuxt
- [@nuxtjs/auth](https://auth.nuxtjs.org): Nuxt.js 的身份验证模块，提供不同的方案和验证策略

Nuxt.js 社区制作的模块列表可在 https://github.com/topics/nuxt-module 中查询

## 基本模块

如上所述，模块只是简单的功能。它们可以打包为`npm`模块或直接包含在项目源代码中。

**modules/simple.js**

```js
export default function SimpleModule(moduleOptions) {
  // Write your code here
}

// REQUIRED if publishing as an npm package
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

这是用户使用`modules`数组传递对象，我们可以使用它来定制它的行为。

**`this.options`**

您可以使用此属性直接访问 Nuxt 选项。这是`nuxt.config.js`，其中包含所有默认选项，可用于模块之间的共享选项。

**`this.nuxt`**

这是对当前 Nuxt 实例的引用。 请参考 [Nuxt class docs for available methods](/api/internals-nuxt).

**`this`**

modules 中的 context, 请参考 [ModuleContainer](/api/internals-module-container) 来查看可用的方法。

**`module.exports.meta`**

如果要将模块发布为 npm 包，则**需要**配置此选项。Nuxt 内部使用`meta`来更好地处理您的包。

**nuxt.config.js**

```js
export default {
  modules: [
    // Simple usage
    '~/modules/simple',
    // Passing options directly
    ['~/modules/simple', { token: '123' }]
  ]
}
```

然后，我们告诉 Nuxt 为项目加载一些特定模块，并将可选参数作为选项。 请参考 [模块配置](/docs/2.x/configuration-glossary/configuration-modules) 文档来查看更多!

## 异步模块

并非所有模块都会同步完成所有操作，例如：您可能希望开发一个需要获取某些 API 或执行异步 IO 的模块。为此，Nuxt 支持在异步模块中返回 Promise 或调用回调。

### 使用 async/await

<div class="Alert Alert--orange">

请注意，仅在 Node.js > 7.2 中支持使用`async` / `await`。 因此，如果您是模块开发人员，至少要警告用户使用它们时 Node.js 版本不能低于 7.2。 对于大量异步模块或更好的传统支持，您可以使用 bundler 将其转换为兼容较旧的 Node.js 版本或 Promise 方法。

</div>

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // You can do async works here using `async`/`await`
  const pages = await fse.readJson('./pages.json')
}
```

### 返回 Promise

```js
import axios from 'axios'

export default function asyncModule() {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Do something by extending Nuxt routes
    })
}
```

### 使用回调

```js
import axios from 'axios'

export default function asyncModule(callback) {
  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      callback()
    })
}
```

## 常见模块

### 优先级最高选项

有时在`nuxt.config.js`中注册模块时可以使用顶级选项更方便，这允许我们组合多个选项源。

**nuxt.config.js**

```js
export default {
  modules: [['@nuxtjs/axios', { anotherOption: true }]],

  // axios module is aware of this by using `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```

**module.js**

```js
export default function (moduleOptions) {
  const options = Object.assign({}, this.options.axios, moduleOptions)
  // ...
}
```

### 提供插件

通常，模块在添加时需提供一个或多个插件。 例如：[bootstrap-vue](https://bootstrap-vue.js.org) 模块需要将自己注册到`Vue`中。 为此我们可以使用 `this.addPlugin` 方法。

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue(moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### 模板插件

已注册的模板和插件可以利用[lodash templates](https://lodash.com/docs/4.17.4#template)模板有条件地更改已注册插件的输出。

**plugin.js**

```js
// Set Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Dev only code
<% } %>
```

**module.js**

```js
import path from 'path'

export default function nuxtGoogleAnalytics(moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt will replace `options.ua` with `123` when copying plugin to project
      ua: 123,

      // conditional parts with dev will be stripped from plugin code on production builds
      debug: this.options.dev
    }
  })
}
```

### 添加 CSS 库

考虑是否存在 CSS 库以避免重复，并添加**一个选项**来禁用模块中的 CSS 库。请参见下面的示例。

**module.js**

```js
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Add Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Emit assets

我们可以注册 webpack 插件用来在构建期间发出资源。

**module.js**

```js
export default function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // This will generate `.nuxt/dist/info.txt' with contents of info variable.
        // Source can be buffer too
        compilation.assets['info.txt'] = {
          source: () => info,
          size: () => info.length
        }

        cb()
      })
    }
  })
}
```

### 注册自定义 loaders

我们可以使用`this.extendBuild`在`nuxt.config.js`中执行与`build.extend`相同的操作。

**module.js**

```js
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Customize existing loaders
      // Refer to source code for Nuxt internals:
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## 在指定钩子上运行任务

您的模块可能只需要在特定条件下执行操作，而不仅仅是在 Nuxt 初始化期间。我们可以使用强大的[Tapable](https://github.com/webpack/tapable)插件来执行特定事件的任务。Nuxt 将等待钩子返回`Promise`或被定义为`async`(异步)。

```js
export default function () {
  // Add hook for modules
  this.nuxt.hook('module', moduleContainer => {
    // This will be called when all modules finished loading
  })

  // Add hook for renderer
  this.nuxt.hook('renderer', renderer => {
    // This will be called when renderer was created
  })

  // Add hook for build
  this.nuxt.hook('build', async builder => {
    // This will be called once when builder created

    // We can even register internal hooks here
    builder.hook('compile', ({ compiler }) => {
      // This will be run just before webpack compiler starts
    })
  })

  // Add hook for generate
  this.nuxt.hook('generate', async generator => {
    // This will be called when a Nuxt generate starts
  })
}
```

## Module package commands

**实验性的**

从`v2.4.0` 开始，您可以通过 Nuxt 模块的包(package)添加自定义 nuxt 命令。为此，您必须`NuxtCommand`在定义命令时遵循 API 规则。假设放置的一个简单示例`my-module/bin/command.js`如下所示：

```js
#!/usr/bin/env node

const consola = require('consola')
const { NuxtCommand } = require('@nuxt/cli')

NuxtCommand.run({
  name: 'command',
  description: 'My Module Command',
  usage: 'command <foobar>',
  options: {
    foobar: {
      alias: 'fb',
      type: 'string',
      description: 'Simple test string'
    }
  },
  run(cmd) {
    consola.info(cmd.argv)
  }
})
```

这里有一些值得注意的事情。首先，注意调用`/usr/bin/env`来检索 Node 可执行文件。另请注意，ES 模块语法不能用于命令，除非您手动合并[`esm`](https://github.com/standard-things/esm)到代码中。

接下来，您将注意到如何使用`NuxtCommand.run()`指定命令的设置和行为。定义选项`options`，通过解析[`minimist`](https://github.com/substack/minimist)。解析参数后，` run()``将使用 `NuxtCommand`实例作为第一个参数自动调用。

在上面的示例中，`cmd.argv`用于检索解析的命令行参数。有更多的方法和属性`NuxtCommand` --将提供有关它们的文档，因为此功能将进一步测试和改进。

要使您的命令可以通过 Nuxt CLI 识别`bin`，请使用`nuxt-module`约定将其列在`package.json`的部分下，该约定 module 与您的包名称相关。使用此二进制文件，您可以根据`argv`需要进一步解析更多`subcommands`命令。

```js
{
  "bin": {
    "nuxt-foobar": "./bin/command.js"
  }
}
```

一旦安装了软件包(通过 npm 或 Yarn)，您就可以`nuxt foobar ...`在命令行上执行。

<div class="Alert">

modules 有许多钩子和可能性。请参考 [Nuxt Internals](/api/internals) 了解有关 Nuxt 内部 API 的更多信息。

</div>
