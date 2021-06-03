---
title: my title
description: my description
imgUrl: blog/filename/main.jpg
date: 2020-MM-DD
authors:
  - name: Sebastien Chopin
    avatarUrl: https://pbs.twimg.com/profile_images/1042510623962275840/1Iw_Mvud_400x400.jpg
    link: https://twitter.com/Atinux
tags:
  - tag1
  - tag2
  - tag3
---

Thanks for contributing to the Nuxt Blog. Here is some example content to get you started. Feel free to use it or just delete it. Don't forget to modify the details in the yaml above to show your name etc. Your blog post will appear on the main page automatically so just make sure the date is correct or you won't see it as the top article. You can have more than one article and you can have more or less than 3 tags. Have fun.

## Example TOC

- [Example TOC](#example-toc)
- [Nuxt/NuxtJS/Nuxt.js](#nuxtnuxtjsnuxtjs)
- [Example image](#example-image)
- [Example codeblock](#example-codeblock)
- [Example code](#example-code)
- [Base Alerts](#base-alerts)
- [Example video](#example-video)

## Nuxt/NuxtJS/Nuxt.js

Nuxt.js is the open source framework and we use this to talk about anything that references the framework whereas we use NuxtJS to mention anything about the company such as the NuxtJS shop. Nuxt is used in general to mention Nuxt related things when it makes no sense to use Nuxt.js or NuxtJS for example when referencing commands, nuxt start, nuxt generate etc.

## Example image

Images are stored in the static folder under blog and in a folder with your filename.

![My image alt tag](blog/going-dark-with-nuxtjs-color-mode/list-of-colors.png)

## Example codeblock

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxt/content
```

</code-block>
<code-block label="npm">

```bash
npm install @nuxt/content
```

  </code-block>
</code-group>

## Example code

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

## Base Alerts

<base-alert>

alert default is warning

</base-alert>

<base-alert type="info">

if you have some info to share

</base-alert>

## Example video

<video poster="https://res.cloudinary.com/nuxt/video/upload/v1595852304/nuxt-smart-generate_pjaat1.jpg" loop="loop" plays-inline="true" controls="controls">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1595852304/nuxt-smart-generate_pjaat1.webm" type="video/webm">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1595852304/nuxt-smart-generate_pjaat1.mp4" type="video/mp4">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1595852304/nuxt-smart-generate_pjaat1.ogv" type="video/ogg">
</video>
