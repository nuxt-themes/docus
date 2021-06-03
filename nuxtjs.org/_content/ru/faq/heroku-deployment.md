---
title: Развёртывание с Heroku
description: Как развернуть Nuxt на Heroku?
menu: Развёртывание с Heroku
category: deployment
position: 208
---

# Развёртывание с Heroku

Мы рекомендуем прочитать [документацию Heroku для node.js](https://devcenter.heroku.com/articles/nodejs-support).

Сперва вам нужно сказать Heroku установить `devDependencies` проекта (чтобы иметь возможность запускать `npm run build`):

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

Кроме того, хотелось бы чтобы наше приложение было запущено в production-режиме и слушало хост `0.0.0.0`:

```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

В панели управления (Dashboard) Heroku (в секции Settings) в увидите что-то вроде этого:

![nuxt config vars Heroku](https://i.imgur.com/EEKl6aS.png)

Затем мы говорим Heroku запустить `npm run build` через скрипт `heroku-postbuild` в нашем `package.json`:

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "heroku-postbuild": "npm run build"
}
```

Наконец, мы можем добавить приложение в Heroku:

```bash
git push heroku master
```

Voilà! Ваше nuxt.js-приложение размещено на Heroku!
