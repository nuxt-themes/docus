---
title: 'API: loading indicator 프로퍼티'
description: SPA 페이지가 로딩되는 동안 멋진 로딩 인디케이터를 보여주세요!
menu: loadingIndicator
category: configuration
position: 116
---

> SPA 페이지가 로딩되는 동안 멋진 로딩 인디케이터를 보여주세요!

Nuxt.js가 SPA 모드로 실행되면 첫 페이지를 로드하는 동안에는 표시할 서버측 컨텐츠가 없습니다. 그래서 페이지가 로딩되는 동안에 보이는 빈 페이지 대신에 spinner를표시하도록 해보겠습니다.

이 프로퍼티는 `string`, `false` 또는 `object`의 세가지 다른 타입을 받습니다. 만약 문자열이 주어진다면 해당 문자열은 객체 스타일로 변환됩니다.

기본값:

```js
{
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## Built-in 인디케이터

이 인디케이터들은 [Spinkit](http://tobiasahlin.com/spinkit) 프로젝트로부터 포팅되었습니다. 데모 페이지에서 미리 볼 수 있습니다.

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

Built-in 인디케이터는 `color`와 `background` 옵션을 지원합니다.

## 커스텀 인디케이터

자신만의 특별한 인디케이터가 필요하다면 인디케이터 소스 코드 html 템플릿을 가리키는 경로를 문자열 값이나 Name 키로 넘길 수 있습니다. 모든 옵션들이 템플릿에도마찬가지로 전달됩니다.

베이스 코드가 필요하다면 Nuxt의 built-in [소스 코드](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading)를사용하셔도 됩니다.
