---
title: 'watch プロパティ'
description: 'watch プロパティはサーバー再起動用にカスタムファイルを監視することができます。'
menu: watch
category: configuration-glossary
position: 33
---

- 型: `Object`
- デフォルト: `[]`

> watch プロパティはサーバー再起動用にカスタムファイルを監視することができます。

```js
watch: ['~/custom/*.js']
```

[chokidar](https://github.com/paulmillr/chokidar) は watcher の設定に使われます。chokidar のパターンオプションの詳細は [chokidar API](https://github.com/paulmillr/chokidar#api) を参照してください。
