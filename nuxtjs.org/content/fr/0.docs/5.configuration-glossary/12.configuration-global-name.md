---
title: La propriété globalName
description: Nuxt.js nous permet de personnaliser l'identifiant global utilisé dans le template HTML principal ainsi que le nom de l'instance de Vue et d'autres options encore.
menu: globalName
category: configuration-glossary
position: 11
---

> Nuxt.js nous permet de personnaliser l'identifiant global utilisé dans le template HTML principal ainsi que le nom de l'instance de Vue et d'autres options encore.

- Type: `String`
- Par défaut: `nuxt`

```js{}[nuxt.config.js]
{
  globalName: 'monNomPersonnalisé'
}
```

<base-alert>

Le `globalName` doit être un identifiant JavaScript valide, le changer pourrait casser le support pour certains plugins qui dépendent de certaines fonctions basées sur le nom de Nuxt. Si l'on cherche à changer seulement l'identifiant HTML visible `__nuxt`, alors on peut utiliser la propriété `globals`.

</base-alert>

## The globals property

> Personnalise certains noms globaux spécifiques, basés sur `globalName` par défaut.

- Type: `Object`
- Par défaut:

```js{}[nuxt.config.js]
globals: {
  id: globalName => `__${globalName}`,
  nuxt: globalName => `$${globalName}`,
  context: globalName => `__${globalName.toUpperCase()}__`,
  pluginPrefix: globalName => globalName,
  readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
  loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
},
```
