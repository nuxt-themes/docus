---
title: Модуль Nuxt.js
description: можно использовать nuxt.js программно, как middleware для собственного web-сервера.
menu: asyncData
category: pages
position: 21
---

# Программное использование Nuxt.js

Вероятно, вы захотите использовать свой сервер со своим ПО и API. Для этого вы можете использовать Nuxt.js программно. Nuxt.js написан на ES2015, из-за чего его код приятен и хорошо читаем. Транспилеры не используются, и всю работу выполняет сам движок Core V8. Поэтому Nuxt.js требует Node.js версии `4.0` или выше.

Подключить Nuxt.js можно так:

```js
const Nuxt = require('nuxt')
```

### Опции Nuxt

Чтобы узнать о возможных опциях для Nuxt.js, см. раздел конфигурации.

```js
const options = {}

const nuxt = new Nuxt(options)
nuxt.build().then(() => {
  // Здесь можно использовать nuxt.render(req, res) или nuxt.renderRoute(route, context)
})
```
