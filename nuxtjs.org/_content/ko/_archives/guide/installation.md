---
title: 설치
description: Nuxt.js는 시작하기 정말 쉽습니다. 간단한 프로젝트는 딱 `nuxt` 디펜던시만 있으면 됩니다.
category: getting-started
position: 101
---

> Nuxt.js는 시작하기 정말 쉽습니다. 간단한 프로젝트는 딱 `nuxt` 디펜던시만 있으면 됩니다.

<div>
  <a href="https://vueschool.io/courses/nuxtjs-fundamentals/?friend=nuxt" target="_blank" class="Promote">
    <img src="/nuxt-fundamentals.png" srcset="/nuxt-fundamentals-2x.png 2x" alt="Nuxt Fundamentals by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Nuxt.js Fundamentals</h4>
      <p class="Promote__Content__Description">Learn how to get started quickly with Nuxt.js in videos.</p>
      <p class="Promote__Content__Signature">Video courses made by VueSchool to support Nuxt.js development.</p>
    </div>
  </a>
</div>

## `create-nuxt-app` 사용하기

Nuxt.js 팀은 빠른 시작을 위해 [create-nuxt-app](https://github.com/nuxt/create-nuxt-app)라는 툴을 만들었습니다 .

우선 [npx](https://www.npmjs.com/package/npx)가 설치되어 있는 지를 확인하세요 (npm `5.2.0`부터 `npx`는 기본적으로 설치됩니다).

```bash
$ npx create-nuxt-app <project-name>
```

아니면 [yarn](https://yarnpkg.com/en/)으로는:

```bash
$ yarn create nuxt-app <project-name>
```

이 명령어는 아래의 질문을 물어볼 것입니다:

1. 통합 서버 사이드 프레임 워크를 선택:

- None (Nuxt default server)
- [Express](https://github.com/expressjs/express)
- [Koa](https://github.com/koajs/koa)
- [Hapi](https://github.com/hapijs/hapi)
- [Feathers](https://github.com/feathersjs/feathers)
- [Micro](https://github.com/zeit/micro)
- [Fastify](https://github.com/fastify/fastify)
- [Adonis](https://github.com/adonisjs/adonis-framework) (WIP)

2. UI 프레임워크 선택:

- None (차후에 언제든 추가 가능)
- [Bootstrap](https://github.com/bootstrap-vue/bootstrap-vue)
- [Vuetify](https://github.com/vuetifyjs/vuetify)
- [Bulma](https://github.com/jgthms/bulma)
- [Tailwind](https://github.com/tailwindcss/tailwindcss)
- [Element UI](https://github.com/ElemeFE/element)
- [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)
- [Buefy](https://github.com/buefy/buefy)
- [iView](https://github.com/iview/iview)
- [Tachyons](https://github.com/tachyons-css/tachyons)

3. 테스팅 프레임워크 선택:

- None (차후에 언제든 추가 가능)
- [Jest](https://github.com/facebook/jest)
- [AVA](https://github.com/avajs/ava)

4. [넉스트 모드(`Universial` 혹은 `SPA`)](https://nuxtjs.org/guide#single-page-applications-spa-) 선택.
5. HTTP 통신을 위한 [axios module](https://github.com/nuxt-community/axios-module) 추가 여부.
6. 저장 시 코드 린트를 위한 [EsLint](https://eslint.org/) 추가 여부.
7. 코드를 prettify하기 위한 [Prettier](https://prettier.io/) 추가 여부.

선택을 했다면, 모든 디펜던시들은 설치가 될 것입니다. 따라서 다음 단계는 프로젝트폴더로 이동해 다음 명렁어로 실행하는 것입니다:

```bash
$ cd <project-name>
$ npm run dev
```

이제 애플리케이션은 다음 주소에서 작동합니다: http://localhost:3000

<div class="Alert">

Nuxt.js는 <code> page</code> 디렉토리의 파일 변경을 지켜보고 있으므로, 새로운 페이지를 추가할 때 마다 애플리케이션을 다시 시작할 필요가 없습니다.

</div>

프로젝트의 디렉토리 구조에 대해 더 알아보시려면 다음 링크를 참조해주세요: [디렉토리 구조 문서](/guide/directory-structure).

## 처음부터 Nuxt 시작하기

(위의 `create-nuxt-app` 명령어를 사용하지 않고) 맨 처음부터 Nuxt.js 프로젝트를생성하는 것은 쉽습니다. 단지 *파일 하나, 디렉토리 하나*가 필요합니다. 우선 빈 디렉토리를 생성하고:

```bash
$ mkdir <project-name>
$ cd <project-name>
```

<div class="Alert Alert--nuxt-green">

<b>Info:</b> <code>&lt;project-name&gt;</nom-du-projet></code>을 실제 프로젝트이름으로 바꾸세요.

</div>

### Package.json

`nuxt`를 시작하기 위해선 모든 프로젝트는 `package.json`가 필요합니다. 이 json 파일을 여러분의 package.json에 복사해 붙여넣기하고 npm install을 실행하기 전에 저장하세요.

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

`npm run dev`를 실행하시면 `scripts`가 Nuxt.js를 실행할 것입니다.

### `nuxt` 설치하기

`package.json`가 생성되었다면, npm으로 `nuxt`를 설치해 주세요:

```bash
$ npm install --save nuxt
```

### `pages` 디렉토리

`pages` 디렉토리에 있는 `*.vue` 파일들을 Nuxt.js는 애플리케이션의 라우트(route) 로 사용할 것입니다.

`pages` 디렉토리 생성하기:

```bash
$ mkdir pages
```

`pages/index.vue`에서 첫 번째 페이지를 생성해 보세요:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

그리고 프로젝트를 아래의 명령어로 실행하세요:

```bash
$ npm run dev
```

이제 애플리케이션은 다음 주소에서 작동합니다: http://localhost:3000

<div class="Alert">

Nuxt.js는 <code> page</code> 디렉토리의 파일 변경을 지켜보고 있으므로, 새로운 페이지를 추가할 때 마다 애플리케이션을 다시 시작할 필요가 없습니다.

</div>

프로젝트의 디렉토리 구조에 대해 더 알아보시려면 다음 링크를 참조해주세요: [디렉토리 구조 문서](/guide/directory-structure).
