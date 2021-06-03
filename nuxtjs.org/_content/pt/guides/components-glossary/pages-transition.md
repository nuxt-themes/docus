---
title: 'A propriedade `transition`'
description: O Nuxt.js usa o componente `<transition>` para permitir que você crie e aplique transições/animações incríveis enquanto você navega entre suas páginas.
menu: Transition Property
category: components-glossary
position: 0
---

> Nuxt.js usa o componente [`<transition>`](https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) para permitir que você crie transições/animações incríveis entre suas páginas .

- **Tipo:** `String` ou `Object` ou `Function`

Para definir uma transição personalizada para uma rota específica, basta adicionar a propriedade `transition` ao componente da página.

```js
export default {
  // Pode ser uma String
  transition: ''
  // Ou um Objeto
  transition: {}
  // ou uma Função
  transition (to, from) {}
}
```

## String

Se a propriedade `transition` for definida como uma string, ela será usada como `transition.name`.

```js
export default {
  transition: 'test'
}
```

O Nuxt.js usará essas configurações para definir o componente da seguinte maneira:

```html
<transition name="test"></transition>
```

## Objeto

Se a propriedade `transition` for definida como um objeto:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

O Nuxt.js usará essas configurações para definir o componente da seguinte maneira:

```html
<transition name="test" mode="out-in"></transition>
```

O objeto `transition` pode ter as seguintes propriedades:

| Propriedade        | Tipo      | Padrão     | Definição                                                                                                                                                                                                                                                  |
| ------------------ | --------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | `String`  | `"page"`   | O nome da transição aplicada em todas as transições de rota.                                                                                                                                                                                               |
| `mode`             | `String`  | `"out-in"` | O modo de transição aplicado em todas as rotas, consulte a [documentação do Vue.js](https://vuejs.org/v2/guide/transitions.html#Transition-Modes).                                                                                                         |
| `css`              | `Boolean` | `true`     | Se deve aplicar classes de transição CSS. O padrão é `true`. Se definido como `false`, só disparará hooks JavaScript registrados por meio de eventos de componente.                                                                                        |
| `duration`         | `Integer` | n/a        | A duração (em milissegundos) aplicada na transição, consulte a [documentação do Vue.js](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations).                                                                                        |
| `type`             | `String`  | n/a        | Especifique o tipo de eventos de transição a serem aguardados para determinar o tempo de término da transição. Os valores disponíveis são `"transition"` e `"animation"`. Por padrão, ele detectará automaticamente o tipo que tem uma duração mais longa. |
| `enterClass`       | `String`  | n/a        | O estado inicial da classe de transição. Veja a [documentação do Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                           |
| `enterToClass`     | `String`  | n/a        | O estado final da transição. Veja a [documentaçao do Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                                       |
| `enterActiveClass` | `String`  | n/a        | A classe aplicada em toda a duração da transição. Veja a [documentação Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                     |
| `leaveClass`       | `String`  | n/a        | O estado inicial da classe de transição. Veja a [documentação do Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                           |
| `leaveToClass`     | `String`  | n/a        | O estado final da transição. Veja a [documentaçao do Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                                       |
| `leaveActiveClass` | `String`  | n/a        | A classse aplicada em toda a duração da transição. Veja a [documentação do Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                                 |

Você também pode definir métodos na propriedade `transition` da página, estes são para os [hooks do JavaScript](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks):

- `beforeEnter(el)`
- `enter(el, done)`
- `afterEnter(el)`
- `enterCancelled(el)`
- `beforeLeave(el)`
- `leave(el, done)`
- `afterLeave(el)`
- `leaveCancelled(el)`

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```

_Obs: também é uma boa ideia adicionar explicitamente `css: false` para transições somente JavaScript para que o Vue possa pular a detecção de CSS. Isso também evita que as regras CSS interfiram acidentalmente na transição._

### Modo de transição

**O modo de transição padrão para páginas difere do modo padrão no Vue.js**. O mode `transition` é por padrão definido como `out-in`. Se você quiser sair e entrar nas transições simultaneamente, você deve definir o mode para a string vazia `mode: ''`.

```js
export default {
  transition: {
    name: 'test',
    mode: ''
  }
}
```

## Função

Se a propriedade `transition` for definida como uma função:

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

Transições aplicadas na navegação:

- `/` para `/posts` => `slide-left`,
- `/posts` para `/posts?page=3` => `slide-left`,
- `/posts?page=3` para `/posts?page=2` => `slide-right`.
