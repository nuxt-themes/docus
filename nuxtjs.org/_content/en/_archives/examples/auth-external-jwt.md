---
title: Auth External API (JWT)
description: Authentication with external API service (jsonwebtoken) example with Nuxt.js
github: auth-jwt
code: https://github.com/ahadyekta/nuxt-auth-external-jwt
category: advanced
position: 303
---

# Documentation

In auth-routes example both api and nuxt start together and use one Node.js server instance. However, sometimes we should work with external api with jsonWebToken. In this example it will be explained in a simple way.

## Official `auth-module`

If you want to implement complex authentication flows, for example OAuth2, we suggest using the official [`auth-module`](https://github.com/nuxt-community/auth-module)

## Structure

Since Nuxt.js provides both server and client rendering and the cookie of browser is different from cookie of the Node.js server, we should push token data to some storage that can be accessible in both sides.

### For server rendering

We should save the token in session browser cookie after login, then it can be accessed through `req.headers.cookie` in middleware files, `nuxtServerInit` function or wherever you can access the `req`.

### For client rendering

We directly commit token in the store, as long as the page is not closed or reloaded, we have the token.

First, we install the dependencies:

```bash
npm install js-cookie --save
npm install cookieparser --save
```

## Login Page

Then inside page directory make a `login.vue` file, and inside the script section, add:

```js
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  methods: {
    postLogin() {
      setTimeout(() => {
        // we simulate the async request with timeout.
        const auth = {
          accessToken: 'someStringGotFromApiServiceWithAjax'
        }
        this.$store.commit('setAuth', auth) // mutating to store for client rendering
        Cookie.set('auth', auth) // saving token in cookie for server rendering
        this.$router.push('/')
      }, 1000)
    }
  }
}
```

> Note: we simulate the async request with timeout.

## Using the store

After that make `index.js` in `store` directory like below :

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
            // No valid cookie found
          }
        }
        commit('setAuth', auth)
      }
    }
  })
}

export default createStore
```

> Note: the `nuxtServerInit` function only runs in every server side rendering. So we use it to mutate the session browser cookie in the store. We can get the session browser cookie by using `req.headers.cookie` and parse it using `cookieparser`.

## checking auth middlewares

We can check the store for havin the accessToken in every page we need to limit access. In middleware directory we make `authenticated.js` file:

```javascript
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.auth) {
    return redirect('/login')
  }
}
```

and in middleware directory make `notAuthenticated.js` file for login page:

```javascript
export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home page
  if (store.state.auth) {
    return redirect('/')
  }
}
```

> Note: use `authenticated` middleware for pages which need authentication and use `notAuthenticated` middleware inside the login/register and similar pages.

## Logging out the User

Finally to allow the user to logout of the system, we can remove the cookie:

```javascript
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  methods: {
    logout() {
      // Code will also be required to invalidate the JWT Cookie on external API
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
    }
  }
}
```

> Note: refer to the method using @click="logout"
