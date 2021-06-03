---
title: 'API: fetch 메소드'
description: '`fetch` 메소드는 페이지가 랜더링되기 전에 데이터를 스토어에 넣기위해서 사용합니다. 컴포넌트의 데이터를 세팅하지 않는 점을 빼고는 `asyncData` 메소드와 비슷합니다.'
menu: fetch
category: pages
position: 22
---

## Nuxt >= 2.12

Nuxt.js `v2.12`에서부터는 **Vue 컴포넌트 어디서라도** 호출할 수 있는 `fetch`훅이도입되었습니다.

[라이브 데모](https://nuxt-new-fetch.surge.sh)와 [코드 예시](https://github.com/nuxt/nuxt.js/tree/dev/examples/new-fetch)를 참조해주세요.

<div class="Alert Alert--orange">

`fetch(context)`는 deprecated 되었습니다. 대신에 [익명 미들웨어](/api/pages-middleware#anonymous-middleware)를 페이지에서 사용해주세요: `middleware(context)`

</div>

### fetch를 언제 사용할까요?

**asynchronous** 데이터가 필요할 때면 언제든지 사용하세요. `fetch`는 라우트를 렌더링할 때 서버사이드에서 한 번, 그리고 페이지 이동 시 클라이언트 사이드에서 호출됩니다.

`$fetchState`를 컴포넌트 레벨에서 노출시킵니다:

- `$fetchState.pending`: `Boolean`, _클라이언트 사이드에서_ `fetch`가 호출될 시 placeholder를 보여주도록 함
- `$fetchState.error`: `null` or `Error`, 에러메세지를 보여주도록 함
- `$fetchState.timestamp`: `Integer`, 최근 fetch의 타임스탬프, `keep-alive`와 캐싱 시 유용함

`fetch` 훅을 컴포넌트 메소드나 템플릿에서 사용하시려면:

```html
<button @click="$fetch">Refresh</button>
```

Nuxt [context](/api/context)에 `this.$nuxt.context`를 fetch 훅을 사용해 접근 가능합니다.

### 옵션

- `fetchOnServer`: `Boolean`이나 `Function` (default: `true`), `서버가 페이지 렌더링 시`fetch()` 호출
- `fetchDelay`: `Integer` (default: `200`), 최소 실행 시간을 밀리세컨드 단위로설정 (깜빡임 방지를 위해서)

<div class="Alert Alert--green">

`fetchOnServer`가 falsy(`false`이거나 `false`를 리턴)라면, `fetch`는 모든 클라이언트 사이드에서 호출되며 `$fetchState.pending`는 서버가 컴포넌트를 렌더링할 때 `true`값을 가집니다.

</div>

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    },
    fetchOnServer: false
  }
</script>
```

### 예시

<div class="Alert Alert--green">

우리는 공식 [http 모듈](https://http.nuxtjs.org)을 HTTP 리퀘스트를 위해 사용하겠습니다.

</div>

우리가 만든 포스팅을 수신하는 블로그를 만들어 봅시다:

`pages/index.vue`

```html
<template>
  <div>
    <h1>Blog posts</h1>
    <p v-if="$fetchState.pending">Fetching posts...</p>
    <p v-else-if="$fetchState.error">
      Error while fetching posts: {{ $fetchState.error.message }}
    </p>
    <ul v-else>
      <li v-for="post of posts" :key="post.id">
        <n-link :to="`/posts/${post.id}`">{{ post.title }}</n-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    }
  }
</script>
```

만약 바로 [http://localhost:3000/](http://localhost:3000/)에 접속한다면, 바로 여러분은 **서버에서 렌더링한** 전체 포스트 리스트를 보실 수 있습니다(SEO에 적합함 ).

<img width="669" alt="Screenshot 2019-03-11 at 23 04 57" src="https://user-images.githubusercontent.com/904724/54161334-1f9e8400-4452-11e9-97bf-996a6e69d9db.png">

<div class="Alert Alert--green">
  
Nuxt는 'fetch'에서 어떤 데이터를 변경했는지 지능적으로 탐지하고 반환된 HTML에 포함된 JSON을 최적화합니다.

</div>

포스트를 `/posts/:id`에 보여주기 위해 `pages/posts/_id.vue`페이지를 추가해봅시다 .

`pages/posts/_id.vue`

```html
<template>
  <div v-if="$fetchState.pending">Fetching post #{{$route.params.id}}...</div>
  <div v-else>
    <h1>{{ post.title }}</h1>
    <pre>{{ post.body }}</pre>
    <p><n-link to="/">Back to posts</n-link></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        post: {}
      }
    },
    async fetch() {
      this.post = await this.$http.$get(
        `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
      )
    }
  }
</script>
```

페이지 탐색 시, 이제 클라이언트 사이드에서 `"Loading post #..."`를 볼 수 있고, 포스트를 리프레쉬할 때에는 로딩이 일어나지 않습니다.

<img width="669" alt="fetch-nuxt3" src="https://user-images.githubusercontent.com/904724/54161844-d3544380-4453-11e9-9586-7428597db40e.gif">

<div class="Alert Alert--green">

만약 컴포넌트가 `fetch` 훅을 가지고 있다면, `this.$fetch()`에 접근해 `fetch`를다시 호출할 수 있습니다(`$fetchState.pending`은 다시 `true`입니다).

</div>

### 쿼리 스트링 변경 수신하기

기본값으로 `fetch` 훅은 쿼리 스트링 변경에 **호출되지 않습니다**. 만약 쿼리 스트링 변경에 응답하기 위해서는(watcher로서) `$route.query`를 추가하시고 `$fetch`를호출해주세요:

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // Called also on query changes
  }
}
```

### 캐싱

`<nuxt/>` 및 `<nuxt-child/>` 컴포넌트에 `keep-alive` 디렉티브를 사용하여 이미 방문한 페이지의 `fetch` 호출을 저장할 수 있습니다:

`layouts/default.vue`

```html
<template>
  <nuxt keep-alive />
</template>
```

<div class="Alert Alert--green">
  
또한 여러분은 `<nuxt>` 컴포넌트에 `keep-alive-props`를 전달하는 것으로 `<keep-alive>`에 전달되는 [props](https://vuejs.org/v2/api/#keep-alive)를 명시할 수 있습니다. <br>
예시: `<nuxt keep-alive :keep-alive-props="{ max: 10 }" />` 는 오로지 메모리에 10 페이지 컴포넌트를 저장합니다.

</div>

### `activated` 훅 사용하기

Nuxt는 최종 `fetch` 호출의 `this.$fetchState.timestamp` (timestamp)를 직접적으로채웁니다(ssr 포함). 이 속성을 `activated` 훅과 결합하여 30초 캐시를 `fetch`에 추가할 수 있습니다.

`pages/posts/_id.vue`

```html
<template> ... </template>

<script>
  export default {
    data() {
      return {
        post: {}
      }
    },
    activated() {
      // Call fetch again if last fetch more than 30 sec ago
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
      }
    },
    async fetch() {
      this.post = await this.$http.$get(
        `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
      )
    }
  }
</script>
```

마지막 `fetch` 호출이 30초 전일 경우 동일한 페이지로 이동하면 `fetch`가 호출되지않습니다.

![fetch-keep-alive-nuxt](https://user-images.githubusercontent.com/904724/54164405-c6881d80-445c-11e9-94e0-366406270874.gif)

## Nuxt <= 2.11

> fetch 메소드는 페이지가 랜더링되기 전에 데이터를 스토어에 넣기위해서 사용합니다. 컴포넌트의 데이터를 세팅하지 않는 점을 빼고는 `asyncData` 메소드와 비슷합니다.

- **타입:** `Function`

`fetch` 메소드가 _만약 세팅되어 있다면_, 컴포넌트가 로딩되기 전에 매번 호출됩니다(**페이지 컴포넌트에 한합니다**). 서버사이드에서는 Nuxt 애플리케이션의 최초 요청 시 한번, 그리고 클라이언트 사이드에서 추가 경로를 탐색하기 전에 호출할 수 있습니다.

`fetch` 메소드는 첫번째 인수로 받은 [컨택스트](/api#컨택스트)를 사용하여 데이터를 받고, 그 데이터를 스토어에 넣을 수 있습니다. fetch 메소드를 비동기화 하기 위해서 **Promise를 리턴합니다**. Nuxt.js는 컴포넌트가 랜더링 되기 전에 Promise가종료되기를 기다립니다.

<div class="Alert Alert--orange">

<b>Warning:</b> `fetch` 내부에서 `this`를 통해 컴포넌트 인스턴스에 접근하지 **못합니다**. 이는 이 메소드가 컴포넌트를 초기화하기 전에 호출되기 때문입니다.

</div>

`pages/index.vue` 예제:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    fetch({ store, params }) {
      return axios.get('http://my-api/stars').then(res => {
        store.commit('setStars', res.data)
      })
    }
  }
</script>
```

async/await를 사용하면 코드를 보다 깔끔하게 할 수 있습니다:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    async fetch({ store, params }) {
      let { data } = await axios.get('http://my-api/stars')
      store.commit('setStars', data)
    }
  }
</script>
```

### Vuex

스토어에서 액션을 호출하기 원하신다면, `store.dispatch`를 `fetch`메소드 안에서호출해주세요. 그리고 액션 내부에 `async`/`await`를 사용하는 것으로 액션을 기다려주세요.

```html
<script>
  export default {
    async fetch({ store, params }) {
      await store.dispatch('GET_STARS')
    }
  }
</script>
```

`store/index.js`

```js
// ...
export const actions = {
  async GET_STARS({ commit }) {
    const { data } = await axios.get('http://my-api/stars')
    commit('SET_STARS', data)
  }
}
```

### 쿼리 스트링 변경 수신하기

기본값으로 모든 쿼리 스트링 변경에 `fetch`메소드가 **호출되지는 않습니다**. 예를들어 페이징(pagination) 컴포넌트에서와 같이 이 기본값을 변경하고 싶으시다면, `watchQuery` 프로퍼티를 통해서 페이지 컴포넌트에서 파라미터를 수신하도록 설정하시면 됩니다. [API `watchQuery` 페이지](/api/pages-watchquery)를 참조해 주세요.
