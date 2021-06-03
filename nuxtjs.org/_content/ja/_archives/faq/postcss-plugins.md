---
title: PostCSS プラグインを追加するには？
description: PostCSS プラグインを追加するには？
category: configuration
position: 4
---

### 推奨する方法

あなたのプロジェクトディレクトリに `postcss.config.js` が存在する場合は、リネームか削除をします。 それから、 `nuxt.config.js` ファイル内に次のように記述します:

```js
export default {
  build: {
    postcss: {
      // キーとしてプラグイン名を、値として引数を追加します
      // プラグインは前もって npm か yarn で dependencies としてインストールしておきます
      plugins: {
        // 値として false を渡すことによりプラグインを無効化します
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // postcss-preset-env 設定を変更します
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```

### レガシーな方法

**⚠️ 警告：この方法は非推奨です。**

`postcss.config.js` を使用します。例:

```js
const join = require('path').join
const tailwindJS = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: [require('tailwindcss')(tailwindJS), require('autoprefixer')]
}
```
