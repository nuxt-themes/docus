---
title: 'API: globalName 프로퍼티'
description: Nuxt.js를 사용하여 기본 Vue 인스턴스 이름 및 기타 옵션뿐만 아니라 기본 HTML 템플릿에 사용되는 전역 ID까지 커스터마이즈할 수 있습니다.
menu: globalName
category: configuration
position: 111
---

> Nuxt.js를 사용하여 기본 Vue 인스턴스 이름 및 기타 옵션뿐만 아니라 기본 HTML 템플릿에 사용되는 전역 ID까지 커스터마이즈할 수 있습니다.

- 타입: `String`
- 기본값: `nuxt`

예제:

`nuxt.config.js`

```js
{
  globalName: 'myCustomName'
}
```

이 값은 자바스크립트 식별자 규칙을 따라야 합니다.

## 전역 프로퍼티

> `globalName`을 기본값으로 하는 특정 전역 ID를 사용자 정의합니다.

- 타입: `Object`
- 기본값:

```js
{
  id: globalName => `__${globalName}`,
  nuxt: globalName => `$${globalName}`,
  context: globalName => `__${globalName.toUpperCase()}__`,
  pluginPrefix: globalName => globalName,
  readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
  loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
},
```
