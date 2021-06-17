---
title: 'API: La propriété watchers'
description: La propriété watchers vous permet d'écraser la configuration des observateurs.
menu: watchers
category: configuration
position: 134
---

- Type: `Object`
- Par défaut: `{}`

> La propriété watchers vous permet d'écraser la configuration des watchers dans votre nuxt.config.js.

## chokidar

- Type: `Object`
- Par défaut: `{}`

Pour en savoir plus sur les options chokidar, consultez [chokidar API](https://github.com/paulmillr/chokidar#api).

## webpack

- Type: `Object`
- Par défaut:

```js
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

Pour en savoir plus sur les watchoptions de webpack, voir la [documentation de webpack](https://webpack.js.org/configuration/watch/#watchoptions).
