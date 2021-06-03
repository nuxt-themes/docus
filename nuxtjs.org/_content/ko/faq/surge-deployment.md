---
title: Surge에 배포하기
description: Surge.sh에 배포하려면?
menu: Deploy on Surge
category: deployment
position: 211
---

# Surge.sh에 배포하려면?

Nuxt.js를 사용하면, 예를 들어 [surge.sh](https://surge.sh/)과 같은 정적호스팅 서비스에서 웹 어플리케이션을 호스팅할 수 있습니다.

surge.sh에 배포하려면 우선은 surge를 설치하여야 합니다:

```bash
npm install -g surge
```

그리고 Nuxt.js에 웹 어플리케이션을 생성합니다:

```bash
npm run generate
```

이 때 `dist` 폴더가 생성되는데, 그 안에 정적 호스팅서비스에 배포될 모든 것이 들어가 있습니다.

자 surge.sh에 배포할수 있게 되었네요:

```bash
surge dist/
```

이걸로 끝입니다 :)

프로젝트에서 [동적 라우트](/docs/2.x/features/file-system-routing#동적_라우트)를 하고 있는 경우는, 동적라우트를 어떻게 생성했는 가를 Nuxt.js에게 알리기 위해서는 [생성 설정](/docs/2.x/configuration-glossary/configuration-generate) 문서를 참고하세요.

<div class="Alert">

`nuxt generate` 를 통해 당신의 웹 어플리케이션을 생성할 때, [data()](/docs/2.x/features/data-fetching#async-data) 와 [fetch()](/docs/2.x/directory-structure/store#the-fetch-method)에 전달되는 [context](/docs/2.x/internals-glossary/context)에는 `req`와 `res`가 포함되지 않습니다.

</div>
