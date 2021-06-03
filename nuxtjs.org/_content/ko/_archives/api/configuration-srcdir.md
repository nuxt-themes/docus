---
title: 'API: srcDir 프로퍼티'
description: 당신의 nuxt.js 어플리케이션 소스 폴더를 정의합니다
menu: srcDir
category: configuration
position: 128
---

# srcDir 프로퍼티

- 타입: `String`
- 기본값: [rootDir value](/api/configuration-rootdir)

> 당신의 nuxt.js 어플리케이션 소스 폴더를 정의합니다.

예제 (`nuxt.config.js`):

```js
module.exports = {
  srcDir: 'client/'
}
```

그러면, 당신의 어플리케이션 구조는 다음과 같습니다:

```bash
-| app/
---| node_modules/
---| client/
------| pages/
------| components/
---| nuxt.config.js
---| package.json
```

이 옵션은 사용자 정의 서버를 가지고 nuxt.js를 사용하는 것이 유용하기 때문에, 모든 npm 의존성을 하나의 `package.json`에서 재그룹화 될 수 있습니다.
