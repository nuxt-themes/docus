---
title: 'API: mode 프로퍼티'
description: 기본 nuxt 모드를 변경합니다.
menu: mode
category: configuration
position: 117
---

- 타입: `string`
  - 기본값: `universal`
  - 사용가능한 값:
    - `'spa'`: 서버사이드 렌더링을 하지 않음 (클라이언트 사이드 네비게이션)
    - `'universal'`: 동형 어플리케이션 (서버사이드 렌더링 + 클라이언트 사이드 네비게이션)

> 이 옵션은 `nuxt.config.js`에서 사용가능하며 nuxt의 기본 모드를 변경할 수 있습니다.
