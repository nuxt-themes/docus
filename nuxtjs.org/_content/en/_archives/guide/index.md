---
title: Introduction
description: 'Nuxt is a progressive framework based on Vue.js to create modern web applications. It is based on Vue.js official libraries (vue, vue-router and vuex) and powerful development tools (webpack, Babel and PostCSS).'
category: prologue
position: 1
---

> Nuxt is a progressive framework based on Vue.js to create modern web applications. It is based on Vue.js official libraries (vue, vue-router and vuex) and powerful development tools (webpack, Babel and PostCSS). Nuxt's goal is to make web development powerful and performant with a great developer experience in mind.

## What is NuxtJS?

Nuxt is a framework designed to give you a strong architecture following official Vue guidelines. Incrementally adoptable, it can be used to create everything from static landing pages to complex enterprise ready web applications.

Versatile by nature, it supports different targets (server, serverless or static) and server side rendering is switchable.

Extendable with a strong module ecosystem, it makes it easy to connect your REST or GraphQL endpoints, favorite CMS, CSS frameworks and more. PWA and AMP support is only a module away from your Nuxt project.

NuxtJS is the backbone of your Vue.js project, giving structure to build your project with confidence while being flexible.

## Features

- Write Vue Files (`*.vue`)
- Automatic Code Splitting
- Server-Side Rendering
- Powerful Routing System with Asynchronous Data
- Static File Serving
- [ES2015+](https://babeljs.io/docs/en/learn/) Transpilation
- Bundling and minifying of your JS & CSS
- Managing `<head>` element (`<title>`, `<meta>`, etc.)
- Hot module replacement in Development
- Pre-processor: Sass, Less, Stylus, etc.
- HTTP/2 push headers ready
- Extending with Modular architecture

## How it Works

Nuxt.js includes the following to create a rich web application development:

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) (included only when using the [store option](/guide/vuex-store))
- [Vue Server Renderer](https://ssr.vuejs.org/en/) (excluded when using [`mode: 'spa'`](/api/configuration-mode))
- [Vue Meta](https://github.com/nuxt/vue-meta)

A total of only **57kB min+gzip** (60kB with Vuex).

<div class="Alert">

Under the hood we use [webpack](https://github.com/webpack/webpack) with [vue-loader](https://github.com/vuejs/vue-loader) and [babel-loader](https://github.com/babel/babel-loader) to bundle, code-split and minify your code.

</div>

## Schema

This schema shows what is called by Nuxt.js when the server is called or when the user navigates through the app via `<nuxt-link>`:

![nuxt-schema](/nuxt-schema.svg)

## Server Rendered (Universal SSR)

You can use Nuxt.js as a framework to handle all the UI rendering of your project.

When launching `nuxt`, it will start a development server with hot-reloading and [Vue Server Renderer](https://ssr.vuejs.org/en/) configured to automatically server-render your application.

## Single Page Applications (SPA)

If, for any reason, you prefer not to use server side rendering or need static hosting for your applications, you can simply use SPA mode using `nuxt --spa`. In combination with the _generate_ feature, it gives you a powerful SPA deployment mechanism without the need to use a Node.js runtime or any special server handling.

Take a look at [the commands](/guide/commands) to learn more about usage.

If you already have a server, you can plug in Nuxt.js by using it as a middleware. There is no restriction at all when using Nuxt.js for developing your Universal Web Applications. See the [Using Nuxt.js Programmatically](/api/nuxt) guide.

## Static Generated (Pre Rendering)

To generate your site as a static site you need to use the `nuxt generate` command as well as set target to the value of static in your nuxt config file if using Nuxt >= 2.13.

When building your application, it will generate the HTML for every one of your routes and store it in a file.

<div>
  <a href="https://vueschool.io/courses/static-site-generation-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
    <img src="/static-site-generation-with-nuxtjs.png" alt="Static Site Generation with Nuxt.js by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Static Site Generation with Nuxt.js</h4>
      <p class="Promote__Content__Description">Learn how to generate static websites (pre rendering) to improve both performance and SEO while eliminating hosting costs.</p>
      <p class="Promote__Content__Signature">Video courses made by VueSchool to support Nuxt.js development.</p>
    </div>
  </a>
</div>

For example, the following file structure:

```bash
-| pages/
----| about.vue
----| index.vue
```

Will generate:

```
-| dist/
----| about/
------| index.html
----| index.html
```

With this, you can host your generated web application on any static hosting!

The best example is this website. It is generated and hosted on [Netlify](https://www.netlify.com), see our [source code](https://github.com/nuxt/nuxtjs.org) or [How to deploy Nuxt.js to Netlify](https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-netlify?friend=nuxt) from Vue School.

We don't want to manually generate the application every time we update the [docs repository](https://github.com/nuxt/docs), it triggers a hook to Netlify which:

1. Clones the [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org)
2. Installs the dependencies via `npm install`
3. Runs `nuxt generate`
4. Serves the `dist` directory

We now have an automated **Static Generated Web Application** :)

The new full static module which is available since v2.13 generates your html and static assets at build time which means everything is already generated and therefore not only is it great for SEO but it can also be hosted for free on any of the static hosting providers.

Nuxt v2.13 also comes with a crawler installed which will crawl your link tags and generate your dynamic routes based on these links which means there is no need to manually generate your dynamic links anymore.

The static target works by saving the calls to your API in payload.js files in a static folder. These payloads are then cached for better performance and offline support and as your API is not called on client side navigation any more (when called using asyncData and fetch), it also means you do not have to expose your API to the public.

When your site is generated your html is generated with all it's content and on client side navigation these pages are reconstructed using the payload files for your API data. By separating the code from the content you can easily re-generate your content without the need to re-build your whole site. That means once your site is built and you only want to change your content you can still call `nuxt generate` but this time it will re-generate your content only as the build will be cached, and as the content doesn't need to go through webpack it means content regeneration is lightening fast.

If you want to generate static sites, using Nuxt >= v2.13, you will need to add `static` as the `target` in your nuxt.config file. The default value for `target` is `server`.

`nuxt.config.js`

```js
export default {
  target: 'static'
}
```

To learn more about the new static target checkout our [article](/blog/going-full-static)

<div class="Alert">

See [How to deploy on Netlify?](/faq/netlify-deployment) for more details on how to deploy to Netlify.

</div>
