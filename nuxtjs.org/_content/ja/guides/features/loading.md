---
title: ローディング
description: Nuxt.js は、遷移中に表示する独自のローディングプログレスバーコンポーネントを提供します。これをカスタマイズしたり、無効にしたり、独自のコンポーネントを作成したりすることができます。
position: 8
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/08_loading?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Nuxt.js のローディングプログレスバーが機能するためには何をする必要がありますか？
    answers:
      - 何もしなくとも機能します
      - nuxt.config.js ファイルで loading を true に設定します
      - ローディングコンポーネントを作成します
    correctAnswer: 何もしなくとも機能します
  - question: デフォルトのプログレスバーのスタイルはどこで変更できますか？
    answers:
      - layout コンポーネント
      - page コンポーネント
      - nuxt.config.js
    correctAnswer: layout コンポーネント
  - question: nuxt.config.js ファイルのプログレスバーのスタイルをどのプロパティに設定しますか？
    answers:
      - progress
      - loading
      - loadingBar
    correctAnswer: loading
  - question: 読み込みを無効にするために nuxt.config.js ファイルに何を追加しますか？
    answers:
      - 'loadingBar: false'
      - "loading: 'none'"
      - 'loading: false'
    correctAnswer: 'loading: false'
  - question: 特定のページの読み込みを無効にできますか？
    answers:
      - できます
      - できません
    correctAnswer: できます
  - question: ローディングバーをプログラムで開始するために何を使いますか？
    answers:
      - $nuxt.loading.start()
      - $nuxt.loading()
      - $loading.start()
    correctAnswer: $nuxt.loading.start()
  - question: 読み込みに時間がかかる場合、プログレスバーを継続させるために使うプロパティは？
    answers:
      - "duration: 'continuous'"
      - "loading: 'continuous'"
      - 'continuous: true'
    correctAnswer: 'continuous: true'
  - question: カスタムロードコンポーネントを作成するときに必要な 2 つのメソッドは？
    answers:
      - start() と fail()
      - start() と finish()
      - loading() と finish()
    correctAnswer: start() と finish()
  - question: 新しい loading.vue コンポーネントを作成した後どのように使いますか？
    answers:
      - layouts ページにインポートします
      - nuxt.config.js の loading プロパティ下に追加します
      - nuxt.config.js の plugins プロパティ下に追加します
    correctAnswer: nuxt.config.js の loading プロパティ下に追加します
  - question: 'Nuxt.js が `ssr:false` を使っているときにサークルスピナーを追加するには loading プロパティに何を追加しますか？'
    answers:
      - 'circle: true'
      - 'spinner: circle'
      - 'name: circle'
    correctAnswer: 'name: circle'
---

Nuxt.js は、遷移中に表示する独自のローディングプログレスバーコンポーネントを提供します。これをカスタマイズしたり、無効にしたり、独自のコンポーネントを作成したりすることができます。

## プログレスバーをカスタマイズする

他のプロパティの中でも、プログレスバーの色、サイズ、期間、方向はアプリケーションのニーズに合わせてカスタマイズできます。`nuxt.config.js` の `loading` プロパティに関連するプロパティを更新することでカスタマイズができます。

例えば、高さ 5px の青いプログレスバーを設定するには、`nuxt.config.js` を次のように更新します:

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

プログレスバーをカスタマイズするために使えるプロパティ一覧。

| キー        | 型      | デフォルト | 説明                                                                                                                             |     |
| ----------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- | --- |
| color       | String  | 'black'    | プログレスバーの CSS カラーです。                                                                                                |     |
| failedColor | String  | 'red'      | ルートをレンダリング中にエラーが発生した場合のプログレスバーの CSS カラーです。（例えば data または fetch がエラーを返したとき） |     |
| height      | String  | '2px'      | プログレスバーの高さです。（プログレスバーの style プロパティで使われます）                                                      |     |
| throttle    | Number  | 200        | プログレスバーを表示するまでに待つ時間です（ミリ秒単位）。プログレスバーの点滅を防ぐことに役立ちます。                           |     |
| duration    | Number  | 5000       | プログレスバーを表示する時間の最大値です（ミリ秒単位）。Nuxt.js は各ルートが 5 秒以内にレンダリングされると想定しています。      |     |
| continuous  | Boolean | false      | ローディングが duration で指定した時間より長くかかる場合にプログレスバーのアニメーションを継続します。                           |     |
| css         | Boolean | true       | デフォルトのプログレスバーのスタイルを削除（そして独自に追加）する場合には false を設定します。                                  |     |
| rtl         | Boolean | false      | プログレスバーの向きを右から左にします。                                                                                         |     |

## プログレスバーを無効にする

ルートから別のルートへ遷移する間にプログレスバーを表示したくないときは `nuxt.config.js` ファイルに `loading: false` を追加します:

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

デフォルトのローディングプログレスバーを特定のページで無効にすることも可能です。

```html{}[pages/index.vue]
<template>
  <h1>My page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```

## ローディングバーをプログラム的に起動する

ローディングバーは `this.$nuxt.$loading.start()` を呼び出してローディングバーを開始させたり、`this.$nuxt.$loading.finish()` を呼び出して停止させたりなど、コンポーネント内でプログラム的に起動することもできます。

ページコンポーネントのマウントプロセス中に、`$loading` プロパティにすぐアクセスできない場合があります。これを回避するために、`mounted` メソッドでローダーを起動したい場合は、以下のように `this.$nextTick` 内で `$loading` メソッドの呼び出しを行うようにしてください。

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## プログレスバーの内部

残念ながら、ローディングコンポーネントは新しいページを読み込むのにかかる時間を事前に知ることはできません。したがって、ローディング時間の 100%ちょうどにプログレスバーをアニメーションさせることはできません。

Nuxt のローディングコンポーネントは `duration` を設定することでこれを部分的に解決します。これはローディングプロセスにかかる時間の推定値として設定すべきです。カスタムローディングコンポーネントを使わない限り、プログレスバーは（実際の進行にかかわらず）`duration` の時間内で常に 0%から 100%まで移動します。ローディングが `duration` で設定された時間より長くかかる場合は、プログレスバーはローディングが完了するまで 100%の位置にとどまります。

`continuous` を true に設定することでこのデフォルトの挙動を変更することができます。プログレスバーが 100%に達した後に再び `duration` で設定した時間で 0%に向かって縮小し始めます。0% に達してもまだローディングが完了していない場合は、再び 0%から 100%に向かって伸び始めます。ローディングが完了するまでこれを繰り返します。

```js
export default {
  loading: {
    continuous: true
  }
}
```

_continuous を設定したプログレスバーの例:_

![https://nuxtjs.org/api-continuous-loading.gif](https://nuxtjs.org/api-continuous-loading.gif)

## 独自のローディングコンポーネントを使う

Nuxt.js がデフォルトのプログレスバーコンポーネントの代わりに呼び出す、独自のコンポーネントを作成することができます。そのためには `loading` オプション内に独自コンポーネントへのパスを指定する必要があります。こうすることで Nuxt.js は独自コンポーネントを直接呼び出します。

独自コンポーネントはこれらのメソッドを備えている必要があります:

| メソッド      | 必須か否か | 説明                                                                                                       |
| ------------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| start()       | 必須       | ルートが変更されたときに呼び出されます。このときコンポーネントが表示されます。                             |
| finish()      | 必須       | ルートがロード（そしてデータが取得）されたときに呼び出されます。このときコンポーネントの表示が終了します。 |
| fail(error)   | 必須でない | ルートがロードできなかったときに呼び出されます（例えばデータの取得に失敗したときなどです）。               |
| increase(num) | 必須でない | ルートのコンポーネントがロードされている間に呼び出されます。num は 100 未満の整数です。                    |

`components/LoadingBar.vue` に独自のカスタムコンポーネントを作成することができます:

```html{}[components/LoadingBar.vue]
<template>
  <div v-if="loading" class="loading-page">
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

それから  `nuxt.config.js` を編集して、独自のコンポーネントを使うことを Nuxt.js に伝えます:

```js{}[nuxt.config.js]
export default {
  loading: '~/components/LoadingBar.vue'
}
```

## loading indicator プロパティ

SPA モードで Nuxt.js を実行すると、初回のページ読み込み時にはサーバーからのコンテンツがありません。そのためページが読み込まれている間に、空白のページの代わりとして独自の色や背景を加えたりインジケータを変更したりできるスピナーを提供しています。

```js{}[nuxt.config.js]
export default {
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  }
}
```

## ビルトインインジケータ

これらのインジケータは、素晴らしい [SpinKit](http://tobiasahlin.com/spinkit) プロジェクトからインポートされています。Spinkit のデモページでスピナーを試してみることができます。これらのスピナーを使うために必要なのは、name プロパティに使いたいスピナーの名前を指定することだけです。これらは使うことができるビルトインのインジケータのリストです。

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

ビルトインインジケータは、`color` および `background` オプションをサポートしています。

## カスタムインジケータ

もし独自の特別なインジケータが必要な場合は、String 値もしくは Name キーにインジケータのソースコードを HTML テンプレートへのパスとして設定することができます！その際、すべてのオプションもテンプレートへと渡されます。

ベースが必要な場合は、Nuxt.js のビルトイン[ソースコード](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) を使うこともできます。

<quiz :questions="questions"></quiz>
