---
title: 'API: rootDir 프로퍼티'
description: nuxt.js 어플리케이션의 workspace 정의
menu: rootDir
category: configuration
position: 123
---

# rootDir 프로퍼티

- 타입: `String`
- 기본값: `process.cwd()`

> nuxt.js 어플리케이션의 workspace 정의

이 프로퍼티는 [nuxt commands](/guide/commands)에 의해 덮어쓰고 명령어 인자로 설정됩니다 (예제: `nuxt my-app/` 명령어는 `rootDir`을 `my-app/`의 절대경로로 설정합니다).

이 프로퍼티는 [nuxt.js programmatically](/api/nuxt)을 사용할 때 함께 사용할 수있습니다.

이 옵션의 단점은 `node_modules` 폴더가 `rootDir` 폴더 내부에 있어야 한다는 것입니다. 만약 node_modules 없이 경로를 설정하기를 원한다면 [`srcDir` 옵션](/api/configuration-srcdir)을 사용하세요.</p>
