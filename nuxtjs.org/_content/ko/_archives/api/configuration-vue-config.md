---
title: 'API: vue.config 프로퍼티'
description: Vue.config의 설정 객체
menu: vue.config
category: configuration
position: 132
---

- 타입: `Object`
- 기본값: `{ silent: !isDev, performance: isDev }`

> vue.config 프로퍼티는 `Vue.config`에 값을 그대로 전달하는 매개 역할을 합니다

**예시**

`nuxt.config.js`

```js
export default {
  vue: {
    config: {
      productionTip: true,
      devtools: false
    }
  }
}
```

이 설정은 다음과 같은 Vue.config를 만들어냅니다:

```js
Vue.config.productionTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [default value]
Vue.config.performance // isDev [default value]
```

[공식 Vue 문서](https://vuejs.org/v2/api/#Global-Config)에서 `Vue.config` API에대해 더 알아보세요.
