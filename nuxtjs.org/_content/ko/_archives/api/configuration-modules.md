---
title: 'API: modules 프로퍼티'
description: 모듈은 Nuxt.js의 핵심 기능성을 확장하고 끊임없는 통합을 더해주는 extension 입니다.
menu: modules
category: configuration
position: 119
---

- 타입: `Array`

> 모듈은 Nuxt.js의 핵심 기능성을 확장하고 끊임없는 통합을 더해주는 extension 입니다. [더 알아보기](/guide/modules)

예제 (`nuxt.config.js`):

```js
export default {
  modules: [
    // 패키지명 사용
    '@nuxtjs/axios',

    // 프로젝트 src 디렉토리의 상대경로
    '~/modules/awesome.js',

    // 옵션 제공
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // 인라인 정의
    function () {}
  ]
}
```

모듈 개발자들은 대부분 사용상의 필요한 단계와 디테일들을 부가적으로 제공합니다.

Nust.js modules 배열의 각 항목을 노드 require 경로(`node_modules`)로 접근을 시도하고 `~` 별칭이 사용된 경우 프로젝트의 `srcDir`에서 처리합니다. 모듈들은 순차적으로 실행되기 때문에 순서는 매우 중요합니다.

모듈들은 nuxt 빌드/런타임을 향상하기 위한 함수를 export 해야 하며 선택적으로 작업이 완료될 때까지 promise를 반환할 수 있습니다. 모듈들은 런타임 시에 require 된다는 것을 명심하시고, 그러므로 ES6 기능에 의존하는 모듈은 반드시 트랜스파일되어있어야 합니다.

직접 모듈 개발하는 일에 관심이 있으시다면 [Modules Guide](/guide/modules)에서 모듈의 동작법에 대한 더 자세한 정보를 확인하세요. 또한 저희는 [Modules](https://github.com/nuxt-community/awesome-nuxt#modules) 섹션에서 Nuxt 커뮤니티에 의해 만들어진 Production 수준의 모듈 리스트를 제공하고 있습니다.

## `buildModules`

<div class="Alert Alert--info">

이 기능은 Nuxt v2.9 이상에서 지원합니다

</div>

모듈 중에는 개발과 빌드 중에만 필요한 것들도 있습니다. `buildModules`는 production 생성을 더 빠르게 만들어 주고 production 배포를 위한 `node_modules`의크기를 상당히 줄여줍니다.

사용상의 차이점은 다음과 같습니다:

- `nuxt.config.js` 내부의 `modules`에 추가하는 대신 `buildModules`를 사용합니다.
- `package.json`의 `dependencies`에 추가하는 대신에 `devDependencies`를 사용합니다 (`yarn add --dev` 또는 `npm install --save-dev`로 설치합니다)
