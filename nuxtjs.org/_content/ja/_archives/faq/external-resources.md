---
title: 外部リソースを使うには？
description: Nuxt.js で外部リソースを使うには？
category: configuration
position: 1
---

## グローバルな設定

head オブジェクトもしくは関数の中に、外部のリソースを含めることができます。 [head API docs](https://ja.nuxtjs.org/api/pages-head/) で説明されているように、次の例では `head` をオブジェクトと関数として使用します。 computed プロパティもしくは data プロパティのような Vue コンポーネントから値を使用したい場合、`head()` メソッドを使用して、最終的な head オブジェクトを返すこともできます。各リソースはオプションの `body: true` を渡すと、`</body>` の終了タグの前にリソースを含めることもできます。

`nuxt.config.js` 内でリソースをインクルードします（この例では head オブジェクト）:

```js
export default {
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  }
}
```

## ローカルな設定

`pages/` ディレクトリの `.vue` ファイル内でリソースをインクルードします（この例では head メソッド）:

```html
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
  export default {
    head() {
      return {
        script: [
          {
            src:
              'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: Roboto, sans-serif;
  }
</style>
```
