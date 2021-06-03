---
title: 설정
description: Nuxt.js 기본 설정은 대부분의 기능을 사용할 수 있도록 되어있지만, 이를 nuxt.config.js 파일로 덮어 쓸 수 있습니다.
category: getting-started
position: 103
---

> Nuxt.js 기본 설정은 대부분의 기능을 사용할 수 있도록 되어있지만, 이를 nuxt.config.js 파일로 덮어 쓸 수 있습니다.

### build

이 옵션을 사용하면 `build` 단계에서 `loaders`, `filenames`, `webpack` 설정과 `transpilation`을 포함한 다양한 세팅들을 설정할 수 있습니다. [build 옵션에 대한 문서](/api/configuration-build)

### css

이 옵션을 사용하면 모든 페이지에서 전역으로 사용할 CSS파일 / 모듈 / 라이브러리파일을 설정할 수 있습니다. [css 옵션에 대한 문서](/api/configuration-css)

### dev

이 옵션을 사용하면 Nuxt.js의 `개발` 또는 `프로덕션` 모드를 정의 할 수 있습니다 (Nuxt.js를 프로그램적으로 사용할 때 특히 중요함). [dev 옵션에 대한 문서](/api/configuration-dev)

### env

이 옵션을 사용하면 클라이언트 및 서버에서 사용 가능한 환경 변수를 정의 할 수 있습니다. [env 옵션에 대한 문서](/api/configuration-env)

### generate

이 옵션을 사용하면 애플리케이션에서 Nuxt.js가 HTML 파일로 변환할 모든 동적인 경로에 대한 각각의 params 값을 정의 할 수 있습니다. [generate 옵션에 대한 문서](/api/configuration-generate)

### head

이 옵션을 사용하면 애플리케이션의 모든 기본 메타를 정의 할 수 있습니다. [head 옵션에 대한 문서](/api/configuration-head)

### loading

이 옵션을 사용하면 Nuxt.js를 사용하여 기본적으로 불러올 loading 컴포넌트를 사용자 정의 할 수 있습니다. [loading 옵션에 대한 문서](/api/configuration-loading)

### modules

이 옵션을 사용하면 프로젝트의 Nuxt.js 모듈을 추가할 수 있습니다.

[modules 옵션에 대한 문서](/api/configuration-modules)

### modulesDir

이 옵션을 사용하면 Nuxt.js 애플리케이션의 node_modules 폴더를 정의할 수 있습니다 .

[modulesDir 옵션에 대한 문서](/api/configuration-modulesdir)

### plugins

이 옵션을 사용하면 루트 Vue.js 어플리케이션을 인스턴스화 하기 전에 실행할 Javascript 플러그인을 정의 할 수 있습니다. [plugins 옵션에 대한 문서](/api/configuration-plugins)

### rootDir

이 옵션을 사용하면 Nuxt.js 어플리케이션의 위치를 정의 할 수 있습니다. [rootDir 옵션에 대한 문서](/api/configuration-rootdir)

### router

이 옵션을 사용하면 vue-router의 기본적인 Nuxt.js 구성을 덮어 쓸 수 있습니다. [router 옵션에 대한 문서](/api/configuration-router)

### server

이 옵션을 사용하면 여러분의 Nuxt.js 애플리케이션의 서버 인스턴스의 커넥션 변수들을 설정할 수 있습니다. [server 옵션에 대한 문서](/api/configuration-server)

### srcDir

이 옵션을 사용하면 Nuxt.js 애플리케이션의 src 디렉토리를 정의 할 수 있습니다. [srcDir 옵션에 대한 문서](/api/configuration-srcdir)

### dir

이 옵션을 사용하면 여러분의 Nuxt.js 애플리케이션의 커스텀 디렉토리들을 정의할 수있습니다. [dir 옵션에 대한 문서](/api/configuration-dir)

### transition

이 옵션을 사용하면 페이지 transition 기능의 기본 속성을 정의 할 수 있습니다. [transition 옵션에 대한 문서](/api/configuration-transition)

## Asynchronous Configuration

만약 비동기 데이터로 (예를 들어, API에서 받아오는 데이터) 어떤 옵션들을 생성해야한다면(예를 들어, head 옵션) 프로미스를 리턴할 수 있습니다. 아래는 그 예시입니다 :

```js
/* 
axios-module cannot be used in nuxt.config.js
You need to import axios and configure it again
*/
import axios from 'axios'
export default async () => {
  const data = await axios.get('endpoint')
  return {
    head: {
      title: data.head.title
      //... rest of config
    }
  }
}
```
