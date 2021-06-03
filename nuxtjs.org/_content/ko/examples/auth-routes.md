---
title: 인증 경로
description: Nuxt.js를 사용한 인증 경로 예제
github: auth-routes
livedemo: https://nuxt-auth-routes.gomix.me
liveedit: https://gomix.com/#!/project/nuxt-auth-routes
category: advanced
position: 302
---

# 문서

> Nuxt.js로 인증 경로를 쉽게 만들 수 있습니다.

## Using Express and Sessions

Nuxt.js를 사용하면서 어플리케이션에 세션 기능을 추가할 때 `express`와 `express-session`을 사용합니다.

우선, 의존성을 설치해야 합니다:

```bash
yarn add express express-session body-parser whatwg-fetch
```

_`whatwg-fetch`에 대해서는 뒤에 말씀드리겠습니다._

`server.js`를 만듭니다.:

```js
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

// req.body에 접근하기 위한 Body parser
app.use(bodyParser.json())

// req.session을 만들기 위한 session
app.use(
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
)

// POST /api/login 로 로그인하여 req.session.authUser에 추가.
app.post('/api/login', function (req, res) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// POST /api/logout 로 로그아웃하여 req.session.authUser에서 제거.
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// 옵션으로 Nuxt.js를 인스턴스화 합니다.
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({ dev: !isProd })
// 프로덕션 환경에서 빌드되지 않음.
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3000)
console.log('Server is listening on http://localhost:3000')
```

`package.json` 파일 업데이트:

```json
// ...
"scripts": {
  "dev": "node server.js",
  "build": "nuxt build",
  "start": "cross-env NODE_ENV=production node server.js"
}
// ...
```

주의: 위 예제를 확인하기 위해 `npm install --save-dev cross-env` 명령어를 실행해야 합니다. 윈도우에서 개발하지 _않는다면_ `start` 스크립트에서 cross-env를 제외하고 직접 `NODE_ENV`를 설정할 수 있습니다.

## Store 사용하기

사용자가 페이지 **전체** 에 연결되어 있는지 여부를 응용 프로그램에 알리려면 전역상태가 필요합니다.

Nuxt.js가 Vuex를 사용하기 위해서 `store/index.js` 파일을 만듭니다:

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// window.fetch()를 위한 Polyfill
require('whatwg-fetch')

const store = () =>
  new Vuex.Store({
    state: {
      authUser: null
    },

    mutations: {
      SET_USER(state, user) {
        state.authUser = user
      }
    },

    actions: {
      // ...
    }
  })

export default store
```

1. 우리는 `Vue`와 `Vuex` (Nuxt.js에 포함됨)를 가져오고 Vue에게 우리의 컴포넌트에서 `$store`를 사용하기 위해 Vuex를 사용할 것을 요청합니다.
2. 모든 브라우저에서 `fetch()` 메소드를 polyfill하기 위해서 `require('whatwg-fetch')`를 사용합니다. ([fetch repo](https://github.com/github/fetch))
3. 우리는 연결된 사용자의 `state.authUser`를 설정할 `SET_USER` 뮤테이션을 만듭니다.
4. store 인스턴스를 Nuxt.js로 내보내서 어플리케이션에 주입 할 수 있습니다.

### nuxtServerInit() 액션

Nuxt.js는 인자에 컨텍스트가 있는 'nuxtServerInit`라는 특정 작업을 호출했을 때, 앱이 로드되며 store는 서버에서 이미 가져온 일부 데이터로 채워집니다.

`store/index.js`에서 `nuxtServerInit` 액션을 추가 할 수 있습니다:

```js
nuxtServerInit ({ commit }, { req }) {
  if (req.session && req.session.authUser) {
    commit('SET_USER', req.session.authUser)
  }
}
```

nuxt.js는 비동기 데이터 메소드를 만들기 위해 가장 익숙한 메소드를 선택할 수 있는다른 방법들을 제공합니다:

1. Promise를 반환하면, nuxt.js는 컴포넌트를 렌더링하기 전에 Promise가 해결 될 때까지 기다립니다.
2. [async/await proposal](https://github.com/lukehoban/ecmascript-asyncawait) 사용하기 ([더 배워보기](https://zeit.co/blog/async-and-await))

### login() 액션

우리는 사용자 로그인을 위해 호출 될 Pages 컴포넌트에 `login` 액션을 추가합니다:

```js
login ({ commit }, { username, password }) {
  return fetch('/api/login', {
    // 클라이언트 Cookies를 서버로 보냅니다.
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then((res) => {
    if (res.status === 401) {
      throw new Error('Bad credentials')
    } else {
      return res.json()
    }
  })
  .then((authUser) => {
    commit('SET_USER', authUser)
  })
}
```

### logout() 메서드

```js
logout ({ commit }) {
  return fetch('/api/logout', {
    // 클라이언트의 Cookies를 서버로 보냅니다.
    credentials: 'same-origin',
    method: 'POST'
  })
  .then(() => {
    commit('SET_USER', null)
  })
}
```

## Pages 컴포넌트

`$store.state.authUser`를 사용하여 사용자가 어플리케이션에 연결되어 있는지 여부를 확인할 수 있습니다.

### 사용자가 연결되지 않았다면 Redirect

연결된 사용자만 볼 수 있는 `/secret` 라우터를 추가합니다.

```html
<template>
  <div>
    <h1>Super secret page</h1>
    <router-link to="/">Back to the home page</router-link>
  </div>
</template>

<script>
  export default {
    // 이 컴포넌트에 데이터를 설정할 필요가 없으므로 fetch()를 사용합니다.
    fetch({ store, redirect }) {
      if (!store.state.authUser) {
        return redirect('/')
      }
    }
  }
</script>
```

`fetch` 메소드에서 사용자가 연결되어있지 않을 때, `redirect('/')`를 호출하는 것을 볼 수 있습니다.
