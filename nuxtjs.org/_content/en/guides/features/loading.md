---
title: Loading
description: Out of the box, Nuxt.js gives you its own loading progress bar component that's shown between routes. You can customize it, disable it or even create your own loading component.
position: 8
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/08_loading?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: In order for the Nuxt.js loading progress bar to work what do you have to do?
    answers:
      - Nothing, it just works
      - set loading to true in the nuxt.config.js file
      - create a loading component
    correctAnswer: Nothing, it just works
  - question: Where can you modify the styles for the default progress bar?
    answers:
      - layout component
      - page component
      - nuxt.config.js
    correctAnswer: layout component
  - question: In which property do you set the styles for the progress bar in the nuxt.config.js file?
    answers:
      - progress
      - loading
      - loadingBar
    correctAnswer: loading
  - question: What do you add in the nuxt.config.js file to disable loading?
    answers:
      - 'loadingBar: false'
      - "loading: 'none'"
      - 'loading: false'
    correctAnswer: 'loading: false'
  - question: You can disable the loading on specific pages?
    answers:
      - true
      - false
    correctAnswer: true
  - question: What do you use to programmatically start the loading bar?
    answers:
      - $nuxt.loading.start()
      - $nuxt.loading()
      - $loading.start()
    correctAnswer: $nuxt.loading.start()
  - question: Which property do you use to make your progress bar continuous for when the loading takes longer than the duration?
    answers:
      - "duration: 'continuous'"
      - "loading: 'continuous'"
      - 'continuous: true'
    correctAnswer: 'continuous: true'
  - question: Which two methods are required when creating a custom loading component?
    answers:
      - start() and fail()
      - start() and finish()
      - loading() and finish()
    correctAnswer: start() and finish()
  - question: Once you have created your new loading.vue component how do you use it?
    answers:
      - import it into the layouts page
      - add it in the nuxt.config.js under the loading property
      - add it to the nuxt.config.js under the plugins property
    correctAnswer: add it in the nuxt.config.js under the loading property
  - question: To add a circle spinner when Nuxt.js is using ssr:false what do you add to the loading property?
    answers:
      - 'circle: true'
      - 'spinner: circle'
      - 'name: circle'
    correctAnswer: 'name: circle'
---

Out of the box, Nuxt.js gives you its own loading progress bar component that's shown between routes. You can customize it, disable it or even create your own loading component.

## Customizing the Progress Bar

Among other properties, the color, size, duration and direction of the progress bar can be customized to suit your application's needs. This is done by updating the `loading` property of the `nuxt.config.js` with the corresponding properties.

For example, to set a blue progress bar with a height of 5px, we update the `nuxt.config.js` to the following:

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

List of properties to customize the progress bar.

| Key         | Type    | Default | Description                                                                                                                       |     |
| ----------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- | --- |
| color       | String  | 'black' | CSS color of the progress bar                                                                                                     |     |
| failedColor | String  | 'red'   | CSS color of the progress bar when an error appended while rendering the route (if data or fetch sent back an error for example). |     |
| height      | String  | '2px'   | Height of the progress bar (used in the style property of the progress bar)                                                       |     |
| throttle    | Number  | 200     | In ms, wait for the specified time before displaying the progress bar. Useful for preventing the bar from flashing.               |     |
| duration    | Number  | 5000    | In ms, the maximum duration of the progress bar, Nuxt.js assumes that the route will be rendered before 5 seconds.                |     |
| continuous  | Boolean | false   | Keep animating progress bar when loading takes longer than duration.                                                              |     |
| css         | Boolean | true    | Set to false to remove default progress bar styles (and add your own).                                                            |     |
| rtl         | Boolean | false   | Set the direction of the progress bar from right to left.                                                                         |     |

## Disable the Progress Bar

If you don't want to display the progress bar between the routes add `loading: false` in your `nuxt.config.js` file:

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

The loading property gives you the option to disable the default loading progress bar on a specific page.

```html{}[pages/index.vue]
<template>
  <h1>My page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```

## Programmatically starting the loading bar

The loading bar can also be programmatically started in your components by calling `this.$nuxt.$loading.start()` to start the loading bar and `this.$nuxt.$loading.finish()` to finish it.

During your page component's mounting process, the `$loading` property may not be immediately available to access. To work around this, if you want to start the loader in the `mounted` method, make sure to wrap your `$loading` method calls inside `this.$nextTick` as shown below.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## Internals of the Progress Bar

Unfortunately, it is not possible for the Loading component to know in advance how long loading a new page will take. Therefore, it is not possible to accurately animate the progress bar to 100% of the loading time.

Nuxt's loading component partially solves this by letting you set the `duration`, this should be set to an estimate of how long the loading process will take. Unless you use a custom loading component, the progress bar will always move from 0% to 100% in `duration` time (regardless of actual progression). When the loading takes longer than `duration` time, the progress bar will stay at 100% until the loading finishes.

You can change the default behavior by setting `continuous` to true, then after reaching 100% the progress bar will start shrinking back to 0% again in `duration` time. When the loading is still not finished after reaching 0% it will start growing from 0% to 100% again, this repeats until the loading finishes.

```js
export default {
  loading: {
    continuous: true
  }
}
```

_Example of a continuous progress bar:_

![https://nuxtjs.org/api-continuous-loading.gif](https://nuxtjs.org/api-continuous-loading.gif)

## Using a Custom Loading Component

You can also create your own component that Nuxt.js will call instead of the default loading progress bar component. To do so, you need to give a path to your component in the `loading` option. Then, your component will be called directly by Nuxt.js.

Your component has to expose some of these methods:

| Method        | Required | Description                                                                              |
| ------------- | -------- | ---------------------------------------------------------------------------------------- |
| start()       | Required | Called when a route changes, this is where you display your component.                   |
| finish()      | Required | Called when a route is loaded (and data fetched), this is where you hide your component. |
| fail(error)   | Optional | Called when a route couldn't be loaded (failed to fetch data for example).               |
| increase(num) | Optional | Called during loading the route component, num is an Integer < 100.                      |

You can create your custom component in `components/LoadingBar.vue`:

```html{}[components/LoadingBar.vue]
<template>
  <div v-if="loading" class="loading-page">
    <p>Loading...</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
```

Then, you update your `nuxt.config.js` to tell Nuxt.js to use your component:

```js{}[nuxt.config.js]
export default {
  loading: '~/components/LoadingBar.vue'
}
```

## The loading indicator Property

When running Nuxt.js in SPA mode, there is no content from the server side on the first page load. So, instead of showing a blank page while the page loads, Nuxt.js gives you a spinner which you can customize to add your own colors or background and even change the the indicator.

```js{}[nuxt.config.js]
export default {
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  }
}
```

## Built-in indicators

These indicators are imported from the awesome [SpinKit](http://tobiasahlin.com/spinkit) project. You can check out its demo page to preview the spinners. In order to use one of these spinners all you have to do is add its name to the name property. No need to import or install anything. Here is a list of built in indicators you can use.

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

Built-in indicators support `color` and `background` options.

## Custom indicators

If you need your own special indicator, a String value or Name key can also be a path to an HTML template of indicator source code! All of the options are passed to the template, too.

Nuxt's built-in [source code](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) is also available if you need a base!

<quiz :questions="questions"></quiz>
