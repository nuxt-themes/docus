---
title: Window 或 Document 对象未定义
description: Window 或 Document 对象未定义？
category: development
position: 101
---

# Window 或 Document 对象未定义？

这是因为一些只兼容客户端的脚本被打包进了服务端的执行脚本中去。对于只适合在客户端运行的脚本，需要通过使用 `process.client` 变量来判断导入。

举个例子， 在你的 `.vue` 文件中：

```js
if (process.client) {
  require('external_library')
}
```
