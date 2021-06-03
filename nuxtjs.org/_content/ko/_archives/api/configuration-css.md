---
title: 'API: css 프로퍼티'
description: Nuxt.js를 사용하면 (포함된 모든 페이지에서) 전역으로 사용할 CSS 파일 / 모듈 / 라이브러리를 설정할 수 있습니다.
menu: css
category: configuration
position: 104
---

# css 프로퍼티

> Nuxt.js를 사용하면 (포함된 모든 페이지에서) 전역으로 사용할 CSS 파일 / 모듈 / 라이브러리를 설정할 수 있습니다.

- 타입: `Array`
- items: `String` or `Object`

만약 items가 object일 경우의 프로퍼티:

- src: `String` (파일 경로)
- lang: `String` ([사용된 전처리기](/docs/2.x/features/configuration#pre-processors))

`nuxt.config.js`안에 CSS 리소스를 추가합니다:

```js
module.exports = {
  css: [
    // node.js 모듈을 로드합니다.
    'hover.css/css/hover-min.css',
    // 전처리기가 사용된 node.js 모듈.
    { src: 'bulma', lang: 'sass' },
    // 프로젝트 내부의 Css 파일
    '~assets/css/main.css',
    // 프로젝트의 sass 파일
    { src: '~assets/css/main.scss', lang: 'scss' } // sass 대신 scss
  ]
}
```
