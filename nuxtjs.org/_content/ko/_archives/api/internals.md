---
title: 'API: Nuxt 모듈 소개'
description: Nuxt 내부 모듈에 대한 더 나은 이해
menu: Intro
category: internals
position: 301
---

Nuxt.js는 유연한 API를 사용하여 개발자가 Nuxt Core의 모든 부분을 확장할 수 있도록 완전 모듈식 아키텍처를 제공합니다.

여러분의 모듈을 개발하는데 이 부분에 대해 관심이 있으시다면, [모듈가이드](/guide/modules)를 참조해주세요.

이 섹션은 Nuxt 내부 모듈을 파악하는 데 도움이 될 것이며, 모듈을 작성하는 동안 Nuxt 내부모듈을 보다 잘 이해하기 위한 참조 자료로 사용할 수 있습니다.

### Core

이 클래스는 Nuxt의 핵심이며 런타임과 빌드 시간 둘 다 존재해야 합니다.

#### Nuxt

- [`Nuxt` Class](/api/internals-nuxt)
- 소스: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)

#### Renderer

- [`Renderer` Class](/api/internals-renderer)
- 소스: [vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)

#### ModuleContainer

- [`ModuleContainer` Class](/api/internals-module-container)
- 소스: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)

### Build

build나 dev 모드에서만 필요한 클래스입니다.

#### Builder

- [`Builder` Class](/api/internals-builder)
- 소스: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)

#### Generator

- [`Generator` Class](/api/internals-generator)
- 소스: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

### Common

#### Utils

- 소스: [utils/src](https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src)

#### Options

- 소스: [config/options.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/config/src/options.js)

## Packaging & Usage

기본적으로 Nuxt는 모든 클래스들을 export합니다. import 하시려면:

```js
import { Nuxt, Builder, Utils } from 'nuxt'
```

## Common patterns

모든 Nuxt 클래스는 `nuxt` 인스턴스 및 옵션에 대한 참조를 가지고 있으므로, `options`와 `nuxt`에 액세스할 수 있도록 클래스에 걸쳐 항상 일관된 API를 제공합니다.

```js
class SomeClass {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // `this.nuxt`와 `this.options`에 접근하실 수 있습니다.
  }
}
```

클래스는 *플러그 가능(plugable)*이므로, 더 많은 후크를 등록하기 위해 메인 `nuxt` 컨테이너에 플러그인을 등록해야 합니다.

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

그래서 우리는 다음과 같이 `foo` 모듈에 훅(hook)을 걸 수 있습니다:

```js
nuxt.hook('foo', foo => {
  // ...
})
```
