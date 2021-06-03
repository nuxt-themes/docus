---
title: 如何更改应用的主机和端口配置？
description: 如何更改 Nuxt.js 应用的主机和端口配置？
category: configuration
position: 7
---

# 如何更改应用的主机和端口配置？

您可以通过不同方式配置主机和端口，如下列出**从最高优先级到最低优先级**。

> **注意：** 如果为`port`指定字符串值`'0'`（不是 `0`），将为您的 Nuxt 应用程序分配一个随机端口。

## 作为命令参数直接传递

```sh
nuxt --hostname myhost --port 3333
```

或

```js
"scripts": {
  "dev": "nuxt --hostname myhost --port 3333"
}
```

## 在 `nuxt.config.js` 中配置:

在 `nuxt.config.js` 添加:

```js
export default {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
  // other configs
}
```

## 使用 NUXT_HOST 和 NUXT_PORT env 变量

与 HOST 和 PORT 类似，但更具体，以防您需要添加其他东西。

```js
"scripts": {
  "dev": "NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

**注意**: 为了更好的跨平台开发支持，您可以使用 [cross-env](https://www.npmjs.com/package/cross-env) 依赖包。

安装依赖:

```bash
npm install --save-dev cross-env
```

配置 cross-env:

```js
"scripts": {
  "dev": "cross-env NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

## 使用 HOST 和 PORT env 变量

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

## 在 `package.json` 中配置 `nuxt` :

在您的 `package.json` 文件中添加:

```json
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3333"
  }
},
"scripts": {
  "dev": "nuxt"
}
```
