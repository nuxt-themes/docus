---
title: 'API: Nuxt 클래스'
description: Nuxt 코어 클래스
menu: Nuxt
category: internals
position: 302
---

- 소스: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)**

이 클래스는 모든 모듈과 클래스가 서로 통신할 수 있는 핵심 컨테이너입니다. 모든모듈은 `this.nuxt`를 사용하여 Nuxt 인스턴스에 액세스할 수 있습니다.

## Hooks

특정 라이프사이클 이벤트에 훅을 등록할 수 있습니다.

```js
nuxt.hook('ready', async nuxt => {
  // 여기에 커스텀 코드를 두세요.
})
```

| 플러그인 | 인자                   | 사용할 시기                                                                      |
| -------- | ---------------------- | -------------------------------------------------------------------------------- |
| `ready`  | (nuxt)                 | Nuxt가 작동 준비되었을 때 (`ModuleContainer`와 `Renderer`가 준비됨).             |
| `error`  | (error)                | 후크를 호출하는 도중 처리되지 않은 오류가 발생할 때                              |
| `close`  | (nuxt)                 | Nuxt instance가 정상적으로 닫힐 때                                               |
| `listen` | (server, {host, port}) | Nuxt **내부의** 서버가 리스닝을 시작할 때. (`nuxt start`나 `nuxt dev`를 사용시). |
