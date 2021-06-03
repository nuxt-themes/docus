---
title: 'API: modulesDir 프로퍼티'
description: Nuxt.js 어플리케이션의 모듈 디렉토리를 정의합니다
menu: modulesDir
category: configuration
position: 120
---

- 타입: `Array`
- 기본값: `['node_modules']`

> 경로 처리를 위한 모듈 디렉토리를 설정하는데 사용됩니다. (예: 웹팩의 `resolveLoading`, `nodeExternals`, `postcss`) 설정 경로는 [options.rootDir](/api/configuration-rootdir) (기본값: `process.cwd()`)에 상대적입니다.

예제 (`nuxt.config.js`):

```js
export default {
  modulesDir: ['../../node_modules']
}
```

프로젝트가 Yarn workspace 스타일의 mono-repository로 조직되어 있다면 이 필드의설정은 반드시 필요할 것입니다.
