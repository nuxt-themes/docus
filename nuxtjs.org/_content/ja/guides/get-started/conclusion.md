---
title: 'おわりに'
description: 'おめでとうございます！最初の Nuxt.js アプリケーションを作成し、これで Nuxter になったと思うかもしれません。しかし、Nuxt.js で学ぶことやできることはまだまだたくさんあります。いくつかおすすめのページを紹介します'
position: 5
category: get-started
questions:
  - question: 'Nuxt.js を動かすために必要なディレクトリ名は？'
    answers:
      - nuxt
      - pages
      - index
    correctAnswer: pages
  - question: 'プロジェクト ID のファイル名は？'
    answers:
      - package.vue
      - package.json
      - package.js
    correctAnswer: package.json
  - question: 'Nuxt.js プロジェクトを起動するためにターミナルに入力するコマンドは？'
    answers:
      - npm dev
      - npm run dev
      - nuxt dev
    correctAnswer: npm run dev
  - question: '開発モードで表示するページのブラウザ上のアドレスは？'
    answers:
      - http://localhost:3000/
      - http://localhost:3000/project-name:3000
      - http://localhost:3000/nuxt:3000/
    correctAnswer: http://localhost:3000/
  - question: '設定を行うファイルは？'
    answers:
      - nuxt.config.json
      - config.js
      - nuxt.config.js
    correctAnswer: nuxt.config.js
  - question: '`.vue` ファイルに適していないディレクトリは？'
    answers:
      - pages
      - static
      - components
    correctAnswer: static
  - question: 'どのディレクトリにスタイルを配置しますか？'
    answers:
      - styles
      - components
      - assets
    correctAnswer: assets
  - question: 'どのディレクトリに robots.txt や favicon を配置しますか？'
    answers:
      - assets
      - components
      - static
    correctAnswer: static
  - question: 'ページ間の移動にはどのコンポーネントを使いますか？'
    answers:
      - '<Nuxt>'
      - '<RouterLink>'
      - '<NuxtLink>'
    correctAnswer: '<NuxtLink>'
  - question: '`<NuxtLink>` は Nuxt.js アプリケーションに属する内部リンクに使われますか？'
    answers:
      - True
      - False
    correctAnswer: True
---

おめでとうございます！最初の Nuxt.js アプリケーションを作成し、これで Nuxter になったと思うかもしれません。しかし、Nuxt.js で学ぶことやできることはまだまだたくさんあります。いくつかおすすめのページを紹介します:

<base-alert type="next">

[Concepts book](../concepts/views) を確認

</base-alert>

<base-alert type="next">

[asyncData](/docs/2.x/features/data-fetching#async-data) の操作

</base-alert>

<base-alert type="next">

異なる[レンダリングモード](/docs/2.x/features/rendering-modes)の選択

</base-alert>

<base-alert type="star">

Nuxt.js は気に入りましたか？ GitHub で[私たちのプロジェクトにスターをつける](https://github.com/nuxt/nuxt.js)ことを忘れないでください。

</base-alert>

<quiz :questions="questions"></quiz>
