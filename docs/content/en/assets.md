---
title: Assets
menuTitle: Assets
category: Usage
position: 5
---

## Favicon and PWA Icon

You can add a `static/icon.png` image to enable [nuxt-pwa](https://pwa.nuxtjs.org) and generate a favicon automatically.

<alert>

`icon.png` should be a square of at least 512x512px/

</alert>

## Social preview

You can add a `static/preview.png` image to have a social preview image in your metas.

<alert>

`preview.png` should be at least 640×320px (1280×640px for best display).

</alert>

## Images with dark mode

Docus support light and dark mode 🌗.

In order to display an image for a specific mode, you can use `dark-img` and `light-img` classes.

<code-group>
<code-block label="Preview" active>

<div class="p-4 border-2 border-t-0 border-gray-700 rounded-b-md">
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
