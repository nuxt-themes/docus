---
title: SPA
---

With Nuxt.js you can build single page applications taking advantage of the many features Nuxt.js offers such as automatic routing as well as the defined directory structure.

## How client-side rendering works

Client side rendering means rendering the content in the browser using JavaScript. Instead of getting all of the content from the HTML we just get a basic HTML document with a JavaScript file that will then render the rest of the site using the browser. When you click on a link the browser will use JavaScript to load the new content. Vue.js makes sure that only the new content is rendered which makes the page load faster on every route change as you are only loading the content needed and not the entire page. However the first time you load the page your application will not load until all of the JavaScript is downloaded to the browser as the browser needs this JavaScript to be able to render the whole site. This can make the initial page loading take a bit longer.

## How single page applications work

With single page applications there is only one page. Although we place files in our pages folder and have a router that changes the pages it gives the impression that it is in fact a multiple page application however this is not the case. There is only one page whose new content gets overridden by JavaScript every time you change the page.

However as there is no content rendered in the HTML on initial page load this can cause problems for most search engines who do not have the capabilities to read JavaScript.

## How to create single page applications in Nuxt.js

With Nuxt.js it is also possible to render your application on the client-side by using the target spa and mode client.
