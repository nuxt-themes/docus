---
title: 'loading プロパティ'
description: 'Nuxt.はルート間遷移時にプログレスバーを表示するために自身のコンポーネントを使います。これをカスタマイズしたり、無効にしたりできます。また、独自のコンポーネントの作成もできます。'
menu: loading
category: configuration-glossary
position: 15
---

- 型: `Boolean` または `Object` または `String`

> Nuxt.js はルート間遷移時にローディングプログレスバーを表示するコンポーネントを用意しています。このコンポーネントをカスタマイズしたり、無効にしたりできます。また、独自のコンポーネントの作成もできます。

```javascript
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## プログレスバーを無効にする

- 型: `Boolean`

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

## プログレスバーをカスタマイズする

- 型: `Object`

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

List of properties to customize the progress bar.

| キー          | 型      | デフォルト | 説明                                                                                                                           |
| ------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `color`       | String  | `'black'`  | プログレスバーの CSS カラーです                                                                                                |
| `failedColor` | String  | `'red'`    | ルートをレンダリング中にエラー（例えば `data` や `fetch` がエラーを返したとき）が発生した場合のプログレスバーの CSS カラーです |
| `height`      | String  | `'2px'`    | プログレスバーの高さ（プログレスバーの `style` プロパティで使われる）                                                          |
| `throttle`    | Number  | `200`      | ミリ秒単位で指定された時間待ったのちにプログレスバーを表示します。 プログレスバーの点滅を防ぐために利用します                  |
| `duration`    | Number  | `5000`     | プログレスバーを表示する時間の最大値をミリ秒で指定します。Nuxt.js は各ルートが 5 秒以内にレンダリングされると想定しています    |
| `continuous`  | Boolean | `false`    | ローディングが `duration` で指定した時間より長くかかる場合は、プログレスバーのアニメーションを表示したままにします             |
| `css`         | Boolean | `true`     | デフォルトのプログレスバーのスタイルを削除（そして、独自に追加）する場合には false に設定します                                |
| `rtl`         | Boolean | `false`    | プログレスバーの向きを右から左に設定します                                                                                     |

## 独自のローディングコンポーネントを使う

- 型: `String`

**独自コンポーネントはいくつかのメソッドを備えている必要があります:**

| メソッド        | 必須か否か   | 説明                                                                                                       |
| --------------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| `start()`       | 必須         | ルートが変更されたときに呼び出されます。このときに独自コンポーネントの表示が開始されます                   |
| `finish()`      | 必須         | ルートがロード（及びデータ取得）されたときに呼び出されます。このときに独自コンポーネントが表示が終了します |
| `fail(error)`   | _必須でない_ | ルートがロードできなかったときに呼び出されます（例えばデータの取得に失敗したなど）                         |
| `increase(num)` | _必須でない_ | ルートのコンポーネントがロードされている間に呼び出されます。`num` は 100 未満の整数です                    |

```html{}[components/loading.vue]
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
```

```js{}[nuxt.config.js]
export default {
  loading: '~/components/loading.vue'
}
```
