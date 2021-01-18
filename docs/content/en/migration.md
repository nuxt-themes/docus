---
title: Migrate from @nuxt/content-theme-docs
menuTitle: Migration
category: More
description: 'Migrate from @nuxt/content-theme-docs'
position: 17
---

In order to move from `@nuxt/content-theme-docs` to `docus` you need to install the new package:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn remove @nuxt/content-theme-docs && yarn add docus
```

</code-block>
<code-block label="NPM">

```bash
npm uninstall @nuxt/content-theme-docs && npm install docus
```

</code-block>
</code-group>

Then, instead of importing `@nuxt/content-theme-docs`, you need to import `docus` in your `nuxt.config.js`:

<code-group>
  <code-block label="New" active>

```js
import { withDocus } from 'docus'

export default withDocus({
  // Additional nuxt configuration
})
```

</code-block>
<code-block label="Old">

```js
import theme from '@nuxt/content-theme-docs'

export default theme({
  // [additional nuxt configuration]
})
```

</code-block>
</code-group>

You can now redeploy your application to take advantage of `docus` and its new features!
