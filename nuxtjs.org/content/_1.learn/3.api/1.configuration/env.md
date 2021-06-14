---
title: 'The env Property'
description: Share environment variables between client and server.
category: api-configuration
---

- Type: `Object`

> Nuxt.js lets you create environment variables client side, also to be shared from server side.

The env property defines environment variables that should be available on the client side. They can be assigned using server side environment variables, the [dotenv module](https://github.com/nuxt-community/dotenv-module) ones or similar.

**Make sure to read about `process.env` and `process.env == {}` below for better troubleshooting.**

```js{}[nuxt.config.js]
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

This lets you create a `baseUrl` property that will be equal to the `BASE_URL` server side environment variable if available or defined. If not, `baseUrl` in client side will be equal to `'http://localhost:3000'`. The server side variable BASE_URL is therefore copied to the client side via the `env` property in the `nuxt.config.js`. Alternatively, the other value is defined (http://localhost:3000).

Then, I can access my `baseUrl` variable in 2 ways:

1. Via `process.env.baseUrl`.
2. Via `context.env.baseUrl`, see [context API](/docs/internals-glossary/context).

You can use the `env` property for giving a public token for example.

For the example above, we can use it to configure [axios](https://github.com/mzabriskie/axios).

```js{}[plugins/axios.js]
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Then, in your pages, you can import axios like this: `import axios from '~/plugins/axios'`

## Automatic injection of environment variables

If you define environment variables starting with `NUXT_ENV_` in the build phase (f.ex. `NUXT_ENV_COOL_WORD=freezing nuxt build`, they'll be automatically injected into the process environment. Be aware that they'll potentially take precedence over defined variables in your `nuxt.config.js` with the same name.

## process.env == {}

Note that Nuxt uses webpack's `definePlugin` to define the environmental variable. This means that the actual `process` or `process.env` from Node.js is neither available nor defined. Each of the `env` properties defined in nuxt.config.js is individually mapped to `process.env.xxxx` and converted during compilation.

Meaning, `console.log(process.env)` will output `{}` but `console.log(process.env.your_var)` will still output your value. When webpack compiles your code, it replaces all instances of `process.env.your_var` to the value you've set it to. ie: `env.test = 'testing123'`. If you use `process.env.test` in your code somewhere, it is actually translated to 'testing123'.

before

```js
if (process.env.test == 'testing123')
```

after

```js
if ('testing123' == 'testing123')
```

## serverMiddleware

As [serverMiddleware](/docs/configuration-glossary/configuration-servermiddleware) is decoupled from the main Nuxt build, `env` variables defined in `nuxt.config.js` are not available there.
