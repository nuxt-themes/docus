---
title: 모듈
description: 모듈은 Nuxt.js의 핵심 기능을 확장하고 무한히 통합을 추가할 수 있는 Nuxt.js의 확장입니다.
category: getting-started
position: 109
---

> 모듈은 Nuxt.js의 핵심 기능을 확장하고 무한히 통합을 추가할 수 있는 Nuxt.js의확장입니다.

## 소개

여러분들은 Nuxt로 프로덕션급 애플리케이션을 개발하면서 프레임워크의 핵심 기능으로는 충분하지 않다는 것을 금방 느끼게 되셨을 겁니다. Nuxt는 Configuration 옵션과플러그인으로 확장이 가능하지만, 여러 프로젝트에서 이러한 커스터마이제이션을 유지보수하는 것은 지루하고 반복적이며 시간이 많이 소요되었을 것입니다. 반면, 모든 프로젝트에서 발생하는 요구사항들을 바로 반영한다면 이는 Nuxt를 복잡하고 사용하기어렵게 만듭니다.

이는 Nuxt가 코어를 쉽게 확장할 수 있는 상위(higher-order) 모듈 시스템을 제공하는이유 중 하나입니다. 모듈은 간단히 **함수**로서, Nuxt 부팅 시 순차적으로 호출되고 , 프레임워크는 각 모듈의 작업이 끝날 때 까지 기다립니다. 이렇게 해서 모듈은 Nuxt 의 거의 모든 부분을 커스터마이징할 수 있습니다. (webpack의 [Tapable](https://github.com/webpack/tapable)에 기반한) Nuxt의 모듈 디자인 덕분에, 모듈은 빌더 초기화 같은 특정 진입점의 훅을 쉽게 등록할 수 있습니다. 모듈은또한 템플릿을 재정의하고, webpack 로더를 구성하고, CSS 라이브러리를 추가하며, 다른많은 유용한 작업을 수행할 수 있습니다.

무엇보다도 Nuxt 모듈은 npm 패키지에 통합될 수 있습니다. 이를 통해 모듈을 프로젝트 전반에 걸쳐 재사용하고 Nuxt 커뮤니티와 공유하여 고품질 Nuxt add-on 생태계를만들 수 있습니다.

모듈은 다음과 같은 경우에 좋습니다:

- **애자일 팀**의 멤버로서 새로운 프로젝트를 신속하게 진행해야 하는 경우
- Google Analytics를 통합하는 것 같은 일반적인 업무 때문에 **이미 있는 것을 다시만들기에** 질린 경우
- 커뮤니티와 당신의 작업을 **공유**하고 싶은 **오픈 소스** 덕후인 경우
- **품질**과 **재사용성**에 가치를 두는 **기업**의 멤버인 경우
- 보통 짧은 데드라인 앞에서 모든 새로운 라이브러리나 통합(integration)의 세부사항을 파고들 시간이 없는 경우
- 저-레벨 인터페이스에서의 변경사항들에 질렸고, **바로 작동하는** 무언가를 원하는 경우

## Nuxt.js 모듈 리스트

Nuxt.js 팀은 **공식** 모듈을 제공합니다:

- [@nuxt/http](https://http.nuxtjs.org): [ky-universal](https://github.com/sindresorhus/ky-universal)에 기반해 가볍고범용적인 HTTP 리퀘스트 생성
- [@nuxtjs/axios](https://axios.nuxtjs.org): 안전하고 쉬운 Nuxt.js와 Axios 통합으로 HTTP 요청 가능
- [@nuxtjs/pwa](https://pwa.nuxtjs.org): 엄격한 테스트를 거쳐 업데이트된 안정적인 PWA 솔루션으로 Nuxt를 최대화
- [@nuxtjs/auth](https://auth.nuxtjs.org): 여러 계획(scheme)과 전략(strategy)를제공하는 Nuxt.js인증 모듈

커뮤니티가 만든 Nuxt.js 모듈 리스트는 다음 경로에서 보실 수 있습니다: https://github.com/topics/nuxt-module

## 기본 모듈 작성하기

이미 언급한 모듈들은 단순한 함수일 뿐입니다. 이 함수는 npm 모듈로 패키지화 되거나 프로젝트 소스 코드에 직접 포함될 수 있습니다.

**modules/simple.js**

```js
export default function SimpleModule(moduleOptions) {
  // Write your code here
}

// REQUIRED if publishing the module as npm package
// module.exports.meta = require('./package.json')
```

**`moduleOptions`**

이것은 사용자가 `modules` 배열을 사용할 때 전달되는 객체이고, 그 동작을 커스터마이징하기 위해 사용할 수 있습니다.

**`this.options`**

이를 사용해 Nuxt 옵션에 직접 액세스할 수 있습니다. 이것은 디폴트 옵션이 모두 할당된 사용자의 `nuxt.config.js`의 내용으로, 모듈 간 공유 옵션에 사용할 수 있습니다.

**`this.nuxt`**

이것은 현재 Nuxt 인스턴스에 대한 레퍼런스입니다. 사용 가능한 메소드를 보시려면 [Nuxt](/api/internals-nuxt) 클래스 문서를 참조해주세요.

**`this`**

모듈의 컨텍스트 입니다. 사용 가능한 메소드를 보시려면 [ModuleContainer](/api/internals-module-container) 클래스 문서를 참조해주세요.

**`module.exports.meta`**

npm 패키지로 모듈을 게시하는 경우 이는 **필수** 입니다. Nuxt는 당신의 패키지와더잘 작동하기 위해 내부적으로 메타를 사용합니다.

**nuxt.config.js**

```js
export default {
  modules: [
    // Simple usage
    '~/modules/simple',
    // Passing options directly
    ['~/modules/simple', { token: '123' }]
  ]
}
```

그런 다음 Nuxt에 옵션 매개변수를 가진 프로젝트의 특정 모듈을 로드하도록 알려주세요. 더 자세히 보시려면 [모듈 설정](/api/configuration-modules) 문서를 참조해 주세요!

## 비동기 모듈

모든 모듈들이 모든 것을 동기적으로 처리하는 것은 아닙니다. 예를 들어 API를 호출하거나 비동기 IO를 수행하는 모듈을 개발하려 할 수 있습니다. 이를 위해 Nuxt는 프로미스나 콜백을 반환할 수 있는 비동기 모듈을 지원합니다.

## Build-only 모듈

일반적으로 모듈은 개발 및 빌드 시간에만 필요합니다. `buildModules`를 사용하면 프로덕션 시작 시간을 단축하고 프로덕션 배포를 위한 'node_modules' 크기를 크게 줄일수 있습니다. 모듈 작성자인 경우 사용자에게 패키지를 `devDependency`로 설치하고 `nuxt.config.js`에는 `modules` 대신 `buildModules`를 사용하라고 제안하는 것이 좋습니다.

다음의 경우가 아닌한 여러분의 모듈은 `buildModule`입니다.

- serverMiddleware를 제공하는 경우
- (sentry와 같이) Node.js 런타임 훅에 등록된 경우
- vue-renderer 동작에 영향을 미치거나 `server:` 또는 `vue-renderer:` 네임스페이스의 후크를 사용합니다.
- 웹 팩 범위를 벗어나는 기타 모든 기능(힌트: 플러그인과 템플릿이 컴파일되어 웹팩범위에 속합니다)

<div class="Alert Alert--orange">

<b>NOTE:</b> 만약 여러분이 <code>buildModules</code>를 제안하실 거라면, 이 기능이 Nuxt <b>2.9</b>에서만 사용가능하다는 것을 언급해 주세요. 이보다 예전 버전의사용자들은 Nuxt를 업그레이드하거나 <code>modules</code> 섹션을 사용해야 합니다.

</div>

### async/await 사용

<div class="Alert Alert--orange">

`async`/`await`은 Node.js 7.2 이상에서만 지원됩니다. 그러므로 만약 여러분이 모듈개발자이고 이 `async`/`await`를 사용한다면 적어도 사용자들에게 이를 알려주셔야합니다. 비동기 모듈 또는 더 나은 레거시 지원의 경우 번들러를 사용하여 이전 Node.js 호환성을 위해 변환하거나 프로미스 메소드를 사용할 수 있습니다.

</div>

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // You can do async works here using `async`/`await`
  const pages = await fse.readJson('./pages.json')
}
```

### 프로미스 리턴

```js
import axios from 'axios'

export default function asyncModule() {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Do something by extending Nuxt routes
    })
}
```

## 일반 스니펫

### 최상위 옵션

`nuxt.config.js`에 모듈을 등록할 때 최상위 옵션을 사용할 수 있다면 더 편리할 수있습니다. 이는 우리가 복수의 옵션 소스를 결합할 수 있게 해줍니다.

**nuxt.config.js**

```js
export default {
  modules: [['@nuxtjs/axios', { anotherOption: true }]],

  // axios module is aware of this by using `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```

**module.js**

```js
export default function (moduleOptions) {
  // `options` will contain option1, option2 and anotherOption
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```

### 플러그인 제공

모듈이 추가될 때 하나 이상의 플러그인을 제공하는 것이 일반적입니다. 예를 들어 [bootstrap-vue](https://bootstrap-vue.js.org) 모듈은 Vue에 자기자신을 등록하기를요구합니다. 이런 상황에서는 `this.addPlugin`를 사용할 수 있습니다.

**plugin.js**

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

**module.js**

```js
import path from 'path'

export default function nuxtBootstrapVue(moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### 템플릿 플러그인

등록된 템플릿과 플러그인은 [lodash templates](https://lodash.com/docs/4.17.4#template))를 활용하여 등록된플러그인 아웃풋을 조건부로 변경할 수 있다.

**plugin.js**

```js
// Set Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Dev only code
<% } %>
```

**module.js**

```js
import path from 'path'

export default function nuxtGoogleAnalytics(moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt will replace `options.ua` with `123` when copying plugin to project
      ua: 123,

      // conditional parts with dev will be stripped from plugin code on production builds
      debug: this.options.dev
    }
  })
}
```

### CSS 라이브러리 추가

모듈이 CSS 라이브러리를 제공하는 경우, 중복 방지를 위해 사용자가 라이브러리를 이미 포함했는지 확인하고 **비활성화 옵션**을 추가하세요.

**module.js**

```js
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Add Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### 애셋 내보내기

<!-- todo: up2date? -->

우리는 webpack 플러그인을 등록하여 빌드 중에 애셋을 내보낼 수 있습니다.

**module.js**

```js
export default function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // This will generate `.nuxt/dist/info.txt' with contents of info variable.
        // Source can be buffer too
        compilation.assets['info.txt'] = {
          source: () => info,
          size: () => info.length
        }

        cb()
      })
    }
  })
}
```

### 커스텀 웹팩 로더 등록하기

`this.extendBuild`를 사용해 `nuxt.config.js`에서 `build.extend`를 사용하는 것으로 같은 일을 할 수 있습니다.

**module.js**

```js
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Customize existing loaders
      // Refer to source code for Nuxt internals:
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## 특정 훅에서 작업 실행

여러분의 모듈은 Nuxt 초기화 뿐 아니라 특정 조건에서만 작업을 수행해야 할 수 있습니다. 우리는 강력한 [Hookable](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/hookable.js) Nuxt.js 시스템을 사용하여 특정 이벤트에 대한 작업을 수행할 수 있습니다. Nuxt는프로미스를 반환하거나 `async`로 정의될 경우 여러분의 함수를 기다릴 것입니다.

아래는 기본 예제입니다:

```js
export default function myModule() {
  this.nuxt.hook('modules:done', moduleContainer => {
    // This will be called when all modules finished loading
  })

  this.nuxt.hook('render:before', renderer => {
    // Called after the renderer was created
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // Called before the compiler (default: webpack) starts
  })

  this.nuxt.hook('generate:before', async generator => {
    // This will be called before Nuxt generates your pages
  })
}
```

## 모듈 패키지 명령어

**Experimental**

`v2.4.0`부터는 Nuxt 모듈의 패키지를 통해 사용자 지정 nuxt 명령을 추가할 수 있습니다. 그렇게 하려면 커맨드를 정의할 때 반드시 `NuxtCommand` API를 따라야 합니다. `my-module/bin/command.js`의 간단한 예는 다음과 같습니다:

```js
#!/usr/bin/env node

const consola = require('consola')
const { NuxtCommand } = require('@nuxt/cli')

NuxtCommand.run({
  name: 'command',
  description: 'My Module Command',
  usage: 'command <foobar>',
  options: {
    foobar: {
      alias: 'fb',
      type: 'string',
      description: 'Simple test string'
    }
  },
  run(cmd) {
    consola.info(cmd.argv)
  }
})
```

여기 주목해야 할 몇 가지가 있습니다. 먼저 노드 실행 파일을 검색하기 위한 `/usr/bin/env` 호출을 주목해주세요. 또한 [`esm`](https://github.com/standard-things/esm))을 코드에 수동으로 포함하지 않는한 커맨드에 ES 모듈 구문을 사용할 수 없다는 점에 유의하세요.

다음으로, 커맨드의 설정과 동작을 지정하기 위해 `NuxtCommand.run()`이 어떻게 사용되는지 알 수 있을 것입니다. 옵션은 `options`에 정의되어 [`minimist`](https://github.com/substack/minimist)로 파싱됩니다.

인자가 파싱되면, 첫번째 `NuxtCommand` 인스턴스와 함께 `run()`이 자동적으로 호출됩니다.

위의 예제에서는 구문 분석된 커맨드라인 인자를 조회하는 데 `cmd.argv`를 사용합니다. `NuxtCommand`에는 더 많은 메소드와 프로퍼티들이 있습니다(이 기능이 추가 테스트 및 개선됨에 따라 이에 대한 추가 문서를 제공할 예정입니다).

여러분의 커맨드를 Nuxt CLI가 인식할 수 있게끔 만들기 위해, 여러분의 package.json 의 `bin` 섹션에 이를 등록하시고, 여러분의 패키지명과 관련있는 `module`의 `nuxt-module` 컨밴션을 따라 주세요. 이 중심 바이너리로, 여러분의 목적대로 커맨드에 따른 더 많은 `subcommands`를 파싱하기 위해 `argv`를 사용할 수 있습니다.

```js
{
  "bin": {
    "nuxt-foobar": "./bin/command.js"
  }
}
```

(npm이나 Yarn을 통해) 여러분의 패키지가 설치되면, `nuxt foobar ...`로 커맨드 라인을 실행시킬 수 있습니다.

<div class="Alert">

모듈에 대해 더 많은 훅과 사용 방법이 있습니다. 더 nuxt-internal API에 대해 보시려면 [Nuxt Internals](/api/internals)를 참조해주세요.

</div>
