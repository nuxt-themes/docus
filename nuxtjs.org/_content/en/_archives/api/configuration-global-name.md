---
title: 'The globalName Property'
description: Nuxt.js lets you customize the global ID used in the main HTML template as well as the main Vue instance name and other options.
menu: globalName
category: configuration
position: 111
---

> Nuxt.js lets you customize the global ID used in the main HTML template as well as the main Vue instance name and other options.

- Type: `String`
- Default: `nuxt`

Example:

`nuxt.config.js`

```js
{
  globalName: 'myCustomName'
}
```

It needs to be a valid JavaScript identifier.

## The globals property

> Customizes specific global names which are based on `globalName` by default.

- Type: `Object`
- Default:

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
