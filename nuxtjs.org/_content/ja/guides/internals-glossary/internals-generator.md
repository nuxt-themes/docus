---
title: 'Generator クラス'
description: Nuxt の Generator クラス
menu: Generator
category: internals-glossary
position: 8
---

- ソース: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## フック

`generate:` フック:

| フック | 引数 | タイミング |
| --- | --- | --- |
| `generate:before` | (generator, generateOptions) | 生成前のフック |
| `generate:distRemoved` | (generator) | ビルド先のフォルダが削除されるときのフック |
| `generate:distCopied` | (generator) | 静的ファイルとビルドされたファイルがコピーされるときのフック |
| `generate:route` | ({ route, setPayload }) | ページ生成前のフック。動的ペイロードに便利です。[#7422](https://github.com/nuxt/nuxt.js/pull/7422) を参照してください。Nuxt v2.13 以上で利用可能 |
| `generate:page` | ({ route, path, html }) | ユーザーが生成後のパスと HTML を更新するときのフック |
| `generate:routeCreated` | ({ route, path, errors }) | 生成されたページの保存に成功したときのフック |
| `generate:extendRoutes` | (routes) | ユーザーが生成するルートを更新をするときのフック |
| `generate:routeFailed` | ({ route, errors }) | 生成されたページの保存に失敗したときのフック |
| `generate:done` | (generator, errors) | 生成完了時のフック |
