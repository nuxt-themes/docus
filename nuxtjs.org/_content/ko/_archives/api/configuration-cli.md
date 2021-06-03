---
title: 'API: cli 프로퍼티'
description: CLI 구성을 커스텀할 수 있습니다.
menu: cli
category: configuration
position: 103
---

> CLI 구성을 커스텀 할 수 있습니다.

## 배너 색상

- 타입: `String`
- 기본값: `green`

CLI 배너의 'Nuxt.js' 타이틀 색상을 변경합니다.

사용 가능한 색깔:

- `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

예제 (`nuxt.config.js`):

```js
export default {
  cli: {
    bannerColor: 'yellow'
  }
}
```
