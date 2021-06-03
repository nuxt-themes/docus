---
title: 렌더링 모드
description: 렌더링 모드
position: 1
category: features
---

## Universal

`mode: 'universal'`: 범용 어플리케이션 (서버 사이드 렌더링 또는 정적 사이트).

```js{}[nuxt.config.js]
export default {
  mode: 'universal' // default universal
}
```

<base-alert type="info">
기본 모드가 universal 모드이므로 이를 적용하기 위해 nuxt 설정을 추가할 필요가 없습니다.
</base-alert>

## SPA

`mode: 'spa'`: 서버 사이드 렌더링 미적용 (오직 클라이언트 사이드 렌더링 전용)

mode 속성을 사용하여 기본적인 nuxt 프로젝트의 모드를 변경할 수 있습니다:

```js{}[nuxt.config.js]
export default {
  mode: 'spa' // default universal
}
```

<base-alert type="next">

[mode property에 대해 더 알아보기](/docs/2.x/configuration-glossary/configuration-mode)

</base-alert>
