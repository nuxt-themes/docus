---
title: Nuxt で Cloudflare を使う
description: Nuxt で Cloudflare を使用する際に考慮すべきこと
category: development
position: 106
---

ほとんどの場合、Nuxt は、Nuxt 自身によって生成または作成されていないサードパーティのコンテンツを処理することができます。ただし、そのようなコンテンツは、時々問題（特に Cloudflare の「最小化とセキュリティオプション」）を引き起こすことがあります。

したがって、Cloudflare で以下のオプションがチェックを外しているか/無効化されているかを確認する必要があります。そうしないと、不必要な再レンダリングまたはハイドレーションエラーが実稼働しているアプリケーションに影響を与える可能性があります。

1. Speed > Optimization > Auto Minify: **チェックを外す** JavaScript, CSS and HTML
2. Speed > Optimization > **無効化** "Rocket Loader™"
3. Speed > Optimization > **無効化** "Mirage"
4. Scrape Shield > **無効化** "Email Address Obfuscation"
5. Scrape Shield > **無効化** "Server-side Excludes"

これらの設定により、Cloudflare が Nuxt アプリケーションに不要な副作用を引き起こす可能性のあるスクリプトを注入しないようにすることができます。
