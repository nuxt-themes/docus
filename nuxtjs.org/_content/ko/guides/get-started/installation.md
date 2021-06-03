---
title: 설치하기
description: 여기에서 Nuxt.js 프로젝트를 설정하고 실행시키기 위한 4가지 방법을 볼 수 있습니다.
position: 1
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/01_installation?fontsize=14&hidenavigation=1&theme=dark
---

## 준비사항

여기에서 Nuxt.js 프로젝트를 설정하고 실행시키기 위한 4가지 방법을 볼 수 있습니다.

<base-alert type="info">

Nuxt.js를 시작하는 또 다른 방법은 [CodeSandbox](https://template.nuxtjs.org)를 사용하는 것입니다. 이 방법을 통해 Nuxt.js를 빠르게 사용하거나 다른 사람들과 코드를 공유할 수 있습니다.

</base-alert>

### Node

[node](https://nodejs.org/en/download/) - at least v8.9.0

_최선 버전 설치를 권장합니다._

### Text editor

원하는 에디터를 사용해도 되지만 [VSCode](https://code.visualstudio.com/)를 권장합니다.

### Terminal

원하는 것을 사용해도 되지만 VSCode의 [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal)을 권장합니다.

## 처음부터 시작하기

Nuxt.js 프로젝트를 처음부터 시작할 때는 하나의 파일과 디렉터리만 있으면 됩니다.

이 문서에서는 터미널을 사용하여 디렉터리와 파일을 만들지만 원하는 에디터를 사용하여 디렉터리와 파일을 생성해도 무방합니다.

### 프로젝트 설정하기

시작을 위해 프로젝트 이름으로 빈 디렉터리를 생성하고, 생성한 디렉터리로 이동하세요:

```bash
mkdir <project-name>
cd <project-name>
```

_`<project-name>`을 프로젝트 이름으로 변경하세요._

그런 다음 `package.json`라는 이름으로 파일을 생성하세요:

```bash
touch package.json
```

선호하는 코드 에디터에서 package.json 파일을 열고 다음 JSON 내용으로 파일을 채우세요:

```json{}[package.json]
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "start": "nuxt start"
  }
}
```

`scripts`는 `npm run <command>` 명령어로 실행될 Nuxt.js 명령어를 정의합니다.

#### **package.json 파일은 무엇인가요?**

`package.json`은 프로젝트의 ID 카드와 같은 것입니다. 만일 `package.json` 파일이 무엇인지 모른다면 [npm documentation](https://docs.npmjs.com/creating-a-package-json-file)를 빠르게 읽어보는 것이 좋습니다.

### nuxt 설치하기

`package.json`이 생성되면 아래와 같이 `npm`이나 `yarn`을 통해 프로젝트에 `nuxt`를 추가합니다:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add nuxt
```

  </code-block>
  <code-block label="npm">

```bash
npm install nuxt
```

  </code-block>
</code-group>

이 명령어는 `nuxt`를 프로젝트에 대한 디펜던시로 추가하고 `package.json`에 자동으로 추가합니다. 설치된 모든 패키지와 디펜던시가 저장된 `node_modules` 디렉터리도 생성됩니다.

<base-alert type="info">

`yarn.lock` 또는 `package-lock.json`도 함께 생성되어 프로젝트에 설치된 패키지를 일관성있게 설치하고 호환되는 디펜던시를 보장합니다.

</base-alert>

### 첫 번째 페이지 생성하기

Nuxt.js는 모든 `pages` 디렉터리에 있는 모든 `*.vue` 파일을 애플리케이션 라우트로 변환합니다.

프로젝트에 `pages` 디렉터리를 생성하세요:

```bash
mkdir pages
```

그런 다음 `pages` 디렉터리에 `index.vue` 파일을 생성하세요:

```bash
touch pages/index.vue
```

애플리케이션이 열릴 때 Nuxt가 보여주는 기본 페이지이므로 이 페이지를 `index.vue`로 생성하는 것은 중요합니다. 이 페이지가 홈 페이지이며 반드시 index로 이름 지어져야 합니다.

에디터에서 `index.vue` 파일을 열고 다음 내용을 추가하세요:

```html{}[pages/index.vue]
<template>
  <h1>Hello world!</h1>
</template>
```

### 프로젝트 시작하기

터미널에서 아래 명령어 중 하나를 입력하여 프로젝트를 실행하세요:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
npm run dev
```

  </code-block>
</code-group>

<base-alert type="info">

개발 모드로 애플리케이션을 실행할 때 dev 명령어를 사용합니다.

</base-alert>

이제 애플리케이션은 **[http://localhost:3000](http://localhost:3000/).**에서 실행됩니다.

터미널에서 링크를 클릭하여 브라우저에서 애플리케이션을 열면 이전 단계에서 복사한 "Hello World" 텍스트가 보입니다.

<base-alert type="info">

개발 모드에서 Nuxt.js를 실행하면 대부분의 디렉터리에 있는 파일 변경사항이 반영되므로 새로운 페이지를 추가와 같은 경우에 애플리케이션을 재시작할 필요가 없습니다.

</base-alert>

<base-alert type="warning">

dev 명령어를 실행할 때 .nuxt 폴더가 생성됩니다. 이 폴더는 버전 컨트롤에서는 무시되어야 합니다. 루트 레벨에 .gitignore 파일을 생성하고 .nuxt를 추가하여 .nuxt 폴더를 무시할 수 있습니다.

</base-alert>

### 보너스 방법

`pages` 디렉터리에 `fun.vue` 이름의 페이지를 생성하세요.

`<template></template>`을 추가하고 재미있는 문장을 가진 제목을 포함하세요.

그런 다음 브라우저로 이동하여 **[http://localhost:3000/fun](http://localhost:3000/fun).**에서 새 페이지를 확인하세요.

<base-alert type="info">

`more-fun`이라는 디렉터리를 생성하고 이 디렉터리 안에 `index.vue` 파일을 추가하세요. 그러면 `more-fun.vue` 파일을 생성하는 것과 같은 결과를 볼 수 있습니다.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## create-nuxt-app 사용하기

빠르게 시작하려면 [create-nuxt-app](https://github.com/nuxt/create-nuxt-app)를 사용할 수 있습니다.

npx(npx는 npm 5.2.0부터 기본적으로 제공됩니다)나 npm v6.1 혹은 yarn이 설치되어 있는지 확인하세요.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app <project-name>
```

  </code-block>
  <code-block label="npx">

```bash
npx create-nuxt-app <project-name>
```

  </code-block>
    <code-block label="npm">

```bash
npm init nuxt-app <project-name>
```

  </code-block>

</code-group>

몇 가지 질문(name, Nuxt options, UI framework, TypeScript, linter, testing framework, etc.)에 대답하면 모든 디펜던시가 설치됩니다. 다음 단계는 프로젝트 폴더로 이동하고 실행하는 것입니다:

<code-group>
  <code-block label="Yarn" active>

```bash
cd <project-name>
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
cd <project-name>
npm run dev
```

  </code-block>
</code-group>

이제 애플리케이션은 [http://localhost:3000](http://localhost:3000)에서 실행됩니다. 잘하셨습니다!
