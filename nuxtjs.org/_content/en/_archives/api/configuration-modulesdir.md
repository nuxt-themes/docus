---
title: 'The modulesDir Property'
description: Define the modules directory for your Nuxt.js application
menu: modulesDir
category: configuration
position: 120
---

- Type: `Array`
- Default: `['node_modules']`

> Used to set the modules directories for path resolving, for example: Webpack's `resolveLoading`, `nodeExternals` and `postcss`. Configuration path is relative to [options.rootDir](/api/configuration-rootdir) (default: `process.cwd()`).

Example (`nuxt.config.js`):

```js
export default {
  modulesDir: ['../../node_modules']
}
```

Setting this field may be necessary if your project is organized as a Yarn workspace-styled mono-repository.
