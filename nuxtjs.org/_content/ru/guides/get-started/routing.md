---
title: Маршрутизация
description: 'Большинство сайтов имеют больше одной страницы. К примеру: главная страница, страница о нас, страница контактов и т.д. Для показа этих страниц нам понадобится Маршрутизатор.'
position: 2
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/02_routing?fontsize=14&hidenavigation=1&theme=dark
---

## Автоматическая маршрутизация

Большинство сайтов имеют более одной страницы (например: главная страница, страница о нас, страница контактов и т.д.). Для отображения этих страниц нам понадобится маршрутизатор. С этим нам поможет `vue-router`. При работе с Vue.js приложением у нас был файл конфигурации (`router.js`), в который мы добавляли свои маршруты. Nuxt.js автоматически генерирует конфигурационный файл `vue-router` на основе `.vue` файлов внутри директории `pages`. Поэтому вам не придется писать конфигурацию роутера самостоятельно! Nuxt.js также предоставляет автоматическое разделение кода (code-splitting) для всех маршрутов.

Другими словами, все, что нужно для настройки маршрутизации - это создать `.vue` файлы в директории `pages`.

<base-alert type="next">

Подробнее о [Маршрутизации](/docs/2.x/features/file-system-routing)

</base-alert>

## Навигация

Для навигации между страницами вашего приложения вы должны использовать компонент [NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component). Этот компонент - часть Nuxt.js и, следовательно, его не нужно импортировать, как вы обычно это делаете с другими компонентами. Он похож на HTML-тег `<a>`, за исключением того, что вместо `href="/about"` мы используем `to="/about"`. Если ранее вы использовали `vue-router`, то можете считать `<NuxtLink>` заменой `<RouterLink>`

Простая ссылка на страницу `index.vue` в директории `pages`:

```html{}[pages/index.vue]
<template>
  <NuxtLink to="/">Главная страница</NuxtLink>
</template>
```

Для всех ссылок на страницы вашего сайта используйте `<NuxtLink>`. Если у вас есть ссылки на другие сайты - используйте тег `<a>`. Взгляните на пример ниже:

```html{}[pages/index.vue]
<template>
  <main>
    <h1>Главная страница</h1>
    <NuxtLink to="/about"> О нас (внутренняя ссылка Nuxt) </NuxtLink>
    <a href="https://nuxtjs.org">Внешняя ссылка на другую страницу</a>
  </main>
</template>
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<base-alert type="next">

Подробнее о компоненте [NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

</base-alert>
