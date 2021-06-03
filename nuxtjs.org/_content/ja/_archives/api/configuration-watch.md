---
title: 'API: watch プロパティ'
description: watch プロパティはサーバーの再起動のためにカスタムファイルを監視してくれます。
menu: watch
category: configuration
position: 133
---

- 型: `Object`
- デフォルト: `[]`

> watch プロパティはサーバーの再起動のためにカスタムファイルを監視してくれます。

```js
watch: ['~/custom/*.js']
```

[chokidar](https://github.com/paulmillr/chokidar) はウォッチャを設定するために使用されます。より chokidar のパターンオプションについて知りたければ、[chokidar API](https://github.com/paulmillr/chokidar#api) を参照してください。
