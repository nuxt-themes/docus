---
title: 디렉터리 구조
description: 기본 Nuxt.js 애플리케이션 구조는 소규모 및 대규모 애플리케이션 모두를 위한 훌륭한 시작점을 제공합니다. 원하는 대로 애플리케이션을 구성할 수 있고 필요하다면 다른 디렉터리를 생성할 수 있습니다.
position: 3
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/03_directory_structure?fontsize=14&hidenavigation=1&theme=dark
---

기본 Nuxt.js 애플리케이션 구조는 소규모 및 대규모 애플리케이션 모두를 위한 훌륭한 시작점을 제공합니다. 원하는 대로 애플리케이션을 구성할 수 있고 필요하다면 다른 디렉터리를 생성할 수 있습니다.

아직 프로젝트에 없는 디렉터리와 파일을 생성해봅시다.

```bash
mkdir components assets static
touch nuxt.config.js
```

Nuxt.js 애플리케이션을 구현할 때 사용하는 메인 디렉터리와 파일이 있습니다. 아래에서 각각에 대한 설명을 볼 수 있습니다.

<base-alert type="info">

이러한 이름을 가진 디렉터리를 생성하면 Nuxt.js 프로젝트에서 기능을 사용할 수 있습니다.

</base-alert>

## 디렉터리

### pages 디렉터리

`pages` 디렉터리에는 애플리케이션의 뷰와 라우트를 포함됩니다. 지난 챕터에서 배운 것처럼 Nuxt.js는 이 디렉터리에 있는 모든 `.vue` 파일을 읽고 이를 사용하여 애플리케이션 라우터를 생성합니다.

<base-alert type="next">

[pages directory](/docs/2.x/directory-structure/pages)에 대해 더 알아보기

</base-alert>

### components 디렉터리

`components` 디렉터리는 페이지에 임포트될 모든 Vue.js 컴포넌트를 두는 곳입니다.

Nuxt.js를 사용하면 컴포넌트를 생성하고 .vue 파일에 자동으로 가져옵니다. 즉, 스크립트에서 수동으로 임포트할 필요가 없습니다. components를 true로 설정하면 Nuxt.js가 컴포넌트를 스캔하고 자동으로 임포트합니다.

<base-alert type="next">

[components directory](/docs/2.x/directory-structure/components)에 대해 더 알아보기

</base-alert>

### assets 디렉터리

`assets` 디렉터리에는 스타일이나 이미지, 폰트와 같은 컴파일되지 않는 에셋을 포함됩니다.

<base-alert type="next">

[assets directory](/docs/2.x/directory-structure/assets)에 대해 더 알아보기

</base-alert>

### static 디렉터리

`static` 디렉터리는 서버 경로와 직접 매핑되고 이름을 유지해야하는 파일(e.g. `robots.txt`) _또는_ 변경되지 않을 가능성이 있는 파일(e.g. 파비콘)이 포함됩니다.

<base-alert type="next">

[static directory](/docs/2.x/directory-structure/static)에 대해 더 알아보기

</base-alert>

### nuxt.config.js 파일

`nuxt.config.js` 파일은 Nuxt.js의 단일 설정 파일입니다. 모듈을 추가하거나 기본 설정을 오버라이드하고 싶을 때 여기에서 변경사항을 적용할 수 있습니다.

<base-alert type="next">

[nuxt.config.js file](/docs/2.x/directory-structure/nuxt-config)에 대해 더 알아보기

</base-alert>

### package.json 파일

`package.json` 파일은 애플리케이션의 모든 디펜던시와 스크립트를 포함합니다.

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## 프로젝트 구조에 대해 더 알아보기

[content](/docs/2.x/directory-structure/content), [layouts](/docs/2.x/directory-structure/layouts), [middleware](/docs/2.x/directory-structure/middleware), [modules](/docs/2.x/directory-structure/modules), [plugins](/docs/2.x/directory-structure/plugins) 그리고 [store](/docs/2.x/directory-structure/store)을 포함하여 더 유용한 디렉터리 및 파일이 있습니다. 소규모 애플리케이션에는 필요하지 않기에 여기에는 다루지 않습니다.

<base-alert type="next">

모든 디렉터리에 대해 자세히 알아보고 싶으면 [Directory Structure book](/docs/2.x/directory-structure/nuxt)를 읽어보세요.

</base-alert>
