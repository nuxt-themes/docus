---
title: 'ModuleContainer クラス'
description: Nuxt の ModuleContainer クラス
menu: Module Container
category: internals-glossary
position: 6
---

- ソース: **[core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)**

すべての[モジュール](/docs/2.x/directory-structure/modules)は `ModuleContainer` インスタンスのコンテキストの中で呼ばれます。

## Tapable プラグイン

特定のライフサイクルイベントでフックを登録できます。

```js
nuxt.moduleContainer.plugin('ready', async moduleContainer => {
  // すべてのモジュールの準備ができたらこの処理を実行します
})
```

[モジュール](/docs/2.x/directory-structure/modules)コンテキストの中では代わりに以下のようにできます:

```js
this.plugin('ready', async moduleContainer => {
  // すべてのモジュールの準備ができたらこの処理を実行します
})
```

| プラグイン | 引数            | タイミング                                                  |
| ---------- | --------------- | ----------------------------------------------------------- |
| `ready`    | moduleContainer | `nuxt.config.js` にあるすべてのモジュールが初期化されたとき |

## メソッド

### addVendor（vendor）

**`vendor` は使われていないので非推奨です**

`options.build.vendor` に追加し、一意なフィルターを適用します。

### addTemplate（template）

- **template**: `String` または `Object`
  - `src`
  - `options`
  - `fileName`

プロジェクトの `buildDir`（`.nuxt`）へビルド中に、[lodash template](https://lodash.com/docs/4.17.4#template) を使って与えられたテンプレートをレンダリングします。

`fileName` を与えないか `template` が文字列の場合、ターゲットのファイル名はデフォルトで `[dirName].[fileName].[pathHash].[ext]` になります。

このメソッドは最終的な `{ dst, src, options }` オブジェクトを返します。

### addPlugin（template）

- **template**: オブジェクトプロパティ（`src`、`options`、`fileName`、`mode`）。

`addTemplate` を使ってプラグインを登録し、`plugins[]` 配列の先頭に追加します。

```js
this.addPlugin({
  src: path.resolve(__dirname, 'templates/foo.js'),
  fileName: 'foo.server.js' // [optional] はサーバーバンドルにのみ含まれます
  options: moduleOptions
})
```

**注意:** プラグインをクライアントサイドまたはサーバーサイドでのみ使う場合は `mode` または `.client` と `.server` 修飾子を `fileName` オプションと共に使えます（利用可能なオプションについては [plugins](/docs/2.x/directory-structure/plugins#name-conventional-plugin) を参照してください）。

`fileName` を指定する場合、`fileName` にカスタムパスを設定できます。名前の衝突を防ぐため `.nuxt` フォルダ内のフォルダ構成を選択できます:

```js
{
  fileName: path.join('folder', 'foo.client.js'), // 結果は `.nuxt/folder/foo.client.js` になります
}
```

### addServerMiddleware（middleware）

[options.serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware) にミドルウェアをプッシュします。

### extendBuild（fn）

[options.build.extend](/docs/2.x/configuration-glossary/configuration-build#extend) 関数をつなげることで webpack のビルド設定を簡単に拡張できます。

### extendRoutes（fn）

[options.build.extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes) 関数をつなげることでルートを簡単に拡張できます。

### addModule（moduleOpts, requireOnce）

_非同期関数_

モジュールを登録します。`moduleOpts`は文字列または配列（`[src, options]`）です。`requireOnce` が `true` で解決されたモジュールが `meta` をエクスポートしている場合に、同じモジュールが二度登録されるのを回避します。

### requireModule（moduleOpts）

_非同期関数_

`addModule(moduleOpts, true)` の短縮形です。

## フック

特定のライフサイクルイベントでフックを登録できます。

| フック           | 引数                       | タイミング                                                                                     |
| ---------------- | -------------------------- | ---------------------------------------------------------------------------------------------- |
| `modules:before` | (moduleContainer, options) | ModuleContainer クラスが作られる前に呼ばれ、メソッドとオプションのオーバーロードに役立ちます。 |
| `modules:done`   | (moduleContainer)          | すべてのモジュールがロードされたときに呼ばれます。                                             |
