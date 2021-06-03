---
title: Конфигурация CSS
description: Nuxt.js позволяет указать глобальные CSS-файлы/модули/библиотеки (подключённые к каждой странице).
menu: css
category: configuration
position: 104
---

# CSS

> Nuxt.js позволяет указать глобальные CSS-файлы/модули/библиотеки (подключённые к каждой странице).

- Type: `Array`
- `String | Object`

Если элемент типа объект, то параметры следующие:

- src: `String` (путь к файлу)
- lang: `String` ([используется пре-процессор](/guide/configuration#using-pre-processors))

В `nuxt.config.js` добавьте ресурсы CSS:

```js
module.exports = {
  css: [
    // Загрузить модуль node.js
    'hover.css/css/hover-min.css',
    // модуль node.js, но с указанием пре-процессора
    { src: 'bulma', lang: 'sass' },
    // CSS-файл в проекте
    '~assets/css/main.css'
  ]
}
```

<div class="Alert">

**В продакшн-версии приложения** весь CSS-код будет минимизирован, скомпилирован в файл `styles.css` и добавлен в блок страницы `<head>`.

</div>
