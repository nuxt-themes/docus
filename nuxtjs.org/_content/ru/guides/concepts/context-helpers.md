---
title: Контекст и Хелперы
description: Контекст предоставляет *дополнительную* и часто необязательную информацию о текущем запросе к приложению.
position: 2
category: concepts
csb_link_context: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-context?fontsize=14&hidenavigation=1&theme=dark
csb_link_helpers: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-helpers?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/context.svg
imgAlt: nuxt-js-context-keys
questions:
  - question: Для чего нужен контекст?
    answers:
      - Отрисовка на стороне сервера
      - Глобальное управление состоянием
      - Лень
    correctAnswer: Отрисовка на стороне сервера
  - question: Какой ключ не доступен в контексте?
    answers:
      - env
      - isDev
      - $store
    correctAnswer: $store
  - question: Какой ключ контекста доступен только на *серверной* стороне?
    answers:
      - from
      - app
      - req
    correctAnswer: req
  - question: Какой ключ контекста доступен только на *клиентской* стороне?
    answers:
      - from
      - res
      - app
    correctAnswer: from
  - question: Что может хелпер `$nuxt` и чего *не* может?
    answers:
      - Отобразить версию Nuxt
      - Предоставить информацию о статусе интернет-соединения пользователей
      - Доступ к открытым функциям модуля
    correctAnswer: Отобразить версию Nuxt
  - question: Какие имена у хелперов процесса?
    answers:
      - global, client и server
      - server, client и static
      - ssr, spa и static
    correctAnswer: server, client и static
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Объект `context` доступен в специфических для Nuxt функциях, таких как [asyncData](/docs/2.x/features/data-fetching#async-data), [plugins](/docs/2.x/directory-structure/plugins), [middleware](/docs/2.x/directory-structure/middleware) и [nuxtServerInit](/docs/2.x/directory-structure/store#the-nuxtserverinit-action). Это предоставляет _дополнительную_ и часто необязательную информацию о текущем запросе к приложению.

Прежде всего контекст используется для предоставления доступа к другим частям Nuxt.js приложения, например, к Vuex или к экземпляру `connect`. Таким образом, у нас в контексте есть объекты `req` и `res`, доступные на стороне сервера и `store`, доступный всегда. Со временем контекст был дополнен многими другими полезными переменными и сокращениями. Теперь у нас есть доступ к функционалу HMR в режиме разработки, к текущему `route`, `params` и `query` страницы, а также доступ к переменным среды. Кроме того, функции модулей и хелперы могут быть доступны в контексте, как на стороне сервера, так и на стороне клиента.

**Все ключи контекста, доступные по умолчанию**

```js
function (context) { // Может быть asyncData, nuxtServerInit, ...
  // Всегда доступны
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
   $config
  } = context

  // Доступны только на стороне сервера
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }

  // Доступны только на стороне клиента
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

<base-alert>

Не путайте _Контекст_, на который мы тут ссылаемся с объектом `context`, доступным в [Действиях Vuex](https://vuex.vuejs.org/ru/guide/actions.html) или доступным в функции `build.extend` вашего `nuxt.config.js`. Все это не связно друг с другом.

</base-alert>

Подробнее о различных ключах контекста читайте в разделе [Голосарий](/docs/2.x/internals-glossary/context)

### Используйте параметры страницы для запроса данных из API

Контекст напрямую предоставляет возможные динамические параметры маршрута через `context.params`. В следующем примере мы вызываем API через модуль `nuxt/http`, используя параметр динамической страницы как часть URL. Модули, такие как [nuxt/http](https://http.nuxtjs.org/), могут использовать собственные функции, которые затем доступны через объект `context.app`.

Кроме того, мы оборачиваем наш вызов API с помощью `try/catch` конструкции, для обработки потенциальных ошибок. С помощью функции `context.error` мы можем непосредственно показать страницу ошибки Nuxt и передать в нее возникшую ошибку.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData(context) {
    const id = context.params.id
    try {
      // Использование модуля nuxtjs/http, выставленного через context.app.
      const post = await context.app.$http.$get(
        `https://api.nuxtjs.dev/posts/${id}`
      )
      return { post }
    } catch (e) {
      context.error(e) // Показать страницу ошибки nuxt с выброшенной ошибкой
    }
  }
}
```

С помощью [ES6](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/) вы можете использовать этот синтаксис для деструктуризации вашего объекта контекста. Вы можете передавать объекты, к которым хотите получить доступ, а затем использовать их в коде без использования слова контекст.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      // Использование модуля nuxtjs/http, выставленного через context.app.
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (e) {
      error(e) // Показать страницу ошибки nuxt с выброшенной ошибкой
    }
  }
}
```

Хотите использовать query параметры? Тогда используйте [context.query.id](/docs/2.x/internals-glossary/context#query).

### Переадресация пользователей и доступ к хранилищу

Доступ к Vuex хранилищу (когда он настроен через `store`) также возможен через контекст. Он предоставляет собой объект `store`, который в компонентах Vue может быть вызван как `this.$store`. К тому же, мы используем метод `redirect`, полученным через контекст, для переадресации пользователя если значение `authenticated` является ложным.

```js
export default {
  middleware({ store, redirect }) {
    // получение ключей через деструктуризацию объектов
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```

<base-alert type="next">

Вы можете проверить Глоссарий, если хотите получить больше примеров с [методом redirect](/docs/2.x/internals-glossary/context#redirect)

</base-alert>

## Хелперы

Помимо псевдонимов и сокращений в контексте, существуют и другие небольшие хелперы в вашем Nuxt.js приложении.

## `$nuxt`: Nuxt.js хелпер

`$nuxt` - это хелпер, предназначенный для улучшения работы пользователей и для того, чтобы предоставить спасательный круг в некоторых ситуациях. Он доступен через `this.$nuxt` в компонентах Vue и через `window.$nuxt` на стороне клиента.

### Проверка соединения

Хелпер `$nuxt` предоставляет быстрый способ узнать, присутствует ли интернет соединение у пользователя или нет: Он возвращает логические значения `isOffline` и `isOnline`. Мы можем использовать их, чтобы показать сообщение, как только пользователь находится оффлайн (например).

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <Nuxt />
  </div>
</template>
```

### Доступ к корневому экземпляру

Кроме предоставления возможностей DX/UX, `$nuxt` хелпер также предоставляет доступ к корневому экземпляру вашего приложения из любого компонента. Но это еще не все - вы также можете получить доступ к хелперу `$nuxt` через `window.$nuxt`, который может быть использован для получения доступа к методам модулей вроде `$axios` снаружи ваших компонентов Vue. Это следует использовать с умом и **только в качестве крайней меры**.

### Обновление данных страницы

Когда вы хотите обновить текущую страницу для пользователя, вам не нужно полностью перезагружать страницу, потому что вы можете обратиться к серверу еще раз и заново инициализировать все приложение Nuxt.js. Вместо этого, вы часто предпочли бы обновить только данные, с помощью `asyncData` или `fetch`.

Вы можете сделать это с помощью `this.$nuxt.refresh()`!

```html
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Created at: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

#### Управление полосой загрузки

С помощью `$nuxt` вы также можете программно управлять полосой загрузки Nuxt через `this.$nuxt.$loading`.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

Подробнее об этом можно прочитайть в соответствующем разделе [о функции загрузки](../features/loading)

## onNuxtReady хелпер

Если вы хотите запустить несколько скриптов _после_ того, как ваше приложение Nuxt.js было загружено и готово, вы можете воспользоваться функцией `window.onNuxtReady`. Это может быть полезно, когда вы хотите выполнить функцию на стороне клиента без увеличения задержки появления интерактивности (TTI) вашего сайта.

```js
window.onNuxtReady(() => {
  console.log('Nuxt.js is ready and mounted')
})
```

## Хелперы по процессам

Nuxt.js вводит три булевых значения в глобальный `process` объект, которые помогут вам определить, было ли ваше приложение отрисовано на сервере или полностью на клиенте, а также проверить статическую генерацию сайта. Эти хелперы доступны в вашем приложении и обычно используются в методе `asyncData`.

```html{}[pages/about.vue]
<template>
  <h1>I am rendered on the {{ renderedOn }} side</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'client' : 'server' }
    }
  }
</script>
```

В этом примере, ключу `renderedOn` будет присвоено значение `'server'` при использовании серверного рендеринга. Когда пользователь перейдет на страницу из другой части приложения, например, нажав на `<NuxtLink>`, присвоится значение `'client'`.

<quiz :questions="questions"></quiz>
