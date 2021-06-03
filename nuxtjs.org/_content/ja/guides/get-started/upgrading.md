---
title: アップグレード
description: 'Nuxt.js のアップグレードは一瞬ですが、package.json のアップデートより複雑です'
position: 6
category: get-started
---

> Nuxt.js のアップグレードは一瞬ですが、package.json のアップデートより複雑です

Nuxt v2.14 にアップグレードしてスタティックホスティングを使用したい場合、generate コマンドを正しく動作させるために nuxt.config.js ファイルに [target:static](/docs/2.x/features/deployment-targets#static-hosting) を追加する必要があります。

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

## はじめに

1. アップグレードしたいバージョンの[リリースノート](/docs/release-notes)を確認し、そのリリースで追加の説明がないか確認してください。
2. `package.json` ファイルの `nuxt` パッケージに指定したバージョンを更新します。

このステップの後の手順は Yarn を使っているか npm を使っているかによって異なります。 _[Yarn](https://yarnpkg.com/ja/docs/usage) はテストが書かれている開発ツールなので、Nuxt を使うのに適したパッケージマネージャです。_

## Yarn

3. `yarn.lock` ファイルを削除します
4. `node_modules` ディレクトリを削除します
5. `yarn` コマンドを実行します
6. インストールが完了しテストをしたら他の依存関係のアップグレードも検討してください。`yarn outdated` コマンドが使えます。

## npm

3. `package-lock.json` ファイルを削除します
4. `node_modules` ディレクトリを削除します
5. `npm install` コマンドを実行します
6. インストールが完了しテストをしたら他の依存関係のアップグレードも検討してください。`npm outdated` コマンドが使えます。
