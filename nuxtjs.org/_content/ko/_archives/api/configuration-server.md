---
title: 'API: server 프로퍼티'
description: '`nuxt.config.js`를 통해서 애플리케이션의 서버 연결 변수를 설정할 수 있습니다.'
menu: server
category: configuration
position: 126
---

- 타입: `Object`

> `nuxt.config.js`를 통해서 애플리케이션의 서버 연결 변수를 설정할 수 있습니다.

## 기본예제 (`nuxt.config.js`):

```js
export default {
  server: {
    port: 8000, // 기본값: 3000
    host: '0.0.0.0', // 기본값: localhost,
    timing: false
  }
}
```

이 설정은 여러분의 Nuxt.js 서버 인스턴스의 [호스트와 포트](/docs/2.x/features/configuration#edit-host-and-port)를 지정합니다.

## HTTPS 설정을 사용한 예제

`nuxt.config.js`

```js
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

[certificates for localhost](https://letsencrypt.org/docs/certificates-for-localhost/)에서 로컬 호스트에서 사용될 서버 키와 인증서를 만드는 방법에 대한 정보를 제공합니다.

## 소켓 설정을 사용한 예제

```js
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```

## timing

- 타입: `Object` 또는 `Boolean`
- 기본값: `false`

`server.timing` 옵션을 활성화하면 서버 사이드 렌더링에 걸리는 시간을 측정하는 미들웨어가 추가되며, 헤더에 'Server-Timing'이라는 값으로 보여집니다.

### timing 설정을 이용한 예제

`server.timing`은 옵션을 제공하는 객체가 될 수 있습니다. 현재로써는 `total`만이지원됩니다. (서버 사이드 렌더링에 걸리는 전체 시간을 직접적으로 추적하는 설정입니다.)

```js
export default {
  server: {
    timing: {
      total: true
    }
  }
}
```

### timing api 사용하기

`server.time`이 활성화되면 `response`에도 `timing` api가 주입됩니다.

#### 구문

```js
res.timing.start(name, description)
res.timing.end(name)
```

#### 서버 미들웨어에 timing을 사용한 예제

```js
export default function (req, res, next) {
  res.timing.start('midd', 'Middleware timing description')
  // 서버 사이드 작업..
  // ...
  res.timing.end('midd')
  next()
}
```

이제 응답 헤더에 `server-timing`이라는 값이 다음과 같이 추가됩니다:

```bash
Server-Timing: midd;desc="Middleware timing description";dur=2.4
```

더 자세한 내용은 [Server-Timing MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing)을참조하세요.
