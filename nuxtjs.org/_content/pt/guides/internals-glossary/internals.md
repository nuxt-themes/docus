---
title: 'Introdução ao Nuxt Modules'
description: Compreendendo melhor os elementos internos do Nuxt
menu: Nuxt Modules
category: internals-glossary
position: 3
---

O Nuxt.js tem uma arquitetura totalmente modular que permite aos desenvolvedores estender qualquer parte do seu núcleo usando uma API flexível.

Por favor, consulte o [Guia de Módulos](/docs/2.x/directory-structure/modules) para obter informações mais detalhadas se estiver interessado em desenvolver o seu próprio módulo.

Esta seção ajuda a familiarizar-se com os elementos internos do Nuxt e pode ser usada como uma referência para entendê-lo melhor ao escrever seus próprios módulos.

### Núcleo

Essas classes são o coração do Nuxt e devem existir tanto no tempo de execução quanto no tempo de construção.

#### Nuxt

- [A classe `Nuxt`](/docs/2.x/internals-glossary/internals-nuxt)
- Fonte: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)

#### Renderer

- [A classe `Renderer`](/docs/2.x/internals-glossary/internals-renderer)
- Fonte: [vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)

#### ModuleContainer

- [A classe `ModuleContainer`](/docs/2.x/internals-glossary/internals-module-container)
- Fonte: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)

### Construção

Essas classes são necessárias apenas para o modo de construção ou desenvolvimento.

#### Builder

- [A classe `Builder`](/docs/2.x/internals-glossary/internals-builder)
- Fonte: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)

#### Generator

- [A classe `Generator`](/docs/2.x/internals-glossary/internals-generator)
- Fonte: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

### Comuns

#### Utils

- FOnte: [utils/src](https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src)

#### Options

- Fonte: [config/options.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/config/src/options.js)

## Empacotamento & Utilização

Nuxt exporta todas as classes por padrão. Para importá-los:

```js
import { Nuxt, Builder, Utils } from 'nuxt'
```

## Padrões comuns

Todas as classes Nuxt têm acesso à referência da instância e opções do `nuxt`, desta forma temos uma API consistente entre as classes para acessar `options` e `nuxt`.

```js
class AlgumaClasse {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  algumaFuncao() {
    // Temos acesso a `this.nuxt` e` this.options`
  }
}
```

As classes são _plugáveis_, então elas devem registrar um plugin no contêiner `nuxt` principal para registrar mais hooks.

```js
class ClasseFoo {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options

    this.nuxt.callHook('foo', this)
  }
}
```

Portanto, podemos conectar ao módulo `foo` assim:

```js
nuxt.hook('foo', foo => {
  // ...
})
```
