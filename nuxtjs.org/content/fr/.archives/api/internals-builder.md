---
title: 'API : la classe Builder'
description: La classe `Builder` de Nuxt
menu: Builder
category: internals
position: 305
---

- Source : **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)**

## Points d'ancrage

Nous pouvons enregistrer des points d'ancrage sur certains évènements du cycle de vie.

```js
// Add hook for build
this.nuxt.hook('build:done', (builder) => {
  ...
})
```

| Point d'ancrage      | Arguments                                  | Quand                                                                                                                                                                |
| -------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:before`       | (nuxt, buildOptions)                       | Après que le build de Nuxt ai démarré                                                                                                                                |
| `built:templates`    | ({ templateFiles, templateVars, resolve }) | À la génération des fichiers de template `.nuxt`                                                                                                                     |
| `build:extendRoutes` | (routes, resolve)                          | À la génération des routes                                                                                                                                           |
| `build:compile`      | ({ name, compiler })                       | Avant la compilation webpack (le compilateur est une instance `Compiler` de webpack), si en mode universel, appelez deux fois avec les noms `'client'` et `'server'` |
| `build:compiled`     | ({ name, compiler, stats })                | À la fin du build webpack                                                                                                                                            |
| `build:done`         | (nuxt)                                     | Quand le build Nuxt est fini                                                                                                                                         |
