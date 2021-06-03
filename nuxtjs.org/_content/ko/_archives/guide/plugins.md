---
title: 플러그인
description: Nuxt.js에서는 루트 vue.js 어플리케이션이 만들어지기 전에 실행할 js 플러그인을 정의할 수 있습니다. 직접 만든 라이브러리나 외부 모듈들 모두 사용 가능합니다.
category: getting-started
position: 108
---

> Nuxt.js에서는 루트 Vue.js 어플리케이션이 만들어지기 전에 실행할 JavaScript 플러그인을 정의할 수 있습니다. 직접 만든 라이브러리나 외부 모듈들 모두 사용 가능합니다.

<div class="Alert">

모든 Vue [인스턴스의 라이프사이클](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram)에서 **클라이언트사이드와 서버사이드 모두 호출되는 메소드** 는 `beforeCreate`와 `created` 뿐입니다. 다른 메소드들은 모두 클라이언트 사이드에서만 호출됨을 명심하세요.

</div>

## 외부 패키지

서버와 클라이언트 모두에서 HTTP 리퀘스트를 만들기 위해 [axios](https://github.com/mzabriskie/axios) 라는 외부 패키지를 사용한다는 가정을 해보겠습니다.

먼저 npm을 통해 설치합니다:

```bash
npm install --save axios
```

이를 페이지 컴포넌트에서 바로 사용할 수 있습니다:

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  import axios from 'axios'

  export default {
    async asyncData({ params }) {
      let { data } = await axios.get(`https://my-api/posts/${params.id}`)
      return { title: data.title }
    }
  }
</script>
```

## Vue 플러그인

만약 애플리케이션에서 알림을 표시하기 위해 [vue-notifications](https://github.com/se-panfilov/vue-notifications)를 사용하고싶다면, 먼저 앱이 실행되기 전에 플러그인을 셋업해야 합니다.

`plugins/vue-notifications.js` 파일입니다:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

이제 `nuxt.config.js` 내의 `plugins` 키에 파일을 추가합니다:

```js
export default {
  plugins: ['~/plugins/vue-notifications']
}
```

`plugins` 키에 대한 자세한 정보는 [플러그인 API](/api/configuration-plugins)에서확인할 수 있습니다.

## ES6 플러그인

플러그인이 `node_modules`에 있고 ES6 모듈로 export 된다면, `transpile` 빌드 옵션에 이를 추가해야 합니다:

```js
module.exports = {
  build: {
    transpile: ['vue-notifications']
  }
}
```

빌드 옵션에 대한 자세한 정보는 [configuration build](/api/configuration-build/#transpile)에서 확인할 수 있습니다.

## \$root 와 context에 주입하기

때때로 여러분은 앱 전체에서 사용 가능한 function이나 value를 만들고 싶을 수 있습니다. 이에 해당하는 변수를 Vue 인스턴스나(클라이언트 사이드), 컨텍스트(서버 사이드) 그리고 심지어 Vuex 스토어에 주입 가능합니다. 코드 컨벤션으로 함수명에 `$`를붙입니다.

### Vue 인스턴스에 주입하기

일반 Vue 앱에서 이 작업을 할 때와 비슷하게 Vue 인스턴스에 주입합니다.

`plugins/vue-inject.js`:

```js
import Vue from 'vue'

Vue.prototype.$myInjectedFunction = string =>
  console.log('This is an example', string)
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/vue-inject.js']
}
```

여러분의 Vue 컴포넌트에서 이 함수를 사용하실 수 있습니다:

`example-component.vue`:

```js
export default {
  mounted() {
    this.$myInjectedFunction('test')
  }
}
```

### 컨텍스트에 주입하기

일반 Vue 앱에서 이 작업을 할 때와 비슷하게 Vue 인스턴스에 주입합니다.

`plugins/ctx-inject.js`:

```js
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.myInjectedFunction = string =>
    console.log('Okay, another function', string)
}
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/ctx-inject.js']
}
```

(`asyncData`에서 `fetch` 접근하는 경우와 같이) `context`에 접근할 때마다 이 함수는 사용 가능합니다.

`ctx-example-component.vue`:

```js
export default {
  asyncData(context) {
    context.app.myInjectedFunction('ctx!')
  }
}
```

### 혼합해 주입하기

만약 `context` 에서 위의 함수가 필요하다면, Vue 인스턴스 혹은 Vuex 스토어에서 `inject` 함수를 사용할 수 있습니다. 이 `inject`는 플러그인의 export 함수의 두 번째 인자입니다.

일반 Vue 앱에서 이 작업을 할 때와 비슷하게 해당 내용을 Vue 인스턴스에 주입합니다 . `$`는 자동적으로 이 함수 앞에 붙습니다.

`plugins/combined-inject.js`:

```js
export default ({ app }, inject) => {
  inject('myInjectedFunction', string => console.log('That was easy!', string))
}
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/combined-inject.js']
}
```

이제 이 함수는 `context`, 혹은 Vue 인스턴스에서 `this`로, 혹은 Vuex 스토어의 `actions`/`mutations`에서는 `this`로 사용 가능합니다.

`ctx-example-component.vue`:

```js
export default {
  mounted() {
    this.$myInjectedFunction('works in mounted')
  },
  asyncData(context) {
    context.app.$myInjectedFunction('works with context')
  }
}
```

`store/index.js`:

```js
export const state = () => ({
  someValue: ''
})

export const mutations = {
  changeSomeValue(state, newValue) {
    this.$myInjectedFunction('accessible in mutations')
    state.someValue = newValue
  }
}

export const actions = {
  setSomeValueToWhatever({ commit }) {
    this.$myInjectedFunction('accessible in actions')
    const newValue = 'whatever'
    commit('changeSomeValue', newValue)
  }
}
```

## 클라이언트에서만 사용하기

SSR 지원 부족으로 **브라우저에서만 작동하는 플러그인** 을 사용하려면 `plugins`에 `mode`: `client` 옵션을 추가함으로써 클라이언트 사이드에서만 작동하도록 할 수 있습니다.

예시:

`nuxt.config.js`:

```js
module.exports = {
  plugins: [{ src: '~/plugins/vue-notifications', mode: 'client' }]
}
```

`plugins/vue-notifications.js`:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

만약 _서버 사이드에서만_ 라이브러리를 플러그인에 임포트 해야한다면, `process.server` 변수를 `true`로 설정하면 됩니다.

또한, (`nuxt generate`를 통해) 생성된 앱 내부에 있는지를 알고 싶다면, `process.static`이 `true`인지를 확인하면 됩니다. 이는 오직 생성 중 혹은 생성 이후에만 적용됩니다.

페이지가 `nuxt generate`로 서버 렌더링될 때 시점을 알기 위해서 `process.static && process.server`이 두 옵션을 복합적으로 사용할 수 있습니다.

**Note**: Nuxt.js 2.4 이후로, 플러그인의 특정 타입을 위해서 `mode`가 `plugin`의옵션으로 도입되었습니다. 사용 가능한 값으로는: `client`나 `server`가 있습니다. `ssr: false`는 `mode: 'client'`로 사용 가능하며 다음 메이저 릴리즈에는 deprecated될 예정입니다.

예를 들어:

`nuxt.config.js`:

```js
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

### 플러그인 네이밍 컨벤션

만약 어떤 플러그인이 클라이언트 혹은 서버 사이드에서만 작동해야한다면, `.client.js`나 `.server.js`가 플러그인 파일에 추가적으로 붙을 수 잇습니다. 해당파일은 자동적으로 연관된 클라이언트/서버 사이드에 포함됩니다.

예를 들어:

`nuxt.config.js`:

```js
export default {
  plugins: [
    '~/plugins/foo.client.js', // only in client side
    '~/plugins/bar.server.js', // only in server side
    '~/plugins/baz.js' // both client & server
  ]
}
```
