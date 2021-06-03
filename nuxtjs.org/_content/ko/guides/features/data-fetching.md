---
title: 데이터 가져오기
description: Nuxt.js에는 API에서 데이터를 가져 오는 두 가지 방법이 있습니다. fetch 메소드 또는 asyncData 메소드를 사용할 수 있습니다.
position: 4
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/04_data_fetching?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Nuxt.js fetch 훅은 어디에서 사용할 수 있나요?
    answers:
      - 페이지와 컴포넌트
      - 오직 페이지내에서
      - 오직 컴포넌트내에서
    correctAnswer: 페이지와 컴포넌트
  - question: Nuxt.js fetch 훅을 사용하면 this에 접근 할 수 있습니다.
    answers:
      - 예
      - 아니오
    correctAnswer: 예
  - question: Nuxt.js fetch 훅은 언제 호출되나요?
    answers:
      - 컴포넌트 인스턴스 생성 이후
      - 컴포넌트 인스턴스 생성 이전
      - 컴포넌트 인스턴스 생성 중에
    correctAnswer: 컴포넌트 인스턴스 생성 이후
  - question: '*클라이언트 사이드* 에서 `fetch` 가 호출 될 때 placeholder를 표시 할 수 있는 것은 무엇인가요?'
    answers:
      - $fetchState.timestamp
      - $fetchState.error
      - $fetchState.pending
    correctAnswer: $fetchState.pending
  - question: 이미 방문한 페이지에 대한 fetch 호출을 어떻게 저장하나요?
    answers:
      - keep-alive
      - save-fetch
      - cache-fetch
    correctAnswer: keep-alive
  - question: activated 훅에서 가져올 30초 캐시를 추가하기 위해 사용하는 속성은 무엇인가요?
    answers:
      - $fetchState.pending
      - $fetchState.timestamp
      - $fetchState.cache
    correctAnswer: $fetchState.timestamp
  - question: '`asyncData`는 언제 호출되나요?'
    answers:
      - 페이지 컴포넌트 로드 이후
      - 페이지 컴포넌트 로드 중에
      - 페이지 컴포넌트 로드 이전
    correctAnswer: 페이지 컴포넌트 로드 이전
  - question: asyncData 내에서 `this`에 접근 할 수 있습니다.
    answers:
      - 예
      - 아니오
    correctAnswer: 아니오
  - question: asyncData를 사용하면 `context` 매개 변수를 사용하여 동적 라우트 데이터에 접근 할 수 있습니다.
    answers:
      - 예
      - 아니오
    correctAnswer: 예
  - question: asyncData의 오류 statusCode에 접근 할 수 있습니다.
    answers:
      - 예
      - 아니오
    correctAnswer: 예
---

Nuxt.js에는 API에서 데이터를 가져오는 두 가지 방법이 있습니다. fetch 메소드 또는 asyncData 메소드를 사용할 수 있습니다.

## fetch 훅

<base-alert type="info">

이 훅은 Nuxt `2.12+` 에서만 사용할 수 있습니다.

</base-alert>

Nuxt.js `fetch` 훅은 컴포넌트 인스턴스가 서버 사이드에서 생성된 후 호출됩니다. `this` 는 서버 사이드 내부에서 사용할 수 있습니다.

```js
export default {
  async fetch() {
    console.log(this)
  }
}
```

<base-alert>

`fetch(context)` 더 이상 사용되지 않는 대신 페이지 내의: `middleware(context)` 에서 [anonymous middleware](/docs/2.x/directory-structure/middleware#anonymous-middleware) 를 사용할 수 있습니다.

</base-alert>

### fetch는 언제 사용하나요?

매번 비동기 데이터를 가져와야 할 때 필요합니다. `fetch` 는 라우트를 렌더링 할 때 서버 사이드에서 호출되며, 클라이언트 측에서는 이동 할 때 호출됩니다

다음 속성을 사용하여 컴포넌트 레벨에서 `$fetchState` 를 노출합니다.

- `pending`은 `Boolean` 타입이며, `fetch` 가 _클라이언트 사이드_ 에서 호출 될 때 placeholder를 노출 할 수 있습니다.
- `error` 는 `null` 또는 `Error` 이며 오류 메시지를 표시 할 수 있습니다.
- `timestamp` 는 마지막 fetch가 기록된 시간의 값이며, [`keep-alive`와 함께 캐싱](#caching)에 유용합니다.

또한 컴포넌트에서 `fetch` 훅을 호출하려는 경우 `this.$fetch()` 로 손쉽게 접근 할 수 있습니다.

```html{}[components/NuxtMountains.vue]
<template>
  <p v-if="$fetchState.pending">Fetching mountains...</p>
  <p v-else-if="$fetchState.error">An error occured :(</p>
  <div v-else>
    <h1>Nuxt Mountains</h1>
    <ul v-for="mountain of mountains">
      <li>{{ mountain.title }}</li>
    </ul>
    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
```

<base-alert type="info">

`this.$nuxt.context`를 사용하여 fetch 훅 내에서 Nuxt [context](/docs/2.x/concepts/context-helpers) 에 접근 할 수 있습니다.

</base-alert>

### 옵션

`fetchOnServer`: `Boolean` 또는 `Function` (기본값 : `true`), 페이지를 서버 사이드 렌더링 할 때 `fetch()`를 호출합니다.

`fetchDelay`: `Integer` (기본값 : `200`), 최소 실행 시간을 밀리 초 단위로 설정합니다. (빠른 깜박임 방지)

`fetchOnServer`가 거짓 (`false` 또는 `false` 반환) 인 경우 `fetch`는 클라이언트 사이드에서만 호출되고 `$fetchState.pending` 은 컴포넌트가 서버 사이드 렌더링 될 때 `true`를 반환합니다.

```js
export default {
  data() {
    return {
      posts: []
    }
  },
  async fetch() {
    this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
      res.json()
    )
  },
  // 클라이언트 사이드에서만 fetch를 호출합니다.
  fetchOnServer: false
}
```

### 쿼리 스트링 변경을 위한 리스닝

기본적으로 `fetch` 훅은 쿼리 스트링 변경시 호출되지 않습니다. 쿼리 변경 사항을 감시하려면 watch에 `$route.query`를 추가하고 `$fetch`를 호출하면 됩니다.

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // 쿼리 변경시에도 호출 됨
  }
}
```

### 캐싱

`<nuxt />` 및 `<nuxt-child />` 컴포넌트에서 `keep-alive` 디렉티브를 사용하여 이미 방문한 페이지에서 `fetch` 호출을 저장할 수 있습니다:

```html{}[layouts/default.vue]
<template>
  <nuxt keep-alive />
</template>
```

또한 prop `keep-alive-props` 를 `<nuxt>` 컴포넌트에 전달하여 `<keep-alive>`에 전달 된 [props](https://vuejs.org/v2/api/#keep-alive) 를 지정할 수 있습니다.

```html{}[layouts/default.vue]
<nuxt keep-alive :keep-alive-props="{ max: 10 }" />
```

메모리에 10개의 페이지 컴포넌트만을 유지 보관합니다.

### `activated` hook 사용

Nuxt는 마지막 `fetch` 호출 (ssr 포함)의 `this.$fetchState.timestamp` (timestamp)를 직접 채울 것입니다. 이 속성을 `activated` 훅과 결합하여 `fetch`에 30초 캐시를 추가할 수 있습니다.

```html{}[pages/posts/_id.vue]
<template> ... </template>

<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    activated() {
      // 마지막으로 fetch가 30초 이상 지난 경우 fetch를 재호출합니다.
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
      }
    },
    async fetch() {
      this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
        res.json()
      )
    }
  }
</script>
```

동일한 페이지의 이동은 마지막 `fetch` 호출이 30초 이전인 경우 `fetch`를 호출하지 않습니다.

## 비동기 데이터

<base-alert>

`asyncData`는 [pages](/docs/2.x/directory-structure/pages) 에서만 사용할 수 있으며 훅 내에서 `this`에 접근 할 수 없습니다.

</base-alert>

`fetch` 의 주요 차이점은 보류 상태 또는 오류를 처리 할 필요가 없다는 것입니다. Nuxt는 다음 페이지로 이동하거나 [error page](/docs/2.x/directory-structure/layouts#error-page)를 표시하기 전에 asyncData 훅이 완료되기를 기다립니다.

이 훅은 [context](/docs/2.x/concepts/context-helpers)를 첫 번째 인자로 받습니다. 이를 사용하여 일부 데이터를 가져올 수 있으며 Nuxt.js는 반환 된 오브젝트를 컴포넌트 데이터와 자동으로 병합합니다.

```html{}[pages/index.vue]
<template>
  <h1>{{ project }}</h1>
</template>

<script>
  export default {
    async asyncData(context) {
      return {
        project: 'nuxt'
      }
    }
  }
</script>
```

다음 예제는 API에서 데이터를 가져 오는데 권장되는 [@nuxt/http](https://http.nuxtjs.org/) 를 사용하고 있습니다.

먼저 설치해야합니다:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxt/http
```

  </code-block>
  <code-block label="npm">

```bash
npm install @nuxt/http
```

  </code-block>
</code-group>

그리고 나서, `nuxt.config.js`의 `modules` 섹션에 추가합니다.

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxt/http']
}
```

```html{}[pages/posts/_id.vue]
<template>
  <div>
    <h1>{{ post.title }</h1>
    <p>{{ post.description }}</p>
  </div>
</template>

<script>
  export default {
    async asyncData({ params, $http }) {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    }
  }
</script>
```

### 쿼리 변경을 위한 리스닝

`asyncData` 메소드는 기본적으로 쿼리 스트링 변경시 호출되지 않습니다. 예를 들어 페이지네이션 컴포넌트가 빌드중 일 때, 동작을 변경하려면 페이지 컴포넌트의 `watchQuery` 프로퍼티를 사용하여 리스닝 해야하는 파라미터를 설정할 수 있습니다.

<base-alert type="next">

[watchQuery property](/docs/2.x/components-glossary/pages-watchquery)에 대해 자세히 알아보고 [context](/docs/2.x/concepts/context-helpers) 내의 사용 가능한 키 목록을 확인.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
