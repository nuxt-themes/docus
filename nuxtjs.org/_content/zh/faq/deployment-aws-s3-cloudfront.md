---
title: 'AWS: S3+Cloudfront 部署'
description: 使用S3和Cloudfront在AWS上进行静态托管
menu: Deploy on Aws w/ S3 and Cloudfront
category: deployment
position: 201
---

# 如何在 AWS 上部署 S3 和 Cloudfront

AWS 是 Amazon Web Services。 S3 是他们的静态存储，可以配置为静态站点托管。 Cloudfront 是他们的 CDN（内容分发网络）

在 AWS w / S3 + Cloudfront 上托管**静态页面**的 Nuxt 应用程序功能强大且价格低廉。

> 如果我们错过了一个步骤，请提交 PR 以更新此文档。

## 概览

我们将通过一些 AWS 服务托管超级便宜：

- S3
  - 云数据"bucket"为我们的网站文件
  - 可以配置为托管静态网站
- CloudFront
  - CDN（内容分发网络）
  - 提供免费的 HTTPS 证书
  - 使您的网站加载速度更快

我们会像这样推送网站：

```
Nuxt Generate -> Local folder -> AWS S3 Bucket -> AWS Cloudfront CDN -> Browser
  [      nuxt generate       ]    [         gulp deploy          ]
  [                         deploy.sh                            ]
```

首先，我们将使用`nuxt generate`生成网站。然后，我们将使用 [Gulp](https://gulpjs.com/) 将文件发布到 S3 存储桶并使 CouldFront CDN 生效。

- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-awspublish](https://www.npmjs.com/package/gulp-awspublish)
- [gulp-cloudfront-invalidate-aws-publish](https://www.npmjs.com/package/gulp-cloudfront-invalidate-aws-publish)
- [concurrent-transform](https://www.npmjs.com/package/concurrent-transform) (for parallel uploads)

我们的部署脚本需要设置以下环境变量：

- AWS_BUCKET_NAME="example.com"
- AWS_CLOUDFRONT="UPPERCASE"
- AWS_ACCESS_KEY_ID="key"
- AWS_SECRET_ACCESS_KEY="secret"

我们将有这些文件：

```
deploy.sh       -  run `nuxt generate` and `gulp deploy`
gulpfile.js     -  `gulp deploy` code to push files to S3 and invalidate CloudFront
```

## 设置它

1. 创建一个 S3 bucket 并将其配置为静态站点托管
2. 创建云端分发
3. 配置安全访问
4. 在项目中设置构建脚本

### 1. AWS: 设置你的 S3 bucket

### 2. AWS: 设置你的 Cloudfront 分配

对于步骤 1 和 2，请按照此步骤操作 [设置 S3 和 Cloudfront 的教程](https://reidweb.com/2017/02/06/cloudfront-cdn-tutorial/)

您现在应该拥有以下数据：

- AWS_BUCKET_NAME="example.com"
- AWS_CLOUDFRONT="UPPERCASE"

### 3. AWS: 配置安全访问

对于第 3 步，我们需要创建：

- 更新 bucket 内容
- 使云端分发生效（更快地将更改传播给用户）

[使用此策略创建程序化用户](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html):

> 注意：用下面的 S3 bucket 名称替换 2x `example.com`。 此策略允许推送到指定的存储桶，并使任何云端分发生效。

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

[获取访问密钥和密钥](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

您现在应该拥有以下数据：

- AWS_ACCESS_KEY_ID="key"
- AWS_SECRET_ACCESS_KEY="secret"

### 4. Laptop: 设置项目的构建脚本

4.1) 创建一个`deploy.sh`脚本。 参考 [nvm (node version manager)](https://github.com/creationix/nvm).

```bash
#!/bin/bash

export AWS_ACCESS_KEY_ID="key"
export AWS_SECRET_ACCESS_KEY="secret"
export AWS_BUCKET_NAME="example.com"
export AWS_CLOUDFRONT="UPPERCASE"

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# Npm install if not already.
[ ! -d "node_modules" ] && npm install

npm run generate
gulp deploy
```

4.2) 使`deploy.sh`可运行，不要检查进入 GIT（deploy.sh 中有隐私）

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

4.3) 将 Gulp 添加到项目和命令行

```bash
npm install --save-dev gulp gulp-awspublish gulp-cloudfront-invalidate-aws-publish concurrent-transform
npm install -g gulp
```

4.4) 使用构建脚本创建`gulpfile.js`

```javascript
const gulp = require('gulp')
const awspublish = require('gulp-awspublish')
const cloudfront = require('gulp-cloudfront-invalidate-aws-publish')
const parallelize = require('concurrent-transform')

// https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html

const config = {
  // Required
  params: { Bucket: process.env.AWS_BUCKET_NAME },
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

  // Optional
  deleteOldVersions: false, // NOT FOR PRODUCTION
  distribution: process.env.AWS_CLOUDFRONT, // Cloudfront distribution ID
  region: process.env.AWS_DEFAULT_REGION,
  headers: {
    /* 'Cache-Control': 'max-age=315360000, no-transform, public', */
  },

  // Sensible Defaults - gitignore these Files and Dirs
  distDir: 'dist',
  indexRootPath: true,
  cacheFileName: '.awspublish',
  concurrentUploads: 10,
  wait: true // wait for Cloudfront invalidation to complete (about 30-60 seconds)
}

gulp.task('deploy', function () {
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  const publisher = awspublish.create(config, config)

  let g = gulp.src('./' + config.distDir + '/**')
  // publisher will add Content-Length, Content-Type and headers specified above
  // If not specified it will set x-amz-acl to public-read by default
  g = g.pipe(
    parallelize(publisher.publish(config.headers), config.concurrentUploads)
  )

  // Invalidate CDN
  if (config.distribution) {
    console.log('Configured with Cloudfront distribution')
    g = g.pipe(cloudfront(config))
  } else {
    console.log(
      'No Cloudfront distribution configured - skipping CDN invalidation'
    )
  }

  // Delete removed files
  if (config.deleteOldVersions) {
    g = g.pipe(publisher.sync())
  }
  // create a cache file to speed up consecutive uploads
  g = g.pipe(publisher.cache())
  // print upload updates to console
  g = g.pipe(awspublish.reporter())
  return g
})
```

4.5) 部署和调试

运行：

```bash
./deploy.sh
```

您应该得到类似于此的输出：

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
Configured with Cloudfront distribution
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
[21:25:43] Cloudfront invalidation created: I16NXXXXX4JDOA
[21:26:09] Finished 'deploy' after 42 s
```

请注意，创建的`Cloudfront invalidation created: XXXX`是来自 cloudfront invalidation npm 包的唯一输出。 如果你没有看到，它就不起作用了。
