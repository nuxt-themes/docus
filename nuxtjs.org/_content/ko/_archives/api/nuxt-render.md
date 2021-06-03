---
title: 'API: nuxt.render(req, res)'
description: 당신의 node.js 서버를 위해 Nuxt.js를 미들웨어로 사용할 수 있습니다.
menu: render
category: programmatically
position: 202
---

# nuxt.render(req, res)

- 타입: `Function`
- 인자:
  1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- 반환값: `Promise`

> 당신의 node.js 서버를 위해 Nuxt.js를 `nuxt.render` 기능과 함께 미들웨어로 사용할 수 있습니다.

[Express.js](https://github.com/expressjs/express) 예제:

```js
const Nuxt = require('nuxt')
const app = require('express')()
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000

// options으로 nuxt.js를 인스턴스화 합니다.
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// nuxt.js로 모든 route를 랜더합니다.
app.use(nuxt.render)

// dev 모드를 위해 핫-로딩 빌드를 합니다.
if (config.dev) {
  nuxt.build()
}

// 서버
app.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port)
```

<div class="Alert">

**nuxt.render** 는 사용자의 웹 어플리케이션을 랜더링하고, next()는 호출하지 않기때문에 미들웨어가 끝나는 시점에 호출하는 것을 권장합니다.

</div>
