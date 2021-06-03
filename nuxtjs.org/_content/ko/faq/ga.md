---
title: Google 애널리틱스의 통합
description: Google 애널리틱스를 사용하려면?
category: configuration
position: 9
---

# Google 애널리틱스를 사용하려면?

<!-- To use [Google Analytics](https://analytics.google.com/analytics/web/) with your nuxt.js application, we recommend to create a file `plugins/ga.js`: -->

Nuxt.js 어플리케이션에서 [Google 애널리틱스](https://analytics.google.com/analytics/web/) 을 사용하려면 `plugins/ga.js` 파일을 작성하는 것을 추천합니다:

<!-- ```js -->
<!-- import router from '~router' -->
<!-- /* -->
<!-- ** Only run on client-side and only in production mode -->
<!-- */ -->
<!-- if (process.env.NODE_ENV === 'production') { -->
<!--   /* -->
<!--   ** Include Google Analytics Script -->
<!--   */ -->
<!--   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ -->
<!--   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), -->
<!--   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) -->
<!--   })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); -->
<!--   /* -->
<!--   ** Set the current page -->
<!--   */ -->
<!--   ga('create', 'UA-XXXXXXXX-X', 'auto') -->
<!--   /* -->
<!--   ** Every time the route changes (fired on initialization too) -->
<!--   */ -->
<!--   router.afterEach((to, from) => { -->
<!--     /* -->
<!--     ** We tell Google Analytic to add a page view -->
<!--     */ -->
<!--     ga('set', 'page', to.fullPath) -->
<!--     ga('send', 'pageview') -->
<!--   }) -->
<!-- } -->
<!-- ``` -->

```js
import router from '~router'
/*
 ** 클라이언트 사이드와 프로덕션 모드에서만 실행됩니다
 */
if (process.env.NODE_ENV === 'production') {
  /*
   ** Google 애널리틱스 스크립트를 include
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
   ** 현재 페이지를 설정
   */
  ga('create', 'UA-XXXXXXXX-X', 'auto')
}

export default ({ app: { router }, store }) => {
  /*
   ** 라우트가 변경될 때마다 실행 (초기 설정 시에도 실행됨)
   */
  router.afterEach((to, from) => {
    /*
     ** Google 애널리틱스에게 페이지뷰가 추가된 것을 전달
     */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
```

> `UA-XXXXXXXX-X` 를 Google 애널리틱스 트랙킹 아이디로 변경해 주세요.

그리고 `plugins/ga.js`를 메인 어플리케이션에서 import 하는 것을 Nuxt.js 에게 전달합니다:

`nuxt.config.js`

```js
module.exports = {
  plugins: [{ src: '~plugins/ga.js', mode: 'client' }]
}
```

자! 이걸로 Google 애널리틱스는 Nuxt.js 어플리케이션에 통합되었고, 모든 페이지뷰를 트랙킹할수 있게 되었습니다!

<div class="Alert Alert--nuxt-green">

<b>정보:</b> 다른 트랙킹 서비스라도 동일한 방법으로 사용할 수 있습니다.

</div>
