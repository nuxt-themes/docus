---
title: PostCSS 플러그인
description: PostCSS 플러그인을 추가하려면?
category: configuration
position: 4
---

# PostCSS 플러그인을 추가하려면?

<!-- In your `nuxt.config.js` file: -->

`nuxt.config.js` 파일에 다음처럼 작성합니다:

```js
export default {
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```
