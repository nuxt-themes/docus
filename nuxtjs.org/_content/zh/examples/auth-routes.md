---
title: 路由鉴权
description: Nuxt.js 的路由鉴权示例
github: auth-routes
livedemo: https://nuxt-auth-routes.gomix.me
liveedit: https://gomix.com/#!/project/nuxt-auth-routes
category: advanced
position: 302
---

# 文档

> Nuxt.js 可以很轻松地创建需要鉴权的路由。

## 使用 Express 和 Sessions

想要给应用添加 sessions 特性的话，我们将要用到 `express` and `express-session`。因此，我们需要以编程形式使用 Nuxt.js。

首先，我们先安装依赖包：

```bash
yarn add express express-session body-parser whatwg-fetch
```

_我们待会会讲到 `whatwg-fetch`。_

然后创建 `server.js`：

```js
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

// Body parser，用来封装 req.body
app.use(bodyParser.json())

// Sessions 来创建 req.session
app.use(
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
)

// 发起 POST /api/login 请求完成用户登录，并添加该用户到 req.session.authUser
app.post('/api/login', function (req, res) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// 发起 POST /api/logout 请求注销当前用户，并从 req.session 中移除
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// 我们用这些选项初始化 Nuxt.js：
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({ dev: !isProd })
// 生产模式不需要 build
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3000)
console.log('Server is listening on http://localhost:3000')
```

然后更新我们的 `package.json` 脚本：

```json
// ...
"scripts": {
  "dev": "node server.js",
  "build": "nuxt build",
  "start": "cross-env NODE_ENV=production node server.js"
}
// ...
```

注意： 要使上面的例子要正常运行，你需要运行 `npm install --save-dev cross-env` 安装 `cross-env`。当然如果你的开发环境不是 Windows 的话，可以不用安装 `cross-env`，这时需要将 `start` 脚本中的 `cross-env` 去掉。

## 使用状态树数据（store）

我们的应用需要一个全局的状态树，让**每个页面**都知道用户是否已登录。

为了让 Nuxt.js 使用 Vuex，我们创建一个 `store/index.js` 文件：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// window.fetch() 的 Polyfill
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

1. 为了让 Vue 使用 Vuex，我们引入 `Vue` 和 `Vuex`（Nuxt.js 已包含），这样组件内就多了个 `$store` 属性了
2. 为了让 `fetch()` 函数在所有浏览器可用，我们引入 `require('whatwg-fetch')`（见 [fetch 代码库](https://github.com/github/fetch))
3. 我们新建一个 `SET_USER` mutation，它会把当前已登录的用户对象注入到 `state.authUser` 中
4. 我们导出状态树 (store) 实例，让 Nuxt.js 可以把它注入到我们的应用中

### nuxtServerInit() 方法

Nuxt.js 会以上下文对象作为参数，调用一个特别的方法，叫做 `nuxtServerInit`。所以当应用完毕时，一些我们从服务器获取到的数据就会被填充到这个状态树 (store) 上。

在 `store/index.js` 文件中，我们添加这个 `nuxtServerInit` 方法：

```js
nuxtServerInit ({ commit }, { req }) {
  if (req.session && req.session.authUser) {
    commit('SET_USER', req.session.authUser)
  }
}
```

有几种方式可以使 `nuxtServerInit` 的方法体异步化，你可以根据自己的情况选择其一：

1. 调用返回 `Promise` 的函数， nuxt.js 会等待该`Promise`被解析之后才会设置组件的数据，从而渲染组件。
2. 使用 [async 或 await](https://github.com/lukehoban/ecmascript-asyncawait) ([了解更多](https://zeit.co/blog/async-and-await))
3. 调用使用回调函数作为参数的函数。

### login() 方法

我们添加一个登录 `login` 方法，它会在用户登录的时候被页面组件调用：

```js
login ({ commit }, { username, password }) {
  return fetch('/api/login', {
    // 发送客户端 cookies 到服务端
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

### logout() 方法

```js
logout ({ commit }) {
  return fetch('/api/logout', {
    // 发送客户端 cookies 到服务端
    credentials: 'same-origin',
    method: 'POST'
  })
  .then(() => {
    commit('SET_USER', null)
  })
}
```

## 页面组件

然后我们在页面组件内使用 `$store.state.authUser` 变量，来检查用户是否已登录。

### 如果没登录则跳转

我们来试着添加一个只有登录用户可见的 `/secret` 路由：

```html
<template>
  <div>
    <h1>超级隐私的页面</h1>
    <router-link to="/">返回主页</router-link>
  </div>
</template>

<script>
  export default {
    // 这里只用 fetch() 方法，因为我们不需要在这个组件中设置 data
    fetch({ store, redirect }) {
      if (!store.state.authUser) {
        return redirect('/')
      }
    }
  }
</script>
```

在 `fetch` 方法中可以看到，如果用户没登录，我们会直接调 `redirect('/')` 跳转页面回首页。
