---
title: 'API: Builder 클래스'
description: Nuxt `Builder` 클래스
menu: Builder
category: internals
position: 305
---

- 소스코드: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)**

## Hooks

특정 라이프 사이클 이벤트에 훅을 등록할 수 있습니다.

```js
// 빌드에 훅을 추가합니다.
this.nuxt.hook('build:done', (builder) => {
  ...
})
```

| 훅                      | 인자                                        | 실행 시점                                                                                                                                             |
| ----------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:before`          | (nuxt, buildOptions)                        | Nuxt 빌드가 시작되기 이전                                                                                                                             |
| `builder:prepared`      | (nuxt, buildOptions)                        | 빌드 디렉토리가 생성되었을 때                                                                                                                         |
| `builder:extendPlugins` | (plugins)                                   | 플러그인 생성 시점 Generating plugins                                                                                                                 |
| `build:templates`       | ({ templatesFiles, templateVars, resolve }) | `.nuxt` 템플릿 파일 생성 시점                                                                                                                         |
| `build:extendRoutes`    | (routes, resolve)                           | 라우트 생성 시점                                                                                                                                      |
| `webpack:config`        | (webpackConfigs)                            | 컴파일러 구성 이전                                                                                                                                    |
| `build:compile`         | ({ name, compiler })                        | 웹팩 컴파일 이전 (compiler는 웹팩의 `Compiler` 인스턴스입니다), universal 모드에서는 name값이 한번은 `'client'`, 한번은 `'server'`로 두번 호출됩니다. |
| `build:compiled`        | ({ name, compiler, stats })                 | 웹팩 빌드 완료 시점                                                                                                                                   |
| `build:done`            | (nuxt)                                      | Nuxt 빌드 완료 시점                                                                                                                                   |
