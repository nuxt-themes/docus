---
title: Utiliser nginx comme proxy inverse
description: Comment utiliser nginx en tant que proxy inverse ?
category: deployment
position: 313
---

```nginx
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen          80;             # le port sur lequel nginx écoute
    server_name     your-domain;    # mettre votre domaine ici

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
        proxy_pass                          http://127.0.0.1:3000; # mettre l'URL de l'instance Node.js ici
    }
}
```

## Utiliser nginx avec des pages générées et un proxy de cache en solution de secours

Si vous avez un site web très important avec du contenu changeant régulièrement, vous voudriez bénéficier des capacités de génération de Nuxt et de [nginx caching](https://www.nginx.com/blog/nginx-caching-guide).

Vous trouverez ci-dessous un exemple de configuration. Gardez à l'esprit que :

- le répertoire racine doit être le même que celui définit par [la configuration du répertoire de génération](/docs/2.x/configuration-glossary/configuration-generate#dir)
- les entêtes d'expiration définis par Nuxt sont supprimés (en raison du cache)
- Nuxt comme nginx peuvent ajouter des entêtes supplémentaires, il est conseillé d'en choisir un (dans le doute, choisissez nginx)
- si votre site est principalement statique, augmentez les nombres `proxy_cache_path inactive` et `proxy_cache_valid`

Si vous ne générez pas vos itinéraires mais que vous souhaitez bénéficier du cache nginx :

- supprimez l'entrée `root`
- changez `location @proxy {` par `location / {`
- supprimez les 2 autres entrées `location`

```nginx
proxy_cache_path  /data/nginx/cache levels=1:2 keys_zone=nuxt-cache:25m max_size=1g inactive=60m use_temp_path=off;

map $sent_http_content_type $expires {
    "text/html"                 1h; # set this to your needs
    "text/html; charset=utf-8"  1h; # set this to your needs
    default                     7d; # set this to your needs
}

server {
    listen          80;             # the port nginx is listening on
    server_name     your-domain;    # setup your domain here

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    charset utf-8;

    root /var/www/NUXT_PROJECT_PATH/dist

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

        try_files $uri $uri/index.html @proxy; # for generate.subFolders: true
        # try_files $uri $uri.html @proxy; # for generate.subFolders: false
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
        proxy_pass                  http://127.0.0.1:3000; # set the address of the Node.js instance here
        proxy_cache                 nuxt-cache;
        proxy_cache_bypass          $arg_nocache; # probably better to change this
        proxy_cache_valid           200 302  60m; # set this to your needs
        proxy_cache_valid           404      1m;  # set this to your needs
        proxy_cache_lock            on;
        proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
        proxy_cache_key             $uri$is_args$args;
    }
}
```

## Configuration nginx pour Laravel Forge

Changez `YOUR_WEBSITE_FOLDER` pour le dossier de votre site web et `YOUR_WEBSITE_DOMAIN` par l'URL de celui-ci. Laravel Forge va remplir ces valeurs pour vous, mais assurez-vous-en avec une double vérification.

```nginx
# CONFIGURATION FORGE (NE PAS SUPPRIMER !)
include forge-conf/REPERTOIRE_DE_VOTRE_SITE_WEB/before/*;

map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen 80;
    listen [::]:80;
    server_name DOMAINE_DE_VOTRE_SITE_WEB;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    charset utf-8;

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    # CONFIGURATION FORGE (NE PAS SUPPRIMER !)
    include forge-conf/REPERTOIRE_DE_VOTRE_SITE_WEB/server/*;

    location / {
        expires $expires;

        proxy_redirect off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # configurer l'adresse de l'instance Node.js ici
    }

    access_log off;
    error_log  /var/log/nginx/REPERTOIRE_DE_VOTRE_SITE_WEB-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

# CONFIGURATION FORGE (NE PAS SUPPRIMER !)
include forge-conf/REPERTOIRE_DE_VOTRE_SITE_WEB/after/*;
```

## Securisation de Laravel Forge avec TLS

C'est mieux de laisser Laravel éditer le fichier `nginx.conf pour vous, en cliquant sur Sites -> DOMAINE_DE_VOTRE_SITE_WEB (NOM_DU_SERVEUR) puis cliquer sur SSL et installer un certificat de l'un des fournisseurs. Rappelez-vous d'activer le certificat. Votre fichier`nginx.conf` devrait maintenant ressembler à ça :

```nginx
# CONFIGURATION FORGE (NE PAS SUPPRIMER !)
include forge-conf/REPERTOIRE_DE_VOTRE_SITE_WEB/before/*;

map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name DOMAINE_DE_VOTRE_SITE_WEB;

    # CONFIGURATION FORGE (NE PAS SUPPRIMER !)
    ssl_certificate /etc/nginx/ssl/REPERTOIRE_DE_VOTRE_SITE_WEB/258880/server.crt;
    ssl_certificate_key /etc/nginx/ssl/REPERTOIRE_DE_VOTRE_SITE_WEB/258880/server.key;

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

    # CONFIGURATION FORGE (NE PAS SUPPRIMER !)
    include forge-conf/REPERTOIRE_DE_VOTRE_SITE_WEB/server/*;

    location / {
        expires $expires;

        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_redirect              off;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # configurer l'adresse de l'instance Node.js ici
    }

    access_log off;
    error_log  /var/log/nginx/REPERTOIRE_DE_VOTRE_SITE_WEB-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

# CONFIGURATION FORGE (NE PAS SUPPRIMER !)
include forge-conf/REPERTOIRE_DE_VOTRE_SITE_WEB/after/*;
```
