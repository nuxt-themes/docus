---
title: 명령어들
description: Nuxt.js는 개발 환경과 프로덕션 환경에 사용되는 유용한 명령어들이 있습니다.
category: getting-started
position: 113
---

> Nuxt.js는 개발 환경과 프로덕션 환경에 사용되는 유용한 명령어들이 있습니다.

## 명령어 리스트

| 명령어        | 설명                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------- |
| nuxt          | 개발서버를 핫 리로딩 상태로 [http://localhost:3000](http://localhost:3000)에 시작합니다.          |
| nuxt build    | Webpack을 통해 어플리케이션을 빌드하며, CSS와 JS를 minify하는 작업을 진행합니다.(프로덕션 용으로) |
| nuxt start    | 프로덕션 모드로 서버를 시작합니다.（`nuxt build`를 실행한 후에）                                  |
| nuxt generate | 어플리케이션을 빌드하고 모든 라우트를 HTML 파일로 생성합니다. (정적 호스팅에 사용됩니다.)         |

#### 인자

어떤 코멘트의 자세한 사용법을 알기 위해 `--help`를 사용할 수 있습니다. 일반적인인자들은:

- **`--config-file` 나 `-c`:** `nuxt.config.js` 파일의 경로를 알려줍니다.
- **`--spa` 나 `-s`:** 서버 사이드 렌더링을 비활성화하고 SPA 모드에서 작동합니다 .
- **`--unix-socket` 나 `-n`:** UNIX 소켓으로의 경로를 알려줍니다.

#### Hooks

| Hook             | Objective                                                  |
| ---------------- | ---------------------------------------------------------- |
| `cli:buildError` | 개발 모드에서 빌드 에러를 가져와 로딩 스크린에 보여줍니다. |

#### package.json에서 사용

이 명령문들을 `package.json`에 작성하여야 합니다.

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

그 다음에, 당신은 `npm run <command>` 명령어를 통해 서버를 시작할 수 있습니다. ( 예: `npm run dev`).

<div class="Alert Alert--nuxt-green">

<b>Pro tip:</b> npm 커맨드에 인자들을 보내기 위해서는, 여러분은 추가적인 <code>--</code> 스크립트명이 필요합니다(예: <code>npm run dev -- --spa</code>).

</div>

## 개발 환경

핫 리로딩과 함께 개발 모드로 Nuxt를 시작하기 위해서:

```bash
nuxt
// 아니면
npm run dev
```

## 프로덕션 배포

Nuxt.js는 서버 사이드 렌더링 모드 혹은 정적 파일을 생성하는 모드 중 한 가지를 선택할 수 있습니다.

### 서버 사이드 렌더링 환경 (Universal SSR)

여러분은 `nuxt` 명령어를 실행하지 않고 배포하기 위해, 빌드를 할 수 있기를 원할것입니다. 그래서 빌드와 서버 시작 명령어가 서로 분리되어 있습니다.

```bash
nuxt build
nuxt start
```

또한 `nuxt.config.js`에서 [`https.createServer`](https://nodejs.org/api/https.html)와 같은 옵션으로 `server.https`를 설정할 수 있습니다. HTTPS 모드에서 Nuxt.js를 제공하도록 선택할수 있습니다. `server.socket` 옵션을 `nuxt.config.js`에 설정하는 것으로 Unix sockets 또한 사용가능합니다. (아니면 [CLI](https://nuxtjs.org/guide/commands#list-of-commands)에서 `-n` 사용). [Unix 소켓](https://en.wikipedia.org/wiki/Berkeley_sockets)을 사용할 때, `host` 및 `port` 매개 변수를 설정하지 마세요. 그렇지 않으면 `socket` 파라미터가 무시됩니다.

`package.json`는 다음과 같이 작성하는 것을 권장합니다.

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

메모: 우리는 `.npmignore`이나 `.gitignore`에 `.nuxt`를 작성하길 권고합니다.

### 정적 파일 생성 환경

Nuxt.js는 당신의 웹 어플리케이션을 정적 파일 호스팅 서비스에 호스팅할 수 있게 해줍니다. 우리의 웹 어플리케이션을 정적 파일들로 생성하기 위해서:

```bash
npm run generate
```

이 명령어는 정적 호스팅 서비스에 배포될 모든 파일들이 담긴 `dist` 폴더를 생성할것입니다.

페이지 에러가 생겼을 때 non-zero 상태 코드를 리턴하고 CI/CD가 배포나 빌드를 실패하도록 하려면, `--fail-on-error` 인자를 사용할 수 있습니다.

```bash
npm run generate --fail-on-error

// 아니면

yarn generate --fail-on-error
```

만약 당신에게 동적 라우팅이 사용되는 프로젝트가 있다면, nuxt.js에서 동적 라우팅을 생성하기 위해 [generate 설정](/api/configuration-generate)을 살펴보아야 합니다.

<div class="Alert">

`nuxt generate` 를 통해 당신의 웹 어플리케이션을 생성할 때、 [data()](/guide/async-data#the-data-method) 와 [fetch()](/guide/vuex-store#the-fetch-method)에 전달되는 [context](/api#context)에는 `req`와 `res`가 포함되지 않습니다.

</div>

### Single Page Application Deployment (SPA)

`nuxt generate`는 모든 페이지들이 프리 렌더링되고 향상된 SEO나 페이지 로드 속도를 갖는 이점이 있지만, 여전히 build/generate 시에 SSR 엔진을 필요로 합니다. 컨텐츠는 *빌드 타임*에 생성됩니다. 예를 들어 콘텐츠가 사용자 인증 또는 실시간 API(최소한 첫 번째 로드 시)에 따라 달라지는 애플리케이션에는 사용할 수 없습니다.

SPA는 간단합니다! `mode: 'spa'`나 '--spa' 플래그로 SPA 모드가 활성화되면, 우리는빌드하고 자동적으로 빌드 이후 제너레이션은 시작됩니다. 이 제너레이션은 일반적인 meta나 리소스 링크들은 포함하지만, 페이지 컨텐츠는 갖고 있지 않습니다.

따라서, SPA 배포에 대해 여러분은 아래를 따라야합니다:

- `nuxt.config.js`의 `mode`를 `spa`로 변경.
- `npm run build` 실행.
- 생성된 `dist/` 폴더를 Surge, GitHub Pages나 nginx와 같은 정적 호스팅으로 이동.

또 다른 가능한 배포 방법은 `spa` 모드에 있는 동안 프레임워크에서 Nuxt를 미들웨어로 사용하는 것입니다. 이를 통해 서버 로드를 줄이고 SSR이 불가능한 프로젝트에서 Nuxt를 사용할 수 있습니다.

<div class="Alert">

우리의 [FAQ](/faq)를 보시고 nifty 예시를 참조해 주세요.

</div>
