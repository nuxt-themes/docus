---
title: 'ディレクトリ構成'
description: 'デフォルトの Nuxt.js のアプリケーション構造は小規模なものから大規模なものまで両方のアプリケーションにとって素晴らしい出発点を提供することを目的としています。アプリケーションは自由に構成でき、必要に応じて他のディレクトリを作成することができます。'
position: 3
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/03_directory_structure?fontsize=14&hidenavigation=1&theme=dark
---

デフォルトの Nuxt.js のアプリケーション構造は小規模なものから大規模なものまで両方のアプリケーションにとって素晴らしい出発点を提供することを目的としています。アプリケーションは自由に構成でき、必要に応じて他のディレクトリを作成することができます。

プロジェクトにまだ存在しないディレクトリとファイルを作成してみましょう。

```bash
mkdir components assets static
touch nuxt.config.js
```

これらは Nuxt.js アプリケーションを構築する際に使用する主なディレクトリとファイルです。それぞれについての説明は後述します。

<base-alert type="info">

これらの名前のディレクトリを作成することで、Nuxt.js プロジェクトの機能を利用できるようになります。

</base-alert>

## ディレクトリ

### pages ディレクトリ

`pages`  ディレクトリにはアプリケーションのビューとルートが含まれています。前の章で学んだように、Nuxt.js はこのディレクトリ内の `.vue` ファイルをすべて読み込み、アプリケーションのルーターを作成します。

<base-alert type="next">

[pages ディレクトリ](/docs/2.x/directory-structure/pages)についてより理解する

</base-alert>

### components ディレクトリ

`components`ディレクトリにはページにインポートするすべての Vue.js のコンポーネントファイルを入れます。

Nuxt.js を使用すると、作成したコンポーネントを .vue ファイルに自動でインポートすることができます。（訳注: nuxt.config.js 内の）components を true に設定すると、Nuxt.js がスキャンして自動でインポートしてくれます。

<base-alert type="next">

[components ディレクトリ](/docs/2.x/directory-structure/components)についてより理解する

</base-alert>

### assets ディレクトリ

`assets`  ディレクトリにはスタイルや画像、フォントなどコンパイルされていないアセットを入れます。

<base-alert type="next">

[assets ディレクトリ](/docs/2.x/directory-structure/assets)についてより理解する

</base-alert>

### static ディレクトリ

`static`  ディレクトリは直接サーバのルートに配置され、名前を保持しなければいけないファイル（例えば `robots.txt`）*もしくは*変更されない可能性の高いファイルが含まれています（例えば、favicon など）。

<base-alert type="next">

[static ディレクトリ](/docs/2.x/directory-structure/static)についてより理解する

</base-alert>

### nuxt.config.js ファイル

`nuxt.config.js`  ファイルは Nuxt.js の設定を行う唯一の場所です。モジュールの追加やデフォルトの設定を上書きしたい場合にここで変更を適用します。

<base-alert type="next">

[nuxt.config.js ファイル](/docs/2.x/directory-structure/nuxt-config)についてより理解する

</base-alert>

### package.json ファイル

`package.json`  ファイルには、アプリケーションのすべての依存関係とスクリプトが含まれています。

## プロジェクト構成についての詳細

[content](/docs/2.x/directory-structure/content)、[layouts](/docs/2.x/directory-structure/layouts)、[middleware](/docs/2.x/directory-structure/middleware)、[modules](/docs/2.x/directory-structure/modules)、[plugins](/docs/2.x/directory-structure/plugins) そして [store](/docs/2.x/directory-structure/store) など、さらに役立つディレクトリやファイルがあります。これらは小規模なアプリケーションには必要ないのでここでは説明しません。

<base-alert type="next">

すべてのディレクトリについての詳細は[ディレクトリ構造のドキュメント](/docs/2.x/directory-structure/nuxt)を参照してください。

</base-alert>
