---
title: Плагины
description: Nuxt.js позволяет подключать JS-плагины, которые будут запущены перед созданием экземпляра корневого приложения Vue.js. Это могут быть ваши собственные библиотеки или другие внешние модули.
category: getting-started
position: 108
---

> Nuxt.js позволяет подключать JS-плагины, которые будут запущены перед созданием экземпляра корневого приложения Vue.js. Это могут быть ваши собственные библиотеки или другие внешние модули.

<div class="Alert">

Важно помнить, что в [жизненном цикле любого экземпляра Vue](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) только хуки `beforeCreate` и `created` вызываются **как на стороне клиента, так и стороне сервера**. Все другие хуки вызываются только на клиенской стороне.

</div>

## Использование внешних модулей

Вероятно, вы захотите использовать внешние модули в приложении. Хороший пример для создания HTTP-запросов как для клиентской стороны, так и для серверной — [axios](https://github.com/mzabriskie/axios).

Установим модуль `axios` через npm:

```bash
npm install --save axios
```

Далее мы можем использовать его в приложении:

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  import axios from 'axios'

  export default {
    async data({ params }) {
      let { data } = await axios.get(`https://my-api/posts/${params.id}`)
      return { title: data.title }
    }
  }
</script>
```

Однако существует **единственная проблема**: если подключить модуль на другой странице, он будет повторно добавлен в финальный код приложения. Мы же хотим подключить `axios` лишь единожды, поэтому будем использовать свойство `build.vendor` в файле `nuxt.config.js`:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

После чего мы может импортировать `axios` в любом месте без проблем, размер финального кода приложения не увеличится.

## Использование плагинов Vue

Если мы хотим использовать [vue-notifications](https://github.com/se-panfilov/vue-notifications) для отображения уведомлений, нам нужно установить плагин до запуска приложения.

Файл `plugins/vue-notifications.js`:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Затем в `nuxt.config.js` мы добавляем ссылку на файл плагина в свойстве `plugins`:

```js
module.exports = {
  plugins: ['~plugins/vue-notifications']
}
```

Чтобы узнать больше о свойстве `plugins` в конфигурации проекта, взгляните на [API плагинов](/api/configuration-plugins).

Вообще, `vue-notifications` будет добавлен к финальному коду вашего приложения, но поскольку это библиотека, мы бы предпочли добавить код плагина в отдельный файл, содержащий код и возможных других внешних библиотек.

Для этого добавим значение `vue-notifications` в файл `nuxt.config.js` в свойство `buid.vendor`:

```js
module.exports = {
  build: {
    vendor: ['vue-notifications']
  },
  plugins: ['~plugins/vue-notifications']
}
```

## Только для браузеров

Некоторые плагины могут работать **только в браузерах**. Вы можете использовать переменную `process.client`, чтобы проверить, что плагин будет работать на стороне клиента.

Пример:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

if (process.client) {
  Vue.use(VueNotifications)
}
```

Если вам нужны некоторые библиотеки только для серверной стороны, вы можете использовать переменную `process.SERVER_BUILD` во время того, как webpack создаёт файл `server.bundle.js`.
