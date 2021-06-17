---
title: 'API : la classe ModuleContainer'
description: La classe `ModuleContainer` de Nuxt
menu: Module Container
category: internals
position: 304
---

- Source : **[core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)**

Tous les [modules](/guide/modules) seront appelés dans le contexte de l'instance de `ModuleContainer`.

## Plugins Tapable

Nous pouvons enregistrer des points d'ancrage sur certains évènements du cycle de vie.

```js
nuxt.moduleContainer.plugin('ready', async moduleContainer => {
  // Faire ceci après que tous les modules soient prêts
})
```

Dans le contexte des [modules](/guide/modules) nous pouvons utiliser ceci à la place :

```js
this.plugin('ready', async moduleContainer => {
  // Faire ceci après que tous les modules soient prêts
})
```

| Plugin  | Arguments       | Quand                                                      |
| ------- | --------------- | ---------------------------------------------------------- |
| `ready` | moduleContainer | Tous les modules dans `nuxt.config.js` ont été initialisés |

## Méthodes

### addVendor (vendor)

**Obsolète car `vendor` n'est plus utilisé**

Ajoute à `options.build.vendor` et applique un filtre unique.

### addTemplate (template)

- **template**: `String` ou `Object`
  - `src`
  - `options`
  - `fileName`

Le rendu des templates sont faits dans le projet `buildDir` (`.nuxt`) en utilisant [lodash template](https://lodash.com/docs/4.17.4#template).

Si `fileName` n'est pas fourni ou que `template` est une chaine de caractères, le fichier ciblé par défaut sera `[dirName].[fileName].[pathHash].[ext]`.

Cette méthode retourne un objet final `{ dist, src, options }`.

### addPlugin (template)

Enregistre un plugin en utilisant `addTemplate` et l'ajoute en premier à la liste des options de `plugins[]`.

Vous pouvez utiliser `template.ssr: false` pour désactiver les plugins inclus dans le paquetage SSR.

### addServerMiddleware (middleware)

Pousse le middleware dans [options.serverMiddleware](/api/configuration-servermiddleware).

### extendBuild (fn)

Permet d'étendre facilement la configuration de build webpack en chainant la fonction [options.build.extend](/api/configuration-build#extend).

### extendRoutes (fn)

Permet d'étendre facilement les routes en chainant la fonction [options.build.extendRoutes](/api/configuration-router#extendroutes).

### addModule (moduleOpts, requireOnce)

_Async function_

Enregistre le module. `moduleOpts` peut être une chaine de caractères ou `[src, options]`. Si `requireOnce` est `true`, les modules résolus `meta` préviennent l'enregistrement du même module plus d'une fois.

### requireModule (moduleOpts)

_Async function_

C'est un alias raccourci de `addModule(moduleOpts, true)`

## Points d'ancrage

We can register hooks on certain life cycle events.

| Points d'ancrage | Arguments                  | Quand                                                                                                 |
| ---------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `modules:before` | (moduleContainer, options) | Appelé avant la création de la classe ModuleContainer, utile pour surcharger les méthodes et options. |
| `modules:done`   | (moduleContainer)          | Appelé quand tous les modules ont été chargés.                                                        |
