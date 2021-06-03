---
title: 소개
description: Nuxt는 현대 웹 애플리케이션을 만들기 위해 Vue.js를 기반으로 하는 진보적인 프레임워크입니다. Vue.js의 공식 라이브러리(vue, vue-router 및 vuex)와 강력한 개발 도구(webpack, Babel and PostCSS)을 기반으로 합니다.
category: prologue
position: 1
---

> Nuxt는 현대 웹 애플리케이션을 만들기 위해 Vue.js를 기반으로 하는 진보적인 프레임워크입니다. Nuxt는 Vue.js의 공식 라이브러리(vue, vue-router 및 vuex)와 강력한 개발 도구(webpack, Babel and PostCSS)를 기반으로 합니다. Nuxt의 목표는 뛰어난 개발자 경험과 함께 강력하고 뛰어난 웹 개발을 가능하도록 하는 것입니다.

## Nuxt.js란 무엇인가요?

Nuxt는 공식 Vue 가이드라인에 따라 강력한 아키텍처를 제공하도록 설계된 프레임워크입니다. 점진적으로 도입이 가능하며, 정적 랜딩 페이지에서 복잡한 엔터프라이즈 웹애플리케이션까지 생성할 수 있습니다.

기본적으로 다재다능해서, 다양한 타겟들(server, serverless 또는 static)을 지원하며, 서버 사이드 렌더링은 전환이 가능합니다.

강력한 모듈 에코시스템으로 확장 가능하므로 여러분의 REST 또는 GraphQL 엔드포인트 , 즐겨찾는 CMS, CSS 프레임워크 등과 쉽게 연결할 수 있습니다. PWA 및 AMP 지원은 Nuxt 프로젝트에서 하나의 모듈일 뿐입니다.

NuxtJS는 당신의 Vue.js 프로젝트의 추죽으로, 유연하면서도 확신을 갖고 프로젝트를구축할 수 있는 구조를 제공합니다.

## 특징

- Vue 파일 쓰기 (`*.vue`)
- 코드 분할 자동화
- 서버 사이드 렌더링
- 비동기 데이터 기반의 강력한 라우팅 시스템
- 정적 파일 전송
- [ES2015+](https://babeljs.io/docs/en/learn/) 지원
- JS & CSS 코드 번들링 및 압축
- `<head>` 요소 관리 (`<title>`, `<meta>`, 기타.)
- 개발 중 Hot module 대체
- 전 처리기 지원: SASS, LESS, Stylus 등
- HTTP/2 푸시 헤더가 준비됨
- 모듈식 아키텍처 확장

## 어떻게 작동하나요?

![Vue with Webpack and Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js는 훌륭한 웹 애플리케이션을 만들기 위해 아래의 기능들을 포함합니다:

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) ([store 옵션](/guide/vuex-store)을 사용하는경우에만 포함)
- [Vue Server Renderer](https://ssr.vuejs.org/en/) ([`mode: 'spa'`](/api/configuration-mode)를 사용하는 경우에는 제외)
- [vue-meta](https://github.com/nuxt/vue-meta)

총 용량이 **57kB min+gzip** 밖에 되지 않습니다. (53kB Vuex 포함).

<div class="Alert">

[vue-loader](https://github.com/vuejs/vue-loader)와 [babel-loader](https://github.com/babel/babel-loader)와 함께 [Webpack](https://github.com/webpack/webpack)을 사용해서 코드를 묶고, 분할하며, 압축합니다.

</div>

## 구조

아래의 구조는 `<nuxt-link>`를 서버가 호출하거나 이를 통해 사용자가 이동한 경우, nuxt.js가 어떻게 동작하는지를 보여줍니다:

![nuxt-schema](/nuxt-schema.svg)

## 서버 렌더링 (범용 SSR)

프로젝트의 모든 UI렌더링을 처리하는 프레임워크로 Nuxt.js를 사용할 수 있습니다.

`nuxt`를 시작할때 자동으로 서버 렌더링 하도록 구성된 핫 리로드 및 [Vue Server Renderer](https://ssr.vuejs.org/en/)로 개발 서버를 시작합니다.

## Single Page Applications (SPA)

어떤 이유로든 서버 측 렌더링을 사용하지 않거나 애플리케이션에 정적 호스팅이 필요한 경우 `nuxt --spa`를 사용하여 SPA 모드를 간단하게 사용할 수 있습니다. _generate_ 기능과 함께 Node.js 런타임이나 특수 서버 처리를 사용하지 않고도 강력한 SPA 배포 메커니즘을 제공합니다.

이에 대한 자세한 내용을 [명령어](/guide/commands)에서 확인합니다.

이미 서버가있는 경우 Nuxt.js를 미들웨어로 사용하여 플러그 할 수 있습니다. Nuxt.js를 사용하여 Universal Web Applications을 개발할 때 아무런 제한이 없습니다 . [프로그래밍 방식으로 Nuxt.js 사용하기 가이드](/api/nuxt)를 참조하십시오.

## 정적 생성 (사전 렌더링)

nuxt.js에서 가장 큰 혁신은 아마 `nuxt generate` 명령어가 될 것입니다.

이는 애플리케이션을 빌드할 때 모든 라우트를 HTML로 생성하는 명령어 입니다.

<div>
  <a href="https://vueschool.io/courses/static-site-generation-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
    <img src="/static-site-generation-with-nuxtjs.png" alt="Static Site Generation with Nuxt.js by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Nuxt.js로 정적 웹사이트 생성하기</h4>
      <p class="Promote__Content__Description">호스팅 비용을 줄이면서 퍼포먼스와 SEO를 개선시키기 위한 정적 웹사이트를(프리-렌더링) 생성해보세요.</p>
      <p class="Promote__Content__Signature">Nuxt.js 개발을 지원하는 VueSchool이 동영상 강의를 제작했습니다.</p>
    </div>
  </a>
</div>

예를 들어 다음과 같은 파일 구조가 있습니다:

```
-| pages/
----| about.vue
----| index.vue
```

아래와 같이 생성됩니다:

```
-| dist/
----| about/
------| index.html
----| index.html
```

이렇게 하면 생성된 웹 어플리케이션을 모든 정적 호스팅에서 호스팅 할 수 있습니다!

가장 좋은 예는 이 웹 사이트 입니다. 이 웹사이트는 [Netlify](https://www.netlify.com)에서 생성되고 호스팅됩니다. 우리의 [소스코드](https://github.com/nuxt/nuxtjs.org)나 Vue School에서 [How to deploy Nuxt.js to Netlify](https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-netlify?friend=nuxt) 해당 강의를 참조해주세요.

우리는 수동으로 애플리케이션을 [docs repository](https://github.com/nuxt/docs)를업데이트할 때마다 생성하고 싶지 않았고, 그래서 다음과 같이 Netlify에 훅을 트리거합니다:

1. [nuxtjs.org repository](https://github.com/nuxt/nuxtjs.org) 클론
2. `npm install`로 디펜던시들을 설치
3. `npm run generate` 실행
4. `dist` 디렉토리 배포

우리는 이제 **정적 생성 웹 어플리케이션**를 생성했습니다. :)

우리는 제품의 재고가 있거나 없는 경우 항상 웹앱을 `nuxt generate`로 재생성하고 CDN에 호스팅하는 방식의 e-commerce 웹 애플리케이션을 생각해볼 수 있습니다. 만약사용자가 그동안 웹 앱을 탐색한다면, e-commerce API에 API를 호출하는 것으로 항상최신 정보로 업데이트 될 것입니다. 서버의 다중 인스턴스와 캐싱을 더 이상 고민할필요가 없습니다!

<div class="Alert">

[How to deploy on Netlify?](/faq/netlify-deployment)로 Netlify에 배포하는 방법에대해 더 알아보세요.

</div>
