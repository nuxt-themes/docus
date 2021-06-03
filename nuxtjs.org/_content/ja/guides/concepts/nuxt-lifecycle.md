---
title: Nuxt ライフサイクル
description: 'どのツールをう場合でも、ツールが内部でどのように機能するかを理解すると常に自信が持てるようになります。同じことが Nuxt.js にも当てはまります。'
position: 5
category: concepts
img: /docs/2.x/nuxt-lifecycle.svg
imgAlt: understanding-nuxt-2-12-lifecycle-hooks
questions:
  - question: Nuxt.js ライフサイクルはいつ開始しますか？
    answers:
      - レスポンスがクライアントに送信された時
      - ビルドフェーズの後
      - nuxt dev を実行した時
    correctAnswer: ビルドフェーズの後
  - question: ライフサイクルの内容はどの主要因に依存しますか？
    answers:
      - サーバーを起動した際の日時
      - サーバーサイドレンダリングの有効化と使われているサーバーサイドレンダリングのタイプ
      - Nuxt.js アプリケーションが実行されている OS の種類
    correctAnswer: サーバーサイドレンダリングの有効化と使われているサーバーサイドレンダリングのタイプ
  - question: nuxtServerInit はいつ呼ばれますか？
    answers:
      - サーバーサイドとクライアントサイド
      - Vue ハイドレーションの後
      - サーバーサイドのみ
    correctAnswer: サーバーサイドのみ
  - question: ミドルウェアの 3 つのタイプは何ですか？
    answers:
      - グローバル、レイアウト、ルート
      - グローバル、レイアウト、ページ
      - グローバル、グループ、ルート
    correctAnswer: グローバル、レイアウト、ルート
  - question: クライアントサイドでのみ発生する可能性のあるステップは何ですか？
    answers:
      - Vue ハイドレーション
      - ミドルウェアの実行
      - fetch 関数の呼び出し
    correctAnswer: Vue ハイドレーション
  - question: クライアントサイドでは発生しないステップはどれですか？
    answers:
      - asyncData の実行
      - サーバーミドルウェアの実行
      - fetch の実行
    correctAnswer: サーバーミドルウェアの実行
  - question: サーバーサイドとクライアントサイド両方で呼び出される Vue メソッドは何ですか？
    answers:
      - mounted と beforeMount
      - beforeDestroy と destroyed
      - created と beforeCreate
    correctAnswer: created と beforeCreate
  - question: '`<NuxtLink>` を介して遷移した後、発生しないステップはどれですか？'
    answers:
      - fetch の呼び出し
      - クライアントサイドの Nuxt.js プラグインの実行
      - beforeCreate の呼び出し
    correctAnswer: クライアントサイドの Nuxt.js プラグインの実行
  - question: '`<NuxtLink>` を介して遷移した後、 asyncData と fetch で特別な違いは何ですか？'
    answers:
      - asyncData は fetch より速い
      - asyncData は fetch の後に呼ばれる
      - fetch はブロッキングされていないのに asyncData はブロッキングされている
    correctAnswer: fetch はブロッキングされていないのに asyncData はブロッキングされている
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

どのツールを使う場合でも、ツールが内部でどのように機能するかを理解すると常に自信が持てるようになります。同じことが Nuxt.js にも当てはまります。この章の目的は、フレームワークのさまざまな部分とそれらの実行順序、およびどのように連携するかについての概要を説明することです。

Nuxt.js ライフサイクルはアプリケーションがバンドルされ、チャンク化され、縮小されるビルドフェーズの後に何が起こるかを説明します。このフェーズの後に何が起こるかは、サーバーサイドのレンダリングが有効になっているかどうかによって異なります。有効になっている場合は、選択したサーバーサイドレンダリングのタイプによってさらに異なります:

動的な SSR（`nuxt start`）

または静的サイト生成（`nuxt generate`）。

## ライフサイクル

### サーバー

SSR の場合、これらのステップはアプリケーションへの最初のリクエストごとに実行されます。

- サーバーを起動します（`nuxt start`）

静的サイトの生成を行う場合、サーバーステップはビルド時にのみ実行されますが、生成されるページごとに 1 回実行されます。

- 生成処理を開始します（`nuxt generate`）

- Nuxt フック
- サーバーミドルウェア
- サーバーサイドの Nuxt プラグイン
  - nuxt.config.js で定義されている順序
- nuxtServerInit
  - ストアに事前にデータを詰めるためにサーバーサイドでのみ呼び出される Vuex アクション
  - 第 1 引数は **Vuex context**、第 2 引数は **Nuxt.js context** です
    - ここから他のアクションをディスパッチします → サーバーサイドの後続ストアアクションの「エントリポイント」のみです
  - `store/index.js` でのみ定義できます
- ミドルウェア
  - グローバルミドルウェア
  - レイアウトミドルウェア
  - ルートミドルウェア
- asyncData
- beforeCreate（Vue ライフサイクルメソッド）
- created（Vue ライフサイクルメソッド）
- あたらしい fetch（上から下、ノード = 並列）
- 状態のシリアライズ（`render:routeContext` Nuxt.js フック）

- HTML レンダリングの開始（`render:route` Nuxt.js フック）

- `render:routeDone`（HTML がブラウザに送信された際のフック）

- `generate:before` Nuxt.js フック
- HTML ファイルの生成
  - **完全な静的生成**
    - 例えば静的ペイロードが抽出された場合
  - `generate:page`（HTML が編集可能）
  - `generate:routeCreated`（ルートが生成されます）
- `generate:done`（すべての HTML ファイルが生成された際）

### クライアント

ライフサイクルのこの部分は選択した Nuxt.js モードに関係なくブラウザーで完全に実行されます。

- HTML を受け取り
- アセットのロード（例えば JavaScript）
- Vue ハイドレーション
- ミドルウェア
  - グローバルミドルウェア
  - レイアウトミドルウェア
  - ルートミドルウェア
- クライアントサイドの Nuxt.js プラグイン
  - nuxt.config.js で定義されている順序
- asyncData（ブロッキング）
- beforeCreate（Vue ライフサイクルメソッド）
- created（Vue ライフサイクルメソッド）
- あたらしい fetch（上から下、ノード = 並列）（ノンブロッキング）
- beforeMount（Vue ライフサイクルメソッド）
- mounted（Vue ライフサイクルメソッド）

### NuxtLink コンポーネントを使って遷移する

*クライアント*の章と同様に `<NuxtLink>` を介して遷移する場合だけすべてのステップがブラウザで発生します。さらにすべての*ブロッキング*タスクが実行されるまでページコンテントは表示されません。

<base-alert type="info">

[`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) のドキュメントで詳細を確認してください。

</base-alert>

- ミドルウェア（ブロッキング）
  - グローバルミドルウェア
  - レイアウトミドルウェア
  - ルートミドルウェア
- asyncData（ブロッキング）
- asyncData（ブロッキングまたは完全静的なペイロードをロードします）
- beforeCreate & created（Vue ライフサイクルメソッド）
- fetch（ノンブロッキング）
- beforeMount & mounted

### このあとは

<base-alert type="next">

[レンダリングモードのドキュメント](/docs/2.x/features/rendering-modes)を参照してください。

</base-alert>

<quiz :questions="questions"></quiz>
