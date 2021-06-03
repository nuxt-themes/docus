---
title: 'API: plugins 프로퍼티'
description: nuxt.js plugins 옵션으로 vue.js 플러그인 사용하기.
menu: plugins
category: configuration
position: 121
---

# plugins 프로퍼티

- 타입: `Array`
  - Items: `String` or `Object`

만약 item이 object일 때, 프로퍼티는:

- src: `String` (파일 경로)
- injectAs: `String` (기본값은 `false`) _만약 정의되어 있다면, 내보내진 객체는메인 어플리케이션과 컨텍스트에 주입됩니다._
- ssr: `Boolean` (기본값은 `true`) _만약 false라면, 파일은 클라이언트에만 포함될것입니다._

> plugins 프로퍼티에 손쉽게 메인 어플리케이션의 vue.js plugins 추가할 수 있습니다.

예제 (`nuxt.config.js`):

```js
module.exports = {
  plugins: ['~plugins/vue-notifications']
}
```

그러면, 우리는 `plugins/vue-notifications.js`에 파일을 만들어야 합니다:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

`plugins` 프로퍼티 내에 정의된 모든 경로는 메인 어플리케이션을 초기화하기 전에 **imported** 될 것입니다.

`Vue.use()`를 사용할 때 마다, `plugins/` 경로에 파일을 추가해야하고 `nuxt.config.js`의 `plugins`에 경로를 추가해야 합니다.

plugins 사용법에 대해 더 알아보시려면 [가이드 문서](/guide/plugins#vue-plugins)를 봐주세요.
