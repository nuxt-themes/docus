---
title: Comment déployer sur AWS avec S3 et Cloudfront
description: Hébergement statique sur AWS avec S3 et Cloudfront pour NuxtJS
menu: Deploy on Aws w/ S3 and Cloudfront
category: deployment
position: 301
---

AWS est un service web d'Amazon. S3 est leur stockage statique qui peut être configuré pour de l'hébergement de site statique. Cloudfront est leur CDN (content delivery network)

Héberger une **générération statique** Nuxt sur AWS avec S3 et Cloudfront est puissant et pas cher.

> AWS est à se tirer les cheveux. Si nous avons oublié une étape, merci de soumettre une proposition de mise à jour (PR) pour mettre à jour ce document.

## Tour rapide

Nous allons héberger à pas cher avec quelques services AWS. Brièvement :

- S3
  - des "boites" ("bucket") de données cloud pour nos fichiers de site web
  - peut être configuré pour héberger des sites web statiques
- CloudFront
  - un CDN (content delivery network)
  - offre des certificats HTTPS gratuits
  - rend le chargement de votre site rapide

Nous allons envoyer le site de cette façon :

```
Nuxt Generate -> Local folder -> AWS S3 Bucket -> AWS Cloudfront CDN -> Browser
  [      nuxt generate       ]    [         gulp deploy          ]
  [                         deploy.sh                            ]
```

Premièrement, nous allons générer le site avec `nuxt generate`. Puis nous utiliserons [Gulp](https://gulpjs.com/) pour publier les fichiers dans une boite S3 et invalider un CDN CouldFront.

- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-awspublish](https://www.npmjs.com/package/gulp-awspublish)
- [gulp-cloudfront-invalidate-aws-publish](https://www.npmjs.com/package/gulp-cloudfront-invalidate-aws-publish)
- [concurrent-transform](https://www.npmjs.com/package/concurrent-transform) (for parallel uploads)

Nos scripts de déploiement ont besoin des variables d'environnement suivantes :

- AWS_BUCKET_NAME="example.com"
- AWS_CLOUDFRONT="UPPERCASE"
- AWS_ACCESS_KEY_ID="key"
- AWS_SECRET_ACCESS_KEY="secret"

Nous avons ces fichiers :

```
deploy.sh       -  exécute `nuxt generate` et `gulp deploy`
gulpfile.js     -  le code `gulp deploy` pour envoyer les fichiers à S3 et invalider CloudFront
```

## Mise en place

1. Créer une boite S3 et la configurer pour de l'hébergement de site statique
2. Créer une distribution cloudfront
3. Configurer l'accès sécurisé
4. Paramétrer le script de build dans votre projet

### 1. AWS: Configurez votre boite S3

### 2. AWS: Configurez votre distribution Cloudfront

Pour les étapes 1 et 2, suivre ce [tutoriel pour configurer S3 et Cloudfront](https://reidweb.com/2017/02/06/cloudfront-cdn-tutorial/)

Vous devriez avoir maintenant ces données :

- AWS_BUCKET_NAME="example.com"
- AWS_CLOUDFRONT="UPPERCASE"

### 3. AWS: Configurer l'accès sécurisé

Pour l'étape 3, nous devons créer un utilisateur qui peut :

- Mettre à jour le contenu de la boite
- Invalidater la distribution cloudfront (propage plus rapidement les modifications aux utilisateurs)

[Créer un utilisateur avec cette stratégie](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) :

> NOTE: remplacer ci-dessous les deux `example.com` avec le nom de votre boite S3. Cette stratégie permet de pousser les boites spécifiques, et invalider toutes les distributions CloudFront.

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

Puis [obtenez une clé d'accès et un code secret](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

Vous devriez maintenant avoir ces données :

- AWS_ACCESS_KEY_ID="key"
- AWS_SECRET_ACCESS_KEY="secret"

### 4. Ordinateur: Configurez le script de build de votre projet

4.1) Créer un script `deploy.sh`. Voir les options [nvm (node version manager)](https://github.com/creationix/nvm).

```bash
#!/bin/bash

export AWS_ACCESS_KEY_ID="key"
export AWS_SECRET_ACCESS_KEY="secret"
export AWS_BUCKET_NAME="example.com"
export AWS_CLOUDFRONT="UPPERCASE"

# charger nvm (node version manager), installer node (version in .nvmrc), et les paquets d'installation npm
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# installer npm si besoin
[ ! -d "node_modules" ] && npm install

npm run generate
gulp deploy
```

4.2) Rendre `deploy.sh` exécutable et NE PAS LE VALIDER DANS GIT (deploy.sh contient des informations secrètes)

```bash
chmod +x deploy.sh
echo "
# ne pas commiter les fichiers de build
node_modules
dist
.nuxt
.awspublish
deploy.sh
" >> .gitignore
```

4.3) Ajouter Gulp à votre projet et à votre ligne de commande

```bash
npm install --save-dev gulp gulp-awspublish gulp-cloudfront-invalidate-aws-publish concurrent-transform
npm install -g gulp
```

4.4) Créer `gulpfile.js` avec le script de build

```javascript
const gulp = require('gulp')
const awspublish = require('gulp-awspublish')
const cloudfront = require('gulp-cloudfront-invalidate-aws-publish')
const parallelize = require('concurrent-transform')

// https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html

const config = {
  // Obligatoire
  params: {
    Bucket: process.env.AWS_BUCKET_NAME
  },
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v3'
  },

  // Facultatif
  deleteOldVersions: false, // NOT FOR PRODUCTION
  distribution: process.env.AWS_CLOUDFRONT, // CloudFront distribution ID
  region: process.env.AWS_DEFAULT_REGION,
  headers: {
    /* 'Cache-Control': 'max-age=315360000, no-transform, public', */
  },

  // Sensible Defaults - ajouter ces fichiers et répertoires à gitignore
  distDir: 'dist',
  indexRootPath: true,
  cacheFileName: '.awspublish',
  concurrentUploads: 10,
  wait: true // attendre l'invalidation de Cloudfront (environ 30-60 secondes)
}

gulp.task('deploy', function () {
  // créer un nouveau publieur en utilisant les options de S3
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  const publisher = awspublish.create(config)

  let g = gulp.src('./' + config.distDir + '/**')
  // le publieur ajoutera Content-Length, Content-Type les les entêtes spécifiées ci-dessous
  // Si non renseignés, x-amz-acl aura la valeur public-read par défaut
  g = g.pipe(
    parallelize(publisher.publish(config.headers), config.concurrentUploads)
  )

  // Invalide le CDN
  if (config.distribution) {
    console.log('Configured with CloudFront distribution')
    g = g.pipe(cloudfront(config))
  } else {
    console.log(
      'No CloudFront distribution configured - skipping CDN invalidation'
    )
  }

  // supprimer les fichiers à supprimer
  if (config.deleteOldVersions) {
    g = g.pipe(publisher.sync())
  }
  // créer un fichier de cache pour accélérer les envois successifs
  g = g.pipe(publisher.cache())
  // afficher l'avancement de l'envoi dans la console
  g = g.pipe(awspublish.reporter())
  return g
})
```

4.5) Deployer et déboguer

Lancer ceci :

```bash
./deploy.sh
```

Vous devriez avoir un affichage comme celui-ci :

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

Notez que `Cloudfront invalidation created: XXXX` est la seule sortie du package npm d'invalidation de CloudFront. Si vous ne voyez pas ceci, ça ne fonctionnera pas.
