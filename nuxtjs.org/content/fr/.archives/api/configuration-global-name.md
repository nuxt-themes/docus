---
title: 'API: La propriété globalName'
description: Nuxt.js vous permet de personnaliser l'ID global utilisé dans le modèle HTML principal ainsi que le nom de l'instance principale de Vue et d'autres options.
menu: globalName
category: configuration
position: 111
---

> Nuxt.js vous permet de personnaliser l'ID global utilisé dans le modèle HTML principal ainsi que le nom de l'instance principale de Vue et d'autres options.

- Type: `String`
- Par défaut: `nuxt`

Exemple:

`nuxt.config.js`

```js
{
  globalName: 'myCustomName'
}
```

Il doit s'agir d'un identifiant JavaScript valide.

## La propriété globals

> Personnalise des noms globaux spécifiques qui sont basés sur `globalName` par défaut.

- Type: `Object`
- Par défaut:

```js
{
  id: globalName => `__${globalName}`,
  nuxt: globalName => `$${globalName}`,
  context: globalName => `__${globalName.toUpperCase()}__`,
  pluginPrefix: globalName => globalName,
  readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
  loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
},
```
