---
title: Переходы между маршрутами
description: Nuxt.js использует компонент transition, который позволяет создавать поразительную анимацию при переходах между маршрутами.
youtube: https://www.youtube.com/embed/RIXOzJWFfc8
---

> Nuxt.js использует компонент [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components), который позволяет создавать поразительную анимацию при переходах между маршрутами

## Использование

**По-умолчанию, название анимации для перехода в Nuxt.js — `"page"`.**

Чтобы добавить анимацию для перехода между любыми страницами приложения, необходим CSS-файл, который является общим для всех маршрутов. Создадим такой файл в папке `assets`:

Общий CSS-код в `assets/main.css`:

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
```

Добавить путь к файлу в `nuxt.config.js`:

```js
module.exports = {
  css: ['assets/main.css']
}
```

И вуаля! Все маршруты меняют друг друга с красивым эффектом затухания.

## Свойство `transition`

Вы можете изменить стандартные настройки переходов, добавив свойство `transition` в файл `nuxt.config.js`:

```js
module.exports = {
  transition: 'test'
  // or
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js будет использовать эти настройки для создания компонента перехода:

```html
<transition name="test" mode="out-in"></transition>
```

Узнать больше о компоненте `<transition>` библиотеки Vue.js: http://vuejs.org/v2/guide/transitions.html

Следующие параметры могут быть использованы для `transition`:

| Имя                | Тип       | По-умолчанию | Описание                                                                                                                                                                                                     |
| ------------------ | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`             | Строка    | `"page"`     | Название перехода, применяется для всех маршрутов приложения.                                                                                                                                                |
| `mode`             | Строка    | `"out-in"`   | Режим перехода, применяется для всех маршрутов приложения [документация Vue.js](http://vuejs.org/v2/guide/transitions.html#Transition-Modes).                                                                |
| `css`              | Булевское | `true`       | Указывает, добавлять или нет CSS-класс для анимации перехода. По-умолчанию — true. Если установлен в false, то будет вызываеться только JavaScript-хуки, которые зарегистрированы через события компонентов. |
| `type`             | Строка    | `n/a`        | Тип события, которое вызывается при завершении анимации перехода. Доступные значения: "transition" и "animation". Если не указан, то автоматически будет выбран с дольшей продолжительностью.                |
| `enterClass`       | Строка    | `n/a`        | Название CSS-класса для начального состояния анимации перехода. См. [документацию Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes)                                             |
| `enterToClass`     | Строка    | `n/a`        | Название CSS-класса для конечного состояния анимации перехода. См. [документацию Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes)                                              |
| `enterActiveClass` | Строка    | `n/a`        | Название CSS-класса, применяемого в течение анимации перехода. См. [документацию Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes)                                              |
| `leaveClass`       | Строка    | `n/a`        | Название CSS-класса для начального состояния анимации перехода. См. [документацию Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes)                                             |
| `leaveToClass`     | Строка    | `n/a`        | Название CSS-класса для конечного состояния анимации перехода. См. [документацию Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes)                                              |
| `leaveActiveClass` | Строка    | `n/a`        | Название CSS-класса, применяемого в течение анимации перехода. См. [документацию Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes)                                              |

_Заметка: если свойство `transition` принимает в качестве значения строку, оно будет использовано в качестве `transition.name`._

Вы также можете определить методы внутри `transition`, которые используются для [хуков JavaScript](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks)

- beforeEnter(el)
- enter(el, done)
- afterEnter(el)
- enterCancelled(el)
- beforeLeave(el)
- leave(el, done)
- afterLeave(el)
- leaveCancelled(el)

_Заметка: хорошей идеей является явное задание `css: false` для тех переходов, которые выполняются только с помощью JavaScript. В этом случае Vue не будет стараться определить наличие CSS для анимации. Такой подход также избавляет от возможного вмешательства CSS-стилей в происходящую анимацию._

## Анимация переходов для отдельных страниц

Чтобы создать уникальную анимацияю перехода для отдельной страницы, просто добавьте свойство `transition` в компонент страницы.

Например, установить эффект перехода `bounce` для страницы `pages/about.vue`:

```html
<template>
  <div class="container">
    <h1>О компании</h1>
    <nuxt-link to="/">На главную</nuxt-link>
  </div>
</template>

<script>
  export default {
    transition: 'bounce'
  }
</script>
```

Затем добавьте CSS-стили для указанной анимации перехода в файл `assets/main.css`:

```css
.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
```

_Заметка: вы также можете указать свойство `transition` в виде объекта в компоненте страницы, точно так же, как в файле конфигурации приложения._

## Динамическия переходы

Для создания динамического перехода между маршрутами, который зависит от параметров маршрута, установите свойство `transition` в значение `function`.

Пример динамического перехода для страницы `pages/posts.vue`:

```html
<script>
  export default {
    transition(to, from) {
      if (!from) return 'slide-left'
      return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
    }
  }
</script>
```

В итоге, следующие эффекты перехода будут применяться, в зависимости от маршрута:

- `/` к `/posts` => `slide-left`
- `/posts` к `/posts?page=3` => `slide-left`
- `/posts?page=3` к `/posts?page=2` => `slide-right`
