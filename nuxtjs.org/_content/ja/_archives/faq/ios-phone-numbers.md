---
title: iOS と電話番号
description: iOS の Safari は電話番号をリンクに変更するため、レンダリングが一致しなくなる可能性があります
category: development
position: 105
---

モバイル Safari の一部のバージョンではこれらの数字を自動的にリンクに変換します。これは SSR のコンテンツが Web サイトのコンテンツと一致しなくなってしまい `NodeMismatch` 警告を引き起こします。これが原因で、これらの Safari バージョンではアプリケーションが使用できなくなる可能性があります。

Nuxt のページに電話番号を含める場合、2 つのオプションがあります:

## 変換を止めるためメタタグを使う

```html
<meta name="format-detection" content="telephone=no" />
```

## リンクで電話番号を囲む

```html
<!-- Example phone number: +7 (982) 536-50-77 -->

<template>
  <a href="tel: +7 (982) 536-50-77">+7 (982) 536-50-77</a>
</template>
```
