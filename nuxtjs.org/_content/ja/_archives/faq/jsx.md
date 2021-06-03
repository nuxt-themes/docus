---
title: JSX を使うには？
description: Nuxt.js で JSX を使うには？
category: configuration
position: 3
---

Nuxt.js は babel のデフォルトの設定用の公式の [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) に基づいた [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app) を使用しています。そのため、コンポーネントに JSX を使うことができます。

コンポーネントの `render` メソッド内で JSX が使えます:

```html
<script>
  export default {
    data() {
      return { name: 'World' }
    },
    render(h) {
      return <h1 class="red">{this.name}</h1>
    }
  }
</script>
```

<div class="Alert Alert--orange">

`createElement`を `h` にエイリアスすることは、Vue エコシステムで見られる共通の慣例ですが、実は JSX 向けのオプションです。JSX を持つ ES2015 の構文で宣言された（関数またはアロー関数ではない）メソッドやゲッターに `const h = this.$createElement` を[自動的にインジェクト](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection)するため、(h) パラメータを削除することができます。

</div>

JSX の使い方をより深く理解するには Vue.js ドキュメントの [JSX のセクション](https://vuejs.org/v2/guide/render-function.html#JSX) を参照してください。
