---
title: Установка
description: Начать работу с Nuxt.js действительно очень легко. Простой проект требует лишь указания зависимости `nuxt` в package.json.
category: getting-started
position: 101
---

> Начать работу с Nuxt.js действительно очень легко. Простой проект требует лишь указания зависимости `nuxt` в package.json.

<div>
  <a href="https://vueschool.io/courses/nuxtjs-fundamentals/?friend=nuxt" target="_blank" class="Promote">
    <img src="/nuxt-fundamentals.png" srcset="/nuxt-fundamentals-2x.png 2x" alt="Nuxt Fundamentals by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Nuxt.js Fundamentals</h4>
      <p class="Promote__Content__Description">Learn how to get started quickly with Nuxt.js in videos.</p>
      <p class="Promote__Content__Signature">Video courses made by VueSchool to support Nuxt.js developpement.</p>
    </div>
  </a>
</div>

## Использование стартового шаблона Nuxt.js

Для быстрого запуска приложения команда Nuxt.js создала [стартовый шаблон](https://github.com/nuxt-community/starter-template).

[Скачайте .zip](https://github.com/nuxt-community/starter-template/archive/master.zip), или установите стартовый шаблон с помощью vue-cli:

```bash
$ vue init nuxt-community/starter-template <project-name>
```

> Если [Vue CLI](https://github.com/vuejs/vue-cli) ещё не установлен, это можно сделать так: `npm install -g @vue/cli @vue/cli-init`

затем установите зависимости:

```bash
$ cd <project-name>
$ npm install
```

и запустите проект:

```bash
$ npm run dev
```

Теперь приложение доступно по адресу http://localhost:3000

<div class="Alert">

Nuxt.js отслеживает изменения файлов внутри папки `pages`, поэтому перезапускать приложение после добавления новых страниц не нужно.

</div>

Узнать больше о структуре папок проекта можно в разделе [Структура папок](/guide/directory-structure).

## Создание с нуля

Начать приложение Nuxt.js с нуля также очень просто — необходимы лишь _1 файл и 1 папка_. Давайте создадим новую папку:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

_Подсказка: замените project-name на название своего проекта._

### Файл package.json

Проекту необходим файл `package.json`, чтобы запустить `nuxt`:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

Раздел `scripts` запускает Nuxt.js командой `npm run dev`.

### Установка `nuxt`

После создания `package.json` добавьте `nuxt` в свой проект через npm:

```bash
$ npm install --save nuxt
```

### Папка `pages`

Nuxt.js преобразовывает файлы `*.vue` папки `pages` в маршруты приложения.

Создайте папку `pages`:

```bash
$ mkdir pages
```

затем создайте первую страницу `pages/index.vue`:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

и запустите приложение:

```bash
$ npm run dev
```

Теперь приложение доступно по адресу http://localhost:3000

<div class="Alert">

Nuxt.js отслеживает изменения файлов внутри папки `pages`, поэтому перезапускать приложение после добавления новых страниц не нужно.

</div>

Узнать больше о структуре папок проекта можно в разделе [Структура папок](/guide/directory-structure).
