---
title: オーディオファイルをロードするように Webpack の設定を拡張するには？
description: オーディオファイルをロードするように Webpack の設定を拡張するには？
category: configuration
position: 11
---

オーディオファイルは `file-loader` で処理されるべきです。このローダーは既にデフォルトの Webpack の設定にインクルードされていますが、オーディオファイルを扱うように設定されていません。`nuxt.config.js` 内でそのデフォルトの設定を拡張する必要があります:

```js
export default {
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
```

これで `<audio :src="require('@/assets/water.mp3')" controls></audio>` このようにオーディオファイルをインポートすることが出来ます。

もし、`<audio src="@/assets/water.mp3" controls></audio>` このように書きたいだけであれば、`src` 属性でオーディオファイルを参照する際に自動的にオーディオファイルを読み込むように `vue-loader` に伝える必要があります:

```js
export default {
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
```
