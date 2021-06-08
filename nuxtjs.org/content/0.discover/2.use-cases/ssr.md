---
title: SSR
---

Nuxt.js comes with built in support for server-side rendering meaning you can build universal/isomerphic applications with Vue.js code without having to worry about configuring the client and server.

## What is Server-side Rendering

Server-side rendering otherwise known as SSR means that your page is rendered on the server when it is requested by the user. When the user opens your page in a browser the browser sends a request to the server requesting that page. The page is rendered on the server and sent back to the browser with all its content.

## How server side rendering works

When the browser requests a page it usually only takes a few milliseconds for the server to return the HTML but it can depend on your internet connection or where the server is located as well as how many users are trying to access your site and how optimised your website is.

With traditional server rendered sites every time the user clicks on a new link it will make another request to the server. This will happen for every time the user visits a new page that the server has not already cached. This basically means that the page needs to fully refresh each time you browse from one page to another even though you may have the same header and footer and other similar content it will still have to fully load the page. Waiting for each page to load and having full refreshes on page loads made people reach towards single page applications where refreshing of the page was no longer a thing. But can we have both spa and ssr. That is where universal apps come in.

## **What is a universal app?**

A universal app is used to describe JavaScript code that can execute both on the client and the server side. With a universal app you have the best of both worlds. Your application is rendered on the server and sends the rendered HTML as the response to a browser request for every route which speeds up load times and improves search engine optimisation.

Once the page is rendered client side navigation takes over making the site look and feel like a single page application but with all the benefits of server side rendering. With client side navigation one the user starts to navigate to the other pages of your site Vue.js's hydration kicks in which creates a virtual DOM where a representation of the user interface is kept in memory and synced with the real DOM. This means for every new page when navigating the server is not called and your app is working like a single page application therefore no full page reloads happen. You will only call the server for a page the first time you visit or if you hard refresh the site. This means you have the advantages of great SEO and fast initial page loads but with the benefits of not having full page reloads on navigation.

## Working with server rendered applications

With Nuxt.js you can use asyncData in your components to fetch the data and render it on the server. You can also use `isServer` and `isClient` in your plugins to easily decide if you’re rendering something on the client or on the server. You can also use the `client only` component which is used for those components that can only be rendered on the client side due.

## How to build server side rendered apps in Nuxt.js

In Nuxt.js you can build server rendered applications by using the target command and setting it to server. In order to use server-side rendering in Nuxt.js you will need to run your code on a Node.js server and deploy it on a hosting service that runs on Node.js.
