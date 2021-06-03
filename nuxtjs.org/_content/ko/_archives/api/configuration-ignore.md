---
title: 'API: ignore 프로퍼티'
description: Nuxt.js 어플리케이션에서 무시할 파일을을 정의합니다
menu: ignore
category: configuration
position: 114
---

## .nuxtignore

빌드 타임 동안에 Nuxt.js가 `layout`, `page`, `store`, `middleware` 파일들을 무시하게 하도록 프로젝트 루트 디렉토리(`rootDir`)의 `.nuxtignore` 파일을 사용할 수있습니다. `.nuxtignore` 파일은`.gitignore`이나 `.eslintignore` 파일과 동일한 스펙을 따릅니다. 각 줄은 무시할 파일을 나타내는 glob 패턴입니다.

예제:

```
# ignore layout foo.vue
layouts/foo.vue
# ignore layout files whose name ends with -ignore.vue
layouts/*-ignore.vue

# ignore page bar.vue
pages/bar.vue
# ignore page inside ignore folder
pages/ignore/*.vue

# ignore store baz.js
store/baz.js
# ignore store files match *.test.*
store/ignore/*.test.*

# ignore middleware files under foo folder except foo/bar.js
middleware/foo/*.js
!middleware/foo/bar.js
```

> [gitignore doc](https://git-scm.com/docs/gitignore)에서 스펙에 대해 더 자세히알아보세요.

## ignorePrefix 프로퍼티

- 타입: `String`
- 기본값: `'-'`

> pages/, layout/, middleware/ 또는 store/에 저장된 파일 중에서 `.ignorePrefix`에 명시된 텍스트로 시작하는 파일명을 갖는 파일들은 빌드 중에 전부 무시될 것입니다.

기본적으로 `store/-foo.js`, `store/-foo.js`나 `pages/-bar.vue`와 같이 이름이 `-`로 시작하는 파일들은 모두 무시됩니다. 이 설정은 테스트, 유틸리티, 컴포넌트 파일들이 route, store로 변환되지 않고도 호출자와 함께 존재할 수 있게 해줍니다.

## ignore 프로퍼티

- 타입: `Array`
- 기본값: `['**/*.test.*']`

> `ignorePrefix`보다 더 자유롭게 커스텀할 수 있으며 `ignore`의 glob 패턴과 일치하는 모든 파일들이 빌드 중에 무시됩니다.

## ignoreOptions

`nuxtignore`는 내부적으로 `node-ignore`를 사용합니다. `ignoreOptions`는 `node-ignore`의 `options`로 설정됩니다.

예제 (`nuxt.config.js`, .nuxtignore가 대소문자를 구분하게 만듦):

```js
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```
