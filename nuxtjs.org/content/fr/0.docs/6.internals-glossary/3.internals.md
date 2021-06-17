---
title: Introduction aux modules Nuxt
description: Mieux comprendre les modules internes de Nuxt
menu: Modules Nuxt
category: internals-glossary
position: 3
---

Nuxt.js a une architecture entièrement modulaire qui permet aux développeurs d'étendre n'importe quelle partie de Nuxt Core en utilisant une API flexible.

Pour plus d'informations détaillées, veuillez consulter le [Guide des modules](/docs/2.x/directory-structure/modules) si vous souhaitez développer votre propre module.

Cette section aide à se familiariser avec les modules internes de Nuxt et peut être utilisée comme référence pour mieux comprendre et écrire vos propres modules.

### Noyau

Ces classes sont le cœur de Nuxt et doivent exister à la fois sur le runtime et le build time.

#### Nuxt

- [Classe `Nuxt`](/docs/2.x/internals-glossary/internals-nuxt)
- Source: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)

#### Renderer

- [Classe `Renderer`](/docs/2.x/internals-glossary/internals-renderer)
- Source: [vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)

#### ModuleContainer

- [Classe `ModuleContainer`](/docs/2.x/internals-glossary/internals-module-container)
- Source: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)

### Build

Ces classes sont nécessaires que pour le mode build ou dev.

#### Builder

- [Classe `Builder`](/docs/2.x/internals-glossary/internals-builder)
- Source: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)

#### Generator

- [Classe `Generator`](/docs/2.x/internals-glossary/internals-generator)
- Source: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

### Générale

#### Utils

- Source: [utils/src](https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src)

#### Options

- Source: [config/options.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/config/src/options.js)

## Packaging & Usage

Par défaut, Nuxt exporte toutes les classes. Pour les importer :

```js
import { Nuxt, Builder, Utils } from 'nuxt'
```

## Patterns courant

Toutes les classes Nuxt font référence à l'instance `nuxt` et aux options, de cette façon nous avons toujours une API cohérente entre les classes pour accéder aux `options` et `nuxt`.

```js
class SomeClass {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // Nous avons accès à `this.nuxt` et `this.options`
  }
}
```

Les classes sont _plugables_ donc elles doivent être enregistré en tant que plugin sur le conteneur principal `nuxt` pour avoir plus de hooks.

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

On peut avoir un hook au module `foo` comme cela :

```js
nuxt.hook('foo', foo => {
  // ...
})
```
