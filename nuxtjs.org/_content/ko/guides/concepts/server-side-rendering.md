---
title: 서버 사이드 렌더링
description: 서버 사이드 렌더링(SSR)은 웹 페이지를 브라우저에서 렌더링하는 대신 서버에서 보여주도록 하는 애플리케이션 기능입니다.
position: 3
category: concepts
questions:
  - question: 서버 사이드 렌더링을 위해 필요한 서버의 종료는 무엇인가요?
    answers:
      - PHP 서버
      - JavaScript 서버
      - Node.js 서버
    correctAnswer: Node.js 서버
  - question: 서버를 확장하고 제어하기 위해 사용해야 하는 것은 무엇인가요?
    answers:
      - Middleware
      - ServerMiddleware
      - 서버를 제어할 수 없다
    correctAnswer: ServerMiddleware
  - question: 서버없는 호스팅 제공자에서 서버 사이드 렌더링되는 애플리케이션을 사용할 수 있나요?
    answers:
      - 예
      - 아니요
    correctAnswer: 아니요
  - question: 서버 사이드에서 document에 접근할 수 있나요?
    answers:
      - 예, 항상 접근할 수 있습니다.yes, it is always available
      - 아니요, 브라우저에 있는 객체이므로 서버에서 접근할 수 없습니다.
    correctAnswer: 아니요, 브라우저에 있는 객체이므로 서버에서 접근할 수 없습니다.
  - question: 페이지가 언제 유저의 액션에 반응하게 되나요?
    answers:
      - 브라우저가 서버로부터 렌더링된 HTML를 받을 때
      - Vue.js hydration이 시작될 때
      - 브라우저가 초기 요청을 보낼 때
    correctAnswer: Vue.js hydration이 시작될 때
  - question: <NuxtLink>를 사용하는 페이지 간의 이동은 어디에서 수행되나요?
    answers:
      - 클라이언트 사이드
      - 서버 사이드
    correctAnswer: 클라이언트 사이드
  - question: 올바른 순서는 무엇인가요?
    answers:
      - 브라우저 → 서버, 서버 → 브라우저, 브라우저 → 브라우저
      - 서버 → 브라우저, 브라우저 → 서버, 서버 → 서버
      - 브라우저 → 서버, 서버 → 브라우저, 브라우저 → 서버
    correctAnswer: 브라우저 → 서버, 서버 → 브라우저, 브라우저 → 브라우저
---

서버 사이드 렌더링(SSR)은 웹 페이지를 브라우저에서 렌더링하는 대신 서버에서 보여주도록 하는 애플리케이션 기능입니다. 서버 사이드는 완전히 렌더링 된 페이지를 클라이언트에 보냅니다; 클라이언트의 자바스크립트 번들이 전달되어 Vue.js 앱이 [hydrate](https://ssr.vuejs.org/guide/hydration.html)되도록 합니다.

## Node.js 서버 필요 사항

웹 페이지를 렌더링하려면 자바스크립트 환경이 필요합니다.

Vue.js 애플리케이션을 실행하려면 Node.js 서버를 구성해야 합니다.

## 서버 확장 및 제어

serverMiddleware로 서버를 확장하고 middleware로 라우트를 제어할 수 있습니다.

```js{}[server-middleware/logger.js]
export default function (req, res, next) {
  console.log(req.url)
  next()
}
```

```js{}[nuxt.config.js]
export default: {
  serverMiddleware: [
     '~/server-middleware/logger'
  ]
}
```

서버 미들웨어가 경로에 매핑 된 함수 목록으로 구성된 경우:

## 서버 vs 브라우저 환경

Node.js 환경에 있기 때문에 `req`와 `res`와 같은 Node.js 객체에 접근할 수 있습니다. 브라우저 환경에 있는 `window` 또는 `document` 객체에는 접근할 수 없습니다. 그러나 `beforeMount` 혹은 `mounted` 훅을 사용하여 `window` 또는 `document`를 사용할 수 있습니다.

```js
beforeMount{
  window.alert('hello');
}
mounted{
  window.alert('hello');
}
```

## Nuxt.js를 사용하여 서버 사이드 렌더링하는 방법

### Step 1: 브라우저에서 서버로

브라우저가 초기 요청을 보내면 Node.js 내부 서버에 연결됩니다. 그러면 Nuxt.js는 HTML을 생성하고 실행된 함수의 결과와 함께 브라우저에 돌려보냅니다. e.g. `asyncData`, `nuxtServerInit` 또는 `fetch`. 훅 함수 또한 잘 실행됩니다.

### Step 2: 서버에서 브라우저로

브라우저는 서버로부터 생성된 HTML를 사용하여 렌더링된 페이지를 받습니다. 이 컨텐츠가 보여지고 Vue.js의 사용자 액션과 상호작용할 수 있도록 만드는 hydration이 시작됩니다. 이 프로세스 이후에 페이지가 유저 액션에 반응합니다.

### Step 3: 브라우저에서 브라우저로

[`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component)를 사용하는 페이지 간의 이동은 클라이언트 사이드에서 이루어지므로 브라우저를 새로고침하지 않는한 서버에 다시 연결되지 않습니다.

<quiz :questions="questions"></quiz>
