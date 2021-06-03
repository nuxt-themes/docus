---
title: 'Nuxt モジュールの紹介'
description: Nuxt 内部をより理解する
menu: Nuxt モジュール
category: internals-glossary
position: 3
---

Nuxt.js は完全にモジュール化されたアーキテクチャを備えているため、開発者は柔軟な API を使用して NuxtCore の任意の部分を拡張できます。

独自のモジュール開発に興味がある場合は[モジュールガイドのドキュメント](/docs/2.x/directory-structure/modules)を参照してください。

このセクションは Nuxt 内部に詳しくなるために役立ち、独自のモジュールを作成する際に Nuxt 内部をよりよく理解するためのリファレンスとして使えます。

### Core

これらのクラスは Nuxt の心臓部であり、実行時とビルド時の両方に存在する必要があります。

#### Nuxt

- [`Nuxt` クラス](/docs/2.x/internals-glossary/internals-nuxt)
- ソース: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)

#### Renderer

- [`Renderer` クラス](/docs/2.x/internals-glossary/internals-renderer)
- ソース: [vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)

#### ModuleContainer

- [`ModuleContainer` クラス](/docs/2.x/internals-glossary/internals-module-container)
- ソース: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)

### Build

これらのクラスは、ビルドモードまたは開発モードでのみ必要です。

#### Builder

- [`Builder` クラス](/docs/2.x/internals-glossary/internals-builder)
- ソース: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)

#### Generator

- [`Generator` クラス](/docs/2.x/internals-glossary/internals-generator)
- ソース: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

### 共通

#### Utils

- ソース: [utils/src](https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src)

#### Options

- ソース: [config/options.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/config/src/options.js)

## パッケージング＆使用方法

Nuxt はデフォルトですべてのクラスをエクスポートします。それらをインポートするには:

```js
import { Nuxt, Builder, Utils } from 'nuxt'
```

## 共通のパターン

すべての Nuxt クラスには `nuxt` インスタンスとオプションへの参照を持ちます。そのため `options` と `nuxt` にアクセスするためのクラス間で一貫した API を常に持ちます。

```js
class SomeClass {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // `this.nuxt` と `this.options` へアクセスできます
  }
}
```

クラスは*プラガブル*なのでより多くのフックを登録するには `nuxt` コンテナにプラグインを登録する必要があります。

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

以下のように `fook` モジュールにフックできます:

```js
nuxt.hook('foo', foo => {
  // ...
})
```
