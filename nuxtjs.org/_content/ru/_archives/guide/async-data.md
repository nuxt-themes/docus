---
title: Асинхронные данные
description: Nuxt.js перехватывает метод data от vue.js, чтобы позволить обрабатать асинхронные задачи прежде, чем установить data.
category: getting-started
position: 106
---

> Nuxt.js _перегружает_ метод `data` от Vue.js, чтобы позволить обрабатывать асинхронные данные прежде, чем сохранить их.

<div>
  <a href="http://vueschool.io/?friend=nuxt" target="_blank" class="Promote">
    <img src="/async-data-with-nuxtjs.png" srcset="/async-data-with-nuxtjs-2x.png 2x" alt="AsyncData by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Async Data with Nuxt.js</h4>
      <p class="Promote__Content__Description">Learn how to manage asynchronous data with Nuxt.js.</p>
      <p class="Promote__Content__Signature">Video courses made by VueSchool to support Nuxt.js developpement.</p>
    </div>
  </a>
</div>

## Метод `data`

Метод `data` вызывается каждый раз перед загрузкой компонента (**только для компонентов страниц**). Он может быть вызван на стороне сервера или перед переходом к соответствующему маршруту. Этот метод получает [контекст](/api/context) в виде первого аргумента, который вы можете использовать для выборки нужных данных, и вернуть обработанные данные.

<div class="Alert Alert--orange">

**НЕ используйте** `this` внутри `data` для обращения к экземпляру компонента, потому что метод вызывается **перед инициализацией** компонента.

</div>

Чтобы сделать метод `data` асинхронным, Nuxt.js предлагает различные пути. Выберите тот, который вам больше подходит:

1. Возвращая `Promise`, Nuxt.js будет ожидать его состояния resolved перед тем, как отобразить компонент.
2. Используя директивы [async/await](https://github.com/lukehoban/ecmascript-asyncawait) ([Подробнее](https://zeit.co/blog/async-and-await))
3. Определить колбэк в качестве второго аргумента и вызывать его в виде: `callback(err, data)`

### Способ первый: возвращая Promise

```js
export default {
  data({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`).then(res => {
      return { title: res.data.title }
    })
  }
}
```

### Используя async/await

```js
export default {
  async data({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### Используя callback

```js
export default {
  data({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`).then(res => {
      callback(null, { title: res.data.title })
    })
  }
}
```

### Возвращая объект

Если асинхронного вызов не требуется, то можно просто вернуть объект:

```js
export default {
  data(context) {
    return { foo: 'bar' }
  }
}
```

### Отображение данных

Когда метод `data` определён, можно отобразить данные внутри шаблона, как обычно:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## Аргумент `context`

Для просмотра списка доступных параметров в 'context', смотрите [API контекста страниц](/api/context).

## Обработка ошибок

Добавив метод `error(params)` в аргумент `context`, вы можете показать страницу ошибки. Также значение `params.statusCode`, пришедшее с сервера, будет использоваться для отображения соответствующей ошибки.

Пример с `Promise`:

```js
export default {
  data({ params, error }) {
    return axios
      .get(`https://my-api/posts/${params.id}`)
      .then(res => {
        return { title: res.data.title }
      })
      .catch(e => {
        error({ statusCode: 404, message: 'Страница не найдена' })
      })
  }
}
```

При использовании параметра 'callback' можно вызвать его непосредственно с нужной ошибкой, и тогда Nuxt.js сам вызовет метод `error`:

```js
export default {
  data({ params }, callback) {
    axios
      .get(`https://my-api/posts/${params.id}`)
      .then(res => {
        callback(null, { title: res.data.title })
      })
      .catch(e => {
        callback({ statusCode: 404, message: 'Сообщение не найдено' })
      })
  }
}
```

Для настройки страницы ошибки, пожалуйста, прочитайте [про шаблоны](/guide/views#error-page).
