---
title: 'API: Nuxt のモジュールの紹介'
description: Nuxt の内部をより深く理解する
menu: Intro
category: internals
position: 301
---

Nuxt.js には開発者が Nuxt Core の好きな部分を柔軟な API を使って拡張するための十分にモジュール化された仕組みがあります。

自分でモジュールを作ってみたいのなら、詳しくは [モジュールガイド](/guide/modules) をご覧ください。

このセクションは、Nuxt の内部に慣れ親しむためにあり、自分でモジュールを書くときに理解を深めるためのリファレンスとして使えます。

### コア

これらのクラスは Nuxt の中核にあり、実行時もビルド時も存在しなければなりません。

#### Nuxt

- [`Nuxt` クラス](/api/internals-nuxt)
- ソース: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)

#### Renderer

- [`Renderer` クラス](/api/internals-renderer)
- ソース: [vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)

#### ModuleContainer

- [`ModuleContainer` クラス](/api/internals-module-container)
- ソース: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)

### ビルド

これらのクラスはビルドあるいは開発モードのためだけに必要です。

#### Builder

- [`Builder` クラス](/api/internals-builder)
- ソース: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)

#### Generator

- [`Generator` クラス](/api/internals-generator)
- ソース: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

### 共通

#### Utils

- ソース: [utils/src](https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src)

#### Options

- ソース: [config/options.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/config/src/options.js)

## パッケージの使い方

Nuxt はすべてのクラスをデフォルトでエクスポートします。これらを得るには:

```js
import { Nuxt, Builder, Utils } from 'nuxt'
```

## よくあるパターン

すべての Nuxt クラスは `nuxt` インスタンスとオプションへの参照を持っています。これにより `options` と `nuxt` にアクセスするための一貫した API を実現しています。

```js
class SomeClass {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // We have access to `this.nuxt` and `this.options`
  }
}
```

クラスは「プラグ可能」であるので、追加のフックを登録する場合はメインの `nuxt` コンテナにプラグインを登録します。

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

`foo` モジュールにフックするにはこうします:

```js
nuxt.hook('foo', foo => {
  // ...
})
```
