---
title: Модуль Nuxt.js
menu: render
category: programmatically
position: 202
---

# nuxt.render(req, res)

Вы можете использовать Nuxt.js с помощью `nuxt.render` для сервера node.js.

Пример с Express.js:

```js
const app = require('express')()
const Nuxt = require('nuxt')

const nuxt = new Nuxt()
nuxt.build().then(() => {
  // Рендерить каждый маршрут с Nuxt.js
  app.use(nuxt.render)
  // Запустить сервер
  app.listen(3000)
})
```

<div class="Alert">

Рекомендуется вызываать **nuxt.render** в конце выполнения вашего кода, поскольку фреймворк отвечает за рендеринг вашего веб-приложения и не будет вызывать next()

</div>
