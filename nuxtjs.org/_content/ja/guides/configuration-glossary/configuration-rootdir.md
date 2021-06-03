---
title: 'rootDir プロパティ'
description: 'Nuxt.js アプリケーションのワークスペースを指定します'
menu: rootDir
category: configuration-glossary
position: 23
---

- 型: `String`
- デフォルト: `process.cwd()`

> Nuxt.js アプリケーションのワークスペースを指定します。

nuxt commands（nuxt start、nuxt build など）に引数が渡された場合、このプロパティは上書きされます。例えば `nuxt ./my-app/` を実行すると `rootDir` はカレント/ワーキングディレクトリである `./my-app/` の絶対パスが設定されます。

[Nuxt.js をプログラムで使用](/docs/2.x/internals-glossary/nuxt)しない限り、このオプションを指定する必要はありません。

<base-alert type="info">

<a href="https://nodejs.org/api/modules.html#modules_all_together">依存関係を解決</a>するためには、`node_modules` ディレクトリを含むパッケージルートと `rootDir` が同じディレクトリツリー内にある必要があります。そうでない場合のディレクトリ構造の例については、[`srcDir` オプション](/docs/2.x/configuration-glossary/configuration-srcdir)を参照してください。

</base-alert>
