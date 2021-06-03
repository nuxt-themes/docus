---
title: JSX
description: Nuxt.js에서 JSX 를 사용하려면?
category: configuration
position: 3
---

# JSX 를 사용하려면?

Nuxt.js는 babel 기본 설정으로 공식 [babel-preset-vue-app](https://github.com/vuejs/babel-preset-vue-app)을 사용합니다. 그래서, 컴포넌트 안에서 JSX 를 사용할 수 있습니다.

컴포넌트의 `render` 메소드 안에서 JSX를 사용할 수 있습니다:

```html
<script>
  export default {
    data() {
      return { name: 'World' }
    },
    render(h) {
      return <h1 class="red">{this.name}</h1>
    }
  }
</script>
```

<div class="Alert Alert--orange">

`h` 를 `createElement`의 alias로 설정하는 것은 Vue 생태계에서 일반적인 컨벤션이며, 또한 JSX에서 요구되는 사항이기도 합니다. 혹시 `h`가 스코프 안에서 사용할 수없는 경우에는 **앱에서는 에러를 발생시키게 됩니다**

</div>

JSX 사용법에 대한 보다 깊은 이해를 위해서는 Vue.js 공식문서의 [JSX](https://kr.vuejs.org/v2/guide/render-function.html#JSX)를 참고하시기 바랍니다.
