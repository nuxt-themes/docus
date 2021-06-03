---
title: 업그레이드하기
description: Nuxt.js를 업그레이드하는 것은 빠르지만 package.json를 업데이트하는 것보다 복잡합니다.
position: 5
category: get-started
---

> Nuxt.js를 업그레이드하는 것은 빠르지만 package.json를 업데이트하는 것보다 복잡합니다.

Nuxt v2.14로 업그레이드하고 있고 정적 호스팅을 사용하길 원한다면 generate 명령이 제대로 동작하도록 nuxt.config.js 파일에 [target:static](/docs/2.x/features/deployment-targets#static-hosting)를 추가해야 합니다.

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

## 시작하기

1. 특정 릴리즈에 대해 추가적인 지시사항이 있는지 확인하기 위해 업그레이드하려는 버전의 [release notes](/docs/release-notes)를 확인하세요.
2. `package.json` 파일에 있는 `nuxt` 패키지에 지정된 버전을 업데이트하세요.

이 단계 이후에 해야 하는 일은 Yarn을 사용하는지 npm을 사용하는지에 따라 다릅니다. _[Yarn](https://yarnpkg.com/en/docs/usage)은 테스트가 작성된 개발 도구이기 때문에 Nuxt를 작업할 때 선호되는 패키지 관리자입니다._

## Yarn

3. `yarn.lock` 파일을 삭제하세요
4. `node_modules` 디렉터리를 삭제하세요
5. `yarn` 명령어를 실행하세요
6. 설치가 완료되고 테스트를 실행한 후 다른 디펜던시로 업그레이드하는 것이 좋습니다. `yarn outdated` 명령어를 사용할 수 있습니다.

## npm

3. `package-lock.json` 파일을 삭제하세요
4. `node_modules` 디렉터리를 삭제하세요
5. `npm install` 명령어를 실행하세요
6. 설치가 완료되고 테스트를 실행한 후 다른 디펜던시로 업그레이드하는 것이 좋습니다. `npm outdated` 명령어를 사용할 수 있습니다.
