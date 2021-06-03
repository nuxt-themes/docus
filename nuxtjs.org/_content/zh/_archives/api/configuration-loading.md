---
title: 'API: loading 属性配置'
description: 在页面切换的时候，Nuxt.js 使用内置的加载组件显示加载进度条。你可以定制它的样式，禁用或者创建自己的加载组件。
menu: loading
category: configuration
position: 115
---

# loading 属性配置

- 类型： `Boolean` 或 `Object` 或 `String`

> 在页面切换的时候，Nuxt.js 使用内置的加载组件显示加载进度条。你可以定制它的样式，禁用或者创建自己的加载组件。

在你的组件中你可以使用`this.$nuxt.$loading.start()`来启动加载条。使用`this.$nuxt.$loading.finish()`来使加载条结束。

```javascript
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

如果要在`mounted`方法中启动它，请确保使用`this.$nextTick`来调用它，因为`$loading`可能无法立即使用。

## 禁用加载进度条

- 类型： `Boolean`

页面切换的时候如果不想显示加载进度条，可以在 `nuxt.config.js` 里面增加 `loading: false` 的配置：

```js
module.exports = {
  loading: false
}
```

## 个性化加载进度条

- 类型： `Object`

以下表格为进度条定制化时可用到的配置项及其说明。

| 键            | 类型    | 默认值    | 描述                                                                 |
| ------------- | ------- | --------- | -------------------------------------------------------------------- |
| `color`       | String  | `'black'` | 进度条的颜色                                                         |
| `failedColor` | String  | `'red'`   | 页面加载失败时的颜色 （当 `data` 或 `fetch` 方法返回错误时）。       |
| `height`      | String  | `'2px'`   | 进度条的高度 (在进度条元素的 `style` 属性上体现)。                   |
| `throttle`    | Number  | `200`     | 在 ms 中，在显示进度条之前等待指定的时间。用于防止条形闪烁。         |
| `duration`    | Number  | `5000`    | 进度条的最大显示时长，单位毫秒。Nuxt.js 假设页面在该时长内加载完毕。 |
| `continuous`  | Boolean | `false`   | 当加载时间超过`duration`时，保持动画进度条。                         |
| `css`         | Boolean | `true`    | 设置为 false 以删除默认进度条样式（并添加自己的样式）。              |
| `rtl`         | Boolean | `false`   | 从右到左设置进度条的方向。                                           |

举个例子，一个 5 像素高的蓝色进度条，可以在 `nuxt.config.js` 中配置如下：

```js
module.exports = {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

## 自定义加载组件

- 类型： `String`

你可以新建一个加载组件替代 Nuxt.js 默认的。使用自己的加载组件，需要在 `loading` 配置项里指定组件的路径，Nuxt.js 会自动调用该组件。

**自定义组件需要实现以下接口方法：**

| 方法            | 是否必须 | 描述                                                                                |
| --------------- | -------- | ----------------------------------------------------------------------------------- |
| `start()`       | 是       | 路由更新（即浏览器地址变化）时调用, 请在该方法内显示组件。                          |
| `finish()`      | 是       | 路由更新完毕（即`asyncData`方法调用完成且页面加载完）时调用，请在该方法内隐藏组件。 |
| `fail(error)`   | _否_     | 路由更新失败时调用（如`asyncData`方法返回异常）。                                   |
| `increase(num)` | _否_     | 页面加载过程中调用, `num` 是小于 100 的整数。                                       |

我们可以在 `components` 目录下创建自定义的加载组件，如 `components/loading.vue`：

```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
```

然后, 更新 `nuxt.config.js` 告诉 Nuxt.js 使用自定义加载组件：

```js
module.exports = {
  loading: '~/components/loading.vue'
}
```

## 进度条时长说明

Loading 组件不可能事先知道多长时间。加载新页面将需要。因此，无法将进度条准确地设置为 100%的加载时间。

Nuxt 的加载组件通过让你设置 `duration` 来部分解决这个问题，这应该设置为 _guestimate_ 加载过程需要多长时间。 除非您使用自定义加载组件，否则进度条将始终在 `duration` 时间内从 0%移至 100%（无论实际进度如何）。 当加载时间超过 `duration` 时，进度条将保持 100%直到加载完成。

您可以通过将`continuous`设置为 true 来更改默认行为，然后在达到 100%后，进度条将在`duration`时间内再次收缩回 0%。当达到 0%后仍未完成加载时，它将再次从 0%开始增长到 100%，这将重复直到加载完成。

_持续进度条的示例：_

<img src="/api-continuous-loading.gif" alt="continuous loading"/>
