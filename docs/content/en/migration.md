---
title: Migrate from @nuxt/content-theme-docs
menuTitle: Migration
category: More
description: 'Migrate from @nuxt/content-theme-docs to Docus'
position: 17
---

By migrating to docus, you will have a fresh new design for your documentation ✨

<div class="flex flex-wrap">
  <div class="w-full md:pr-2 md:w-1/2">
    <h3 style="margin-top: 0;">Before</h3>
    <a href="https://user-images.githubusercontent.com/904724/105030429-11f5b480-5a54-11eb-9f40-7c18a0d5dafc.png">
      <img src="https://user-images.githubusercontent.com/904724/105030429-11f5b480-5a54-11eb-9f40-7c18a0d5dafc.png" alt="before docus" style="margin: 0;"/>
    </a>
  </div>
  <div class="w-full md:pl-2 md:w-1/2">
    <h3 style="margin-top: 0;">After</h3>
    <a href="https://user-images.githubusercontent.com/904724/105030439-1326e180-5a54-11eb-9f33-ead9a2d2aa15.png">
      <img src="https://user-images.githubusercontent.com/904724/105030439-1326e180-5a54-11eb-9f33-ead9a2d2aa15.png" alt="with docus" style="margin: 0;"/>
    </a>
  </div>
</div>

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

```ts
import { withDocus } from 'docus'

export default withDocus({
  // Additional nuxt configuration
})
```

</code-block>
<code-block label="Old">

```ts
import theme from '@nuxt/content-theme-docs'

export default theme({
  // [additional nuxt configuration]
})
```

</code-block>
</code-group>

If you specified a primary color, you need to change from `docs.primaryColor` to `docus.colors.primary`:

<code-group>
  <code-block label="New" active>

```ts
import { withDocus } from 'docus'

export default withDocus({
  docus: {
    colors: {
      primary: '#E24F55'
    }
  }
})
```

</code-block>
<code-block label="Old">

```ts
import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#E24F55'
  }
})
```

</code-block>
</code-group>

You can now redeploy your application to take advantage of `docus` and its new features!
