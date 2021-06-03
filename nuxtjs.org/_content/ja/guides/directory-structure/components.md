---
title: components
description: components ディレクトリには、Vue.js コンポーネントが含まれています。コンポーネントは、ページのさまざまな部分を構成するものであり、再利用して、ページ、レイアウト、さらには他のコンポーネントにインポートすることができます。
position: 3
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/03_components?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/components.png
imgAlt: nuxt components module
questions:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
---

components ディレクトリには、Vue.js コンポーネントが含まれています。コンポーネントは、ページのさまざまな部分を構成するものであり、再利用して、ページ、レイアウト、さらには他のコンポーネントにインポートすることができます。

### データの取得

コンポーネントの API から非同期データにアクセスするには、[`fetch()`フック](/docs/2.x/features/data-fetching#the-fetch-method)を使用できます。

`$fetchState.pending` をチェックすることで、データがロードされるのを待っている時にメッセージを表示することができます。`$fetchState.error` を確認し、データの取得中にエラーが発生した場合はエラーメッセージを表示することもできます。`fetch()` を使用する場合、`data()` で適切なプロパティを宣言する必要があります。フェッチから取得したデータは、これらのプロパティに割り当てることができます。

```html{}[components/MountainsList.vue]
<template>
  <div>
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching mountains</p>
    <ul v-else>
      <li v-for="(mountain, index) in mountains" :key="index">
        {{ mountain.title }}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
```

<base-alert type="next">

フェッチの動作の詳細については、[fetch()](/docs/2.x/features/data-fetching#the-fetch-method) の章を参照してください

</base-alert>

## コンポーネントの発見

<app-modal :src="img" :alt="imgAlt"></app-modal>

`v2.13` 以降、Nuxt はテンプレートで使用される時にコンポーネントを自動でインポートできます。この機能をアクティブにするには、構成を `components: true` と設定します:

```js{}[nuxt.config.js]
export default {
  components: true
}
```

components ディレクトリにコンポーネントを作成すると、それらを自動インポートできるようになります。

```bash
components/
  TheHeader.vue
  TheFooter.vue
```

```html{}[layouts/default.vue]
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>
```

### 動的インポート

コンポーネントを動的にインポートするには、コンポーネントの遅延読み込みともいわれる、`Lazy` プレフィックスをテンプレートに追加するだけです。

```html{}[layouts/default.vue]
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <LazyTheFooter />
  </div>
</template>
```

lazy プレフィックスを使用すると、イベントが発火された時にコンポーネントを動的にインポートすることもできます。

```html{}[pages/index.vue]
<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="showList">Show List</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      showList() {
        this.show = true
      }
    }
  }
</script>
```
### ネストされたディレクトリ

次のようにネストされたディレクトリにコンポーネントがある場合:

```bash
components/
  base/
      foo/
         Button.vue
```

コンポーネント名は独自のパスディレクトリとファイル名に基づいています。したがってコンポーネントは次のようになります:

```html
<BaseFooButton />
```

ただしコンポーネント名の一部にあってはならないカスタムディレクトリ構造を使用する場合、次のディレクトリを明示的に指定できます:

```bash
components/
  base/
      foo/
         Button.vue
```

```bash{}[nuxt.config.js]
components: {
  dirs: [
    '~/components',
    '~/components/base'
  ]
}
```

またテンプレートで `BaseFooButton` の代わりに `FooButton` を使用できます。

```html{}[pages/index.vue]
<FooButton />
```
<base-alert type="next">詳しくは[components module](/blog/improve-your-developer-experience-with-nuxt-components)をご覧ください。</base-alert>
