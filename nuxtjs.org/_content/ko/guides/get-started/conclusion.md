---
title: 결론
description: Congratulations you have now created your first Nuxt.js app and you may now consider yourself a Nuxter. But there is so much more to learn and so much more you can do with Nuxt.js. Here are a few recommendations.
position: 4
category: get-started
questions:
  - question: Nuxt.js가 작동하기 위해 필요한 디렉토리의 이름은 무엇인가요?
    answers:
      - nuxt
      - pages
      - index
    correctAnswer: pages
  - question: 프로젝트 ID 파일의 이름은 무엇인가요?
    answers:
      - package.vue
      - package.json
      - package.js
    correctAnswer: package.json
  - question: Nuxt.js 프로젝트를 실행하기 위해 터미널에 입력해야 하는 명령어는 무엇인가요?
    answers:
      - npm dev
      - npm run dev
      - nuxt dev
    correctAnswer: npm run dev
  - question: 개발 모드에서 페이지를 볼 수 있는 브라우저 주소는 무엇인가요?
    answers:
      - http://localhost:3000/
      - http://localhost:3000/project-name:3000
      - http://localhost:3000/nuxt:3000/
    correctAnswer: http://localhost:3000/
  - question: 구성을 추가하는 곳은 어디인가요?
    answers:
      - nuxt.config.json
      - config.js
      - nuxt.config.js
    correctAnswer: nuxt.config.js
  - question: '`.vue` 파일에 적합하지 않은 디렉터리는 무엇인가요?'
    answers:
      - pages
      - static
      - components
    correctAnswer: static
  - question: 스타일을 두어야 하는 디렉터리는 어디인가요?
    answers:
      - styles
      - components
      - assets
    correctAnswer: assets
  - question: robots.txt 또는 파비콘을 두어야 하는 디렉터리는 어디인가요?
    answers:
      - assets
      - components
      - static
    correctAnswer: static
  - question: 페이지 사이를 이동하기 위해 사용하는 컴포넌트는 무엇인가요?
    answers:
      - '<Nuxt>'
      - '<RouterLink>'
      - '<NuxtLink>'
    correctAnswer: '<NuxtLink>'
  - question: '`<NuxtLink>`는 Nuxt.js 앱에 속하는 내부 링크를 위해 사용되나요?'
    answers:
      - True
      - False
    correctAnswer: True
---

축하합니다! 이제 첫 번째 Nuxt.js 앱을 만들었으며 스스로 Nuxter라고 생각할 수 있습니다. 하지만 Nuxt.js로 배울 수 있는 것이 많고, 더 많은 것들을 할 수 있습니다. 여기에 몇 가지 추천사항이 있습니다:

<base-alert type="next">

[Concepts book](../concepts/views)을 확인하세요

</base-alert>

<base-alert type="next">

[asyncData](/docs/2.x/features/data-fetching#async-data)을 활용하여 작업하기

</base-alert>

<base-alert type="next">

다른 [Rendering modes](/docs/2.x/features/rendering-modes) 중 선택하기

</base-alert>

<base-alert type="star">

Nuxt.js가 마음에 드셨나요? 깃헙에 있는 [star our project](https://github.com/nuxt/nuxt.js)를 잊지마세요

</base-alert>

<quiz :questions="questions"></quiz>
