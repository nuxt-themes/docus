---
title: 'コマンドと開発'
description: 'Nuxt.js は開発と運用両方に役立つ一連のコマンドを用意しています。'
position: 4
category: get-started
---

Nuxt.js は開発と運用両方に役立つ一連のコマンドを用意しています。

## package.json を使う

これらのコマンドは `package.json` に記述する必要があります:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

次に `yarn <command>` または `npm run <command>` を介してコマンドを起動できます（例: `yarn dev` / `npm run dev`）。

## 開発環境

`http://localhost:3000` で [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) のついた開発モードで Nuxt を起動するには:

<code-group>

  <code-block label="Yarn" active>

```bash
yarn dev
```

  </code-block>

  <code-block label="npm">

```bash
npm run dev
```

  </code-block>
</code-group>

## コマンド一覧

[ターゲット](/docs/2.x/features/deployment-targets)に応じて異なるコマンドを実行できます:

### target: `server`（デフォルト値）

- **nuxt dev** - 開発サーバーを起動します。
- **nuxt build** - 本番用の webpack を使用してアプリケーションをビルドおよび最適化します。
- **nuxt start** -（`nuxt build` を実行した後に）本番サーバーを起動します。Heroku や Digital Ocean などの Node.js ホスティングに使用します。

### target: `static`

- **nuxt dev** - 開発サーバーを起動します。
- **nuxt generate** -（必要に応じて）アプリケーションをビルドし、すべてのルートを HTML ファイルとして生成し、`dist/` ディレクトリに静的にエクスポートします（静的ホスティングに使用されます）。
- **nuxt start** - 静的ホスティング（Netlify、Vercel、Surge など）と同じように `dist/` ディレクトリを提供します。デプロイ前のテストに最適です。

## Webpack の設定を検査

[vue inspect](https://cli.vuejs.org/guide/webpack.html#inspecting-the-project-s-webpack-config) のように、nuxt がプロジェクトをビルドする際に使用する webpack の設定を検査することができます。

- **nuxt webpack [query...]**

**引数:**

- `--name`: 検査するバンドル名。（client、server、modern）
- `--dev`: 開発用の webpack の設定を検査します。
- `--depth`: 出力する深さ。冗長に出力されないように、デフォルトでは 2 が設定されています。
- `--no-colors`: ANSI カラーを無効にします。（TTY が使用できない場合、またはファイルへパイプしている場合は、デフォルトで無効になります）

**例:**

- `nuxt webpack`
- `nuxt webpack devtool`
- `nuxt webpack resolve alias`
- `nuxt webpack module rules`
- `nuxt webpack module rules test=.jsx`
- `nuxt webpack module rules test=.pug oneOf use.0=raw`
- `nuxt webpack plugins constructor.name=WebpackBar options reporter`
- `nuxt webpack module rules loader=vue-`
- `nuxt webpack module rules "loader=.*-loader"`

## プロダクション開発

Nuxt.js では、サーバーデプロイと静的デプロイのどちらかを選択することができます。

### サーバー開発

SSR アプリケーションをデプロイするためにデフォルト値である `target: 'server'` を使います。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn build
```

  </code-block>
  <code-block label="npm">

```bash
npm run build
```

  </code-block>
</code-group>

Nuxt.js はすべてのものが含まれる `.nuxt` ディレクトリを作成するので、ホスティングしているサーバーにデプロイする準備ができています。

<base-alert type="info">

`.npmignore` または `.gitignore` に `.nuxt` を入れることをおすすめします。

</base-alert>

一度アプリケーションがビルドされると、`start` コマンドを使ってアプリケーションの本番バージョンを確認することができます。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn start
```

  </code-block>
  <code-block label="npm">

```bash
npm run start
```

  </code-block>
</code-group>

### 静的デプロイ（プリレンダリング）

Nuxt.js を使うと、どんな静的なホスティング上でもウェブアプリケーションをホストすることができます。

静的に生成されたサイトをデプロイするには、`nuxt.config.js` に `target：static` を指定していることを確認してください（Nuxt v2.13 以上）:

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

<code-group>
  <code-block label="Yarn" active>

```bash
yarn generate
```

  </code-block>
  <code-block label="npm">

```bash
npm run generate
```

  </code-block>
</code-group>

Nuxt.js はすべてのものが含まれる `dist/` ディレクトリを作成するので、静的なホスティングサービスにデプロイする準備ができています。

Nuxt v2.13 ではリンクタグをクロールするクローラーがインストールされているので、`nuxt generate` コマンドを使う際それらのリンクに基づいてルートを生成します。

<base-alert>

**警告:** Nuxt v2.12 以下を使う場合、動的ルートは `generate` コマンドによって無視されます: [generate プロパティのドキュメント](/docs/2.x/configuration-glossary/configuration-generate)

</base-alert>

<base-alert type="info">

`nuxt generate` を使ってウェブアプリケーションを生成する場合、[asyncData](/docs/2.x/features/data-fetching#async-data) と [fetch](/docs/2.x/features/data-fetching#fetch-フック) に与えられる [context](/docs/2.x/internals-glossary/context) は `req` と `res` を持ちません。

</base-alert>

#### **エラー時の失敗（Fail on Error）**

ページエラーが発生した際にゼロ以外のステータスコードを返し、CI/CD のデプロイまたはビルドに失敗するようにするには `--fail-on-error` 引数を使えます。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn generate --fail-on-error
```

  </code-block>
  <code-block label="npm">

```bash
npm run generate --fail-on-error
```

  </code-block>

</code-group>

## このあとは

<base-alert type="next">

[FAQ](/docs/2.x/deployment/deploying-to-21yunbox) で人気のホストへのデプロイ例を参照してください。

</base-alert>

</div>
