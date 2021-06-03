---
title: 'API: generate 프로퍼티'
description: 범용 웹 어플리케이션의 생성을 정적 웹 어플리케이션에 구성합니다.
menu: generate
category: configuration
position: 110
---

# generate 프로퍼티

- 타입: `Object`

> 범용 웹 어플리케이션의 생성을 정적 웹 어플리케이션에 구성합니다.

런칭할 때의 `nuxt generate` 또는 `nuxt.generate()`의 호출로 config 파일에 정의된 `generate` 프로퍼티를 nuxt.js가 사용합니다.

## dir

- 타입: `String`
- 기본값: `'dist'`

`nuxt generate`에 의해 폴더명이 만들어집니다.

## minify

- 타입: `Object`
- 기본값:

```js
minify: {
  collapseBooleanAttributes: true,
  collapseWhitespace: false,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeAttributeQuotes: false,
  removeComments: false,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeTagWhitespace: false,
  sortAttributes: true,
  sortClassName: false,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

사용자는 nuxt.js의 generate 명령어가 실행되는 동안 만들어질 minify html files에대한 기본 설정을 [html-minifier](https://github.com/kangax/html-minifier)으로 바꿀 수 있습니다.

## 경로

- 타입: `Array`

[동적 경로](/guide/routing#dynamic-routes)는 generate 명령어가 무시됩니다.

예제:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

nuxt.js는 `/`경로만 생성합니다.

만약 nuxt.js로 동적 params를 사용하는 경로하려면, 동적 경로를 배열로 설정해줘야합니다.

`nuxt.config.js`내부의 `/users/:id`를 위해 경로를 추가합니다.:

```js
module.exports = {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

`nuxt generate`를 실행:

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

훌륭합니다. 그런데 만약 사용자가 **동적 params** 를 사용한다면?

1. `Promise`를 반환하는 `함수`를 사용합니다.
2. `콜백`을 사용하는 `함수`를 사용합니다.

### Promise를 반환하는 함수

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return '/users/' + user.id
        })
      })
    }
  }
}
```

### 콜백을 사용하는 함수

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes(callback) {
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => {
            return '/users/' + user.id
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  }
}
```
