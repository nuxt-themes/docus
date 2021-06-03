---
title: Contribution 가이드
description: Contribution은 모두 환영합니다!
category: prologue
position: 2
---

> Contribution은 모두 환영합니다!

## 이슈 보고하기

프로젝트에 기여하는 가장 좋은 방법은 문제가 생겼을 때 자세한 리포트를 보내는 것입니다.

Contributor와 Maintainer의 원활한 작업을 위해서, 우리는 [CMTY](https://cmty.nuxtjs.org/)를 사용합니다.

쉽게 버그를 복제하기 위해 [CodeSandBox](https://template.nuxtjs.org/)나 복제본 repository를 포함했는지 확인해주세요.

버그가 더 잘 복제되어 있을 수록, 저희는 그 버그를 더 빨리 고칠 수 있습니다!

## 풀 리퀘스트

우리는 단순한 오타 수정이라도 여러분의 풀 리퀘스트를 환영합니다.

그렇지만, 어떤 중요한 개선사항이라도 기존의 [feature request](https://feature.nuxtjs.org/)나 [bug report](https://bug.nuxtjs.org/)와 연결되어야 합니다.

### 시작하기

1. 여러분의 Github 계정에 [Nuxt repository](https://github.com/nuxt/nuxt.js)를 [Fork](https://help.github.com/articles/fork-a-repo/)합니다. 그리고 여러분의로컬 디바이스에 [clone](https://help.github.com/articles/cloning-a-repository/)합니다.
2. `npm install`이나 `yarn install`를 디펜던시 설치를 위해 실행해주세요.

> _**npm**이나 **yarn**은 설치할 디펜던시들을 놓칠 수 있어 보입니다. 이를 복원하기 위해서는 여러분의 애플리케이션 내 `node_modules` 폴더를 삭제하시거나, 다시설치하시거나, 놓친 디펜던시들만을 로컬 설치해 보세요._

> 디펜던시 추가의 경우, `yarn add`를 사용해주세요. `yarn.lock` 파일은 모든 Nuxt 디펜던시들의 정보를 담은 단 하나의 파일입니다(source of truth).

### 셋업

테스트를 실행하기 전에 모든 종속성이 충족되는지 확인하고 모든 패키지를 빌드하십시오:

```sh
yarn
yarn build
```

### 테스트 구조

버그 수정이나 새로운 기능을 포함한 좋은 PR은 테스트를 포함하곤 합니다. 좋은 테스트를 작성하기 위해, 우리의 테스트 구조를 설명하겠습니다:

#### Fixtures

Fixtures (`tests/fixtures`에서 참조)는 여러 Nuxt applications을 포함합니다. 빌드시간을 가능한 짧게 유지하기 위해서, 우리는 테스트당 Nuxt 앱을 만들지 않습니다. 대신에, 실제 유닛 테스트들을 실행하기 전에 Fixture들은 `yarn test:fixtures`로 빌드됩니다.

PR을 제출할 때 변경 사항을 올바르게 반영하기 위해 (해당하는 경우) **alter**나 **add a new fixture**를 추가해주세요.

또한 `jest test/fixtures/my-fixture/my-fixture.test.js`로 해당 테스트를 실행하여변경한 후 **rebuild** 픽스쳐를 잊지 마세요!

#### Unit tests

유닛 테스트는 `tests/unit`에서 확인할 수 있으며, fixture가 빌드된 이후 실행됩니다. 테스트당 새로운 Nuxt 서버가 사용되므로(빌드 단계에서 초기 상태를 제외하고) 공유된 state가 존재하지 않습니다.

유닛 테스트를 추가한 후 직접 실행하실 수 있습니다:

```sh
jest test/unit/test.js
```

아니면 전체 unit test suite를 실행할 수 있습니다:

```sh
yarn test:unit
```

다시 말하지만, 이전에 fixture를 다시 빌드해야할 수도 있다는 것을 기억해주세요!

### 변경 내용 테스팅하기

PR을 진행하는 동안 fixture가 올바르게 설정되어 있는지 확인거나 현재 변경 사항을디버그하고 싶을 것입니다.

이렇게 하려면 Nuxt 스크립트 자체를 사용하여 fixture 또는 예제 앱을 실행하세요:

```sh
yarn nuxt examples/your-app
yarn nuxt test/fixtures/your-fixture-app
```

> `npm link`도 이 작업에 대해 어느 정도 작동은 하지만 일부 이슈가 있는 것으로 알려졌습니다. 그래서 우리는 `yarn nuxt`를 직접 호출하기를 권합니다.

### 예시들

더 큰 feature를 작업하는 경우 `examples/`에 예제 앱을 설치하십시오. 이것은 변경사항을 이해하는 데 크게 도움이 될 것이고, 또한 Nuxt 사용자가 여러분이 구축한 기능을 심층적으로 이해하는데 도움이 될 것입니다.

### Linting

이미 아실수도 있겠지만, 우리는 코드 표준을 시행하기 위해 ESLint를 사용하고 있습니다. 실행하기 전에 `yarn lint`을 실행해주세요. 코드 스타일이 올바른지 확인해주세요. 그렇지 않다면, 당신은 코드 스타일을 고치기 위해 대부분의 경우 "yarn lint --fix" 또는 "npm run lint -- --pix"(타자 없음)를 사용할 수 있습니다. 다만 오류가남아 있으면 수동으로 수정해야 합니다.

### 문서화

새로운 기능을 추가하거나, Nuxt의 동작을 다른 방식으로 리팩토링하거나 변경하는 경우, 변경사항을 문서화하려 하실 것입니다. 이 때에는 [docs](https://github.com/nuxt/docs/pulls) 저장소에 대한 PR을 사용해주세요. 바로즉시 문서를 작성할 필요는 없지만, 풀 리퀘스트가 되고 충분한 시간이 지났다면 작성을 해주세요.

### 최종 체크리스트

당신이 PR을 할 때에는, 채워야할 간단한 템플릿이 있을 것입니다. 모두 적합한 답안을 체크리스트에 기입해주세요.

### 문제 해결

#### macOS에서의 디버깅 테스트

`getPort()`를 검색해보면 이는 테스트 중 새로운 Nuxt 프로세스를 시작할 수 있는 것으로 보입니다. 때때로 macOS에서는 작동이 중지되는 것으로 보이며, 이 경우 테스트할 포트를 수동으로 설정해야 할 수도 있습니다.

또 다른 일반적인 문제는 fixture 테스트를 실행할 때 메모리에 걸릴 수 있는 Nuxt 프로세스입니다. 고스트 프로세스는 종종 다음 테스트가 작동하지 못하게 할 것입니다. 이런 문제 상황으로 판단될 경우 멈춘 테스트 프로세스를 검사하려면 `ps aux | grep -i node`를 실행해 보세요.
