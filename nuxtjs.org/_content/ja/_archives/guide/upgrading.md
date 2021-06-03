---
title: アップグレード
description: 'Nuxt.js のアップグレードは即座にできますが、package.json をアップグレードするよりも複雑です。'
category: prologue
position: 4
---

> Nuxt.js のアップグレードは即座にできますが、package.json をアップグレードするよりも複雑です。

## はじめる

1. アップグレードしたいバージョンの[リリースノート](/guide/release-notes)を確認し、その特定のリリースに関する追加の手順があるかどうかを確認します。
2. `package.json` ファイルの `nuxt` パッケージに指定されたバージョンを更新します。

このステップの後、Yarn または npm のどちらを使用しているかによって手順が異なります。_[Yarn](https://yarnpkg.com/ja/docs/usage) はテストが書かれている開発ツールなので、Nuxt を扱う上で推奨するパッケージマネージャーです。_

## Yarn

3. `yarn.lock` ファイルを削除します
4. `node_modules` ディレクトリを削除します
5. `yarn` コマンドを実行します
6. インストールが完了し、テストを実行した後は、他の依存関係のアップグレードも検討してください。`yarn outdated` コマンドが使用できます。

## npm

3. `package-lock.json` ファイルを削除します
4. `node_modules` ディレクトリを削除します
5. `npm install` コマンドを実行します
6. インストールが完了し、テストを実行した後は、他の依存関係のアップグレードも検討してください。`npm outdated` コマンドが使用できます。
