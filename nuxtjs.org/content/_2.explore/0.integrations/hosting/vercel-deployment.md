---
title: Deploy Nuxt with Vercel
description: How to deploy a Nuxt app with Vercel?
menu: Vercel
target: Static & Server
category: deployment
position: 116
---

![nuxt-vercel-builder](https://user-images.githubusercontent.com/904724/61308402-7a752d00-a7f0-11e9-9502-23731ccd00fd.png)

## Static site with Vercel

If you would like to deploy a static site on Vercel, no configuration is necessary. Vercel will detect that you are using Nuxt and will enable the correct settings for your deployment. For more information, see [this Vercel guide](https://vercel.com/guides/deploying-nuxtjs-with-vercel).

## SSR with Vercel

To deploy a serverless Nuxt runtime with [Vercel](https://vercel.com), the Nuxt.js team and contributors have produced an official [@nuxtjs/vercel-builder](https://github.com/nuxt/vercel-builder) package.

All you have to do is to setup a `vercel.json` file:

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

Check out [the documentation](https://github.com/nuxt/vercel-builder) for more information.

### Service Worker with Nuxt PWA Module

To avoid 404 for Service Workers, make sure to include `sw` to your routes settings.

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

You can learn more and see examples on https://github.com/nuxt/vercel-builder
