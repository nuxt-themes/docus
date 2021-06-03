---
title: 开发工具
description: Nuxt.js 可让你的 Web 开发过程更愉悦。
category: getting-started
position: 114
---

> 测试是 Web 应用开发过程中不可获缺的工作。Nuxt.js 尽量帮助你简化这部分工作。

## 端对端测试

[`ava`](https://github.com/avajs/ava) 是一个很强大的 JavaScript 测试框架，结合 [`jsdom`](https://github.com/tmpvar/jsdom)，我们就可以轻松地给 `nuxt` 应用进行端对端测试。

首先，我们需要添加 `ava` 和 `jsdom` 作为项目的开发依赖：

```bash
npm install --save-dev ava jsdom
```

然后在 `package.json` 中添加测试脚本，并配置 ava 如果编译待测试的文件：

**package.json**

```javascript
"scripts": {
  "test": "ava",
},
"ava": {
  "require": [
    "babel-register"
  ]
},
"babel": {
  "presets": [
    "es2015"
  ]
}
```

接下来我们可以在 `test` 目录下编写单元测试的逻辑代码：

```bash
mkdir test
```

假设我们有这样一个页面 `pages/index.vue`：

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
  export default {
    data() {
      return { name: 'world' }
    }
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

当我们利用 `npm run dev` 启动开发服务器的时候，用浏览器打开 [http://localhost:3000](http://localhost:3000)，我们能看到红色的 `Hello world` 标题。

添加一个单元测试文件 `test/index.test.js`：

```js
import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'

// 我们用一个变量保留 nuxt 和 server 实例的引用
// 这样可以在单元测试结束之后关掉它们
let nuxt = null

// 初始化 Nuxt.js 并创建一个监听 localhost:4000 的服务器
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (e) {}
  config.rootDir = rootDir // 项目目录
  config.dev = false // 生产构建模式
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// 测试生成的html
test('路由 / 有效且能渲染 HTML', async t => {
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello world!</h1>'))
})

// 测试元素的有效性
test('路由 / 有效且渲染的HTML有特定的CSS样式', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// 关掉服务器和Nuxt实例，停止文件监听。
test.after('Closing server and nuxt.js', t => {
  nuxt.close()
})
```

运行上面的单元测试：

```bash
npm test
```

实际上 `jsdom` 会有一定的限制性，因为它背后并没有使用任何的浏览器引擎，但是也能涵盖大部分关于 dom 元素 的测试了。如果想使用真实的浏览器引擎来测试你的应用，推荐瞅瞅 [Nightwatch.js](http://nightwatchjs.org)。

## ESLint

> ESLint 是一个很棒的工具，帮助我们提升代码的规范和质量。

在 Nuxt.js 中集成 [ESLint](http://eslint.org) 是非常简单的，首先我们需要安装 ESLint 的一系列依赖包：

```bash
npm install --save-dev babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard eslint-plugin-import eslint-plugin-node
```

然后, 在项目根目录下创建 `.eslintrc.js` 文件用于配置 ESLint：

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // 校验 .vue 文件
  plugins: ['vue'],
  // 自定义规则
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { semi: false }]
  }
}
```

最后，我们在 `package.json` 文件中添加一个 `lint`和 `lintfix`脚本命令：

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
}
```

你现在可以启动`lint`来检查错误：

```bash
npm run lint
```

或者 `lintfix` 还可以修复那些可修复的

```bash
npm run lintfix
```

ESLint 将检测校验所有 JavaScript 和 Vue 文件，同时忽略`.gitignore`中定义的被忽略文件。

还建议通过 webpack 启用 ESLint 热更新模式。这样 ESLint 将在`npm run dev`时保存。只需将以下内容添加到您的`nuxt.config.js`：

```js
...
  /*
   ** Build configuration
  */
  build: {
   /*
    ** 您可以在这里扩展webpack配置
   */
   extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
```

<div class="Alert Alert--orange">

有个最佳实践是在 `package.json` 中增加 `"precommit": "npm run lint"` ，这样可以实现每次提交代码之前自动进行代码检测校验。

</div>
