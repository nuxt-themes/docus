---
title: 비동기 데이터
description: 여러분은 서버에서 데이터를 가져와 렌더링하고 싶을 수 있습니다. 이를 위해 Nuxt.js에서는 컴포넌트의 데이터를 셋팅하기 전에 비동기 작업을 처리할 수 있게 하는 `asyncData`를 지원합니다.
category: getting-started
position: 106
---

> 여러분은 서버에서 데이터를 가져와 렌더링하고 싶을 수 있습니다. 이를 위해 Nuxt.js에서는 컴포넌트의 데이터를 셋팅하기 전에 비동기 작업을 처리할 수 있게하는 `asyncData`를 지원합니다.

<div>
  <a href="https://vueschool.io/courses/async-data-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
    <img src="/async-data-with-nuxtjs.png" srcset="/async-data-with-nuxtjs-2x.png 2x" alt="AsyncData by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title"> Nuxt.js와 Async Data</h4>
      <p class="Promote__Content__Description"> Nuxt.js로 어떻게 비동기 데이터를 처리하는지를 배워보세요.</p>
      <p class="Promote__Content__Signature">VueSchool의 동영상 강의가 Nuxt.js 개발을 지원합니다.</p>
    </div>
  </a>

## asyncData 메소드

여러분은 때로는 store를 사용하지 않고 서버사이드에서 데이터를 가져오고 렌더링하고 싶을 수 있습니다. 이 때 `pages` 컴포넌트를 로딩하기 전에 매번 호출되는 `asyncData`를 사용하면 됩니다. 이 메소드는 (Nuxt 애플리케이션의 최초 로드 시) 서버 사이드에서 한 번 호출되고, 이후 라우트 이동 시 클라이언트 사이드에서 호출됩니다. 이 메소드는 [컨택스트](/api/context)를 첫 번째 인자로 받기 때문에, 여러분은이 메소드를 데이터를 가져오는 데 사용할 수 있고 Nuxt.js는 그 데이터를 컴포넌트데이터와 병합합니다. Nuxt.js는 반환된 객체를 컴포넌트 데이터와 자동으로 병합합니다 .

<div class="Alert Alert--orange">

절대로 `asyncData` 안에서 컴포넌트를 참조하기 위해 `this`를 **사용하지 마세요. 컴포넌트가 생성되기 전에** 호출되기 때문에 `this`에 엑세스할 수 없습니다.

</div>

`asyncData`에는 몇 가지 사용 방법이 있습니다. 아래 중에서 원하는 것을 골라 사용해보세요:

1. `Promise` 객체를 리턴할 수 있습니다. Nuxt.js는 컴포넌트를 렌더링하기 전에 promise가 처리될 때까지 기다립니다.
2. [async/await](https://javascript.info/async-await)을 사용합니다. ([더 자세한 정보를 여기서 알아보세요.](https://zeit.co/blog/async-and-await))

<div class="Alert Alert--grey">

이 Isomorphic(동형의) HTTP 리퀘스트를 생성하기 위해 우리는 [axios](https://github.com/mzabriskie/axios)를 사용합니다. 우리는 여러분의 Nuxt 프로젝트에 [axios module](https://axios.nuxtjs.org/)을 사용하기를 <strong>강력히권합니다.</strong>.

</div>

`node_modules`에서 `axios`를 직접 사용하고, 인터셉터 추가를 위해 `axios.interceptors`를 사용하고 있다면 인터셉터 추가전에 인스턴스를 생성했는지를확인하세요.

그렇지 않다면 서버 렌더링된 페이지를 리프레시했을 때, 인터셉터는 다수로 추가될것이고, 이는 데이터 에러를 발생시킬 수 있습니다.

```js
import axios from 'axios'
const myaxios = axios.create({
  // ...
})
myaxios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // ...
  }
)
```

### Promise 객체 사용하기

```js
export default {
  asyncData({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`).then(res => {
      return { title: res.data.title }
    })
  }
}
```

### async/await 사용하기

```js
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### data 표시하기

asyncData의 반환 값은 data와 **합쳐집니다.** 따라서 위의 예처럼 사용할 경우 템플릿에서 아래와 같이 사용할 수 있게 됩니다:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## context

`context`에서 사용가능한 키의 리스트를 보고 싶으시다면, [API Essential `context`](/api/context)를 확인해주세요.

### `req`/`res` 객체 사용하기

서버 사이드에서 `asyncData`를 호출할 때에는, 사용자 요청의 `req`와 `res` 객체에접근이 가능합니다.

```js
export default {
  async asyncData({ req, res }) {
    // Please check if you are on the server side before
    // using req and res
    if (process.server) {
      return { host: req.headers.host }
    }

    return {}
  }
}
```

### 동적 라우트 데이터 접근

동적 라우트 데이터에 접근하기 위해 `context` 파라미터를 사용해도 됩니다! 예를 들어, 동적 라우트 파라미터는 파일이나 폴더의 이름으로 조회가 가능할 수 있습니다. 예를 들어서 `_slug.vue`라 `pages`에 파일 이름을 정의했다면, 해당 값에 `context.params.slug`를 통해 접근 가능합니다.

```js
export default {
  async asyncData({ params }) {
    const slug = params.slug // When calling /abc the slug will be "abc"
    return { slug }
  }
}
```

### 쿼리 변경 수신하기

기본적으로는 `asyncData`는 query string이 변화해도 **호출되지 않습니다.** 예를들어서 페이징 컴포넌트를 만드는 경우처럼 이를 변경하고 싶으시다면, 페이지 컴포넌트에 `watchQuery` 프로퍼티로 파라미터 변경을 수신하게끔 할 수 있습니다. [API `watchQuery` page](/api/pages-watchquery)에서 더 자세한 내용을 확인해주세요 .

## 에러처리

Nuxt.js는 `context`에 에러페이지를 보여줄 수 있는`error(params)` 메소드를 추가했습니다. `params.statusCode`가 서버로부터 들어오는 상태 코드를 보여줄 것입니다.

`Promise`를 사용할 경우 예제:

```js
export default {
  asyncData({ params, error }) {
    return axios
      .get(`https://my-api/posts/${params.id}`)
      .then(res => {
        return { title: res.data.title }
      })
      .catch(e => {
        error({ statusCode: 404, message: 'Post not found' })
      })
  }
}
```

에러 페이지를 사용자정의 하시려면, [views guide](/guide/views#layouts)를 참조해주세요.
