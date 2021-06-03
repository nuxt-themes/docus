---
title: 'API: 环境变量配置'
description: Nuxt.js 让你可以配置在客户端和服务端共享的环境变量。
menu: env
category: configuration
position: 108
---

# 环境变量配置

- 类型： `Object`

> Nuxt.js 让你可以配置在客户端和服务端共享的环境变量。

例如 (`nuxt.config.js`)：

```js
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

以上配置我们创建了一个 `baseUrl` 环境变量，如果应用设定了 `BASE_URL` 环境变量，那么 `baseUrl` 的值等于 `BASE_URL` 的值，否则其值为 `http://localhost:3000`。

然后， 我们可以通过以下两种方式来使用 `baseUrl` 变量：

1. 通过 `process.env.baseUrl`
2. 通过 `context.baseUrl`，请参考 [context api](/api#上下文对象)

你可以使用 `env` 属性配置第三方服务的公钥信息。

举个例子， 我们可以利用它来配置 [axios](https://github.com/mzabriskie/axios) 的自定义实例。

`plugins/axios.js`：

```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

然后在页面中，我们可以使用 `import axios from '~/plugins/axios'` 引入 `axios` 模块。

## 自动注入环境变量

如果在构建阶段定义以`NUXT_ENV_`开头的环境变量，例如：`NUXT_ENV_COOL_WORD=freezing nuxt build`，它们将自动注入环境变量中。请注意，它们可能优先于`nuxt.config.js`中具有相同名称的已定义变量。

## process.env == {}

请注意，Nuxt 使用 webpack 的 definePlugin 来定义环境变量。这意味着 Node.js 中的`process`或`process.env`既不可用也不能定义。nuxt.config.js 中定义的每个 env 属性都单独映射到`process.env.xxxx`并在编译期间进行转换编译。

意思是，`console.log(process.env)`将输出`{}`，但`console.log(process.env.you_var)`仍将输出您的值。它将`process.env.your_var`的所有实例替换为您将其设置为的值。即：`env.test ='testing123'`。如果你在代码中的某个地方使用`process.env.test`，它实际上被翻译成'testing123'。

编译前：

```js
if (process.env.test == 'testing123')
```

编译后：

```js
if ('testing123' == 'testing123')
```
