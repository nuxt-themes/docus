---
title: 'Свойство key'
description: Задание свойства `key` для внутреннего `<router-view>` компонента
menu: Свойство Key
category: components-glossary
---

> Задание свойства `key` для внутреннего `<router-view>` компонента

- **Тип:** `String` или `Function`

Свойство `key` передается в `<router-view>`, который используется для создания переходов внутри динамической страницы и различных роутов. Использование разных ключей приводит к перерисовке компонентов страницы.

Есть несколько способов задать key. Для подробной информации, обратитесь к свойсту `nuxtChildKey` в [nuxt component](/docs/2.x/features/nuxt-components)

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
