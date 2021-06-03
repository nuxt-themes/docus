---
title: Transições
description: Nuxt.js usa o componente `<transition>` para permitir que você crie transições/animações incríveis entre suas rotas.
position: 10
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/05_transitions?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Para definir uma transição personalizada para uma rota específica, qual propriedade você adiciona à sua página?
    answers:
      - pageTransition
      - transition
      - layoutTransition
    correctAnswer: transition
  - question: Qual é o modo de transição padrão no Nuxt.js?
    answers:
      - in-out
      - out-in
      - none
    correctAnswer: out-in
  - question: Qual é o nome de transição padrão para transições nas páginas?
    answers:
      - .page
      - .pages
      - .page-transition
    correctAnswer: .page
  - question: Onde é o melhor lugar para adicionar suas classes CSS de transição para que você tenha transições globais em todas as rotas?
    answers:
      - index.vue
      - Um arquivo css global
      - layouts/default.vue
    correctAnswer: Um arquivo css global
  - question: Em qual array do arquivo nuxt.config.js você adiciona sua folha de estilo global?
    answers:
      - 'css: []'
      - 'styles: []'
      - 'transitions: []'
    correctAnswer: 'css: []'
  - question: Qual é a classe css padrão para transições de layout?
    answers:
      - layout
      - layout-transition
      - transition
    correctAnswer: layout
  - question: No arquivo nuxt.config.js, qual é a propriedade que você usa para definir as configurações padrão para as transições de layout?
    answers:
      - layout
      - layoutTransition
      - layoutTransitions
    correctAnswer: layoutTransition
  - question: Se você alterar o layout padrão para ser chamado de 'meu-layout', qual classe usará para criar as transições css?
    answers:
      - layout
      - meu-layout
      - meuLayout
    correctAnswer: meu-layout
  - question: No arquivo nuxt.config.js, qual é a propriedade que você usa para definir as configurações padrão para as transições de página?
    answers:
      - page
      - pageTransition
      - layoutTransition
    correctAnswer: pageTransition
  - question: Onde você modifica as configurações padrão para as transições de sua página?
    answers:
      - main.css
      - pages.vue
      - nuxt.config.js
    correctAnswer: nuxt.config.js
---

Nuxt.js usa o [componente transition](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) para permitir que você crie transições/animações incríveis entre suas rotas.

Para definir uma transição personalizada para uma rota específica, adicione a propriedade `transition` ao componente da página.

```js{}[pages/index.vue]
export default {
  // Pode ser uma String
  transition: ''
  // Ou um Objeto
  transition: {}
  // Ou uma Função
  transition (to, from) {}
}
```

## String

Se a chave `transition` for definida como uma string, ela será usada como `transition.name`.

```js{}[pages/index.vue]
export default {
  transition: 'home'
}
```

O Nuxt.js usará essas configurações para definir o componente da seguinte maneira:

```html{}[pages/index.vue]
<transition name="home"></transition>
```

<base-alert>

Isso é feito automaticamente e você não precisa adicionar o componente `<transition>` às suas páginas ou layouts.

</base-alert>

Agora tudo o que você precisa fazer é criar a nova classe para suas transições.

```html{}[pages/index.vue]
<styles>
  .home-enter-active, .home-leave-active { transition: opacity .5s; }
  .home-enter, .home-leave-active { opacity: 0; }
</styles>
```

## Objeto

Se a propriedade `transition` for definida como um objeto:

```js{}[pages/index.vue]
export default {
  transition: {
    name: 'home',
    mode: 'out-in'
  }
}
```

O Nuxt.js usará essas configurações para definir o componente da seguinte maneira:

```html{}[pages/index.vue]
<transition name="home" mode="out-in"></transition>
```

O objeto `transition` pode ter muitas propriedades como name, mode, css, duration e muito mais. Por favor, veja a documentação vue para mais informações.

Você também pode definir métodos na propriedade `transition` da página, para obter mais informações sobre os [hooks JavaScript](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks), consulte a documentação vue.

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```

### Modo de Transição

<base-alert>

O modo de transição padrão para páginas difere do modo padrão em Vue.js. O mode do `transition` é por padrão definido como `out-in`. Se você quiser executar as transiçãoes de saída e entrada simultaneamente, você deve definir o modo para uma string vazia `mode: ''`.

</base-alert>

```js{}[pages/index.vue]
export default {
  transition: {
    name: 'home',
    mode: ''
  }
}
```

## Função

Se a propriedade `transition` for definida como uma função:

```js{}[pages/index.vue]
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

`/` para `/posts` => `slide-left`, `/posts` para `/posts?page=3` => `slide-left`, `/posts?page=3` para `/posts?page=2` => `slide-right`.

## Configurações Globais

O nome de transição padrão do Nuxt.js é `"page"`. Para adicionar uma transição de fade a cada página da sua aplicação, tudo que você precisa é um arquivo CSS que seja compartilhado em todas as suas rotas.

Nosso css global em `assets/main.css`:

```css{}[assets/main.css]
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
```

Em seguida, adicionamos seu caminho ao array `css` em nosso arquivo `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/main.css']
}
```

## Definições de Configuração

## A Propriedade layoutTransition

A propriedade layoutTransition é usada para definir as propriedades padrão das transições de layout.

As configurações padrão para transições de layout são:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

```css{}[assets/main.css]
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}
```

Se você deseja alterar as configurações padrão para as transições de layout, pode fazer isso no arquivo nuxt.config.js.

```js{}[nuxt.config.js]
export default {
  layoutTransition: 'my-layouts'
  // ou
  layoutTransition: {
    name: 'my-layouts',
    mode: 'out-in'
  }
}
```

```css{}[assets/main.css]
.my-layouts-enter-active,
.my-layouts-leave-active {
  transition: opacity 0.5s;
}
.my-layouts-enter,
.my-layouts-leave-active {
  opacity: 0;
}
```

## A Propriedade pageTransition

As configurações padrão para as transições de página são:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

Se você deseja modificar as configurações padrão, você pode fazer isso no nuxt.config.js.

```js{}[nuxt.config.js]
export default {
  pageTransition: 'my-page'
  // ou
  pageTransition: {
    name: 'my-page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

Se você modificar o nome do pageTransition, também terá que renomear a classe css.

```css{}[assets/main.css]
.my-page-enter-active,
.my-page-leave-active {
  transition: opacity 0.5s;
}
.my-page-enter,
.my-page-leave-to {
  opacity: 0;
}
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
