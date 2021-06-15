---
title: 'Moving from @nuxtjs/dotenv to runtime config'
description: 'In our frontend applications, we often use APIs and third-party integrations which require us to use configuration data which is usually provided by environment variables. These variables should not be exposed to the frontend as the browser environment is accessible by all visitors.'
imgUrl: blog/moving-from-nuxtjs-dotenv-to-runtime-config/main.jpeg?cover=new
imgCredits: Norris Niman
imgCreditsUrl: https://unsplash.com/@norrisniman
date: 2020-06-15
authors:
  - name: "Debbie O'Brien"
    avatarUrl: https://pbs.twimg.com/profile_images/1252900852156772352/JLIVJ-TC_400x400.jpg
    link: https://twitter.com/debs_obrien
tags:
  - Nuxt
  - env
---

It's time to migrate from @nuxtjs/dotenv module to use our new runtime config which has been released as of Nuxt v2.13.

- [What are environment variables](#what-are-environment-variables)
- [Misconceptions](#misconceptions)
- [Why we need webpack](#why-we-need-webpack)
- [How environment variables work](#how-environment-variables-work)
- [Introducing the Nuxt.js runtime config](#introducing-the-nuxtjs-runtime-config)
  - [The new runtime config values are:](#the-new-runtime-config-values-are)
- [Migrating to the Nuxt.js runtime config from @nuxtjs/dotenv](#migrating-to-the-nuxtjs-runtime-config-from-nuxtjsdotenv)
- [Migrating to the Nuxt.js runtime config from the env property](#migrating-to-the-nuxtjs-runtime-config-from-the-env-property)
- [The env property v runtime config](#the-env-property-v-runtime-config)
- [Using your config values](#using-your-config-values)
- [Migrating your config values in your script tags](#migrating-your-config-values-in-your-script-tags)
- [Migrating your config values in your templates](#migrating-your-config-values-in-your-templates)
- [Expand/Interpolation Support](#expandinterpolation-support)
- [Best Practices:](#best-practices)
- [What to do next](#what-to-do-next)

## What are environment variables

In our frontend applications, we often use APIs and third-party integrations which require us to use configuration data which is usually provided by environment variables. These variables should not be exposed to the frontend as the browser environment is accessible by all visitors. Instead, we can store sensitive information, like keys and secrets, in password-protected CI tools or deployment pipelines. However, when we are developing applications locally we might not have access to deployment pipelines and therefore need somewhere to store these environment variables.

## Misconceptions

It is very easy to think that your secret keys are safe by placing them somewhere other than your source code such as a `.env` file, which makes it very easy to expose your secret keys to client-side bundles. Adding your `.env` file to `.gitignore` means this file is not pushed to your version control and therefore not available for people to see which is important if your repo is public. However, the .env file is not encrypted, and therefore placing secrets in environment variables doesn't really provide us with an increase in security and really it just keeps sensitive data out of plain sight. A `.env` option can easily mislead developers to expose secret keys to client-side bundles so always make sure this file is added to your .gitignore.

## Why we need webpack

Isomorphic applications, otherwise known as universal applications, need to share code between both the server and the client. Babel is used to compile our modern ES6 JavaScript code down to ES5 JavaScript so that it can work across all platforms. Node.js which is an asynchronous event-driven JavaScript runtime that can be used in computers and servers outside of a browser environment, uses the module system.

Using modules in Node.js is done using require, e.g. require('lodash'). However, browser support for modules is still incomplete and therefore we need bundling tools such as webpack to transpile these modules into code that the browsers can read. Webpack basically makes client-side development more "Node-like" with the same module system semantics. This means that a require statement or an ES6 import statement will resolve the same way. And as our applications are not only JavaScript but also HTML, CSS and images we can require these using webpack's loaders.

## How environment variables work

At runtime, Node.js automatically loads environment variables into `process.env` so that they are available to use in your application. The reference to the environment variable is replaced with the correct value. For example, if you had an `API_SECRET` key with the value of `'my-secret'` then in your application where you had used `process.env.API_SECRET` this would be replaced with the value of my-secret.

Values are read during build time and persisted in the webpack bundle. Therefore if we change our `API_SECRET` we will need to rebuild our application so that it can read the new value.

## Introducing the Nuxt.js runtime config

With Nuxt.js 2.13+ we have runtime config and built-in dotenv support providing better security and faster development! Two new options are added to your `nuxt.config.js` file which will allow passing runtime configuration which is then accessible using `$config` from the context. Despite the `env` option, runtime config is added to the Nuxt payload so there is no need to rebuild in order to update the runtime configuration when working in development or with Server-side rendering or single-page applications. Although for static sites you will still need to regenerate your site to see these changes.

```js{}[nuxt.config.js]
export default {
  publicRuntimeConfig: {},
  privateRuntimeConfig: {}
}
```

### The new runtime config values are:

- `publicRuntimeConfig` should hold all env variables that are public as these will be exposed on the frontend. This could include a reference to your public URL for example.
- `privateRuntimeConfig` should hold all env variables that are private and that should not be exposed on the frontend. This could include a reference to your API secret tokens for example.

⚠️ privateRuntimeConfig always overrides publicRuntimeConfig on server-side. `$config` in server mode is { ...public, ...private } but for client mode only { ...public }

## Migrating to the Nuxt.js runtime config from @nuxtjs/dotenv

If you have the `@nuxtjs/dotenv` module installed then you can remove this module by uninstalling it and removing it from the modules section of your nuxt.config file. You can then migrate to the Nuxt.js runtime config by adding the new properties to your nuxt.config.js file. And then you can add your variables from your `.env` files into your public and private runtime config properties so that Nuxt.js has access to these variables at runtime.

If your `.env` file looks something like this:

```{}[.env]
BASE_URL=https://nuxtjs.org
API_SECRET=1234
```

Then migrating it to the new runtime config would look something like:

```js{}[nuxt.config.js]
export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL
  },
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  }
}
```

This can be simplified even further by using a default value instead of having to maintain the value in both the runtime config and the `.env` file when using non-sensitive values.

```js{}[nuxt.config.js]
export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://nuxtjs.org'
  }
}
```

Also this can be a better replacement for `.env.example` and the default values can point to staging keys/configs.

```js{}[nuxt.config.js]
export default {
  publicRuntimeConfig: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://nuxtjs.org' : 'https://dev.nuxtjs.org'
  }
}
```

## Migrating to the Nuxt.js runtime config from the env property

If you have your env variables stored in your nuxt.config then you can migrate these to use the new runtime configs by adding them to your nuxt.config file.

If your env variables in your nuxt.config look like this:

```js{}[nuxt.config.js]
export default {
  env: {
    BASE_URL: 'https://nuxtjs.org',
    API_SECRET: '1234'
  }
}
```

Then migrating it to the new runtime config would look something like:

```js{}[nuxt.config.js]
export default {
  publicRuntimeConfig: {
    baseURL: 'https://nuxtjs.org'
  },
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  }
}
```

⚠️ Remember secret keys should not be placed in your nuxt.config file so if you do have them in your env variables then you should remove them. You can create a .env file if needed or else your secret keys can be stored just in your hosting environment.

## The env property v runtime config

You can still use the env property and it is still useful for env variables that are required at build time rather than runtime such as NODE_ENV=staging or VERSION=1.2.3. However for runtime env variables the runtime config is preferred as using the env property can be as dangerous as using the dotenv module when used incorrectly.

## Using your config values

Once you have stored your values in the public or private runtime config in your `nuxt.config` file you can then access these values anywhere by using the context in your pages, store, components and plugins by using `this.$config` or `context.$config` instead.

```html{}[pages/index.vue]
<script>
  asyncData ({ $config: { baseURL } }) {
  	const posts = await fetch(`${baseURL}/posts`)
      .then(res => res.json())
  }
</script>
```

And inside your templates you can access it directly using `{{ $config.* }}`

```html{}[pages/index.vue]
<template>
  <p>Our Url is: {{ $config.baseURL}}</p>
</template>
```

## Migrating your config values in your script tags

If you are already using the env variable in your script tags such as in async data

```js
async asyncData ({ env }) {
```

then you can just replace env for \$config when passing into the context. Here we also pass in the key from the config that we want to access. In this case baseURL.

```js
async asyncData ({ $config: { baseURL } }) {
```

Then instead of using env.apiUrl

```js
const posts = await fetch(`${env.baseURL}/posts`)
```

you can use baseURL direct in your code as we have already passed this in into the config option above and therefore we don't have to reference \$config in our fetch.

```js
const posts = await fetch(`${baseURL}/posts`)
```

## Migrating your config values in your templates

If you have code that is using the env variables you can migrate to using the \$config option. For example if in your code you had

```html
<p>{{process.env.baseURL}}</p>
```

You can change this by using \$config instead

```html
<p>{{$config.baseURL}}</p>
```

## Expand/Interpolation Support

Expand for run time config happens only if there is already a key.

```bash{}[.env]
API_SECRET=1234
```

```js{}[nuxt.config.js]
export default {
  privateRuntimeConfig: {
    API_SECRET: ''
  }
}
```

Interpolation allows nesting env vars.

```bash{}[.env]
BASE_URL=/api
PUBLIC_URL=https://nuxtjs.org
```

```js{}[nuxt.config.js]
export default {
  privateRuntimeConfig: {
    baseURL: '${PUBLIC_URL}${BASE_URL}'
  }
}
```

ℹ️ It is also possible to use a function for publicRuntimeConfig and privateRuntimeConfig but not recommended.

## Best Practices:

🚫 Don’t commit sensitive values or secret keys to git

🚫 Don't store secret keys or sensitive values in your nuxt.config or `.env` unless is gitignored

✅ Use default values for runtimeConfig such as process.env.baseURL || 'https://nuxtjs.org'

✅ Store secret keys correctly using your hosting platform such as on Heroku or Netlify etc

✅ Follow JS naming convention (secretKey rather than SECRET_KEY) for runtimeConfig

✅ Prefer using runtimeConfig rather than `env` option

## What to do next

- To learn more about going full static checkout [this article](/blog/going-full-static).
- [Subscribe to the newsletter](#subscribe-to-newsletter) to not miss the upcoming articles and resources.
