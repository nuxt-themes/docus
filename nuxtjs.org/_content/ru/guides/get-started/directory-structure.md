---
title: Структура директорий
description: Стандартная структура Nuxt.js приложения призвана стать хорошей отправной точкой для больших и малых проектов. Тем не менее, вы можете создать нужную вам структуру директорий.
position: 3
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/03_directory_structure?fontsize=14&hidenavigation=1&theme=dark
---

Стандартная структура Nuxt.js приложения призвана стать хорошей отправной точкой для больших и малых проектов. Тем не менее, вы можете организовать собственную структуру директорий.

Давайте создадим директории и файлы, если их еще нет

```bash
mkdir components assets static
touch nuxt.config.js
```

Это основные директории и файлы, которые нужны для создания Nuxt.js приложения. Вы найдете информацию по каждой из них ниже.

<base-alert type="info">

Создание директорий с этими именами включает функции в вашем Nuxt.js проекте.

</base-alert>

## Директории

### Директория `pages`

Директория `pages` включает маршруты вашего приложения и их оформление. Фреймворк читает все ваши `.vue` файлы внутри директории и настраивает маршрутизацию приложения.

<base-alert type="next">

[Подробнее о страницах](/docs/2.x/directory-structure/pages)

</base-alert>

### Директория `components`

Директория `components` включает ваши Vue.js компоненты, которые вы будете импортировать в компоненты страниц.

С Nuxt.js вы можете создать компоненты и автоматически импортировать их в любые `.vue` файлы, не указывая при этом явно импорт этих компонентов в секции script. Nuxt.js будет сканировать и импортировать ваши компоненты автоматически, если в файле конфигурации установлено `components: true`.

<base-alert type="next">

[Подробнее о компонентах](/docs/2.x/directory-structure/components)

</base-alert>

### Директория `assets`

Директория `assets` включает ваши нескомпилированные ресурсы, такие как Stylus или Sass файлы, изображения, или шрифты.

<base-alert type="next">

[Подробнее о ресурсах](/docs/2.x/directory-structure/assets)

</base-alert>

### Директория `static`

Директория `static` напрямую сопоставлена с корнем сервера (`/static/robots.txt` будет доступен на `http://localhost:3000/robots.txt`) и включает файлы, которые не будут изменяться (например, иконка приложения)

<base-alert type="next">

[Подробнее о директории static](/docs/2.x/directory-structure/static)

</base-alert>

### Файл nuxt.config.js

Файл `nuxt.config.js` включает ваши настройки Nuxt.js. Если вам нужно добавить модули или изменить настройки по умолчанию, то это место, где это можно сделать.

<base-alert type="next">

[Подробнее о `nuxt.config.js`](/docs/2.x/directory-structure/nuxt-config)

</base-alert>

### Файл package.json

Файл `package.json` включает зависимости и скрипты вашего приложения.

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## Больше о структуре проекта

Существуют другие полезные директории: [content](/docs/2.x/directory-structure/content), [layouts](/docs/2.x/directory-structure/layouts), [middleware](/docs/2.x/directory-structure/middleware), [modules](/docs/2.x/directory-structure/modules), [plugins](/docs/2.x/directory-structure/plugins) и [store](/docs/2.x/directory-structure/store). Они не нужны для небольших приложений и здесь мы их не рассматриваем.

<base-alert type="next">

Чтобы детально изучить директории, прочтите [раздел о структуре директорий](/docs/2.x/directory-structure/nuxt).

</base-alert>
