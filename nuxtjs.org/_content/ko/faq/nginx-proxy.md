---
title: nginx 프록시
description: Nginx를 역방향 프록시(reverse proxy)로 사용하는 방법
menu: Using nginx as a proxy
category: deployment
position: 213
---

# 역방향 프록시(reverse proxy)로 Nginx 사용하기

```nginx
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen          80;             # the port nginx is listening on
    server_name     your-domain;    # setup your domain here

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
        proxy_pass                          http://127.0.0.1:3000; # set the address of the Node.js instance here
    }
}
```

# Laravel Forge를 위한 nginx 설정

`YOUR_WEBSITE_FOLDER`를 웹 사이트 폴더로 변경하고 `YOUR_WEBSITE_DOMAIN` 를 웹 사이트 URL로 변경하세요. Laravel Forge 가 이 값들로 채워질것 입니다. 하지만 두 번확인하세요.

```nginx
# FORGE CONFIG (DOT NOT REMOVE!)
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

    # FORGE CONFIG (DOT NOT REMOVE!)
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
        proxy_pass                          http://127.0.0.1:3000; # set the address of the Node.js
    }

    access_log off;
    error_log  /var/log/nginx/YOUR_WEBSITE_FOLDER-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

# FORGE CONFIG (DOT NOT REMOVE!)
include forge-conf/YOUR_WEBSITE_FOLDER/after/*;
```

# TLS로 Laravel Forge 보안 설정

Laravel Forge가 사이트 -> YOUR_WEBSITE_DOMAIN (SERVER_NAME)를 클릭하여 `nginx.conf`의 편집을 실행 한 다음 SSL를 클릭하고 공급자 중 하나에서 인증서를 설치하는 것이 가장 좋습니다. 인증서를 활성화해야 합니다. `nginx.conf`는 다음과 같이 보일 것입니다 :

```nginx
# FORGE CONFIG (DOT NOT REMOVE!)
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

    # FORGE SSL (DO NOT REMOVE!)
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

    # FORGE CONFIG (DOT NOT REMOVE!)
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
        proxy_pass                          http://127.0.0.1:3000; # set the address of the Node.js
    }

    access_log off;
    error_log  /var/log/nginx/YOUR_WEBSITE_FOLDER-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

# FORGE CONFIG (DOT NOT REMOVE!)
include forge-conf/YOUR_WEBSITE_FOLDER/after/*;
```
