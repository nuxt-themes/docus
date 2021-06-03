---
title: Файлы исходного кода
description: По-умолчанию, Nuxt.js использует vue-loader, file-loader и url-loader для Webpack'а, чтобы обрабатывать файлы с исходным кодом.
category: getting-started
position: 107
---

> По-умолчанию, Nuxt.js использует vue-loader, file-loader и url-loader для Webpack'а, чтобы обрабатывать файлы с исходным кодом.

По-умолчанию, [vue-loader](http://vue-loader.vuejs.org/en/) автоматически обрабатывает файлы стилей и шаблонов совместно с `css-loader` и компилятором шаблонов Vue. В этом процессе все URL файлов, такие как `<img src="...">`, `background: url(...)` и CSS `@import`, трактуются как модульные зависимости.

Например, у нас следующая структура файлов:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

Если в CSS мы используем `url('~assets/image.png')`, то эта строчка будет преобразована в `require('~assets/image.png')`.

Если код страницы `pages/index.vue` следующий:

```html
<template>
  <img src="~assets/image.png" />
</template>
```

То он будет преобразован к виду:

```js
createElement('img', { attrs: { src: require('~assets/image.png') } })
```

Из-за того, что `.png` — не JavaScript-файл, то Nuxt.js конфигурирует Webpack таким образом, чтобы [file-loader](https://github.com/webpack/file-loader) и [url-loader](https://github.com/webpack/url-loader) сделали преобразования вместо вас.

Это даёт нам следующие плюшки:

- `file-loader` позволяет указать, куда копировать файлы с исходным кодом и как его назвать с использованием хеша для правильного кеширования.
- `url-loader` позволяет (по условию) сконвертировать и включить содержимое файла в формате base-64 в случае, если его размер не превосходит допустимый размер. Подоный подход уменьшает количество HTTP-запросов при наличие обычных файлов. Если размер файла больше допустимого размера, процесс автоматически переходит к `file-loader`.

Конфигурация Nuxt.js по-умолчанию следующая:

```js
;[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 KO
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 KO
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

Такая конфигурация означает, что каждый файл с размером, меньшим 1 KO, будет преобразован в формат base-64 и подставлен вместо URL. В противном случае, изображение/шрифт будут скопированы в соответствующую под-папку папки `.nuxt` и переименованы с использованием хеша, содержащего версию файла для правильного кеширования.

При запуске приложения с помощью `nuxt`, шаблон `pages/index.vue`:

```html
<template>
  <img src="~assets/image.png" />
</template>
```

Будет преобразован в:

```html
<img src="/_nuxt/img/image.0c61159.png" />
```

Если вы хотите обновить эти загрузчики или отключить их, пожалуйста, обратитесь к [конфигурации загрузчиков](/api/configuration-build).
