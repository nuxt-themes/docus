---
title: Динамическая маршрутизация
description: Чтобы создать динамический маршрут с параметром в Nuxt.js, необходимо создать файл Vue с префиксом "_".
category: getting-started
position: 104
---

> Чтобы создать динамический маршрут с параметром, необходимо определить файл Vue **с префиксом "\_"** (нижнее подчеркивание).

## Структура папок

Структура файлов:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
```

автоматически сгенерирует:

```js
router: {
  routes: [
    {
      name: 'users',
      path: '/users',
      component: 'pages/users/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id',
      component: 'pages/users/_id.vue'
    }
  ]
}
```

## Валидация параметров в маршруте

```js
validate({ params, query }) {
  return true // если params валидно
  return false // остановит Nuxt.js при переходе на маршрут и покажет страницу ошибки
}
```

Nuxt.js позволяет определить метод валидации внутри компонента маршрута (в этом примере: `pages/users/_id.vue`). Если метод валидации не вернёт `true`, то Nuxt.js автоматически отобразит страницу 404 ошибки.

```js
<script>
export default {
  validate ({ params }) {
    // Должен быть числом
    return /^\d+$/.test(params.id)
  }
}
</script>
```
