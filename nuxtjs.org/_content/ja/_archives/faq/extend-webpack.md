---
title: webpack の設定を拡張するには？
description: Webpack の設定を拡張するには？
category: configuration
position: 5
---

`nuxt.config.js` 内の `extend` オプションを通して Nuxt の webpack 設定を拡張できます `build` プロパティの `extend` オプションは 2 つの引数を受け取る関数です。第一引数は、Nuxt の webpack 設定からエクスポートされた webpack `config` オブジェクトです。第二引数は Boolean 型のプロパティを複数持つ context オブジェクトです。: `{isDev、isClient、isServer、loaders}`

```js
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // isDev が true の場合、webpack を開発モードに設定します
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
```

`extend` メソッドは一度はサーバーのバンドルのため、一度はクライアントのバンドルのため、つまり二度呼び出されます。

## 例

#### チャンク構成をカスタマイズ

デフォルトのオブジェクトを書き換えずに [最適化構成](/docs/2.x/configuration-glossary/configuration-build#optimization) を多少調整することができます。

```js
export default {
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}
```

#### 開発環境のすべての Webpack ビルドで ESLint を実行

コードスタイルエラーを認識するために、開発環境のすべてのビルドで [ESLint](https://github.com/webpack-contrib/eslint-loader) を実行することができます。

```js
export default {
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
```
