---
title: 'S3 と CloudFront を使用して AWS へデプロイするには？'
description: 'S3 と CloudFront を使用した AWS での静的ホスティング'
menu: Deploy on Aws w/ S3 and Cloudfront
category: deployment
position: 201
---

AWS は Amazon Web Services の略称です。 S3 は、静的サイトホスティング用に設定できる静的ストレージです。 CloudFront は、AWS の CDN（コンテンツ配信ネットワーク）です。

**静的に生成された** Nuxt アプリケーションを、S3 と CloudFront を使用して AWS 上にホスティングする方法は強力かつ安価です。

> AWS では少額の利用料が積算して高額の請求を受けることがあります。もし抜けているステップがあれば、ぜひこのドキュメントを更新する PR を送ってください。

## 概要

いくつかの AWS サービスではとても安価にホストできます。まとめると:

- S3
  - ウェブサイトデータのクラウドストレージ "バケット"
  - 静的なウェブサイトをホストするように設定できる
- CloudFront
  - CDN（コンテンツ配信ネットワーク）
  - 無料の HTTPS 証明書を提供している
  - サイトの読み込みを速くする

このようにサイトをプッシュします:

```
Nuxt Generate -> Local folder -> AWS S3 Bucket -> AWS Cloudfront CDN -> Browser
  [      nuxt generate       ]    [         gulp deploy          ]
  [                         deploy.sh                            ]
```

まず、 `nuxt generate` を使ってサイトを生成します。次に、[Gulp](https://gulpjs.com/) を使用してファイルを S3 バケットに公開し、CloudFront CDN のキャッシュを削除します。

- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-awspublish](https://www.npmjs.com/package/gulp-awspublish)
- [gulp-cloudfront-invalidate-aws-publish](https://www.npmjs.com/package/gulp-cloudfront-invalidate-aws-publish)
- [concurrent-transform](https://www.npmjs.com/package/concurrent-transform)（並行アップロード用）

私たちのデプロイスクリプトでは、以下の環境変数を設定する必要があります:

- AWS_BUCKET_NAME="example.com"
- AWS_CLOUDFRONT="UPPERCASE"
- AWS_ACCESS_KEY_ID="key"
- AWS_SECRET_ACCESS_KEY="secret"

以下のファイルを用意します:

```
deploy.sh       -  `nuxt generate` と `gulp deploy` を実行する
gulpfile.js     -  ファイルを S3 にプッシュして CloudFront のキャッシュを削除する `gulp deploy` コード
```

## セットアップ

1. S3 バケットを作成し、静的サイトホスティング用に設定する
2. CloudFront distribution を作成する
3. セキュリティアクセスを設定する
4. プロジェクトにビルドスクリプトを設定する

### AWS: S3 バケットと CloudFront Distribution の設定

ステップ 1 と 2 については、この [S3 と CloudFront をセットアップするためのチュートリアル](https://reidweb.com/2017/02/06/cloudfront-cdn-tutorial/)に従ってください。

あなたは今このデータを持っているはずです:

- AWS_BUCKET_NAME="example.com"
- AWS_CLOUDFRONT="UPPERCASE"

### AWS: セキュリティアクセスを設定する

ステップ 3 では、以下のことができるユーザーを作成する必要があります:

- バケットのコンテンツを更新する
- CloudFront distribution でのキャッシュ削除（変更をいち早くユーザーに伝える）

[このポリシーを使用してプログラムのユーザーを作成する](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html):

> NOTE: 下の二つの `example.com` をあなたの S3 バケット名に置き換えてください。このポリシーでは指定されたバケットへのプッシュを許可し、CloudFront distribution でのキャッシュ削除が可能になります。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::example.com"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:DeleteObject",
        "s3:ListMultipartUploadParts",
        "s3:AbortMultipartUpload"
      ],
      "Resource": ["arn:aws:s3:::example.com/*"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations",
        "cloudfront:UnknownOperation"
      ],
      "Resource": "*"
    }
  ]
}
```

次に[アクセスキーとシークレットアクセスキーを取得します](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)。

あなたは今このデータを持っているはずです:

- AWS_ACCESS_KEY_ID="key"
- AWS_SECRET_ACCESS_KEY="secret"

### Laptop: プロジェクトのビルドスクリプトを設定する

4.1) `deploy.sh` スクリプトを作成します。詳細は [nvm（node version manager）](https://github.com/creationix/nvm)を参照してください。

```bash
#!/bin/bash

export AWS_ACCESS_KEY_ID="key"
export AWS_SECRET_ACCESS_KEY="secret"
export AWS_BUCKET_NAME="example.com"
export AWS_CLOUDFRONT="UPPERCASE"

# nvm（node version manager）を読み込み、node（.nvmrc 内のバージョン）をインストールし、npm パッケージをインストールします。
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# まだインストールされていない場合は npm をインストールする
[ ! -d "node_modules" ] && npm install

npm run generate
gulp deploy
```

4.2) `deploy.sh` を実行可能にし、.gitignore に追記します。（`deploy.sh` にはシークレットアクセスキーがあるため）

```bash
chmod +x deploy.sh
echo "
# Don't commit build files
node_modules
dist
.nuxt
.awspublish
deploy.sh
" >> .gitignore
```

4.3) Gulp をプロジェクトとコマンドラインに追加します。

```bash
npm install --save-dev gulp gulp-awspublish gulp-cloudfront-invalidate-aws-publish concurrent-transform
npm install -g gulp
```

4.4) `gulpfile.js` をビルドスクリプトとともに作成します。

```javascript
const gulp = require('gulp')
const awspublish = require('gulp-awspublish')
const cloudfront = require('gulp-cloudfront-invalidate-aws-publish')
const parallelize = require('concurrent-transform')

// https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html

const config = {
  // 必須
  params: {
    Bucket: process.env.AWS_BUCKET_NAME
  },
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v3'
  },

  // 任意
  deleteOldVersions: false, // PRODUCTION で使用しない
  distribution: process.env.AWS_CLOUDFRONT, // CloudFront distribution ID
  region: process.env.AWS_DEFAULT_REGION,
  headers: {
    /* 'Cache-Control': 'max-age=315360000, no-transform, public', */
  },

  // 適切なデフォルト値 - これらのファイル及びディレクトリは gitignore されている
  distDir: 'dist',
  indexRootPath: true,
  cacheFileName: '.awspublish',
  concurrentUploads: 10,
  wait: true // CloudFront のキャッシュ削除が完了するまでの時間（約30〜60秒）
}

gulp.task('deploy', function () {
  // S3 オプションを使用して新しい publisher を作成する
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  const publisher = awspublish.create(config)

  let g = gulp.src('./' + config.distDir + '/**')
  // publisher は、上記で指定した Content-Length、Content-Type、および他のヘッダーを追加する
  // 指定しない場合、はデフォルトで x-amz-acl が public-read に設定される
  g = g.pipe(
    parallelize(publisher.publish(config.headers), config.concurrentUploads)
  )

  // CDN のキャッシュを削除する
  if (config.distribution) {
    console.log('Configured with CloudFront distribution')
    g = g.pipe(cloudfront(config))
  } else {
    console.log(
      'No CloudFront distribution configured - skipping CDN invalidation'
    )
  }

  // 削除したファイルを同期する
  if (config.deleteOldVersions) {
    g = g.pipe(publisher.sync())
  }
  // 連続したアップロードを高速化するためにキャッシュファイルを作成する
  g = g.pipe(publisher.cache())
  // アップロードの更新をコンソールに出力する
  g = g.pipe(awspublish.reporter())
  return g
})
```

4.5) デプロイとデバッグ

実行する:

```bash
./deploy.sh
```

次のような出力が得られます:

```bash
$ ./deploy.sh

Found '/home/michael/scm/example.com/www/.nvmrc' with version <8>
Now using node v8.11.2 (npm v5.6.0)

> example.com@1.0.0 generate /home/michael/scm/example.com/www
> nuxt generate

  nuxt:generate Generating... +0ms
  nuxt:build App root: /home/michael/scm/example.com/www +0ms
  nuxt:build Generating /home/michael/scm/example.com/www/.nuxt files... +0ms
  nuxt:build Generating files... +36ms
  nuxt:build Generating routes... +10ms
  nuxt:build Building files... +24ms
  ████████████████████ 100%

Build completed in 7.009s



 DONE  Compiled successfully in 7013ms                                                                                                                                     21:25:22

Hash: 421d017116d2d95dd1e3
Version: webpack 3.12.0
Time: 7013ms
                                   Asset     Size  Chunks             Chunk Names
     pages/index.ef923f795c1cecc9a444.js  10.6 kB       0  [emitted]  pages/index
 layouts/default.87a49937c330bdd31953.js  2.69 kB       1  [emitted]  layouts/default
pages/our-values.f60c731d5c3081769fd9.js  3.03 kB       2  [emitted]  pages/our-values
   pages/join-us.835077c4e6b55ed1bba4.js   1.3 kB       3  [emitted]  pages/join-us
       pages/how.75f8cb5bc24e38bca3b3.js  2.59 kB       4  [emitted]  pages/how
             app.6dbffe6ac4383bd30a92.js   202 kB       5  [emitted]  app
          vendor.134043c361c9ad199c6d.js  6.31 kB       6  [emitted]  vendor
        manifest.421d017116d2d95dd1e3.js  1.59 kB       7  [emitted]  manifest
 + 3 hidden assets
Hash: 9fd206f4b4e571e9571f
Version: webpack 3.12.0
Time: 2239ms
             Asset    Size  Chunks             Chunk Names
server-bundle.json  306 kB          [emitted]
  nuxt: Call generate:distRemoved hooks (1) +0ms
  nuxt:generate Destination folder cleaned +10s
  nuxt: Call generate:distCopied hooks (1) +8ms
  nuxt:generate Static & build files copied +7ms
  nuxt:render Rendering url /our-values +0ms
  nuxt:render Rendering url /how +67ms
  nuxt:render Rendering url /join-us +1ms
  nuxt:render Rendering url / +0ms
  nuxt: Call generate:page hooks (1) +913ms
  nuxt: Call generate:page hooks (1) +205ms
  nuxt: Call generate:page hooks (1) +329ms
  nuxt: Call generate:page hooks (1) +361ms
  nuxt:generate Generate file: /our-values/index.html +2s
  nuxt:generate Generate file: /how/index.html +0ms
  nuxt:generate Generate file: /join-us/index.html +0ms
  nuxt:generate Generate file: /index.html +0ms
  nuxt:render Rendering url / +2s
  nuxt: Call generate:done hooks (1) +4ms
  nuxt:generate HTML Files generated in 11.8s +5ms
  nuxt:generate Generate done +0ms
[21:25:27] Using gulpfile ~/scm/example.com/www/gulpfile.js
[21:25:27] Starting 'deploy'...
Configured with CloudFront distribution
[21:25:27] [cache]  README.md
[21:25:27] [cache]  android-chrome-192x192.png
[21:25:27] [cache]  android-chrome-512x512.png
[21:25:27] [cache]  apple-touch-icon.png
[21:25:27] [cache]  browserconfig.xml
[21:25:27] [cache]  favicon-16x16.png
[21:25:27] [cache]  favicon-32x32.png
[21:25:27] [cache]  favicon.ico
[21:25:27] [cache]  favicon.svg
[21:25:27] [cache]  logo-branches.svg
[21:25:27] [cache]  logo-small.svg
[21:25:27] [cache]  logo.svg
[21:25:27] [cache]  mstile-150x150.png
[21:25:27] [cache]  og-image.jpg
[21:25:27] [cache]  safari-pinned-tab.svg
[21:25:27] [cache]  site.webmanifest
[21:25:28] [create] _nuxt/manifest.421d017116d2d95dd1e3.js
[21:25:29] [update] 200.html
[21:25:30] [create] videos/flag.jpg
[21:25:30] [create] _nuxt/vendor.134043c361c9ad199c6d.js
[21:25:34] [create] videos/flag.mp4
[21:25:34] [cache]  _nuxt/pages/how.75f8cb5bc24e38bca3b3.js
[21:25:34] [cache]  _nuxt/pages/join-us.835077c4e6b55ed1bba4.js
[21:25:34] [cache]  _nuxt/pages/our-values.f60c731d5c3081769fd9.js
[21:25:36] [update] our-values/index.html
[21:25:36] [create] _nuxt/layouts/default.87a49937c330bdd31953.js
[21:25:36] [create] _nuxt/app.6dbffe6ac4383bd30a92.js
[21:25:37] [create] _nuxt/pages/index.ef923f795c1cecc9a444.js
[21:25:38] [update] join-us/index.html
[21:25:38] [update] how/index.html
[21:25:43] [create] videos/flag.webm
[21:25:43] [update] index.html
[21:25:43] CloudFront invalidation created: I16NXXXXX4JDOA
[21:26:09] Finished 'deploy' after 42 s
```

NOTE: `CloudFront invalidation created：XXXX` は CloudFront invalidation を行う npm パッケージからの唯一の出力です。それが表示されない場合は、動作していません。
