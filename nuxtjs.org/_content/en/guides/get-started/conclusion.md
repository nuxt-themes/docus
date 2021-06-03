---
title: Conclusion
description: Congratulations you have now created your first Nuxt.js app and you may now consider yourself a Nuxter. But there is so much more to learn and so much more you can do with Nuxt.js. Here are a few recommendations.
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

Congratulations! You have now created your first Nuxt.js app and you may now consider yourself a Nuxter, but there is so much more to learn and so much more you can do with Nuxt.js. Here are a few recommendations:

<base-alert type="next">

Check out the [Concepts book](../concepts/views)

</base-alert>

<base-alert type="next">

Working with [asyncData](/docs/2.x/features/data-fetching#async-data)

</base-alert>

<base-alert type="next">

Choosing between different [Rendering modes](/docs/2.x/features/rendering-modes)

</base-alert>

<base-alert type="star">

Did you like Nuxt.js so far? Don't forget to [star our project](https://github.com/nuxt/nuxt.js) on GitHub

</base-alert>

<quiz :questions="questions"></quiz>
