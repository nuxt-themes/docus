---
title: watch
description: The watch property lets you watch custom files for restarting the server.
menu: watch
category: configuration-glossary
position: 33
---

- Type: `Object`
- Default: `[]`

> The watch property lets you watch custom files for restarting the server.

```js
watch: ['~/custom/*.js']
```

[chokidar](https://github.com/paulmillr/chokidar) is used to set up the watchers. To learn more about chokidar's pattern options, see the [chokidar API](https://github.com/paulmillr/chokidar#api).
