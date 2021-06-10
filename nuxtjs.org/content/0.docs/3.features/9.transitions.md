---
title: Transitions
description: Nuxt.js uses the `<transition>` component to let you create amazing transitions/animations between your routes.
position: 10
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/05_transitions?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: To define a custom transition for a specific route what key do you add to your page?
    answers:
      - pageTransition
      - transition
      - layoutTransition
    correctAnswer: transition
  - question: What is the default transition mode in Nuxt.js?
    answers:
      - in-out
      - out-in
      - none
    correctAnswer: out-in
  - question: What is the default transition name for transitions on pages?
    answers:
      - .page
      - .pages
      - .page-transition
    correctAnswer: .page
  - question: Where is the best place to add your CSS transition classes so you have global transitions on all routes?
    answers:
      - index.vue
      - A global css file
      - layouts/default.vue
    correctAnswer: A global css file
  - question: In which array in the nuxt.config.js file do you add your global stylesheet?
    answers:
      - 'css: []'
      - 'styles: []'
      - 'transitions: []'
    correctAnswer: 'css: []'
  - question: What is the default css class for layout transitions?
    answers:
      - layout
      - layout-transition
      - transition
    correctAnswer: layout
  - question: In the nuxt.config.js file what is the property you use to configure the default settings for layout transitions?
    answers:
      - layout
      - layoutTransition
      - layoutTransitions
    correctAnswer: layoutTransition
  - question: If you change the default layout to be called 'my-layout' what class do you use to create the css transitions?
    answers:
      - layout
      - my-layout
      - myLayout
    correctAnswer: my-layout
  - question: In the nuxt.config.js file what is the property you use to configure the default settings for page transitions?
    answers:
      - page
      - pageTransition
      - layoutTransition
    correctAnswer: pageTransition
  - question: Where do you modify the default settings for your page transitions?
    answers:
      - main.css
      - pages.vue
      - nuxt.config.js
    correctAnswer: nuxt.config.js
---

Nuxt.js uses the [transition component](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) to let you create amazing transitions/animations between your routes.

To define a custom transition for a specific route add the `transition` key to the page component.

```js{}[pages/index.vue]
export default {
  // Can be a String
  transition: ''
  // Or an Object
  transition: {}
  // or a Function
  transition (to, from) {}
}
```

## String

If the `transition` key is set as a string, it will be used as the `transition.name`.

```js{}[pages/index.vue]
export default {
  transition: 'home'
}
```

Nuxt.js will use these settings to set the component as follows:

```html{}[pages/index.vue]
<transition name="home"></transition>
```

<base-alert>

This is automatically done for you and you do not need to add the `<transition>` component to your pages or layouts.

</base-alert>

Now all you have to do is create the new class for your transitions.

```html{}[pages/index.vue]
<style>
  .home-enter-active, .home-leave-active { transition: opacity .5s; }
  .home-enter, .home-leave-active { opacity: 0; }
</style>
```

## Object

If the `transition` key is set as an object:

```js{}[pages/index.vue]
export default {
  transition: {
    name: 'home',
    mode: 'out-in'
  }
}
```

Nuxt.js will use these settings to set the component as follows:

```html{}[pages/index.vue]
<transition name="home" mode="out-in"></transition>
```

The `transition` object can have many properties such as name, mode, css, duration and many more. Please see the vue docs for more info.

You can also define methods in the page `transition` property, for more information on the [JavaScript hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) see the vue docs.

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```

### Transition Mode

<base-alert>

The default transition mode for pages differs from the default mode in Vue.js. The `transition` mode is by default set to `out-in`. If you want to run leaving and entering transitions simultaneously, you have to set the mode to the empty string `mode: ''`.

</base-alert>

```js{}[pages/index.vue]
export default {
  transition: {
    name: 'home',
    mode: ''
  }
}
```

## Function

If the `transition` key is set as a function:

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

Transitions applied on navigation:

`/` to `/posts` => `slide-left`,`/posts` to `/posts?page=3` => `slide-left`,`/posts?page=3` to `/posts?page=2` => `slide-right`.

## Global Settings

The Nuxt.js default transition name is `"page"`. To add a fade transition to every page of your application, all you need is a CSS file that is shared across all your routes.

Our global css in `assets/main.css`:

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

Then we add its path to the `css` array in our `nuxt.config.js` file:

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/main.css']
}
```

## Configuration Settings

### The layoutTransition Property

The layout transition is used to set the default properties of the layout transitions.

The default settings for layout transitions are:

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

If you want to change the default settings for your layout transitions you can do so in the nuxt.config.js file.

```js{}[nuxt.config.js]
export default {
  layoutTransition: 'my-layouts'
  // or
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

### The pageTransition Property

The default settings for page transitions are:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

Should you wish to modify the default settings you can do so in the nuxt.config.js

```js{}[nuxt.config.js]
export default {
  pageTransition: 'my-page'
  // or
  pageTransition: {
    name: 'my-page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

If you do modify the page Transition name you will also have to rename the css class.

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

<quiz :questions="questions"></quiz>
