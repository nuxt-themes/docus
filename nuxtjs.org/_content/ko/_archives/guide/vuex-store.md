---
title: Vuex Store
description: Nuxt.js가 Vuex를 구현하는 핵심 이유는, 저장소를 사용하여 상태를 관리하는 것은 모든 대형 애플리케이션에서 중요하기 때문입니다.
category: getting-started
position: 110
---

> Nuxt.js가 [Vuex](https://github.com/vuejs/vuex) 구현하는 핵심 이유는, 저장소를사용하여 상태를 관리하는 것은 모든 대형 애플리케이션에서 중요하기 때문입니다.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/utilising-the-vuex-store-nuxtjs?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
     Vue School에서 <strong>Nuxt.js와 Vuex</strong>에 대한 무료 강의를 보세요.
    </p>
  </a>
</div>

## Store 활성화하기

Nuxt.js는 store 디렉토리를 지켜보고 있습니다. 만약 `store` 디렉토리가 존재한다면 :

1. Vuex를 불러오고,
2. 루트 `Vue` 인스턴스에 `store` 옵션을 추가합니다.

Nuxt.js에서는 **2가지 store 모드** 를 지원하며, 선호하는 모드를 사용하세요:

- **모듈:** store 디렉토리 내의 모든 .js 파일이 [같은 이름의 모듈](http://vuex.vuejs.org/en/modules.html)로 변환됩니다. (`index`는 루트 모듈이 됩니다.)
- **클래식(**deprecated**):** `store/index.js`에서 store 인스턴스를 return 합니다.

모드와 관계없이, 서버 측에서 원치 않을 상태 *공유*를 방지하려면 항상 `state` 값은 **항상 `함수`**여야 합니다.

## 모듈 모드

> Nuxt.js는 `store` 디렉토리에서 모든 모듈을 관리할 수 있도록 해줍니다.

`store/index.js` 파일에 store 인스턴스 대신 state와 mutations, actions를 export 합니다:

```js
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

이제 `store/todos.js` 파일을 만들 수 있습니다:

```js
export const state = () => ({
  list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
```

store는 아래와 같이 생성될 것입니다:

```js
new Vuex.Store({
  state: { counter: 0 },
  mutations: {
    increment(state) {
      state.counter++
    }
  },
  modules: {
    todos: {
      state: {
        list: []
      },
      mutations: {
        add(state, { text }) {
          state.list.push({
            text,
            done: false
          })
        },
        remove(state, { todo }) {
          state.list.splice(state.list.indexOf(todo), 1)
        },
        toggle(state, { todo }) {
          todo.done = !todo.done
        }
      }
    }
  }
})
```

이제 `pages/todos.vue` 컴포넌트에서 `todos` 모듈을 사용해보겠습니다:

```html
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.text">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li>
      <input @keyup.enter="addTodo" placeholder="What needs to be done?" />
    </li>
  </ul>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    computed: {
      todos() {
        return this.$store.state.todos.list
      }
    },
    methods: {
      addTodo(e) {
        this.$store.commit('todos/add', e.target.value)
        e.target.value = ''
      },
      ...mapMutations({
        toggle: 'todos/toggle'
      })
    }
  }
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>
```

> 이 모듈 메소드는 `store` 디렉토리에 하위 디렉토리를 구현하지 않고도 최상위 정의에서도 작동합니다.

state 예시: 여러분은 `store/state.js`에 파일을 생성하고 다음을 추가할 수 있습니다.

```js
export default () => ({
  counter: 0
})
```

그런 다음 mutation을 `store/mutations.js`에 두면 됩니다.

```js
export default {
  increment(state) {
    state.counter++
  }
}
```

### 모듈 파일

선택적으로 모듈 파일을 개별 파일들로 나눌 수 있습니다: `state.js`, `actions.js`, `mutations.js`과 `getters.js`. actions에 대해 별도의 단일 파일이 있는 상태에서 index.js 파일을 state, getters 및 mutations으로 유지해도 제대로 인식됩니다.

> Note: 모듈 파일을 나누었더라도, 화살표 함수의 경우 `this`는 렉시컬(lexical)하게 사용가능함을 기억해주세요. 렉시컬 스포킹이란 `this`는 항상 arrow function의주인만을 참조함을 의미합니다. 화살표 함수가 포함되지 않았다면 `this`는 undefined일 것입니다. 이에 대한 해결책은 자기 자신의 스코프를 형성하는 "일반" 함수를 사용해 `this`를 사용가능하게끔 하는 것입니다.

### 플러그인

`store/index.js` 파일에 등록하는 것으로, (모듈 모드에서) 스토어에 플러그인 추가가 가능합니다.

```js
import myPlugin from 'myPlugin'

export const plugins = [myPlugin]

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

플러그인에 대한 더 많은 정보: [Vuex documentation](https://vuex.vuejs.org/en/plugins.html).

## fetch 메소드

> `fetch` 메소드는 페이지를 렌더링하기 전에 store를 채우기 위해서 사용됩니다. 컴포넌트의 data를 설정하지 않는다는 점을 빼고는 `asyncData` 메소드와 비슷합니다.

fetch 메소드에 대한 더 많은 정보: [API 페이지 fetch](/api/pages-fetch)

## nuxtServerInit 액션

만약 store에 `nuxtServerInit`가 정의되고 모드가 `universal`이라면, Nuxt.js는 서버사이드에서 context와 함께 이 함수를 호출합니다. 이는 서버에서 받은 데이터를 클라이언트로 직접 전달할 때 유용합니다.

예를 들어, 서버에서 세션을 가지고 있다면 `req.session.user`로 접근이 가능합니다. store로 유저의 인증 정보를 전달하기 위해서는 `store/index.js`를 아래와 같이 수정합니다:

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

> 만약 Vuex 스토어의 _모듈_ 모드를 사용한다면 최상위 모듈(`store/index.js`)에서만 이 함수가 호출되기 때문에, 다른 모듈에 대한 액션을 이곳에서 같이 처리해야합니다.

[context](/api/context)는 `nuxtServerInit` 함수의 두 번째 인자로 주어지는데, `asyncData`나 `fetch` 메소드와 같습니다.

`nuxt generate`를 작동시킨다면, `nuxtServerInit`는 모든 동적 생성된 라우트에 대해 작동할 것입니다.

> Note: 비동기 `nuxtServerInit` 액션은 `nuxt` 서버가 처리하기 위해 반드시 Promise를 반환하거나 async/await로 대체되어야합니다.

```js
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Vuex Strict 모드

Strict 모드는 기본적으로 dev 모드에서 활성화되어 있으며, production 모드에서는꺼져있습니다. dev에서 strict 모드 비활성화를 위해서는 아래와 같이 `store/index.js`에서 처리해 주세요:

`export const strict = false`

## 클래식 모드

> 아래 기능은 더 이상 사용되지 않으며 Nuxt3에서는 삭제될 것입니다.

클래식 모드로 store를 활성화하려면, Vuex 인스턴스를 리턴하는 메소드를 내보내는 `store/index.js` 파일을 생성하면 됩니다.

```js
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      counter: 0
    }),
    mutations: {
      increment(state) {
        state.counter++
      }
    }
  })
}

export default createStore
```

> nuxt.js에 `vuex`가 포함되어 있기 때문에 따로 설치할 필요 없습니다.

이제 컴포넌트에서 `this.$store`를 사용할 수 있습니다:

```html
<template>
  <button @click="$store.commit('increment')">
    {{ $store.state.counter }}
  </button>
</template>
```
