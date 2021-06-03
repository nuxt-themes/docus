---
title: 'Introducción a módulos de Nuxt'
description: Entiende mejor los internals de Nuxt
menu: Módulos Nuxt
category: internals-glossary
position: 3
---

Nuxt.js tiene una arquitectura completamente modular que permite a los desarrolladores ampliar cualquier parte de Nuxt Core utilizando una API flexible.

Por favor mira la [Guía de módulos](/docs/2.x/directory-structure/modules) para obtener información más detallada si está interesado en desarrollar su propio módulo.

Esta sección ayuda a familiarizarse con los aspectos internos de Nuxt y puede usarse como referencia para comprenderlo mejor mientras escribe sus propios módulos.

### Core

Estas clases son el corazón de Nuxt y deberían existir tanto en tiempo de ejecución como en tiempo de compilación.

#### Nuxt

- [Clase `Nuxt`](/docs/2.x/internals-glossary/internals-nuxt)
- Fuente: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)

#### Renderer

- [Clase `Renderer`](/docs/2.x/internals-glossary/internals-renderer)
- Fuente: [vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)

#### ModuleContainer

- [Clase `ModuleContainer`](/docs/2.x/internals-glossary/internals-module-container)
- Fuente: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)

### Build

Estas clases solo son necesarias para el modo de construcción o desarrollo.

#### Builder

- [Clase `Builder`](/docs/2.x/internals-glossary/internals-builder)
- Fuente: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)

#### Generator

- [Clase `Generator`](/docs/2.x/internals-glossary/internals-generator)
- Fuente: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

### Common

#### Utils

- Fuente: [utils/src](https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src)

#### Options

- Fuente: [config/options.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/config/src/options.js)

## Empaquetado y uso

Nuxt exporta todas las clases de forma predeterminada. Para importarlos:

```js
import { Nuxt, Builder, Utils } from 'nuxt'
```

## Patrones comúnes

Todas las clases de Nuxt tienen una referencia a la instancia y las opciones `nuxt` , de esta manera siempre tenemos una API consistente en todas las clases para acceder a `options` y `nuxt`.

```js
class SomeClass {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // Tenemos acceso a `this.nuxt` y `this.options`
  }
}
```

Las clases son _plugable_ por lo que deben registrar un complemento en el contenedor principal `nuxt` para registrar más _hooks_.

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

Entonces podemos conectarnos al módulo `foo` de esta manera:

```js
nuxt.hook('foo', foo => {
  // ...
})
```
