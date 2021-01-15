---
title: Assets
menuTitle: Assets
category: Usage
position: 5
---

## Images

Docus support light and dark mode 🌗.

In order to display an image for a specific mode, you can use `dark-img` and `light-img` classes.

<code-group>
<code-block label="Preview" active>

<div class="p-4 border-2 border-t-0 dark:border-gray-700 rounded-b-md">
  <img src="/logo-light.svg" class="light-img" alt="Logo light" style="margin:0;"/>
  <img src="/logo-dark.svg" class="dark-img" alt="Logo dark" style="margin:0;" />
  <p class="flex items-center" style="margin-bottom:0;">Switch between light and dark mode:&nbsp;<color-switcher class="inline-flex ml-2"></color-switcher></p>
</div>

</code-block>
<code-block label="Code">

```md
<img src="/logo-light.svg" class="light-img" alt="Logo light" />
<img src="/logo-dark.svg" class="dark-img" alt="Logo dark" />
```

</code-block>
</code-group>


### `static/`

This is where you put your static assets like the logo.

<alert type="info">

You can add a `static/icon.png` file to enable [nuxt-pwa](https://pwa.nuxtjs.org/) and generate a favicon automatically.

*Icon should be a square of at least 512x512*

</alert>

<alert type="info">

You can add a `static/preview.png` file to have a social preview image in your metas.

*Image should be at least 640×320px (1280×640px for best display).*

</alert>
