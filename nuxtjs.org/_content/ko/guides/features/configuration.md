---
title: 설정
description: Nuxt.js는 기본적으로 대부분 사용하는 케이스들을 다루기 위해 설정됩니다. 이 기본 설정은 nuxt.config.js 파일로 덮어 쓸 수 있습니다.
position: 7
category: features
csb_link_host_port: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_host_port?fontsize=14&hidenavigation=1&theme=dark
csb_link_pre-processors: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_pre-processors?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: nuxt.config.js에서 axios-module을 사용할 수 있을까요?
    answers:
      - true
      - false
    correctAnswer: false
  - question: 기본 Nuxt.js 개발 서버 호스트는 무엇인가요?
    answers:
      - localhost
      - 3000
      - '0'
    correctAnswer: localhost
  - question: SCSS를 사용하기 위해 스타일 태그에서 어떤 속성을 사용해야 하나요?
    answers:
      - lang="scss"
      - language="scss"
      - style="scss"
    correctAnswer: lang="scss"
  - question: 기본 Nuxt.js 개발 서버 포트는 무엇인가요?
    answers:
      - 8000
      - 3000
      - localhost
    correctAnswer: 3000
  - question: nuxt.config.js에서 전역 CSS 파일을 추가하는 데 사용하는 속성은 무엇인가요?
    answers:
      - styles
      - css
      - globalCss
    correctAnswer: css
  - question: Nuxt.js 애플리케이션에서 JSX를 사용할 수 있나요?
    answers:
      - True
      - False
    correctAnswer: True
  - question: nuxt.config.js에서 웹팩 구성을 확장하기 위해 어떤 속성을 사용해야 하나요?
    answers:
      - webpack.extend
      - build.extend
      - extend.build
    correctAnswer: build.extend
  - question: Nuxt.js 앱에서 파일을 무시하기 위해 호출되는 파일은 무엇인가요?
    answers:
      - .ignore
      - .nuxtignore
      - .ignorenuxt
    correctAnswer: .nuxtignore
  - question: Nuxt.js 앱의 about 파일을 무시하려면 어떤 접두사를 사용해야 하나요?
    answers:
      - _about.vue
      - -about.vue
      - __about.vue
    correctAnswer: -about.vue
---

Nuxt.js는 기본적으로 대부분 사용하는 케이스들을 다루기 위해 설정됩니다. 이 기본 설정은 nuxt.config.js 파일로 덮어 쓸 수 있습니다.

## css 프로퍼티

Nuxt.js를 사용하면 전역으로 설정하려는 CSS 파일/모듈/라이브러리를 정의할 수 있습니다 (모든 페이지에 포함).

<base-alert>

`sass`를 사용하려면 `sass` 및 `sass-loader` 패키지를 설치했는지 확인하세요.

</base-alert>

`nuxt.config.js` 안에, css 리소스를 추가하세요:

```js{}[nuxt.config.js]
export default {
  css: [
    // Node.js 모듈을 직접 로드합니다 (여기는 Sass 파일입니다)
    'bulma',
    // 프로젝트내의 CSS 파일
    '~/assets/css/main.css',
    // 프로젝트내의 SCSS 파일
    '~/assets/css/main.scss'
  ]
}
```

<base-alert>

Nuxt.js는 확장자에 의해 자동으로 파일 타입을 추측하고 웹팩에 적합한 전처리기 로더를 사용합니다. 만약 필요한 로더를 사용해야하는 경우 설치해야합니다.

</base-alert>

### 스타일 확장

nuxt 설정 파일에서 css 배열에 나열된 CSS/SCSS/Postcss/Less/Stylus/... 파일의 확장자를 생략 할 수 있습니다.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<base-alert>

같은 이름의 파일이 `main.scss` 와 `main.css`이 있는 경우, css 배열 항목에 확장자를 지정하지 마세요. `css: ['~/assets/css/main']` 이면 `styleExtensions`의 순서에 따라 하나의 파일만 로드됩니다. 이 경우 `css` 파일만 로드되고 `scss` 파일은 기본 `styleExtension` 배열에서 먼저 나오기 때문에 무시됩니다.

</base-alert>

기본 순서: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`

<app-modal>
  <code-sandbox  :src="csb_link_pre-processors"></code-sandbox>
</app-modal>

## 전처리기

[Vue Loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html) 덕분에, `<template>` 또는 `<style>`에 대해 모든 종류의 전처리기를 사용할 수 있습니다. `lang` 속성을 사용하세요.

[Pug](https://github.com/pugjs/pug) 와 [Sass](http://sass-lang.com/)를 사용하는 `pages/index.vue` 의 예:

```html{}[pages/index.vue]
<template lang="pug"> h1.red Hello {{ name }}! </template>

<style lang="scss">
  .red {
    color: red;
  }
</style>
```

전처리기를 사용하려면 웹팩 로더를 설치해야합니다.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D pug pug-plain-loader
yarn add -D sass sass-loader@10 fibers
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev pug pug-plain-loader
npm install --save-dev sass sass-loader@10 fibers
```

  </code-block>
</code-group>

## JSX

Nuxt.js는 바벨 기본 구성을 위해 공식 [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app)을 기반으로하는 [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) 사용하므로 컴포넌트에서 JSX를 사용할 수 있습니다.

컴포넌트 메소드인 `render` 내부에서 JSX를 사용할 수 있습니다.

```js
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

`createElement`를 `h`로 별칭을 지정하는 것은 Vue 에코 시스템에서 볼 수 있는 일반적인 규칙이지만 ES2015 구문에서 선언 된 모든 메서드 및 getter (함수 또는 화살표 함수가 아님)에 `const h = this.$createElement`를 [자동 주입](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection)하기 때문에 실제로 JSX는 선택 사항입니다. JSX가 있으므로 (h) 매개 변수를 삭제할 수 있습니다.

Vue.js 문서의 [JSX section](https://vuejs.org/v2/guide/render-function.html#JSX)에서 사용 방법에 대해 자세히 살펴볼 수 있습니다.

## 파일무시

### .nuxtignore

`.nuxtignore` 파일을 사용하여 Nuxt.js 빌드 단계에서 프로젝트의 루트 디렉토리 (`rootDir`)에 있는 `layout`, `page`, `store` 및 `middleware` 파일을 무시할 수 있습니다. `.nuxtignore` 파일은 `.gitignore` 및 `.eslintignore` 파일과 동일한 규격을 따릅니다. 여기서 각 줄은 무시해야하는 파일을 나타내는 glob 패턴입니다.

```markdown{}[.nuxtignore]
# layout foo.vue 무시

layouts/foo.vue

# 이름이 -ignore.vue로 끝나는 레이아웃 파일 무시

layouts/\*-ignore.vue

# page bar.vue 무시

pages/bar.vue

# ignore folder 내의 페이지를 무시

pages/ignore/\*.vue

# store의 baz.js 무시

store/baz.js

# store 파일이 _.test._ 와 매칭되면 무시

store/ignore/_.test._

# foo/bar.js를 제외한 foo 폴더 아래의 미들웨어 파일 무시

middleware/foo/\*.js !middleware/foo/bar.js
```

### 접두사 무시 속성

파일 이름이 ignorePrefix로 지정된 접두사로 시작하는 경우 pages/, layout/, middleware/ 또는 store/ 에 있는 모든 파일은 빌드 중에 무시됩니다.

기본적으로`-` 로 시작하는 모든 파일 (예 :`store/-foo.js` 및 `pages/-bar.vue`)은 무시됩니다. 이를 통해 자체적으로 라우트, 스토어 등으로 변환되지 않고 테스트, 유틸리티 및 컴포넌트를 호출자와 함께 지정 할 수 있습니다.

### 무시 프로퍼티

ignorePrefix을 보다 커스터마이징하기 : ignore에 지정된 glob 패턴과 일치하는 모든 파일은 빌드시 무시됩니다.

```js{}[nuxt.config.js]
export default {
  ignore: 'pages/bar.vue'
}
```

### 무시 옵션

`nuxtignore`는 내부적으로 `node-ignore`를 사용하고 있으며 `ignoreOptions`는 `node-ignore`의 `options`로 구성 할 수 있습니다.

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```

## 웹팩 설정 확장

`nuxt.config.js`의 `extend` 옵션을 통해 nuxt의 웹팩 설정을 확장할 수 있습니다. `build` 속성의 `extend` 옵션은 두개의 매개 변수를 허용하는 메소드입니다. 첫 번째 매개 변수는 nuxt의 webpack 구성에서 내보낸 webpack `config` 객체입니다. 두번째 매개 변수는 `{isDev, isClient, isServer, loaders}`와 같은 boolean 속성이 있는 컨텍스트 객체입니다.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // `isDev`가 true인 경우 웹팩 모드를 개발로 설정합니다.
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
```

`extend` 메소드가 두번 호출됩니다 - 한 번은 클라이언트 번들과 다른 하나는 서버 번들에서 호출됩니다.

### 청크 설정 커스터마이징

기본 객체를 다시 작성하지 않도록 [optimization configuration](/docs/2.x/configuration-glossary/configuration-build#optimization)을 조금 변경할 수 있습니다.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}
```

### 개발 환경의 모든 웹팩 빌드에서 ESLint 실행

개발 환경의 모든 빌드에서 코드 스타일 오류를 알기 위해 [ESLint](https://github.com/webpack-contrib/eslint-loader)를 실행할 수 있습니다.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
```

## host와 port 변경하기

기본적으로 Nuxt.js 개발 서버 호스트는 호스트 머신내에서만 접근할 수 있는 `localhost` 입니다. 다른 기기에서 앱을 보려면 호스트를 수정해야합니다. nuxt.config.js 파일에서 호스트를 수정할 수 있습니다.

Host `'0.0.0.0'`은 Nuxt.js에게 호스트 주소를 확인하도록 지정하며, 호스트 머신 (예 : LAN)의 연결 _외부_ 에 접근할 수 있습니다. 호스트에 문자열 값 `'0'` (0이 아닌 false)이 할당되거나 `'0.0.0.0'` 로컬 IP 주소가 Nuxt.js 애플리케이션에 할당됩니다.

```js{}[nuxt.config.js]
export default {
  server: {
    host: '0' // default: localhost
  }
}
```

기본 포트 3000에서 포트 번호를 변경할 수 있습니다.

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000 // default: 3000
  }
}
```

<base-alert type="info">

포트에 `'0'`의 문자열 값이 할당되면 Nuxt.js 애플리케이션에 임의의 포트 번호가 할당됩니다.

</base-alert>

nuxt.config.js 파일에서 수정할 수 있지만 사이트를 호스팅 할 때 문제를 일으킬 수 있으므로 권장하지 않습니다. dev 명령에서 호스트와 포트를 직접 수정하는 것이 훨씬 좋습니다.

```bash
HOST=0 PORT=8000 npm run dev
```

또는 package.json에서 스크립트를 생성하세요.

```json
"scripts": {
  "dev:host": "nuxt --hostname '0' --port 8000"
}
```

<app-modal>
  <code-sandbox  :src="csb_link_host_port"></code-sandbox>
</app-modal>

## 비동기 설정

비록 일반 설정 `export default {}`를 사용하는 것이 더 좋지만 설정 객체를 반환하는 비동기 함수를 내보내서 비동기 설정을 할 수 있습니다.

```js{}[nuxt.config.js]
import axios from 'axios'

export default async () => {
  const data = await axios.get('https://api.nuxtjs.dev/posts')
  return {
    head: {
      title: data.title
      //... rest of config
    }
  }
}
```

<base-alert>

axios-module은 `nuxt.config.js`에서 사용할 수 없습니다. axios를 가져 와서 다시 설정해야합니다.

</base-alert>

## 추가 설정

<base-alert type="next">

`nuxt.config.js`에는 훨씬 더 많은 사용자 정의 및 구성 옵션이 있습니다! [configuration glossary](/docs/2.x/configuration-glossary/configuration-build)에서 모든 키를 확인하세요.

</base-alert>

<quiz :questions="questions"></quiz>
