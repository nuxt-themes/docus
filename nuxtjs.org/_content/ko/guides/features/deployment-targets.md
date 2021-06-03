---
title: 개발 타겟
description: 개발 타겟
position: 2
category: features
---

## Static Hosting

정적 호스팅 (서버가 필요 없는 호스팅)의 경우 nuxt.config 파일의 target에 static을 추가해야합니다.

```js{}[nuxt.config.js]
export default {
  target: 'static' // default is 'server'
}
```

target static과 함께 nuxt dev를 실행하면 개발자 경험이 향상됩니다.

- `context` 객체인 `req` & `res` 객체는 제거됩니다.
- 404, 오류 및 리디렉션등은 클라이언트 사이드 렌더링으로 대체됩니다. [SPA fallback 자세히 보기](/docs/2.x/concepts/static-site-generation#spa-fallback)
- `$route.query` 는 서버 사이드 렌더링에서는 항상 `{}` 와 같습니다.
- `process.static` 은 항상 true 입니다.

<base-alert type="info">
모듈 작성자가 사용자 타겟에 따라 로직을 추가 할 수 있도록 `process.target` 을 제공하고 있습니다.
</base-alert>

## Server Hosting

서버 호스팅인 경우 target의 기본값은 server로 설정됩니다.

```js{}[nuxt.config.js]
export default {
  target: 'server'
}
```
