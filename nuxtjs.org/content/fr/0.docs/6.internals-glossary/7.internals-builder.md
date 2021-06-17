---
title: La classe Builder
description: La classe `Builder` de Nuxt
menu: Constructeur
category: internals-glossary
position: 7
---

- Source: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)**

## Hooks

Nous pouvons enregistrer des hooks sur certains événements du cycle de vie.

```js
// Ajout d'hook pour le build
this.nuxt.hook('build:done', (builder) => {
  ...
})
```

| Hook                    | Arguments                                   | Quand                                                                                                                                                       |
| ----------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:before`          | (nuxt, buildOptions)                        | Avant que le build de Nuxt commence                                                                                                                         |
| `builder:prepared`      | (nuxt, buildOptions)                        | Les répertoires de build ont été créés                                                                                                                      |
| `builder:extendPlugins` | (plugins)                                   | Génération de plugins                                                                                                                                       |
| `build:templates`       | ({ templatesFiles, templateVars, resolve }) | Génération de fichiers modèles `.nuxt`                                                                                                                      |
| `build:extendRoutes`    | (routes, resolve)                           | Génération des routes                                                                                                                                       |
| `webpack:config`        | (webpackConfigs)                            | Avant la configuration des compilateurs                                                                                                                     |
| `build:compile`         | ({ name, compiler })                        | Avant que webpack compile (le compilateur est une instance du webpack `Compiler`), si mode universel, appelé deux fois avec le nom `'client'` et `'server'` |
| `build:compiled`        | ({ name, compiler, stats })                 | Le build webpack est terminée                                                                                                                               |
| `build:done`            | (nuxt)                                      | Le build de Nuxt est terminé                                                                                                                                |
