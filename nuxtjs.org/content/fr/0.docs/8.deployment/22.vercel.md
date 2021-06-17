---
title: Déployer Nuxt avec Vercel
description: Comment déployer une application Nuxt avec Vercel?
menu: Vercel
target: Static & Server
category: deployment
position: 116
---

![nuxt-vercel-builder](https://user-images.githubusercontent.com/904724/61308402-7a752d00-a7f0-11e9-9502-23731ccd00fd.png)

## Static avec Vercel

Si vous souhaitez déployer un site statique sur Vercel, aucune configuration n'est nécessaire. Vercel détectera que vous utilisez Nuxt et activera les bons paramètres pour votre déploiement. Pour plus d'informations, consultez [ce guide Vercel](https://vercel.com/guides/deploying-nuxtjs-with-vercel).

## SSR avec Vercel

Pour déployer un runtime Nuxt sans serveur avec [Vercel](https://vercel.com), l'équipe et les contributeurs Nuxt.js ont produit un [@nuxtjs/vercel-builder](https://github.com/nuxt/vercel-builder) package.

Vous n'avez qu'à configurer le fichier `vercel.json`:

```json
{
  "builds": [
    {
      "src": "nuxt.config.js",
      "use": "@nuxtjs/vercel-builder",
      "config": {}
    }
  ]
}
```

Consultez [la documentation](https://github.com/nuxt/vercel-builder) pour plus d'informations.

### Service Worker avec Nuxt PWA Module

Pour éviter une 404 avec le Service Workers, assurez-vous d'inclure `sw` dans vos paramètres de routes.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.js",
      "use": "@nuxtjs/vercel-builder",
      "config": {
        "serverFiles": ["package.json"]
      }
    }
  ],
  "routes": [
    { "src": "/_nuxt/.+", "headers": { "Cache-Control": "max-age=31557600" } },
    {
      "src": "/sw.js",
      "dest": "/_nuxt/static/sw.js",
      "headers": {
        "cache-control": "public, max-age=43200, immutable",
        "Service-Worker-Allowed": "/"
      }
    },
    { "src": "/(.*)", "dest": "/" }
  ]
}
```

Vous pouvez en savoir plus et voir des exemples sur https://github.com/nuxt/vercel-builder
