---
title: 컨텍스트와 헬퍼
description: 컨텍스트는 애플리케이션에 요청하는 *추가* 및 선택적인 정보를 제공합니다.
position: 2
category: concepts
csb_link_context: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-context?fontsize=14&hidenavigation=1&theme=dark
csb_link_helpers: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-helpers?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/context.svg
imgAlt: nuxt-js-context-keys
questions:
  - question: 컨텍스트가 존재하는 이유가 무엇인가요?
    answers:
      - 서버 사이드 렌더링
      - 글로벌 state를 가지기
      - 지연
    correctAnswer: 서버 사이드 렌더링
  - question: 컨텍스트에 있는 키가 아닌 것은?
    answers:
      - env
      - isDev
      - $store
    correctAnswer: $store
  - question: '*서버* 사이드에서만 사용할 수 있는 컨텍스트 키는 무엇인가요?'
    answers:
      - from
      - app
      - req
    correctAnswer: req
  - question: '*클라이언트* 사이드에서만 사용할 수 있는 컨텍스트 키는 무엇인가요?'
    answers:
      - from
      - res
      - app
    correctAnswer: from
  - question: '`$nuxt` 헬퍼가 할 수 *없는* 것은 무엇인가요?'
    answers:
      - Nuxt 버전 표기하기
      - 사용자의 인터넷 연결 상태 정보 제공하기
      - 노출된 모듈 함수 접근하기
    correctAnswer: Nuxt 버전 표기하기
  - question: 프로세스 헬퍼의 이름들은 무엇일까요?
    answers:
      - global, client and server
      - server, client and static
      - ssr, spa and static
    correctAnswer: server, client and static
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

`context` 객체는 [asyncData](/docs/2.x/features/data-fetching#async-data), [plugins](/docs/2.x/directory-structure/plugins), [middleware](/docs/2.x/directory-structure/middleware) 그리고 [nuxtServerInit](/docs/2.x/directory-structure/store#the-nuxtserverinit-action)와 같은 특정한 Nuxt 함수에서 활용할 수 있습니다. 컨텍스트는 애플리케이션에 요청하는 _추가_ 및 선택적인 정보를 제공합니다.

가장 먼저 컨텍스트는 Nuxt.js 애플리케이션의 다른 부분(e.g. the Vuex store 또는 기본 `connect` 인스턴스)에 대한 엑세스를 제공하기 위해 사용됩니다. 그러므로 서버 사이드에서 사용 가능한 컨텍스트에는 `req` 와 `res` 객체있고, 언제나 사용할 수 있는 `store`가 있습니다. 그러나 시간이 갈수록 다른 유용한 변수와 약어로 컨텍스트가 확장되었습니다. 지금은 `development` 모드에 있는 HMR 기능, 현재 `route`, 페이지 `params`와 `query` 뿐만 아니라 컨텍스트를 통해 환경 변수에 접근하는 옵션도 액세스할 수 있습니다. 더 나아가 모듈 함수와 헬퍼는 컨텍스트를 통해 클라이언트와 서버 측 모두에서 사용할 수 있도록 노출됩니다.

**기본적으로 제공되는 모든 컨텍스트 키**

```js
function (context) { // asyncData, nuxtServerInit 등이 될 수 있습니다
  // 항상 이용 가능한 것
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
   $config
  } = context

  // 서버 사이드에서만 이용 가능한 것
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }

  // 클라이언트 사이드에서만 이용 가능한 것
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

<base-alert>

여기에서 언급하는 *컨텍스트*는 [Vuex Actions](https://vuex.vuejs.org/guide/actions.html) 혹은 `nuxt.config.js`의 `build.extend` 함수에서 사용할 수 있는 `context` 객체와 혼동하면 안됩니다. 이것들은 서로 관련이 없습니다!

</base-alert>

[Internals Glossary](/docs/2.x/internals-glossary/context)에 있는 다른 컨텍스트 키에 대해 더 알아보기

## 예시

### API 쿼리에 페이지 파라미터 사용하기

컨텍스트는 `context.params`를 통해 라우트의 가능한 동적인 파라미터를 직접 노출합니다. 다음 예시에서 URL의 일부로 동적 페이지 파라미터를 사용하여 `nuxt/http` 모듈을 통해 API를 호출합니다. [nuxt/http](https://http.nuxtjs.org/) 모듈과 같은 모듈은 [context.app](http://context.app) 객체를 통해 사용할 수 있는 자체 함수를 노출할 수 있습니다.

또한 발생할 수 있는 에러를 처리하기 위해 API 호출을 `try/catch`문으로 감쌌습니다. `context.error` 함수를 사용하면 Nuxt의 에러를 직접 보여주거나 발생한 에러를 전달할 수 있습니다.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData(context) {
    const id = context.params.id
    try {
      // context.app을 통해 여기에 노출된 nuxtjs/http 모듈 사용하기
      const post = await context.app.$http.$get(
        `https://api.nuxtjs.dev/posts/${id}`
      )
      return { post }
    } catch (error) {
      context.error(error) // 발생한 에러가 있는 nuxt 에러 페이지 보여주기
    }
  }
}
```

[ES6](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/)에서는 이 문법을 사용하여 컨텍스트 객체를 구조 분해 할당(destructure)할 수 있습니다. 접근하기 원하는 객체를 전달하여 컨텍스트라는 단어를 사용하지 않고 코드에서 그들을 사용할 수 있습니다.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      // context.app을 통해 여기에 노출된 nuxtjs/http 모듈 사용하기
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (error) {
      error(error) // // 발생한 에러가 있는 nuxt 에러 페이지 보여주기
    }
  }
}
```

이 대신 쿼리 파라미터를 사용하고 싶으신가요? 그러면 [context.query.id](/docs/2.x/internals-glossary/context#query)를 를 사용할 수 있습니다.

### 사용자 리다이렉션 & 스토어 접근

Vuex 스토어에 접근하는 것(`store` 디렉터리를 통해 설정한 경우)도 컨텍스트를 통해 할 수 있습니다. Vue 컴포넌트에서 `this.$store`로 취급할 수 있는 스토어 객체를 제공합니다. 게다가 컨텍스트를 통해 노출되는 헬퍼인 `redirect` 메서드를 사용하여 `authenticated` 상태가 거짓인 경우 사용자를 리다이렉트 시킬 수 있습니다.

```js
export default {
  middleware({ store, redirect }) {
    // 객체 구조 분해 할당을 통해 키 가져오기
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```

<app-modal>
  <code-sandbox  :src="csb_link_context"></code-sandbox>
</app-modal>

## 헬퍼

컨텍스트에 있는 약어 외에도 Nuxt.js 애플리케이션에는 다른 작은 헬퍼도 있습니다.

## `$nuxt`: Nuxt.js 헬퍼

`$nuxt`는 유저 경험을 개선하고 일부 상황에서 탈출구 역할을 하기 위해 설계된 헬퍼입니다. Vue 컴포넌트에서 `this.$nuxt`를 통해 접근할 수 있고, Vue 컴포넌트가 아닌 경우에는 클라이언트 사이드에서 `window.$nuxt`를 통해 접근할 수 있습니다.

### 연결 확인

`$nuxt` 헬퍼는 사용자의 인터넷 연결이 되어 있는지 아닌지 확인하기 위한 빠른 방법을 제공합니다: `isOffline`과 `isOnline`이라는 불리언 값을 노출합니다. 이 변수들을 사용하여 아래 예시에서 사용자가 오프라인이 되자마자 메시지를 보여줄 수 있습니다.

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <Nuxt />
  </div>
</template>
```

### 루트 인스턴스 접근하기

DX/UX 기능을 제공할 뿐만 아니라 `$nuxt` 헬퍼는 다른 모든 컴포넌트에서 애플리케이션의 루트 인스턴스에 대한 약어도 제공합니다. 이게 전부가 아닙니다. `window.$nuxt`를 통해 `$nuxt` 헬퍼에 접근할 수 있고, 이 헬퍼는 Vue 컴포넌트 외부에서 `$axios`와 같은 모듈 메서드에 접근할 수 있는 탈출구로 사용될 수 있습니다. 그러나 이것은 현명하게 **최후의 수단으로만** 사용해야 합니다.

### 페이지 데이터 갱신하기

사용자의 현재 페이지를 갱신하고 싶은 경우 서버에 다시 접속하고 Nuxt 전체를 다시 시작할 수 있기 때문에 페이지를 완전히 다시 불러오고 싶지는 않을 것입니다. 이 대신 `asyncData` 또는 `fetch`에서 제공하는 데이터만 새로 갱신하고 싶을 것입니다.

`this.$nuxt.refresh()`를 사용하여 이를 수행할 수 있습니다!

```html
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Created at: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

### 로딩바 제어하기

`$nuxt`를 사용하면 `this.$nuxt.$loading`를 통해 프로그래밍 방식으로 Nuxt의 로딩바를 제어할 수 있습니다.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

로딩 관련 장에서 자세히 알아보세요

## onNuxtReady 헬퍼

Nuxt.js 애플리케이션이 로드되고 준비된 _후에_ 스크립트를 동작하고 싶으면 `window.onNuxtReady` 함수를 사용할 수 있습니다. 사이트의 상호 작용 시간을 늘리지 않고 클라이언트 사이드에서 함수를 실행하고 싶을 때 유용하게 사용할 수 있습니다.

```js
window.onNuxtReady(() => {
  console.log('Nuxt.js is ready and mounted')
})
```

## Process 헬퍼

Nuxt.js는 세 가지 불리언 값을 `process` 객체에 주입하여 앱이 서버에서 렌더링되는지 완전 클라이언트에서 렌더링되는지, 정적 사이트로 생성되었는지를 확인할 수 있도록 해줍니다. 이 헬퍼들은 애플리케이션 어느 곳에서든 사용할 수 있고 일반적으로 `asyncData` 사용자 영역 코드에서 사용됩니다.

```html{}[pages/about.vue]
<template>
  <h1>I am rendered on the {{ renderedOn }} side</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'client' : 'server' }
    }
  }
</script>
```

이 예제에서 `renderedOn`은 서버 사이드 렌더링을 사용하고 사용자가 페이지에 직접 접근하는 경우에는 `'server'` 값이 옵니다. 예를 들어 `<NuxtLink>`를 클릭하는 것과 같이 사용자가 애플리케이션의 다른 페이지로 이동하려는 경우 client 값이 옵니다.

<app-modal>
  <code-sandbox  :src="csb_link_helpers"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
