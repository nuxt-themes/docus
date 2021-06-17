---
title: 'La propriété watchers'
description: La propriété watchers vous permet d'écraser la configuration de watchers.
menu: watchers
category: configuration-glossary
position: 34
---

- Type : `Object`
- Par défaut : `{}`

> La propriété `watchers` permet d'écraser la configuration des watchers dans le fichier nuxt.config.js.

## chokidar

- Type : `Object`
- Par défaut : `{}`

Pour en savoir plus sur les options de chokidar, voir l'[API chokidar](https://github.com/paulmillr/chokidar#api).

## webpack

- Type : `Object`
- Par défaut :

```js
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

Pour en savoir plus sur les options webpack de surveillance, voir la [documentation webpack](https://webpack.js.org/configuration/watch/#watchoptions).

### Prochaine étape

<base-alert type="next">

Consultez le [Glossaire interne](/docs/2.x/internals-glossary/$nuxt)

</base-alert>
