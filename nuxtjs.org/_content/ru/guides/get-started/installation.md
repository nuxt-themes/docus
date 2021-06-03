---
title: Установка
description: Здесь вы найдете информацию по настройке и запуску Nuxt.js проекта за 4 шага.
position: 1
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/01_installation?fontsize=14&hidenavigation=1&theme=dark
---

## Необходимые условия

Здесь вы найдете информацию по настройке и запуску Nuxt.js проекта за 4 шага.

<base-alert type="info">

Другой способ начать работать с Nuxt.js - это использовать [CodeSandbox](https://template.nuxtjs.org). Это отличный вариант, чтобы поиграть с Nuxt.js и/или поделиться вашим кодом с другими.

</base-alert>

### Node

[node](https://nodejs.org/en/download/) - не ниже v8.9.0

_Мы рекомендуем использовать последнюю доступную версию._

### Редактор кода

Используйте тот, который вам нравится, но мы рекомендуем [VSCode](https://code.visualstudio.com/).

### Терминал

Используйте тот, который вам нравится, но мы рекомендуем интегрированный в VSCode [терминал](https://code.visualstudio.com/docs/editor/integrated-terminal).

## Настройка с нуля

Для создания Nuxt.js проекта с нуля требуется только один файл и одна директория.

В этом примере мы будем использовать терминал для создания директорий и файлов, но вы можете создавать их как вам удобно.

### Настройка проекта

Для начала создайте пустую директорию с именем проекта и перейдите в нее:

```bash
mkdir <project-name>
cd <project-name>
```

_Замените `<project-name>` на имя вашего проекта._

Затем создайте файл с именем `package.json`:

```bash
touch package.json
```

Откройте файл `package.json` в вашем редакторе и вставьте такой JSON код:

```json{}[package.json]
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "start": "nuxt start"
  }
}
```

В секции `scripts` указаны Nuxt.js команды, которые будут запущены при выполнении `npm run <имя_команды>`.

#### **Что такое файл package.json?**

`package.json` - это как паспорт вашего проекта. Если вы хотите больше узнать о файле `package.json`, то мы рекомендуем почитать [документацию npm](https://docs.npmjs.com/creating-a-package-json-file).

### Установка nuxt

После создания файла `package.json` добавьте `nuxt` в ваш проект, используя `npm` или `yarn`:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add nuxt
```

  </code-block>
  <code-block label="npm">

```bash
npm install nuxt
```

  </code-block>
</code-group>

Эта команда добавит `nuxt` как зависимость вашего проекта и обновит файл `package.json` автоматически. Также будет создана директория `node_modules`, в ней будут храниться установленные пакеты и их зависимости.

<base-alert type="info">

`yarn.lock` или `package-lock.json` также будут созданы для обеспечения совместимости зависимостей вашего проекта.

</base-alert>

### Создайте вашу первую страницу

Nuxt.js преобразует каждый файл `*.vue` внутри директории `pages` в маршрут приложения.

Создайте директорию `pages` в вашем проекте:

```bash
mkdir pages
```

Затем создайте файл `index.vue` в директории `pages`:

```bash
touch pages/index.vue
```

Важно, чтобы страница называлась именно `index.vue`, так как это страница, которая будет показываться при открытии приложения. Это главная страница, потому должна называться index.

Откройте файл `index.vue` в вашем редакторе и добавьте следующее содержимое:

```html{}[pages/index.vue]
<template>
  <h1>Привет мир!</h1>
</template>
```

### Начало проекта

Запустите ваш проект, выполнив одну из команд ниже в вашем терминале:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
npm run dev
```

  </code-block>
</code-group>

<base-alert type="info">

Мы используем команду `dev` когда нам нужно запустить приложение в режиме разработки.

</base-alert>

Теперь приложение запущено по адресу **[http://localhost:3000](http://localhost:3000/).**

Откройте ваше приложение, нажав на ссылку в терминале, и вы увидите текст "Привет мир!", который мы добавили на предыдущем шаге.

<base-alert type="info">

Когда мы запускаем Nuxt.js в режиме разработки, изменения большинства директорий будут отслеживаться, поэтому нам не нужно перезапускать проект, например, после добавления новой страницы.

</base-alert>

<base-alert type="warning">

После выполнения команды `dev` будет создана директорния .nuxt. Эта директория должна игнорироваться системой контроля версий (git). Вы можете задать, какие файлы нужно игнорировать, создав файл `.gitignore` в корне вашего проекта и добавив туда .nuxt.

</base-alert>

### Бонусный шаг

Создайте страницу с именем `fun.vue` в директории `pages`.

Добавьте `<template></template>` с забавным заголовком внутри.

Откройте страницу **[http://localhost:3000/fun](http://localhost:3000/fun).**

<base-alert type="info">

Создайте директорию с именем `more-fun` и добавьте в нее файл `index.vue`. Это даст такой же результат, как если бы мы создали файл `more-fun.vue`

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## С использованием create-nuxt-app

Для быстрого старта вы можете использовать [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Убедитесь, что у вас установлен `npx` (`npx` встроен по умолчанию начиная с npm 5.2.0) или `npm v6.1` или `yarn`.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app <project-name>
```

  </code-block>
  <code-block label="npx">

```bash
npx create-nuxt-app <project-name>
```

  </code-block>
    <code-block label="npm">

```bash
npm init nuxt-app <project-name>
```

  </code-block>

</code-group>

Вам зададут несколько вопросов (имя проекта, настройки Nuxt, UI фреймворк, TypeScript, linter, фреймворк тестов, и т.д.), когда ответите , будут установлены все зависимости. Следующий шаг - перейти в директорию проекта и запустить его:

<code-group>
  <code-block label="Yarn" active>

```bash
cd <project-name>
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
cd <project-name>
npm run dev
```

  </code-block>
</code-group>

Теперь приложение запущено по адресу [http://localhost:3000](http://localhost:3000). Отлично сработано!
