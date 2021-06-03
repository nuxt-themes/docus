---
title: 업그레이드하기
description: Nuxt.js를 업그레이드하는 것은 쉽지만, 단지 package.json을 업데이트만 하는 것은 아닙니다.
category: prologue
position: 4
---

> Nuxt.js를 업그레이드하는 것은 쉽지만, 단지 package.json을 업데이트만 하는 것은아닙니다.

## 시작하기

1. 업그레이드할 버전에서 특정 릴리즈에 추가적인 지시사항들이 있는 지 확인을 위해 [릴리즈 노트](/guide/release-notes)를 참조해 주세요.
2. 특정 버전을 `package.json` 파일에 `nuxt` 패키지에 명시해 주세요.

다음은 여러분이 Yarn을 쓰는지 npm을 쓰는 지에 다라 다릅니다. _Nuxt의 개발 툴인[Yarn](https://yarnpkg.com/en/docs/usage)이 Nuxt와의 작업을 위해 선호되는 패키지 매니저입니다._

## Yarn

3. `yarn.lock` 파일 삭제
4. `node_modules` 디렉토리 삭제
5. `yarn` 커맨드 실행
6. 설치가 완료되고 테스트를 실행한 후에는 다른 디펜던시들도 업그레이드하는 것이좋습니다. `yarn outdated`가 유용할 수 있습니다.

## npm

3. `package-lock.json` 파일 삭제
4. `node_modules` 디렉토리 삭제
5. `npm install` 커맨드 실행
6. 설치가 완료되고 테스트를 실행한 후에는 다른 디펜던시들도 업그레이드하는 것이좋습니다. `npm outdated`가 유용할 수 있습니다.
