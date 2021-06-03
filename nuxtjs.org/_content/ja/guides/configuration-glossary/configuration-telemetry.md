---
title: 'telemetry プロパティ'
description: 'Nuxt.js は一般的な使用状況に関する匿名のテレメトリデータを収集します。これによりすべてのユーザーの Nuxt 機能の使用状況やカスタマイズ状況を正確に把握できます。'
menu: telemetry
category: configuration-glossary
position: 30
---

## telemetry プロパティ

> 一般的な使用状況に関する匿名のテレメトリデータを収集するために Nuxt Telemetry が Nuxt v2.13.0 で導入されました。これによりすべてのユーザーの Nuxt 機能の使用状況やカスタマイズ状況を正確に把握できます。

- 型: `Boolean`
- デフォルト値はユーザーの設定に基づきます

## なぜテレメトリデータを集めるのか

Nuxt.js は[初期リリース](https://github.com/nuxt/nuxt.js/releases/tag/v0.2.0)（2016/11/7）から大きく成長しており、改善のため[コミュニティのフィードバック](https://github.com/nuxt/nuxt.js/issues)に耳を傾けています。

しかしこの手動プロセスでは、記入に時間のかかる issue テンプレートからユーザーのサブセットによるフィードバックを収集するだけであり、人によってニーズやユースケースが異なる場合があります。

Nuxt Telemetry は**一般的な使用状況に関する匿名のテレメトリデータ**を収集します。これはすべてのユーザーの機能の使用状況やカスタマイズ状況を正確に把握することに役立ちます。このデータは Nuxt.js が世界的にどのように使われているかや改善点（DX とパフォーマンス）とその関連性を測定し、よりよく理解することに役立ちます。

複数のイベントを収集します:

- コマンドの呼び出し（nuxt dev、nuxt build など）
- Nuxt.js と Node.js のバージョン
- 一般的なマシン情報（MacOS/Linux/Windows や CI 内で実行されるコマンド、ci 名）
- Webpack のビルド時間とアプリケーションの平均サイズ、および生成統計（nuxt generate 使用時）
- プロジェクトのパブリックな依存関係は何か（Nuxt モジュール）

コードはオープンソースであり https://github.com/nuxt/telemetry で入手できます。

## オプトアウト

[Nuxt Telemetry](https://github.com/nuxt/telemetry) を無効化する方法はいくつかあります:

1. `npx nuxt telemetry disable` を使う

```bash
npx nuxt telemetry [status|enable|disable] [-g,--global] [dir]
```

2. 環境変数を使う

```bash
NUXT_TELEMETRY_DISABLED=1
```

3. `nuxt.config.js` で `telemetry: false` を設定する:

```js{}[nuxt.config.js]
export default {
  telemetry: false
}
```

Nuxt Telemetry と送信されるイベントの詳細は[こちら](https://github.com/nuxt/telemetry)を参照してください。
