---
title: 跨域身份验证 (JWT)
description: 使用Nuxt.js通过外部API服务(jsonwebtoken)示例进行身份验证
github: auth-jwt
code: https://github.com/ahadyekta/nuxt-auth-external-jwt
category: advanced
position: 303
---

# 文档

在 auth-routes 示例中，api 和 nuxt 一起启动并使用一个 Node.js 服务器实例。但是，有时我们应该使用`jsonWebToken`处理外部 api 身份验证问题。在这个例子中，将用最简单的方式解释。

## 官方 `auth-module`

如果要实现复杂的身份验证流程，例如 OAuth2，我们建议使用官方 [`auth-module`](https://github.com/nuxt-community/auth-module)

## 结构

由于 Nuxt.js 同时提供服务器和客户端呈现，并且浏览器的 cookie 与 Node.js 服务器的 cookie 不同，因此我们应该将令牌(token)数据推送到可以在两端访问的某个存储空间中。

### 用于服务器端渲染

我们应该在登录后在会话浏览器 cookie 中保存令牌(token)，然后可以通过中间件文件中的 `req.headers.cookie`， `nuxtServerInit` 函数或者你可以访问 `req` 来得到它。

### 用于客户端渲染

我们直接在商店中提交令牌(token)，只要页面没有关闭或重新加载，我们就有令牌 (token)。

首先，我们安装依赖项：

```bash
npm install js-cookie --save
npm install cookieparser --save
```

## 登录页面

然后在页面目录中创建一个 `login.vue` 文件，并在脚本部分中添加：

```js
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  methods: {
    postLogin() {
      setTimeout(() => {
        // 我们用超时模拟异步请求。
        const auth = {
          accessToken: 'someStringGotFromApiServiceWithAjax'
        }
        this.$store.commit('setAuth', auth) // 存储在vuex中用来进行客户端渲染
        Cookie.set('auth', auth) // 在cookie中保存token用来进行服务器端渲染
        this.$router.push('/')
      }, 1000)
    }
  }
}
```

> 注意: 我们用超时模拟异步请求。

## 使用 store

之后在 `store`[状态树] 目录中新建 `index.js` ，如下所示：

```javascript
import Vuex from 'vuex'

const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      auth: null
    }),
    mutations: {
      setAuth(state, auth) {
        state.auth = auth
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            auth = JSON.parse(parsed.auth)
          } catch (err) {
            // 找不到有效的Cookie
          }
        }
        commit('setAuth', auth)
      }
    }
  })
}

export default createStore
```

> 注意：`nuxtServerInit` 函数仅在每个服务器端渲染中运行。因此我们使用 store 来改变中浏览器 cookie。我们可以使用`req.headers.cookie`获取浏览器 cookie，并使用`cookie-parser`解析它。

## 检查 auth 中间件

我们可以检查商店是否在我们需要限制访问的每个页面中都有访问令牌(token)。在中间件 (middleware)目录中，我们新建 `authenticated.js` 文件：

```javascript
export default function ({ store, redirect }) {
  // 如果用户未经过身份验证
  if (!store.state.auth) {
    return redirect('/login')
  }
}
```

在中间件(middleware)目录中为登录页面新建 `notAuthenticated.js` 文件：

```javascript
export default function ({ store, redirect }) {
  // 如果用户通过身份验证，则重定向到主页
  if (store.state.auth) {
    return redirect('/')
  }
}
```

> 注意：对于需要身份验证的页面使用 `authenticated` 中间件，并在 登录/注册 和类似页面中使用 `notAuthenticated` 中间件。

## 注销用户

最后为了允许用户退出登录，我们可以删除 cookie：

```javascript
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  methods: {
    logout() {
      // 使外部API上的JWT Cookie无效
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
    }
  }
}
```

> Note: refer to the method using @click="logout"
