---
title: 'API: Generator 클래스'
description: Nuxt Generator 클래스
menu: Generator
category: internals
position: 306
---

- 소스코드: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## Hooks

특정 라이프 사이클 이벤트에 훅을 등록할 수 있습니다.

| 훅                      | 인자                         | 실행 시점                                                                                            |
| ----------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| `generate:before`       | (generator, generateOptions) | 제너레이션 이전                                                                                      |
| `generate:distRemoved`  | (generator)                  | 목표 폴더가 지워지는 시점 Hook on destination folder cleaned                                         |
| `generate:distCopied`   | (generator)                  | 정적 파일과 빌드된 파일이 복사되는 시점 Hook on copy static and built files                          |
| `generate:page`         | ({route, path, html})        | 사용자가 경로와 html을 업데이트할 수 있게 해주는 훅                                                  |
| `generate:routeCreated` | ({route, path, errors})      | 생성된 페이지 파일이 저장되는 시점 Hook on saving generated page success                             |
| `generate:extendRoutes` | (routes)                     | 생성할 라우트를 사용자가 업데이트할 수 있게 해주는 훅 Hook to let user update the routes to generate |
| `generate:routeFailed`  | (route, errors)              | 생성된 페이지의 저장이 실패하는 시점                                                                 |
| `generate:done`         | (generator, errors)          | 제너레이션 완료 시점                                                                                 |
