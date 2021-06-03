---
title: 'A propriedade watchers'
description: A propriedade watchers permite sobrescrever a configuração dos watchers.
menu: watchers
category: configuration-glossary
position: 34
---

- Tipo: `Object`
- Padrão: `{}`

> A propriedade watchers permite sobrescrever a configuração dos watchers em seu nuxt.config.js.

## chokidar

- Tipo: `Object`
- Padrão: `{}`

Para saber mais sobre as opções de chokidar, consulte a [API chokidar](https://github.com/paulmillr/chokidar#api).

## webpack

- Tipo: `Object`
- Padrão:

```js
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

Para saber mais sobre webpack watchoptions, consulte a [documentação do webpack](https://webpack.js.org/configuration/watch/#watchoptions).

### O que vem em seguida

<base-alert type="next">

Check out the [livro glossários de internals](/docs/2.x/internals-glossary/$nuxt)

</base-alert>
