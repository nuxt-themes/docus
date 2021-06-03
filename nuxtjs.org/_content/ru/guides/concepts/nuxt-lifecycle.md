---
title: Жизненный цикл Nuxt
description: Не важно какой инструмент вы используете, вы всегда будете чувствовать себя более уверенно, когда поймете, как инструмент работает внутри (под капотом). Это относится и к Nuxt.js.
position: 5
category: concepts
img: /docs/2.x/nuxt-lifecycle.svg
imgAlt: understanding-nuxt-2-12-lifecycle-hooks
questions:
  - question: Когда начинается жизненный цикл Nuxt.js?
    answers:
      - Когда response (ответ) будет отправлен клиенту
      - После фазы сборки
      - При запуске nuxt dev
    correctAnswer: После фазы сборки
  - question: От каких основных факторов зависит содержание жизненного цикла?
    answers:
      - Какое время и дата у нас при запуске сервера
      - Включен ли рендеринг на стороне сервера и если да, то какой тип используется
      - На какой операционной системе запущено приложение Nuxt.js
    correctAnswer: Включен ли рендеринг на стороне сервера и если да, то какой тип используется
  - question: Когда вызывается nuxtServerInit?
    answers:
      - Со стороны сервера и со стороны клиента
      - После гидратации Vue
      - Только на стороне сервера
    correctAnswer: Только на стороне сервера
  - question: Какие есть 3 типа middleware?
    answers:
      - Global, Layout, Route
      - Global, Layout, Page
      - Global, Group, Route
    correctAnswer: Global, Layout, Route
  - question: Какой шаг может произойти только на стороне клиента?
    answers:
      - Гидратация Vue
      - Выполнение Middleware
      - Вызов fetch функции
    correctAnswer: Гидратация Vue
  - question: Какой шаг никогда не произойдет на стороне клиента?
    answers:
      - Выполнение asyncData
      - Выполнение serverMiddleware
      - Выполнение fetch
    correctAnswer: Выполнение serverMiddleware
  - question: Какие методы Vue вызываются и на стороне сервера и стороне клиента?
    answers:
      - mounted и beforeMount
      - beforeDestroy и destroyed
      - created и beforeCreate
    correctAnswer: created и beforeCreate
  - question: Какой шаг не произойдет при переходе (навигации) с помощью <NuxtLink>?
    answers:
      - Вызов fetch
      - Выполнение плагинов Nuxt.js на стороне клиента
      - Вызов beforeCreate
    correctAnswer: Выполнение плагинов Nuxt.js на стороне клиента
  - question: В чем особая разница между asyncData и fetch после навигации по <NuxtLink>?
    answers:
      - asyncData быстрее, чем fetch
      - asyncData вызывается после fetch
      - asyncData блокирующий, в то время как fetch нет
    correctAnswer: asyncData блокирующий, в то время как fetch нет
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Не важно какой инструмент вы используете, вы всегда будете чувствовать себя более уверенно, когда поймете, как инструмент работает внутри (под капотом). Это относится и к Nuxt.js. Цель этой главы - это дать вам на высоком уровне обзор различных частей фреймворка, порядок их выполнения и то, как они работают вместе.

Жизненный цикл Nuxt.js описывает, что происходит после фазы сборки, где ваше приложение упаковывается, разбивается на отдельные фрагменты и уменьшается. Что произойдет после этой фазы, зависит от того, включен ли у вас рендеринг на стороне сервера или нет. Если у вас включен серверный рендеринг, то дальнейшие шаги будут зависить от выбранного вами типа серверного рендеринга:

Динамический рендеринг на стороне сервера (`nuxt start`)

или Статическая генерация сайта (`nuxt generate`).

## Жизненый цикл

### Сервер

Для рендеринга на стороне сервера эти шаги будут выполняться при каждом начальном запросе к вашему приложению

- Запуск сервера (`nuxt start`)

При использовании статической генерации сайтов, серверные шаги выполняются только во время сборки, и один раз для каждой страницы при ее генерации

- Начинается процесс генерации (`nuxt generate`)

- Nuxt хуки
- serverMiddleware (серверное промежуточное програмное обеспечение)
- Плагины Nuxt на стороне сервера
  - в порядке, указанном в файле nuxt.config.js
- nuxtServerInit
  - Действие Vuex, которое вызывается только на стороне сервера для предварительной подготовки store (стора)
  - Первый аргумент - это **Vuex context**, второй аргумент - это **Nuxt.js context**
    - Вызов других действий отсюда → только "входная точка" для последующих действий Vuex на стороне сервера
  - может быть определено только в `store/index.js`
- Middleware
  - Global middleware (на глобальном уровне)
  - Layout middleware (на уровне разметки)
  - Route middleware (на уровне маршрутизации)
- asyncData (асинхронные данные)
- beforeCreate (метод жизненого цикла Vue)
- created (метод жизненого цикла Vue)
- Новый запрос (сверху вниз, siblings = parallel)
- Сериализация состояния (`render:routeContext` Nuxt.js хук)

- происходит рендеринг HTML (`render:route` Nuxt.js хук)

- `render:routeDone` хук, когда HTML был отправлен в браузер

- `generate:before` Nuxt.js хук
- HTML файлы сгенерированы
  - **Full static generation**
    - e.g. static payloads are extracted
  - `generate:page` (Редактируемый HTML)
  - `generate:routeCreated` (Сгенерированный маршрут)
- `generate:done` когда все HTML-файлы будут сгенерированы

### Клиент

Эта часть жизненного цикла полностью выполняется в браузере, независимо от того, какой режим Nuxt.js вы выбрали.

- Получение HTML
- Загрузка ассетов (например Javascript)
- Гидратация Vue
- Middleware
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (блокирующий)
- Плагины Nuxt на стороне клиента
  - в порядке, указанном в файле nuxt.config.js
- beforeCreate (метод жизненого цикла Vue)
- created (метод жизненого цикла Vue)
- новый Fetch (сверху вниз, родственные = паралельны) (неблокирующий)
- beforeMount (метод жизненого цикла Vue)
- mounted (метод жизненого цикла Vue)

### Навигация с использованием NuxtLink компонента

Как и в _клиентской_ части, все происходит в браузере, но только при переходе по `<NuxtLink>`. Кроме того, содержимое страницы не отображается до тех пор, пока не будут выполнены все _блокирующие_ задачи.

<base-alert type="info">

Просмотрите главу "Компоненты", чтобы получить дополнительную информацию о [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component)

</base-alert>

- middleware (блокирующий)
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (блокирующий)
- asyncData (блокирующий) [или полная статическая загрузка данных]
- beforeCreate & created (метод жизненого цикла Vue)
- fetch (неблокирующий)
- beforeMount & mounted

### Что дальше?

<base-alert type="next">

Посмотрите главу [Функции](/docs/2.x/features/rendering-modes)

</base-alert>

<quiz :questions="questions"></quiz>
