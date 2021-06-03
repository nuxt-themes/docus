---
title: 结语
description: 恭喜你~！现在，你已经创建了自己的第一个Nuxt.js应用，现在你可以将自己视为Nuxter了，但是要学习的东西太多了，使用Nuxt.js可以做的事情还很多。 以下是一些建议
position: 5
category: get-started
questions:
  - question: What is the name of the directory you need to have for Nuxt.js to work?
    answers:
      - nuxt
      - pages
      - index
    correctAnswer: pages
  - question: What is the name of your project ID file?
    answers:
      - package.vue
      - package.json
      - package.js
    correctAnswer: package.json
  - question: What is the command you type in the terminal to launch your Nuxt.js project?
    answers:
      - npm dev
      - npm run dev
      - nuxt dev
    correctAnswer: npm run dev
  - question: What is the address in the browser where you can see your page in development mode?
    answers:
      - http://localhost:3000/
      - http://localhost:3000/project-name:3000
      - http://localhost:3000/nuxt:3000/
    correctAnswer: http://localhost:3000/
  - question: Where do you put your configuration in?
    answers:
      - nuxt.config.json
      - config.js
      - nuxt.config.js
    correctAnswer: nuxt.config.js
  - question: Which directory is not suitable for `.vue` files?
    answers:
      - pages
      - static
      - components
    correctAnswer: static
  - question: In which directory do you put your styles?
    answers:
      - styles
      - components
      - assets
    correctAnswer: assets
  - question: In which directory do we put a robots.txt or favicon?
    answers:
      - assets
      - components
      - static
    correctAnswer: static
  - question: What component do we use to navigate between pages?
    answers:
      - '<Nuxt>'
      - '<RouterLink>'
      - '<NuxtLink>'
    correctAnswer: '<NuxtLink>'
  - question: '`<NuxtLink>` is used for internal links that belong to the Nuxt.js app?'
    answers:
      - True
      - False
    correctAnswer: True
---

恭喜你~！现在，你已经创建了自己的第一个 Nuxt.js 应用，现在你可以将自己视为 Nuxter 了，但是要学习的东西太多了，使用 Nuxt.js 可以做的事情还很多。 以下是一些建议：

<base-alert type="next">

查看 [Concepts book](../concepts/views)

</base-alert>

<base-alert type="next">

使用 [asyncData](/docs/2.x/features/data-fetching#async-data)

</base-alert>

<base-alert type="next">

在不同的 [Rendering modes](/docs/2.x/features/rendering-modes)渲染模式之间进行选择

</base-alert>

<base-alert type="star">

到目前为止，您是否喜欢 Nuxt.js？ 不要忘记在 GitHub 上为我们的项目加个[star](https://github.com/nuxt/nuxt.js)✨
</base-alert>

<quiz :questions="questions"></quiz>
