---
title: Runtime Config
description: Runtime config allows passing dynamic config and environment variables to the nuxt context
category: getting-started
position: 111
---

Nuxt.js supports [env](/api/configuration-env) config to provide configuration via `process.env`. This is done by webpack's [DefinePlugin](https://webpack.js.org/plugins/define-plugin/).

This approach had two downsides:

- Values are read during build time and persisted into webpack bundle. So for a change to `process.env` we need to rebuild which is against [12factor](https://12factor.net/) app design
- It can easily mislead to expose secret keys to client-side bundle

You can learn more about why we are [moving from @nuxtjs/dotenv to runtime config](/blog/moving-from-nuxtjs-dotenv-to-runtime-config).

### Runtime Config (2.13+)

Two new options added to `nuxt.config` to allow passing runtime configuration which is then accessible using context `$config`.

Config is added to Nuxt payload (`__NUXT__.config`) so there is no need to rebuild to update runtime configuration. SSR, SPA, and Static targets supported with an exception that for static target, a regenerate is necessary.

```js
export default {
  publicRuntimeConfig: {},
  privateRuntimeConfig: {}
}
```

- `publicRuntimeConfig` is available using `$config` in both server and client.
- `privateRuntimeConfig` is **only available on server** using same `$config` (it overrides `publicRuntimeConfig`)

### Usage

`$config` is available anywhere from context (including pages, store and plugins)

```js
export default {
  asyncData({ $config: { baseURL } }) {
    fetch(`${baseURL}/test`)
  },
  mounted() {
    console.log(this.$config.testValue)
  }
}
```

### `.env` support

If you have `.env` file in project root directory, it will be automatically loaded using [dotenv](https://github.com/motdotla/dotenv) and is accessible via `process.env`.

`process.env` is updated so we can use it right inside `nuxt.config` for runtime config. Values are interpolated and expanded with an improved version of [dotenv-expand](https://github.com/motdotla/dotenv-expand).

`.env` file is also watched to reload during `nuxt dev`. You can customize the env path by using `--dotenv <file>` or disabling with `--dotenv false`.

### Expand/Interpolation Support

> Supported both for dotenv and runtime config.

Expand for runtime config happens only if there is already a key (see `API_SECRET` example).

Interpolation allows easy nesting env vars (see `baseURL` example).

`.env`:

```config
BASE_URL=/api
PUBLIC_URL=https://nuxtjs.org
API_SECRET=1234
```

`nuxt.config.js`:

```js
export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL
  },
  privateRuntimeConfig: {
    baseURL: '${PUBLIC_URL}${BASE_URL}',
    API_SECRET: '${API_SECRET}' // similar to using process.env.API_SECRET
  }
}
```

Note, it is possible to use a function for `publicRuntimeConfig` and `privateRuntimeConfig` but not recommended.
