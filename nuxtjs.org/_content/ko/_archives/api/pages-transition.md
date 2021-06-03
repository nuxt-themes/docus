---
title: 'API: transition 프로퍼티'
description: Nuxt.js에서는 transition 컴포넌트를 사용해서 페이지를 이동하는 동안에 트랜지션/애니메이션을 발생시킬 수 있습니다.
menu: transition
category: pages
position: 29
---

> Nuxt.js는 [&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) 컴포넌트를 사용하여 페이지를 이동하는 동안에 트랜지션/에니메이션을 발생시킬 수있습니다.

- **타입:** `String` 혹은 `Object` 혹은 `Function`

특정 라우트에 대해서 커스텀 트랜지션을 설정하려면, 페이지 컴포넌트에 `transition` 키를 추가합니다.

```js
export default {
  // String을 지정할수 있습니다.
  transition: ''
  // 또는 Object
  transition: {}
  // 또는 Function
  transition (to, from) {}
}
```

## String

`transition` 키에 String이 세팅되어 있는 경우에는 `transition.name`으로 사용됩니다.

```js
export default {
  transition: 'test'
}
```

위와 같이 설정되어 있는 경우에 컴포넌트는 다음과 같이 세팅됩니다:

```html
<transition name="test"></transition>
```

## Object

`transition`키에 Object가 세팅되어 있는 경우:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

위와 같이 설정되어 있다면 컴포넌트는 다음과 같이 세팅됩니다:

```html
<transition name="test" mode="out-in"></transition>
```

`transition` Object가 가질 수 있는 프로퍼티는 다음과 같습니다:

| 키                 | 타입    | 기본값     | 정의                                                                                                                                                                                  |
| ------------------ | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | String  | `"page"`   | 모든 라우트의 트랜지션에 적용되는 트랜지션 명                                                                                                                                         |
| `mode`             | String  | `"out-in"` | 모든 라우트에 적용되는 트랜지션 모드. 자세한 내용은 [Vue.js 문서](http://vuejs.org/v2/guide/transitions.html#Transition-Modes) 참조                                                   |
| `css`              | Boolean | `true`     | CSS 트랜지션 클래스의 적용 여부. 기본값은 `true`. false를 설정하면 컴포넌트 이벤트에 등록된 JavaScript Hook만 트리거됩니다.                                                           |
| `duration`         | Integer | `n/a`      | 트랜지션이 적용되는 시간(밀리세컨드). 자세한 내용은 [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations) 참조                                     |
| `type`             | String  | `n/a`      | 트랜지션 종료 타이밍을 판정하기 위해 기다리는 트랜지션의 이벤트 타입. "transition" 혹은 "animation"을 지정할 수 있습니다. 기본, 보다 시간이 걸리는 타입이 자동적으로 선택하게 됩니다. |
| `enterClass`       | String  | `n/a`      | 트랜지션을 시작할 때의 상태 클래스. 자세한 내용은 [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조                                           |
| `enterToClass`     | String  | `n/a`      | 트랜지션을 종료할 때의 상태 클래스. 자세한 내용은 [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조                                           |
| `enterActiveClass` | String  | `n/a`      | 트랜지션 중에 적용되는 클래스. 자세한 내용은 [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조                                                |
| `leaveClass`       | String  | `n/a`      | 트랜지션을 시작할 때의 상태 클래스. 자세한 내용은 [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조                                           |
| `leaveToClass`     | String  | `n/a`      | 트랜지션을 종료할 때의 상태 클래스. 자세한 내용은 [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조                                           |
| `leaveActiveClass` | String  | `n/a`      | 트랜지션 중에 적용되는 클래스. 자세한 내용은 [Vue.js 문서](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 참조                                                |

`transition` 안에서 메소드를 정의하는 것도 가능한데 메소드는 [JavaScript Hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) 에서 사용됩니다:

- beforeEnter(el)
- enter(el, done)
- afterEnter(el)
- enterCancelled(el)
- beforeLeave(el)
- leave(el, done)
- afterLeave(el)
- leaveCancelled(el)

_메모: JavaScript만의 트랜지션을 위해서 명시적으로 Vue가 CSS판정을 스킵하도록 하는 `css: false`를 추가해 두는 것도 좋은 아이디어라 생각합니다. 또한 실수로 CSS룰이 트랜지션을 방해하는 것을 막아줍니다._

## Function

`transition`키에 Function이 세팅되었을 경우:

```js
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

트랜지션은 각 페이지로 이동할 때에 다음과 같이 적용됩니다.:

- `/` 에서 `/posts` 로 이동할 때 => `slide-left`
- `/posts` 에서 `/posts?page=3` 로 이동할 때 => `slide-left`
- `/posts?page=3` 에서 `/posts?page=2` 로 이동할 때 => `slide-right`
