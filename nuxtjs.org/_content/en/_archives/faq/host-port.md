---
title: How to edit host and port?
description: How to edit host and port with Nuxt.js?
category: configuration
position: 7
---

By default, Nuxt development server host is `localhost` (only accessible from within the host machine).

Host `0.0.0.0` is designated to tell Nuxt to resolve a host address, which is accessible to connections _outside_ of the host machine (e.g. LAN).

You can configure the connection variables in different ways. They are listed **from highest to lowest priority**.

> **Note:** If `port` is assigned the string value of `'0'` (not `0`, which is falsy), a random port will be assigned to your Nuxt application.

## As direct arguments

```sh
nuxt --hostname myhost --port 3333
```

Or

```js
"scripts": {
  "dev": "nuxt --hostname myhost --port 3333"
}
```

## Configure in `nuxt.config.js`:

Inside your `nuxt.config.js`:

```js
export default {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
  // other configs
}
```

## With NUXT_HOST and NUXT_PORT env variables

Similar to HOST and PORT but more specific in case you need those for something else.

```js
"scripts": {
  "dev": "NUXT_HOST=0.0.0.0 NUXT_PORT=3333 nuxt"
}
```

## With HOST and PORT env variables

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

## Via a `nuxt` config in the `package.json`:

Inside your `package.json`:

```json
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3333"
  }
},
"scripts": {
  "dev": "nuxt"
}
```
