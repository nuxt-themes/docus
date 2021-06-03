---
title: 'API : Mécanismes de Nuxt'
description: Mieux comprendre les mécanismes de Nuxt
menu: Intro
category: internals
position: 301
---

Nuxt.js a une architecture intégralement modulable permettant au développeur d'étendre n'importe quelle partie du cœur de Nuxt en utilisant son API.

Consultez le [guide sur les modules](/guide/modules) pour des informations plus détaillées si vous souhaitez développer votre propre module.

Cette section vous aidera à vous familiariser avec les mécanismes de Nuxt et vous servira de référence pour mieux comprendre comment écrire votre propre module.

### Le cœur

Ces classes sont les piliers de Nuxt et devraient exister à l'exécution ou pour le build.

#### Nuxt

- [Classe `Nuxt`](/api/internals-nuxt)
- Source : [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)

#### Renderer

- [Classe `Renderer`](/api/internals-renderer)
- Source : [vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)

#### ModuleContainer

- [Classe `ModuleContainer`](/api/internals-module-container)
- Source : [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)

### Build

Ces classes sont seulement utiles pour le build ou le mode développement.

#### Builder

- [Classe `Builder`](/api/internals-builder)
- Source : [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)

#### Generator

- [Classe `Generator`](/api/internals-generator)
- Source : [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

### Communes

#### Utilitaires

- Source : [utils/src](https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src)

#### Options

- Source : [config/options.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/config/src/options.js)

## Utilisation et paquetage

Nuxt exporte toutes les classes par défaut. Voici comment les importer :

```js
import { Nuxt, Builder, Utils } from 'nuxt'
```

## Pans de codes communs

Toutes les classes Nuxt ont une référence à l'instance `nuxt` et aux `options`, de cette manière nous avons toujours une API cohérente à travers les classes pour accéder à `options` et à `nuxt`.

```js
class SomeClass {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // Nous avons accès à `this.nuxt` and `this.options`
  }
}
```

Les classes sont _plugable_ aussi elle devrait enregistrer un plugin sur le conteneur `nuxt` principal pour enregistrer plus de points d'ancrage.

```js
class FooClass {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options

    this.nuxt.callHook('foo', this)
  }
}
```

Aussi nous pouvons l'ancrer dans le module `foo` comme ceci :

```js
nuxt.hook('foo', foo => {
  // ...
})
```
