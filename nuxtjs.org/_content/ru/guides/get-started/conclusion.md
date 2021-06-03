---
title: Заключение
description: Поздравляем! Вы создали ваше первое приложение на Nuxt.js и теперь можете смело называть себя Nuxter. Но Вам еще предстоит многому научиться чтобы увидеть все возможности Nuxt.js. У нас есть несколько рекомендаций для последующего обучения.
position: 4
category: get-started
questions:
  - question: Как называется директория, обязательная для работы Nuxt.js?
    answers:
      - nuxt
      - pages
      - index
    correctAnswer: pages
  - question: Как называется файл c описанием вашего проекта?
    answers:
      - package.vue
      - package.json
      - package.js
    correctAnswer: package.json
  - question: Какую команду необходимо ввести в терминале, чтобы запустить проект Nuxt.js?
    answers:
      - npm dev
      - npm run dev
      - nuxt dev
    correctAnswer: npm run dev
  - question: Какой адрес у стартовой страницы вашего Nuxt.js приложения при запуске в режиме development?
    answers:
      - http://localhost:3000/
      - http://localhost:3000/project-name:3000
      - http://localhost:3000/nuxt:3000/
    correctAnswer: http://localhost:3000/
  - question: В каком файле можно изменять конфигурацию Nuxt.js?
    answers:
      - nuxt.config.json
      - config.js
      - nuxt.config.js
    correctAnswer: nuxt.config.js
  - question: Какая директория не подходит для размещения файлов с расширением `.vue`?
    answers:
      - pages
      - static
      - components
    correctAnswer: static
  - question: В какой директории вы будете размещать файлы с Вашими стилями?
    answers:
      - styles
      - components
      - assets
    correctAnswer: assets
  - question: В какой директории размещается robots.txt или favicon?
    answers:
      - assets
      - components
      - static
    correctAnswer: static
  - question: Какой компонент используется для навигации между страницами?
    answers:
      - '<Nuxt>'
      - '<RouterLink>'
      - '<NuxtLink>'
    correctAnswer: '<NuxtLink>'
  - question: '`<NuxtLink>` используется для внутренних ссылок, которые принадлежат приложению Nuxt.js?'
    answers:
      - Да
      - Нет
    correctAnswer: Да
---

Поздравляем! Вы создали ваше первое приложение на Nuxt.js и теперь можете смело называть себя Nuxter. Но вам еще предстоит многому научиться, чтобы увидеть все возможности Nuxt.js. У нас есть несколько рекомендаций для вашего последующего обучения:

<base-alert type="next">

Ознакомьтесь с [Concepts book](/docs/2.x/concepts/views)

</base-alert>

<base-alert type="next">

Работаем с [asyncData](/docs/2.x/features/data-fetching#async-data)

</base-alert>

<base-alert type="next">

Выбираем между [Режимами рендеринга](/docs/2.x/features/rendering-modes)

</base-alert>

<base-alert type="star">

Нравится Nuxt.js? Не забудьте [поставить звезду проекту](https://github.com/nuxt/nuxt.js) на GitHub

</base-alert>

<quiz :questions="questions"></quiz>
