---
title: 'The watch Property'
description: The watch property lets you watch custom files for restarting the server.
category: api-configuration
---

- Type: `Object`
- Default: `[]`

> The watch property lets you watch custom files for restarting the server.

```js
watch: ['~/custom/*.js']
```

[chokidar](https://github.com/paulmillr/chokidar) is used to set up the watchers. To learn more about chokidar's pattern options, see the [chokidar API](https://github.com/paulmillr/chokidar#api).
