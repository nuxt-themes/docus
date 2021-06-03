---
title: GitHub Pages へデプロイするには？
description: GitHub Pages へデプロイするには？
menu: Deploy on Github
category: deployment
position: 205
---

Nuxt.js を使うと、例えば [GitHub Pages](https://pages.github.com/) のような静的ホスティングサービスで、ウェブアプリケーションをホストすることが可能です。

GitHub Pages へデプロイするには、静的なウェブアプリケーションを生成する必要があります:

```bash
npm run generate
```

GitHub Pages のホスティングにデプロイするもの全てが入った `dist` フォルダが作成されます。プロジェクトリポジトリであれば `gh-pages` ブランチ、ユーザーや組織のサイトであれば `master` ブランチにデプロイしてください 。

<div class="Alert Alert--nuxt-green">

<b>情報:</b> GitHub Pages にカスタムドメインを利用し `CNAME` ファイルを置くのであれば、CNAME ファイルは `static` ディレクトリに置くことをお勧めします。 より詳しい情報は[こちら](/docs/2.x/directory-structure/static)を参照してください。

</div>

## リポジトリに GitHub Pages をデプロイする

ある特定のリポジトリに GitHub Pages を作成しており、カスタムドメインをお持ちでない場合、ページの URL はこの形式になります: `https://<username>.github.io/<repository-name>`。

もし、[router プロパティの base](/docs/2.x/configuration-glossary/configuration-router#base) を追加せずに `dist` フォルダをデプロイし、デプロイしたサイトにアクセスした場合、アセットが見つからないため、サイトが機能していないことが分かるはずです。 これは、ウェブサイトのルートが `/` となることを想定したためです。しかし実際には、GitHub Pages にデプロイした場合、`/<repository-name>` となります。

この問題を解決するためには、`nuxt.config.js` に [router base](/docs/2.x/configuration-glossary/configuration-router#base) の設定を追加する必要があります:

```js
export default {
  router: {
    base: '/<repository-name>/'
  }
}
```

こうすると、生成されたすべてのパスアセットに `/<repository-name>/` という接頭辞が付けられるため、次に GitHub ページリポジトリにコードをデプロイした時には、サイトは正常に動作するはずです。

しかし、`router.base` を `nuxt.config.js` 内でデフォルトで設定することには問題もあります。ベースパスが変更されているため、`npm run dev` が上手く動作しないのです。この問題を解決するには、次のように `router.base` に `<repository-name>` を含めるかどうかを判定する条件式を追加します。

```js
/* nuxt.config.js */
// `DEPLOY_ENV` が `GH_PAGES` の場合のみ `router.base = '/<repository-name>/'` を追加する
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/<repository-name>/'
        }
      }
    : {}

export default {
  ...routerBase
}
```

設定を変更したので、GitHub Pages 用のサイトをビルドするためには、`DEPLOY_ENV='GH_PAGES'` と設定する必要があります:

```js
/* package.json */
"scripts": {
  "build:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt generate"
},
```

Windows ユーザーの場合、 `bash` を使用していなければ、[cross-env](https://github.com/kentcdodds/cross-env) をインストールするといいかもしれません。

```sh
npm install cross-env --save-dev
```

そして、このように使用します:

```js
  "build:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt generate"
```

## コマンドラインでデプロイする

[push-dir package](https://github.com/L33T-KR3W/push-dir) を使うこともできます:

まず npm でインストールしてください:

```bash
npm install push-dir --save-dev
```

`deploy` コマンドを package.json に追加してください。ブランチは、プロジェクトリポジトリならば `gh-pages` ブランチ、ユーザーまたは組織サイトならば `master` ブランチを指定してください。

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate",
  "deploy": "push-dir --dir=dist --branch=gh-pages --cleanup"
},
```

それから静的なアプリケーションを生成し、デプロイしてください:

```bash
npm run generate
npm run deploy
```

## サーバーでのデプロイビルド

デプロイをさらに一歩進めることもできます。ローカルで手動でファイルをコンパイルしてデプロイする代わりに、ビルドサーバーを利用して GitHub リポジトリの新しいコミットを監視させ、自動的にチェックアウト・コンパイル・デプロイを行ってもらうのです。

ビルドサーバーを設定する前に、あなたの代わりにタスクを実行してもらうために [GitHub personal access token を生成する](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token) 必要があります。トークンを生成したら、すぐ後で使うので安全な場所にメモしておいてください。

### Travis CI

オープンソースプロジェクトには無料で使えるビルドサーバーの [Travis CI](https://travis-ci.org/) を利用してデプロイするには、まず GitHub アカウントでサインインし、Travis にリポジトリの読み取り権限を与え、そして表示されたリストのリポジトリ名の横にあるスイッチをクリックして、リポジトリに対してビルドサーバーを有効にしてください。

![Travis Builder Server Enable](/github_pages_travis_01.png)

次に、リポジトリ名の横にある歯車のアイコンをクリックし、ビルドサーバーの一般的な設定を行い、'Build only if .travis.yml is present' 機能を有効にするスイッチを押します。

![Travis Builder Server Settings](/github_pages_travis_02.png)

同じ画面を下にスクロールして Environment Variables（環境変数）セクションを表示させたら、`GITHUB_ACCESS_TOKEN` という名前の新しい変数を作成し、値のフィールドにさきほど生成したおいた GitHub personal access token を入力し、'Add'（追加）ボタンをクリックします。

![Travis Builder Server Environment Variables](/github_pages_travis_03.png)

最後に、以下の内容の `.travis.yml` 設定ファイルをリポジトリのルートに作成します。

```yaml
language: node_js
node_js:
  - '12'

cache:
  directories:
    - 'node_modules'

branches:
  only:
    - master

install:
  - npm install
  - npm run generate

script:
  - echo "Skipping tests"

deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_ACCESS_TOKEN # セキュアとマークされたアクセストークンを travis-ci.org のダッシュボードに設定してください。https://docs.travis-ci.com/user/deployment/pages/#Setting-the-GitHub-token
  target-branch: gh-pages
  local-dir: dist
  on:
    branch: master
```

そしてリポジトリにこれをコミットしてください。

```bash
git add .travis.yml
git commit -m "Adding travis deploy configuration"
git push origin
```

これで、リポジトリに変更を加えるたびに、Travis 内から新しいビルドが開始されるようになりました。

![Travis Builder Server Output](/github_pages_travis_04.png)

ビルドが完了したら、GitHub pages のサイトが自動的に更新されていることが確認できるはずです。

### Appveyor

もう 1 つのオープンソースプロジェクトのビルドサーバーである [Appveyor](https://www.appveyor.com) でデプロイするには、GitHub の認証を使用して、自分の GitHub アカウントを使って新しいアカウントを作成します。

サインインしたら、'New project'（新規プロジェクト）のリンクをクリックして、表示されたリスト中のリポジトリ名の横にある 'Add'（追加）ボタンを押して、リポジトリに対してビルドサーバーを有効にします。

![Appveyor Builder Server Enable](/github_pages_appveyor_01.png)

次に、リポジトリのルートに以下の内容で `appveyor.yml` 設定ファイルを作成してください。

```yaml
environment:
  # Nuxt には最低でも node v12 が必要
  nodejs_version: '12'
  # 暗号化したセンシティブなデータ (https://ci.appveyor.com/tools/encrypt)
  github_access_token:
    secure: ENCRYPTED_GITHUB_ACCESS_TOKEN
  github_email:
    secure: ENCRYPTED_GITHUB_EMAIL

# master ブランチのみで実行する
branches:
  only:
    - master

# スクリプトをインストール (リポジトリのクローン後に実行する)
install:
  # nodejs のバージョンを変更
  - ps: Install-Product node $env:nodejs_version
  # モジュールのインストール
  - npm install
  # 静的ファイルの生成
  - npm run generate
  # グローバルな git credentials store を設定 (https://www.appveyor.com/docs/how-to/git-push/)
  - git config --global credential.helper store
  - ps: Add-Content "$env:USERPROFILE\.git-credentials" "https://$($env:github_access_token):x-oauth-basic@github.com`n"
  - git config --global user.email $env:github_email
  # GitHub pages へデプロイ
  - npm run deploy

# テストをスキップ
test: off

# 実際のビルドを行わない
build: off
```

**_メモ_** この設定ファイルでは、`package.json` ファイル内に [コマンドラインでデプロイする](#command-line-deployment) のコマンドがあらかじめ設定されているをことを想定しています。

このファイルをコミットする前に、先ほどメモしておいた GitHub personal access token と GitHub アカウントのメールアドレスを [Appveyor encryption tool](https://ci.appveyor.com/tools/encrypt) を使用して暗号化し、それら暗号化した値を `ENCRYPTED_GITHUB_ACCESS_TOKEN` と `ENCRYPTED_GITHUB_EMAIL` の両変数に設定しておく必要があります。

設定を変更したら、ファイルをリポジトリにコミットします。

```bash
git add appveyor.yml
git commit -m "Adding appveyor deploy configuration"
git push origin
```

これで、リポジトリに変更を加えるたびに、Appveyor 内から新しいビルドが開始されるようになりました。

![Appveyor Builder Server Output](/github_pages_appveyor_02.png)

ビルドが完了したら、GitHub pages のサイトが自動的に更新されていることが確認できるはずです。
