---
title: 'API: watch 属性'
description: watch属性允许您监听自定义文件来重新启动服务器。
menu: watch
category: configuration
position: 133
---

# The watch Property

- Type: `Object`
- Default: `[]`

> watch 属性允许您监听自定义文件来重新启动服务器。

```js
watch: ['~/custom/*.js']
```

[chokidar](https://github.com/paulmillr/chokidar)用于建立`watch`。要了解有关 chokidar 模式选项的更多信息，请参阅 [chokidar API](https://github.com/paulmillr/chokidar#api)。
