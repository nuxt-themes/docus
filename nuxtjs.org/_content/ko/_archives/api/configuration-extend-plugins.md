---
title: 'API: extendPlugins 프로퍼티'
description: extendPlugins 프로퍼티는 Nuxt.js 플러그인을 커스텀할 수 있게 해줍니다.
menu: extendPlugins
category: configuration
position: 109
---

> extendPlugins 프로퍼티는 Nuxt.js 플러그인을 커스텀할 수 있게 해줍니다 ([options.plugins](/api/configuration-plugins)).

- 타입: `Function`
- 기본값: `undefined`

여러분은 플러그인을 확장하거나 Nuxt.js가 정한 플러그인 순서를 변경하길 원할수도있습니다. 이 함수는 [플러그인](/api/configuration-plugins) 객체의 배열을 받고 반환해야 합니다.

플러그인 순서를 변경하는 예제 (`nuxt.config.js`):

```js
export default {
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(
      ({ src }) => src === '~/plugins/shouldBeFirst.js'
    )
    const shouldBeFirstPlugin = plugins[pluginIndex]

    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)

    return plugins
  }
}
```
