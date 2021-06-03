---
title: Server Side Rendering
description: Server-side rendering (SSR), is the ability of an application to contribute by displaying the web-page on the server instead of rendering it in the browser.
position: 3
category: concepts
questions:
  - question: What kinda of server do you need for Server Side Rendering?
    answers:
      - PHP server
      - JavaScript server
      - Node.js server
    correctAnswer: Node.js server
  - question: What do you use to extend and control the server?
    answers:
      - Middleware
      - ServerMiddleware
      - It is not possible to control the server
    correctAnswer: ServerMiddleware
  - question: You can host a server side rendered application on a serverless hosting provider
    answers:
      - true
      - false
    correctAnswer: false
  - question: Do we have access to  document on the server-side?
    answers:
      - yes, it is always available
      - No, The object belongs to the browser and is not available on the server
    correctAnswer: No, The object belongs to the browser and is not available on the server
  - question: When does your page become interactive?
    answers:
      - When the browser receives the rendered HTML from the server
      - When the Vue.js hydration kicks in
      - When a browser sends the initial request
    correctAnswer: When the Vue.js hydration kicks in
  - question: Navigating between pages using <NuxtLink> is done
    answers:
      - Client side
      - Server side
    correctAnswer: Client side
  - question: What are the correct steps?
    answers:
      - browser → server, server → browser, browser → browser
      - server → browser, browser → server, server → server
      - browser → server, server → browser, browser → server
    correctAnswer: browser → server, server → browser, browser → browser
---

Server-side rendering (SSR), is the ability of an application to contribute by displaying the web-page on the server instead of rendering it in the browser. Server-side sends a fully rendered page to the client; the client's JavaScript bundle takes over which then allows the Vue.js app to [hydrate](https://ssr.vuejs.org/guide/hydration.html).

## Node.js server required

A JavaScript environment is required to render your web page.

A Node.js server needs to be configured to execute your Vue.js application.

## Extend and control the server

You can extend the server with serverMiddleware and control routes with middleware.

```js{}[server-middleware/logger.js]

export default function (req, res, next) {
  console.log(req.url)
  next()
}
```

```js{}[nuxt.config.js]
export default {
  serverMiddleware: ['~/server-middleware/logger']

}
```

If your server middleware consists of a list of functions mapped to paths:

## Server vs Browser environments

Because you are in a Node.js environment you have access to Node.js objects such as `req` and `res`. You do not have access to the `window` or `document` objects as they belong to the browser environment. You can however use `window` or `document` by using the `beforeMount` or `mounted` hooks.

```js
beforeMount () {
  window.alert('hello');
}
mounted () {
  window.alert('hello');
}
```

## Server-side rendering steps with Nuxt.js

### Step 1: Browser to Server

When a browser sends the initial request, it will hit the Node.js internal server. Nuxt.js will generate the HTML and send it back to the browser with results from executed functions, e.g. `asyncData`, `nuxtServerInit` or `fetch`. Hooks functions are executed as well.

### Step 2: Server to Browser

The browser receives the rendered page from the server with the generated HTML. The content is displayed and the Vue.js hydration kicks in, making it reactive. After this process, the page is interactive.

### Step 3: Browser to Browser

Navigating between pages with [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) is done on the client side so you don't hit the server again unless you hard refresh the browser.

## Caveats

### window or document undefined

This is due to the server-side rendering. If you need to specify that you want to import a resource only on the client-side, you need to use the `process.client` variable.

For example, in your `.vue` file:

```js
if (process.client) {
  require('external_library')
}
```

### iOS and phone numbers

Some mobile Safari versions will automatically transform phone numbers into links. This will trigger a `NodeMismatch` warning as the SSR content doesn't match the website content anymore. This can make your app unusable on these Safari versions.

If you include telephone numbers in your Nuxt page, you have two options.

## Use a meta tag to stop the transformation

```html
<meta name="format-detection" content="telephone=no" />
```

## Wrap your phone numbers in links

```html
<!-- Example phone number: +7 (982) 536-50-77 -->

<template>
  <a href="tel: +7 (982) 536-50-77">+7 (982) 536-50-77</a>
</template>
```

<quiz :questions="questions"></quiz>
