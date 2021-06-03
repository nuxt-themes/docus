---
title: webpack プラグインを追加するには？
description: webpack プラグインを追加するには？
category: configuration
position: 6
---

`nuxt.config.js` ファイル内の `build` オプション配下で、[`webpack.config.js` ファイル](https://webpack.js.org/configuration/plugins/) と同様に webpack の `plugins` へ渡すことができます。

この例では、webpack ビルトインの [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) を追加します。 JavaScript モジュール（_lodash_ および _jQuery_）が自動的にどこでもロードされるので、`import` または `require` する必要はありません

```js
import webpack from 'webpack'

export default {
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // グローバルなモジュール
        $: 'jquery',
        _: 'lodash'
      })
    ]
  }
}
```

> 注意: Vue ベースのアプリでは jQuery は必要ない場合があります。

Nuxt を使用すると、プラグインの実行コンテキストを制御することもできます。`client` ビルドまたは `server` ビルド（または `dev` ビルドと `prod` ビルドの区別）で実行する場合は、[`build.extend`](/docs/2.x/configuration-glossary/configuration-build#extend)で webpack プラグインも手動で渡すことができます。
