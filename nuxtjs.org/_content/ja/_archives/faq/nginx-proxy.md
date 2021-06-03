---
title: nginx をリバースプロキシとして使う
description: nginx をリバースプロキシとして使うには？
menu: Using nginx as a proxy
category: deployment
position: 213
---

```nginx
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen          80;             # nginx が見るポート番号
    server_name     your-domain;    # ドメインはここで設定してください

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location / {
        expires $expires;

        proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # Node.js のアドレスはここで設定してください
    }
}
```

## nginx を生成されたページに使い、フォールバックとしてのキャッシングプロキシに使う:

もし、あなたが頻繁に更新するコンテンツがある大容量のウェブサイトを持っているとき、 Nuxt の生成機能と [nginx キャッシング](https://www.nginx.com/blog/nginx-caching-guide) の恩恵が必要となるでしょう。

以下は設定例です。次のことを忘れないでください:

- ルートフォルダは [generate.dir の設定](/docs/2.x/configuration-glossary/configuration-generate#dir)と同じにするべきです
- （キャッシュのために）Nuxt によって設定された expire ヘッダは外されます
- Nuxt と nginx ともに追加のヘッダを設定することができますが、どちらか 1 つを選ぶことをお勧めします（もし迷ったら、nginx を選んでください）
- もしあなたのサイト大部分が静的な場合、`proxy_cache_path inactive` と `proxy_cache_valid` の値を増加させます

たとえルーティングを生成しない場合も、nginx キャッシュの恩恵を受けることができるでしょう:

- `root` エントリを削除します
- `location @proxy {` を `location / {` に変更します
- その他 2 つの `location` エントリを削除します

```nginx
proxy_cache_path  /data/nginx/cache levels=1:2 keys_zone=nuxt-cache:25m max_size=1g inactive=60m use_temp_path=off;

map $sent_http_content_type $expires {
    "text/html"                 1h; # 必要であれば設定してください
    "text/html; charset=utf-8"  1h; # 必要であれば設定してください
    default                     7d; # 必要であれば設定してください
}

server {
    listen          80;             # nginx が見るポート番号
    server_name     your-domain;    # ドメインはここで設定してください

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    charset utf-8;

    root /var/www/NUXT_PROJECT_PATH/dist;

    location ~* \.(?:ico|gif|jpe?g|png|woff2?|eot|otf|ttf|svg|js|css)$ {
        expires $expires;
        add_header Pragma public;
        add_header Cache-Control "public";

        try_files $uri $uri/ @proxy;
    }

    location / {
        expires $expires;
        add_header Content-Security-Policy "default-src 'self' 'unsafe-inline';";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
        add_header X-Frame-Options "SAMEORIGIN";

        try_files $uri $uri/index.html @proxy; # generate.subFolders: true の場合
        # try_files $uri $uri.html @proxy; # generate.subFolders: false の場合
    }

    location @proxy {
        expires $expires;
        add_header Content-Security-Policy "default-src 'self' 'unsafe-inline';";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Cache-Status $upstream_cache_status;

        proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_ignore_headers        Cache-Control;
        proxy_http_version          1.1;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                  http://127.0.0.1:3000; # Node.js のアドレスはここで設定してください
        proxy_cache                 nuxt-cache;
        proxy_cache_bypass          $arg_nocache; # おそらく変更したほうが良いです
        proxy_cache_valid           200 302  60m; # 必要であれば設定してください
        proxy_cache_valid           404      1m;  # 必要であれば設定してください
        proxy_cache_lock            on;
        proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
        proxy_cache_key             $uri$is_args$args;
    }
}
```

## Laravel Forge 用の nginx の設定:

`YOUR_WEBSITE_FOLDER` をウェブサイトのフォルダ名に、`YOUR_WEBSITE_DOMAIN` をウェブサイトの URL に変更してください。Laravel Forge はこれらの値を補完しますが、ダブルチェックを行ってください。

```nginx
# FORGE CONFIG (消さないでください！)
include forge-conf/YOUR_WEBSITE_FOLDER/before/*;

map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen 80;
    listen [::]:80;
    server_name YOUR_WEBSITE_DOMAIN;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    charset utf-8;

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    # FORGE CONFIG (消さないでください！)
    include forge-conf/YOUR_WEBSITE_FOLDER/server/*;

    location / {
        expires $expires;

        proxy_redirect off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # Node.js のアドレスを設定してください
    }

    access_log off;
    error_log  /var/log/nginx/YOUR_WEBSITE_FOLDER-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

# FORGE CONFIG (消さないでください！)
include forge-conf/YOUR_WEBSITE_FOLDER/after/*;
```

## TLS で Laravel Forge を保護する:

Laravel Forge に `nginx.conf` の編集を許可するには、Sites -> ウェブサイトドメイン（サーバー名）をクリック 、SSL をクリックしてプロバイダの 1 つから証明書をインストールします。証明書を有効にすることを忘れないでください。`nginx.conf` は以下のようになります:

```nginx
# FORGE CONFIG (消さないでください！)
include forge-conf/YOUR_WEBSITE_FOLDER/before/*;

map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name YOUR_WEBSITE_DOMAIN;

    # FORGE SSL (消さないでください！)
    ssl_certificate /etc/nginx/ssl/YOUR_WEBSITE_FOLDER/258880/server.crt;
    ssl_certificate_key /etc/nginx/ssl/YOUR_WEBSITE_FOLDER/258880/server.key;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA:!3DES';
    ssl_prefer_server_ciphers on;
    ssl_dhparam /etc/nginx/dhparams.pem;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    charset utf-8;

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    # FORGE CONFIG (消さないでください！)
    include forge-conf/YOUR_WEBSITE_FOLDER/server/*;

    location / {
        expires $expires;

        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_redirect              off;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # Node.js のアドレスを設定してください
    }

    access_log off;
    error_log  /var/log/nginx/YOUR_WEBSITE_FOLDER-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

# FORGE CONFIG (消さないでください！)
include forge-conf/YOUR_WEBSITE_FOLDER/after/*;
```
