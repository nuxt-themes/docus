---
title: 'La propiedad watchers'
description: La propiedad watchers permite sobreescribir la configuración de los observadores.
menu: watchers
category: configuration-glossary
position: 34
---

- Tipo: `Object`
- Por defecto: `{}`

> La propiedad watchers permite sobreescribir la configuración de los observadores en nuxt.config.js.

## chokidar

- Tipo: `Object`
- Por defecto: `{}`

Para saber más sobre las opciones de chokidar, visita la [API de chokidar](https://github.com/paulmillr/chokidar#api).

## webpack

- Tipo: `Object`
- Por defecto:

```js
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

Para saber más sobre las watchoptions de webpack, visita la [documentación de webpack](https://webpack.js.org/configuration/watch/#watchoptions).

### A continuación...

<base-alert type="next">

Echa un vistazo al [libro Glosario de Internos](/docs/2.x/internals-glossary/$nuxt)

</base-alert>
