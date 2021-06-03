---
title: 'API: env 프로퍼티'
description: 클라이언트와 서버 사이 공유되는 환경 변수.
menu: env
category: configuration
position: 108
---

# env 프로퍼티

- 타입: `Object`

> Nuxt.js로 클라이언트와 서버 측면에서 공유할 환경 변수들을 만들 수 있습니다.

예제 (`nuxt.config.js`):

```js
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

`BASE_URL`가 정의되어 있다면, `baseUrl` 프로피티를 만들 수 있으며 `baseUrl`은 `http://localhost:3000`과 같습니다.

자신의 `baseUrl`로 접근할 2가지 방법이 있습니다:

1. `process.env.baseUrl`
2. `context.baseUrl`, [context api](/api#context) 페이지로 확인할 수 있습니다.

예제의 public token을 제공하기 위해 `env` 프로퍼티를 사용합니다.

예제를 사용하기 위해 [axios](https://github.com/mzabriskie/axios)를 사용합니다.

`plugins/axios.js`:

```js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

당신은 axios를 다음과 같이 사용할 수 있습니다: `import axios from '~plugins/axios'`
