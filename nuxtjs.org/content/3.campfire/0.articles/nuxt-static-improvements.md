---
title: Nuxt Static Improvements
description: With Nuxt.js version 2.13, the full-static mode has been introduced. In addition, a new command nuxt export was added to pre-render your pages without triggering a webpack build with the goal to separate the rendering and build process. The only issue was that most Nuxt.js users weren't able to unleash the full potential of the separation... until now.
imgUrl: blog/nuxt-static-improvements/main.jpg
date: 2020-07-27
category: features
authors:
  - name: Alexander Lichter
    avatarUrl: https://pbs.twimg.com/profile_images/1316077440414998528/mY2rcM7__400x400.jpg
    twitter: https://twitter.com/TheAlexLichter
    github: https://github.com/manniL
  - name: Sébastien Chopin
    avatarUrl: https://pbs.twimg.com/profile_images/1042510623962275840/1Iw_Mvud_400x400.jpg
    twitter: https://twitter.com/atinux
    github: https://github.com/Atinux
  - name: Pooya Parsa
    avatarUrl: https://pbs.twimg.com/profile_images/1268227177612541952/9-fujxqt_400x400.jpg
    twitter: https://twitter.com/_pi0_
    github: https://github.com/pi0
---

## Introduction

With Nuxt.js version 2.13, the [full-static mode](/blog/going-full-static/) has been introduced. In addition, a new command `nuxt export` was added to pre-render your pages without triggering a webpack build with the goal to separate the rendering and build process. The only issue was that most Nuxt.js users weren't able to unleash the full potential of the separation... **until now.**

- [Introduction](#introduction)
- [Faster Static Deployments](#faster-static-deployments)
- [Generate time: cache vs full webpack build](#generate-time-cache-vs-full-webpack-build)
- [Using in your projects](#using-in-your-projects)
  - [Excluding Files from Cache](#excluding-files-from-cache)
  - [Module Authors](#module-authors)
- [How it works](#how-it-works)
  - [Back to old school commands](#back-to-old-school-commands)
- [What to do next](#what-to-do-next)

## Faster Static Deployments

With v2.14, `nuxt generate` will **automagically skip webpack build step when no code has been changed** and use the previous build using cache. This will help to drastically improve static deployments time by avoiding unnecessary builds which is usually the most time-consuming part of generation process. Cache support is **platform-agnostic** and works on Netlify, Vercel, or any other CI/CD setup that is caching `node_modules`.

<video poster="https://res.cloudinary.com/nuxt/video/upload/v1595852304/nuxt-smart-generate_pjaat1.jpg" loop="loop" plays-inline="true" controls="controls">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1595852304/nuxt-smart-generate_pjaat1.webm" type="video/webm">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1595852304/nuxt-smart-generate_pjaat1.mp4" type="video/mp4">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1595852304/nuxt-smart-generate_pjaat1.ogv" type="video/ogg">
</video>

## Generate time: cache vs full webpack build

See the comparison in seconds between two `nuxt generate`:

- `Build` is when a webpack build is required
- `Cache` is only when the content has changed (webpack build skipped)

<bar-chart-cache-build></bar-chart-cache-build>

<alert type="next">

The static site generation of our projects on content changes are now **~3.6x times** faster 🚀

</alert>

Project links: [Basic](https://github.com/pi0/nuxt-static-demo), [Strapi Module Docs](https://github.com/nuxt-community/strapi-module/tree/master/docs), [Content Module Docs](https://github.com/nuxt/content/tree/master/docs) and [Nuxt Docs](https://github.com/nuxt/nuxtjs.org).

## Using in your projects

1. Update `nuxt` to the latest minor version, which is v2.14.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn upgrade nuxt
```

  </code-block>
  <code-block label="NPM">

```bash
npm update
```

  </code-block>
</code-group>

2. Ensure `target` is `static` inside your `nuxt.config`

```js{}[nuxt.config.js]
export default {
  target: 'static'
  // ...
}
```

`nuxt generate` will behave as before to avoid breaking changes and provide legacy compatibility if you keep `target: ‘server’` or don't specify target.

3. That’s it 🙌

Now, the `nuxt generate` command will build the project only if necessary, which is the case when files inside the project have been changed. It will always re-render your routes to static HTML files, like `nuxt export` is doing already.

Now you only have to change your build command back from `nuxt build && nuxt export` to `nuxt generate` on the platform you are using. If you are using a CI, ensure that you are properly caching `node_modules`.

### Excluding Files from Cache

By default, nuxt ignores these directories so if any change happens inside them, build will not be triggered:

- Build directory (`.nuxt/`)
- Static directory (`static/`)
- Generate dist (`dist/`)
- `node_modules`
- `README.md`
- Hidden dotfiles (like `.npmrc`)

You can add more patterns using [generate.cache.ignore](/docs/2.x/configuration-glossary/configuration-generate#cache) option in `nuxt.config`:

```js{}[nuxt.config.js]
export default {
  generate: {
    cache: {
      ignore: [
        // When something changed in the docs folder, do not re-build via webpack
        'docs'
      ]
    }
  }
}
```

It is also possible to use a function for `ignore` option to override default ignore entries.

### Module Authors

What if you are developing a nuxt module that is working with files that should not trigger a rebuild? The best example is for [@nuxt/content](https://content.nuxtjs.org) module that reads markdown files from the repository. In this case, these files are used within a runtime module, which is the case when using `@nuxt/content`, the module itself can tell nuxt to ignore these files for you already so you don't have to do anything! Module authors can use the new `generate:cache:ignore` hook to do so:

```js
nuxt.hook('generate:cache:ignore', ignore => ignore.push('content'))
```

## How it works

When using the new `nuxt generate` with `static` target, a snapshot including checksum of non-ignored project files as well as nuxt version and some other configuration will be written `.nuxt/build.json`. In addition, we also move the build directory to `node_modules/.cache/nuxt`. Because `node_modules` is cached by all major platforms (Netlify, Vercel, ...) and common CI/CD scripts, this solution works out of the box without additional configuration.

When `nuxt generate` is called subsequently, it will again create a checksum based on your project files and then compare it to the existing one inside `node_modules/.cache/nuxt/build.json`.

If they match, it means that nothing is changed that needs rebuild so we can directly start rendering pages.

If a mismatch is detected, it means that a full rebuild would be necessary. You can also see what file caused rebuild by checking console logs. After the build, nuxt generate will save the new checksum inside `.nuxt/build.json`. You can check full implementation [here](https://github.com/nuxt/nuxt.js/pull/7712).

### Back to old school commands

With Nuxt v2.13, we introduced `nuxt export` and `nuxt serve` specially designed for the static target. With Nuxt v2.14, they are deprecated as `nuxt generate` and `nuxt start` is smart to detect the target and build when necessary.

Server target:

- `nuxt dev` = development server
- `nuxt build` = build your application for production
- `nuxt start` = start the production server (use it for Node.js hosting like Heroku, Digital Ocean, etc)

Static target:

- `nuxt dev` = development server
- `nuxt generate` = build if needed and statically export to `dist/`
- `nuxt start` = serve the `dist/` directory like your static hosting would do (Netlify, Vercel, Surge, etc), great for testing before deploying

## What to do next

- Upgrade your project to [nuxt@2.14.0](https://github.com/nuxt/nuxt.js/releases/tag/v2.14.0)
- Use `nuxt generate` instead of `nuxt export`
- Use `nuxt start` instead of `nuxt serve`
- Enjoy fast deployments 🤙
