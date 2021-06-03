---
title: 如何集成 Google 统计分析服务？
description: 如何集成 Google 统计分析服务？
category: configuration
position: 9
---

# 如何集成 Google 统计分析服务？

在 Nuxt.js 应用中使用 [Google 统计分析服务](https://analytics.google.com/analytics/web/) ，推荐在 `plugins` 目录下创建 `plugins/ga.js` 文件：

```js
/*
 ** 只在生产模式的客户端中使用
 */
if (process.client && process.env.NODE_ENV === 'production') {
  /*
   ** Google 统计分析脚本
   */
  ;(function (i, s, o, g, r, a, m) {
    i.GoogleAnalyticsObject = r
    ;(i[r] =
      i[r] ||
      function () {
        ;(i[r].q = i[r].q || []).push(arguments)
      }),
      (i[r].l = 1 * new Date())
    ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  )
  /*
   ** 当前页的访问统计
   */
  ga('create', 'UA-XXXXXXXX-X', 'auto')
}

export default ({ app: { router }, store }) => {
  /*
   ** 每次路由变更时进行pv统计
   */
  router.afterEach((to, from) => {
    /*
     ** 告诉 GA 增加一个 PV
     */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
```

> 记得将 `UA-XXXXXXXX-X` 替换成你的 Google 统计分析服务的跟踪编号。

然后，我们需要告诉 Nuxt.js 将该插件导入主应用中：

`nuxt.config.js`

```js
module.exports = {
  plugins: [{ src: '~plugins/ga.js', mode: 'client' }]
}
```

恭喜，你的 Nuxt.js 应用成功集成了 Google 的统计分析服务。

<div class="Alert Alert--nuxt-green">

<b>提示：</b> 你可以用相同的方法集成别的统计分析服务。

</div>
