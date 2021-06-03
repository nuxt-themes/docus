---
title: 'API: transition 属性'
description: Nuxt.js 使用 Vue.js transition 组件来实现路由切换时的过渡动效。
menu: transition
category: pages
position: 29
---

# transition 属性

> Nuxt.js 使用 Vue.js 的[&lt;transition&gt;](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components)组件来实现路由切换时的过渡动效。

- **类型：** `String` 或 `Object` 或 `Function`

如果想给某个页面自定义过渡特效的话，只要在该页面组件中配置 `transition` 字段即可：

```js
export default {
  // 可以是字符
  transition: ''
  // 或对象
  transition: {}
  // 或函数
  transition (to, from) {}
}
```

## String

如果 `transition` 属性的值类型是字符类型， 相当于设置了动效配置对象的 name 属性：`transition.name`。

```js
export default {
  transition: 'test'
}
```

Nuxt.js 将使用上面的配置来设置 Vue.js transition 组件，如下：

```html
<transition name="test"></transition>
```

## Object

如果 `transition` 属性的值类型是对象类型：

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js 将使用上面的配置来设置 Vue.js transition 组件，如下：

```html
<transition name="test" mode="out-in"></transition>
```

`transition` 允许配置的字段介绍：

| 属性字段           | 类型    | 默认值     | 描述                                                                                                                                             |
| ------------------ | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`             | String  | `"page"`   | 所有路由过渡都会用到的过渡名称。                                                                                                                 |
| `mode`             | String  | `"out-in"` | 所有路由都用到的过渡模式，见 [Vue.js transition 使用文档](http://vuejs.org/v2/guide/transitions.html#Transition-Modes)。                         |
| `css`              | Boolean | `true`     | 是否给页面组件根元素添加 CSS 过渡类名。如果值为 `false`，路由过渡时将只会触发页面组件注册的 Javascript 钩子事件方法（不会设置 css 类名）。       |
| `duration`         | Integer | `n/a`      | 在页面切换的持续时间（以毫秒为单位）详情请参考 [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations) |
| `type`             | String  | `n/a`      | 指定过滤动效事件的类型，用于判断过渡结束的时间点。值可以是 "transition" 或 "animation"。 默认情况下, Nuxt.js 会自动侦测动效事件的类型。          |
| `enterClass`       | String  | `n/a`      | 目标路由动效开始时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。     |
| `enterToClass`     | String  | `n/a`      | 目标路由动效结束时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。     |
| `enterActiveClass` | String  | `n/a`      | 目标路由过渡过程中的类名。详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。      |
| `leaveClass`       | String  | `n/a`      | 当前路由动效开始时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。     |
| `leaveToClass`     | String  | `n/a`      | 当前路由动效结束时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。     |
| `leaveActiveClass` | String  | `n/a`      | 当前路由动效过程中的类名。详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。      |

你也可以在页面组件事件里面使用 Javascript 来控制过渡动效，可以称之为 [JavaScript 钩子方法](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks)：

- beforeEnter(el)
- enter(el, done)
- afterEnter(el)
- enterCancelled(el)
- beforeLeave(el)
- leave(el, done)
- afterLeave(el)
- leaveCancelled(el)

_注意：如果使用纯 Javascript 控制路由过渡动效，建议将 `transition` 组件的 `css` 属性的值设置为 `false`。这样可以避免 Vue 做 CSS 动效相关的侦测逻辑，同时防止 CSS 影响到过渡的动效。_

## Function

如果 `transition` 属性的值类型时函数：

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

这时页面导航的动效如下：

- `/` to `/posts` => `slide-left`
- `/posts` to `/posts?page=3` => `slide-left`
- `/posts?page=3` to `/posts?page=2` => `slide-right`
