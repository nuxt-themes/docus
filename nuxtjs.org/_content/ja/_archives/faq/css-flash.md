---
title: なぜ CSS Flash が見えるのか？
description: なぜ CSS Flash が見えるのか？
menu: Why a CSS flash appears
category: development
position: 102
---

![cssflash](/flash_css.gif)

これは、webpack 経由でホットリロードが行われる**開発モード**で JavaScript 内の CSS がビルドされるためです。 このフラッシュは [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) と呼ばれています。

**プロダクションモード**について心配する必要はありません。CSS は分割されてヘッダーに挿入されます。そのため、このスタイルのないコンテンツのフラッシュが表示されることはありません。
