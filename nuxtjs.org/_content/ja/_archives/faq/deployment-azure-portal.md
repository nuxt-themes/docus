---
title: Azure Portal へデプロイするには？
description: Azure Portal へデプロイするには？
menu: Deploy on Azure Portal
category: deployment
position: 202
---

## 前提条件

- プロジェクトのセットアップ時にバックエンドを選択する必要があります。そうしないと、サイトが起動しません。
- サーバーは Node v8 以降を実行しています。

## バックエンドのないプロジェクトが既にある場合はどうなりますか？

心配ありません。Express サーバーを既存のプロジェクトに簡単に追加できます。

プロジェクトのルートに `server` という新しいフォルダを作成します。次に、`server` フォルダ内に `index.js` ファイルを作成し以下を貼り付けます：

```
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Nuxt.js オプションのインポートと設定
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Nuxt.js を初期化
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // express に nuxt ミドルウェアを提供する
  app.use(nuxt.render)

  // サーバーがリッスンする
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
```

次に、nuxt.config.js を編集します:

ビフォー:

```
import pkg from './package'

export default {
... config
}
```

アフター:

```
module.exports = {
... config
}
```

**このファイルから pkg オブジェクトへの参照を削除することを忘れないでください。**

それだけです！

## DevOps で Web アプリの Node バージョンを設定する方法

リリースパイプラインの "Deploy Azure Web Service" タスク内のアプリ設定を介して、サーバー上の Node バージョンを設定できます。

これを "Application and Configuration Settings" の下のアプリケーション設定フィールドに追加します。

```
-WEBSITE_NODE_DEFAULT_VERSION 10.16.3
```

LTS バージョンの使用を推奨します。

## アーティファクト

Azure DevOps を使用しており、かつビルドパイプラインを走らせていて、アーティファクトを保存したい場合、 ファイル名の先頭に `.` が付いているファイルは、アーティファクトフォルダーに明示的に移動する必要があります。そして、アーティファクトアーカイブを作成することで、リリースデプロイ時にダウンロードすることができます。

## webserver の実行

Azure Portal の場合、`web.config` ファイルが必要です。ファイルが提供されない場合は自身でファイルを作成します。ただし、これは **Nuxt では機能しません**。 `web.config` ファイルをリポジトリに追加します。`Nuxt` の最新のバージョンでは、サーバーファイルは `server/index.js` に配置されています。 `web.config` ファイルでは、`server/index.js` のように正確なパスを指定せず、ただ `server` と指定します。以下の `web.config` ファイルの例を参照してください。これを行わないと、ログで Vue がルートを見つけられないことを通知します。

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--
     iisnode を使用して IIS もしくは IIS Express のバックグラウンドで node プロセスを使う場合、
     この設定ファイルが必要です。詳細は以下を参照してください:

     https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config
-->

<configuration>
  <system.webServer>
    <!-- WebSocket サポートについての詳細は https://azure.microsoft.com/ja-jp/blog/introduction-to-websockets-on-windows-azure-web-sites/ を参照してください -->
    <webSocket enabled="false" />
    <handlers>
      <!-- server.js ファイルが iisnode モジュールによって処理される node.js サイトであることを示します -->
      <add name="iisnode" path="server" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <!-- node-inspector デバッギングの要求を妨げないでください -->
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server\/debug[\/]?" />
        </rule>

        <!-- 最初に、受け取る URL が /public フォルダー内の物理ファイルと一致するかどうかを検討します -->
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>

        <!-- 他のすべての URL は node.js サイトエントリポイントにマッピングされます -->
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server"/>
        </rule>
      </rules>
    </rewrite>

    <!-- node.js では 'bin' ディレクトリは特別な意味を持たずアプリケーションを配置することができます -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>

    <!-- エラーレスポンスが変更されていないことを確認してください -->
    <httpErrors existingResponse="PassThrough" />

    <!--
      次のオプションを使用して、IIS 内で Node がホストされる方法を制御できます:
        * watchedFiles: サーバーを再起動するための変更を監視するセミコロン区切りのリストになったファイル
        * node_env: NODE_ENV 環境変数として node に伝播されます
        * debuggingEnabled - 組み込まれたデバッガを有効にするかどうかを制御します

      オプションの完全なリストは  https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config を参照してください
    -->
    <!--<iisnode watchedFiles="web.config;*.js"/>-->
  </system.webServer>
</configuration>
```
