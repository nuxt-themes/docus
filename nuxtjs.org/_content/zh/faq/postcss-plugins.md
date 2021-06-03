---
title: Postcss 插件
description: 如何添加 postcss 插件?
category: configuration
position: 4
---

# 如何添加 postcss 插件?

可在 `nuxt.config.js` 文件增加以下配置来添加 postcss 插件：

```js
export default {
  build: {
    postcss: {
      // 添加插件名称作为键，参数作为值
      // 使用npm或yarn安装它们
      plugins: {
        // 通过传递 false 来禁用插件
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // 更改postcss-preset-env 设置
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```
