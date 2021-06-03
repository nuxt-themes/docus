---
title: 개발 툴
description: Nuxt.js는 개발을 보다 재미있게 할 수 있도록 도와줍니다.
category: getting-started
position: 114
---

> 어플리케이션 테스트는 웹 개발의 일부 입니다. Nuxt.js는 이를 쉽게 만들 수 있도록 도와 줍니다.

## End-To-End 테스트

[Ava](https://github.com/avajs/ava)는 [jsdom](https://github.com/tmpvar/jsdom)과같이 사용할 수 있는 JavaScript의 강력한 테스트 프레임워크입니다. 엔드 투 엔드 테스트를 쉽게 하기 위해서 이 두가지를 사용합니다.

우선은, ava와 jsdom을 개발디펜던시에 추가해야 합니다.

```bash
npm install --save-dev ava jsdom
```

그리고 `package.json` 에 test 스크립트를 추가하고 테스트를 import할 파일을 컴파일 하기 위해 ava를 설정합니다.

```javascript
"scripts": {
  "test": "ava",
},
"ava": {
  "require": [
    "babel-register"
  ]
},
"babel": {
  "presets": [
    "es2015"
  ]
}
```

`test` 폴더 안에 테스트를 작성해 나가는 걸로 하겠습니다:

```bash
mkdir test
```

`pages/index.vue` 에 페이지가 있습니다.

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
  export default {
    data() {
      return { name: 'world' }
    }
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

`npm run dev` 로 어플리케이션을 기동하고 [http://localhost:3000](http://localhost:3000) 으로 접근하면 `Hello world!` 타이틀이 표시가 됩니다.

`test/index.test.js` 테스트 파일을 추가합니다:

```js
import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'

// Nuxt.js 를 초기화하고 localhost:4000 에서 리스닝하는 서버를 작성합니다.
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  config.mode = 'universal' // Isomorphic application
  const nuxt = new Nuxt(config)
  t.context.nuxt = nuxt // Nuxt를 여기에 담아둡니다. 그러면 테스트가 종료되었을 때 이것들을 close할 수 있습니다.
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// 생성된 HTML 만을 테스트하는 예제
test('Route / exists and render HTML', async t => {
  const { nuxt } = t.context
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello world!</h1>'))
})

// DOM 을 경유하여 체크하는 테스트 예제
test('Route / exists and renders HTML with CSS applied', async t => {
  const { nuxt } = t.context
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello world!')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// 서버를 닫음
test.after('Closing server', t => {
  const { nuxt } = t.context
  nuxt.close()
})
```

이제 테스트를 실행할 수 있게 되었습니다:

```bash
npm test
```

jsdom 은 브라우저를 사용하지 않기 때문에 제약점이 몇가지 있지만, 대부분의 테스트는 커버할 수 있습니다. 혹시 어플리케이션을 테스트하기 위해서 브라우저를 사용하고싶을 경우에는 [Nightwatch.js](http://nightwatchjs.org) 를 체크해 보시면 될 것 같습니다.

## ESLint와 Prettier

> [ESLint](http://eslint.org) 는 깔끔한 코드를 유지할 수 있도록 해주는 멋진 툴입니다.

> [Prettier](prettier.io)는 매우 유명한 코드 포매터 입니다.

매우 간단하게 [ESLint](http://eslint.org) 를 Nuxt.js 와 같이 사용할 수 있습니다. 우선 npm 디펜던시를 추가해야 합니다:

```bash
npm install --save-dev babel-eslint eslint eslint-config-prettier eslint-loader eslint-plugin-vue eslint-plugin-prettier prettier
```

그리고 `.eslintrc.js` 파일을 프로젝트의 루트 디렉토리에 두고 ESLint를 설정합니다 :

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { semi: false }]
  }
}
```

그리고, `package.json`에 `lint`와 `lintfix` 스크립트를 추가할 수 있습니다. :

```js
"scripts": {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
}
```

이제 `lint`를 시작하여 오류를 확인할 수 있습니다.:

```bash
npm run lint
```

또는`lintfix`를 수정하여 실행 가능한 코드를 수정합니다.

```bash
npm run lintfix
```

ESLint 는 `.gitignore`에 정의된 파일들을 무시하면서 모든 JavaScript 및 Vue 파일을 lint 합니다.

또한 webpack을 통해 핫 리로드 모드에서 ESLint를 활성화하는 것이 좋습니다. 이렇게하면 ESLint는 `npm run dev` 실행 동안 저장시 실행 됩니다. `nuxt.config.js`에 다음을 추가하십시오.:

```js
...
  /*
   ** Build configuration
  */
  build: {
   /*
    ** You can extend webpack config here
   */
   extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
```

<div class="Alert Alert--orange">

하나의 모범 사례는 package.json에 `"precommit": "npm run lint"`를 추가하여 코드를 커밋하기 전에 코드를 자동으로 lint 하는 것 입니다.

</div>
