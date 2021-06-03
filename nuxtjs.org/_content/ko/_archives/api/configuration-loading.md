---
title: 'API: loading 프로퍼티'
description: Nuxt.js는 자체 컴포넌트를 이용하여 경로 사이의 progress bar를 보여줍니다. 사용자가 정의하거나 자신만의 컴포넌트를 만들어 사용할 수 있으며, 사용하지 않아도 됩니다.
menu: loading
category: configuration
position: 115
---

# loading 프로퍼티

- 타입: `Boolean` 또는 `Object` 또는 `String`

> Nuxt.js는 자체 컴포넌트를 이용하여 경로 사이의 progress bar를 보여줍니다. 사용자가 정의하거나 자신만의 컴포넌트를 만들어 사용할 수 있으며, 사용하지 않아도됩니다.

## Progress Bar 사용 여부

- 타입: `Boolean`

만약 경로 사이의 progress bar를 표시하고 싶지 않다면, 간단하게 `nuxt.config.js` 파일의 `loading: false`옵션을 추가하면 됩니다:

```js
module.exports = {
  loading: false
}
```

## 사용자 정의 Progress Bar

- 타입: `Object`

progress bar를 사용자 정의할 수 있는 프로퍼티 목록.

| 키            | 타입   | 기본값    | 설명                                                                                                              |
| ------------- | ------ | --------- | ----------------------------------------------------------------------------------------------------------------- |
| `color`       | String | `'black'` | progress bar의 CSS 색상                                                                                           |
| `failedColor` | String | `'red'`   | 경로 랜더링에 에러가 발생한 경우의 progress bar의 CSS 색상 (예를들어 `data` 또는 `fetch`에서 에러가 발생한 경우). |
| `height`      | String | `'2px'`   | progress bar의 높이 (progress bar의 `style` 속성에서 사용됩니다.)                                                 |
| `duration`    | Number | `5000`    | ms 기준, progress bar의 최대 진행시간이며, Nuxt,js는 경로가 5초 전에 랜더된다고 가정합니다.                       |

`nuxt.config.js`를 아래와 같이 업데이트하면 height가 5px인 파란 progress bar를확인하실 수 있습니다:

```js
module.exports = {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

## 사용자 정의 Loading 컴포넌트 사용

- 타입: `String`

Nuxt.js가 호출 할 기본 컴포넌트 대신 사용자 컴포넌트를 직접 만들어 호출할 수 있습니다. `loading` 옵션으로 사용자 컴포넌트 경로를 제공해야 합니다. 그러면 Nuxt.js에 의해 바로 사용자 컴포넌트가 호출됩니다.

**컴포넌트는 메서드의 일부를 노출해줘야 합니다:**

| 메서드          | 필수여부   | 설명                                                                                           |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `start()`       | Required   | 경로가 변경될 때 호출되며, 그 시점에 컴포넌트가 보여집니다.                                    |
| `finish()`      | Required   | 경로가 로드되었을 때(그리고 데이터가 fetch 되었을 때) 호출되며, 그 시점에 컴포넌트를 숨깁니다. |
| `fail(error)`   | _Optional_ | 경로가 로드되지 않았을 때 호출됩니다 (예를들어 데이터가 fetch에 실패했을 때).                  |
| `increase(num)` | _Optional_ | 경로가 로딩중인 동안, `num` 정수가 100보다 작을 때 호출됩니다.                                 |

우리는 `components/loading.vue`에 사용자 정의 컴포넌트를 만들 수 있습니다:

```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>로딩중...</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
```

그리고 `nuxt.config.js` 파일을 업데이트해서 Nuxt.js가 사용자 정의 컴포넌트를 사용하도록 합니다:

```js
module.exports = {
  loading: '~/components/loading.vue'
}
```
