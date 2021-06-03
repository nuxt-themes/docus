---
title: 애셋
description: Nuxt는 강력한 에셋 처리를 위해 기본적으로 Webpack의 vue-loader, file-loader, url-loader를 사용합니다. 하지만 정적 에셋을 위해서 Static 폴더를 사용할 수 있습니다.
category: getting-started
position: 107
---

> Nuxt는 강력한 에셋 처리를 위해 기본적으로 Webpack의 vue-loader, file-loader, url-loader를 사용합니다. 하지만 정적 에셋을 위해서 Static 폴더를 사용할 수 있습니다.

## Webpack 사용

기본적으로 [vue-loader](http://vue-loader.vuejs.org/en/)는 자동으로 style과 template 파일을 `css-loader`와 Vue template compiler를 사용해 처리합니다. 이 컴파일 프로세스에서, `<img src="...">`나 `background: url(...)`, `@import` 같은 모든 에셋 URL은 모듈 디펜던시로 처리됩니다.

아래와 같은 파일 구조로 예를 들겠습니다:

```bash
-| assets/
----| image.png
-| pages/
----| index.vue
```

만약 CSS에서 `url('~assets/image.png')` 로 사용했다면 `require('~assets/image.png')`로 *변환*됩니다.

<div class="Alert Alert--orange">

**경고:** Nuxt 2.0에서부터 `~/` 알리아스는 CSS 파일에서 올바르게 처리되지 않습니다. 여러분은 (슬래시 없이) `~assets` 이나 `@` 알리아스를 `url` CSS 참조 경로에서사용하셔야 합니다, 예를 들어, `background: url("~assets/banner.svg")`

</div>

또한 만약 `page/index.vue`에서 아래와 같이 사용했다면,:

```html
<template>
  <img src="~assets/image.png" />
</template>
```

아래와 같이 컴파일 될 것입니다:

```js
createElement('img', { attrs: { src: require('~assets/image.png') } })
```

`.png` 파일은 자바스크립트 파일이 아니기 때문에 nuxt.js는 이를 처리하기 위해 [file-loader](https://github.com/webpack/file-loader)와 [url-loader](https://github.com/webpack/url-loader)를 사용합니다.

이럴 때 얻게되는 이익은 아래와 같습니다:

- `file-loader`는 에셋 파일을 복사하고 배치할 위치를 지정하고 캐싱을 위해 버전해시를 사용하여 이름을 지정하는 방법을 제공합니다. 프로덕션 모드에서, 기본적으로장기적인 캐싱 처리라는 이득을 보실 수 있습니다!
- `url-loader`는 한계치보다 작은 용량의 파일을 base-64 데이터 URL로 인라인할 수있습니다. 이렇게하면 작은 파일에 대한 HTTP 요청 수를 줄일 수 있습니다. 만약 파일이 한계치보다 크면 자동으로 다시 `file-loader`로 폴백합니다.

사실, Nuxt.js의 기본 로더 설정은 아래와 같습니다:

```js
;[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1KB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 KB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

1 KB 아래의 모든 파일은 base-64 데이터 URL로 인라인 되며, 이미지와 폰트는 대응하는 폴더(`.nuxt` 폴더 하위)로 캐싱을 위한 버전 해시를 포함한 이름으로 복사됩니다.

`nuxt` 어플리케이션이 실행될 때, `page/index.vue`에 아래와 같은 템플릿은:

```html
<template>
  <img src="~assets/image.png" />
</template>
```

아래와 같이 생성됩니다:

```html
<img src="/_nuxt/img/image.0c61159.png" />
```

만약 로더 설정을 변경하고 싶다면, [build.extend](/api/configuration-build#extend) 페이지를 참고합니다.

## 정적 파일 사용

만약 `assets` 폴더에서 Webpack으로 처리된 에셋을 사용하고 싶지 않다면, `static` 폴더를 루트 폴더에 생성하고 사용하면 됩니다.

이 파일들은 자동으로 Nuxt와 루트 URL(/)에서 사용할 수 있게 됩니다. (`static/favicon.ico`는 `localhost:3000/favicon.ico`로 사용 가능합니다.)

이 옵션은 `robots.txt`나 `sitemap.xml`, `CNAME`(깃허브 페이지 같은) 파일들을 위해 도움이 됩니다.

코드에서는 `/` URL로 접근할 수 있습니다.

```html
<!-- Static image from static directory -->
<img src="/my-image.png" />

<!-- Webpacked image from assets directory -->
<img src="/assets/my-image-2.png" />
```
