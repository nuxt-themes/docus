---
title: 정적 사이트 생성
description: 정적 사이트 생성을 사용하면 빌드 단계에서 애플리케이션을 렌더링하고 Netlify, Github 페이지, Vercel 등과 같은 정적 호스팅 서비스에 배포할 수 있습니다.
position: 4
category: concepts
questions:
  - question: You need a server to host your static site
    answers:
      - True
      - False
    correctAnswer: False
  - question: What command do you use to generate your static site?
    answers:
      - nuxt build
      - nuxt prerender
      - nuxt generate
    correctAnswer: nuxt generate
  - question: When is your API called?
    answers:
      - Every time you navigate to the page with the API content
      - When you generate your site
      - When you generate your site and every time you navigate to the page with the API content
    correctAnswer: When you generate your site
  - question: Which pages will fallback into single page application mode?
    answers:
      - The error page
      - Those that are excluded from generation with generate.excludes
      - All pages on navigation
    correctAnswer: Those that are excluded from generation with generate.excludes
  - question: How do you update the content to your site?
    answers:
      - It is updated automatically
      - You need to regenerate your site
    correctAnswer: You need to regenerate your site
---

정적 사이트 생성을 사용하면 빌드 단계에서 애플리케이션을 렌더링하고 Netlify, Github 페이지, Vercel 등과 같은 정적 호스팅 서비스에 배포할 수 있습니다. 이는 애플리케이션을 배포하기 위해 서버가 필요 없음을 의미합니다.

### 사이트 생성하기

[target:static](/docs/2.x/features/deployment-targets#static-hosting)를 사용하여 사이트를 배포하면 모든 `.vue` 페이지들이 HTML과 자바스크립트 파일로 생성됩니다. 모든 API 호출은 클라이언트 사이드 이동에서 API를 호출할 필요가 없도록 생성된 콘텐츠 내부의 static 폴더에 생성됩니다.

### Step 1: 브라우저에서 CDN으로

브라우저에 초기 요청을 보내면 CDN에 연결됩니다.

### Step 2: CDN에서 브라우저로

CDN은 이미 생성된 HTML, 자바스크립트, static 에셋을 보내고 이를 다시 브라우저로 돌려보냅니다. 컨텐츠는 표시되고 Vue.js 사용자 액션과 상호작용할 수 있게 만드는 hydration이 시작됩니다. 이 프로세스가 끝난 후 페이지는 사용자 액션과 상호작용할 수 있습니다.

### Step 3: 브라우저에서 브라우저로

[`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component)를 사용하는 페이지 간의 이동은 클라이언트 사이드에서 수행되므로 CDN에 다시 연결하지 않습니다. 브라우저를 새로고침하지 않는 이상 모든 API 호출은 이미 캐시된 static 폴더에서 불러와집니다.

### SPA Fallback

`generate.exclude` 속성을 사용하여 생성할 때 제외된 페이지들은 단일 페이지 애플리케이션으로 대체됩니다. 그러므로 이 페이지들은 CDN에 존재하지 않고 유저가 페이지를 이동할 때 브라우저의 클라이언트 사이드에서 렌더링됩니다.

<base-alert type="next">

[generate property](/docs/2.x/configuration-glossary/configuration-generate#exclude)에 대해 더 알아보기

</base-alert>

### 컨텐츠 업데이트하기

API로부터 받아온 새로운 컨텐츠를 사이트에 가져오기 위해서는 사이트를 다시 생성해야 합니다. 대부분의 정적 사이트 호스팅 공급자를 사용하면 git 명령어 혹은 풀 리퀘스트를 통해 마스터 브랜치에 변경사항을 푸시하여 이를 수행할 수 있습니다.

### 프리뷰 모드

프리뷰 모드는 API이나 CMS를 호출하므로 표시되기 전에 변경사항을 실시간으로 볼 수 있습니다. 이 기능을 활성화하는 방법은 [preview mode](/docs/2.x/features/live-preview)를 참조하세요.

<quiz :questions="questions"></quiz>
