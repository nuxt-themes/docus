---
title: Stores
---

## What is Stores.jp?

[stores.jp](http://stores.jp) is an e-commerce platform which allows users to create their own e-commerce website. It focuses on users who don't have their own e-commerce site yet. That's why most of the features are designed so users can change the style and functionality easily without having any technical background knowledge.

In the store dashboard the shop owner can change the style, layout or add a banner etc by easily dragging and dropping.

[https://d1nv1xlgewu8z6.cloudfront.net/service_top/video_pc.webm](https://d1nv1xlgewu8z6.cloudfront.net/service_top/video_pc.webm)

There are many shops that have a unique design and functionality.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b5e9a986-2c9d-4683-a295-47e7cbf774a4/Screenshot_2020-11-10_at_17.19.53.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b5e9a986-2c9d-4683-a295-47e7cbf774a4/Screenshot_2020-11-10_at_17.19.53.png)

shops.js has the same features as the well known platform "shopify" but it is specially designed for beginners. Most of the features can be enabled or disabled by simply clicking.

## Metrics? (countries, employees, users)

10,000 stores are opened per month.

It is one of the major e-commerce services in Japan.

10 frontend developers

Japan

## How did you discover Nuxt?

We considered what is the best stack for us by researching articles and meetup sessions which are written and spoken in Japanese and that is how we found Nuxt. We considered all other choices like React, Angular JS, Angular 2 and Vue.js. For us it is very important to have the documentation in Japanese language as English is difficult especially for beginners.

## Why did you choose Nuxt as your frontend framework?

When we started we were just one frontend developer and one designer and sometimes the designer needed to edit HTML so in that case Vue.js single file components are the best. Contrary to React, Nuxt is easy to understand even for designers. At the time Nuxt was the only framework based on Vue.js

The old version of [stores.jp](http://stores.jp) was made in Anguar JS. As our site grew bigger, our team of developers grew too. We needed to unify our codebase. When we want to add the logic we don't want to discuss if it should be an angular service or a factory so that is why we thought we need a framework instead of a library and that is why we chose Nuxt instead of just using Vue.js.

## Are you using dynamic or static rendering? Why?

The frontend of the store and then a dashboard with server rendering pages. The storefront is still in Angular JS but we want to migrate to Nuxt in the future. The dashboard was also made with Angular JS but we are currently working on replacing it with Nuxt. At the moment 20% of it is working on Nuxt using client side rending. Server side rendering, dynamic rendering is good for performance. Nuxt has a great option to switch between client side and server side rendering. The Angular JS dashboard was originally setup to work as an SPA so we can't change the architecture of this and we want to focus only on replacing the library which is why currently the dashboard is working with client side rendering.

Then we have the main website which is built with Nuxt using SSR and target static. We choose static site generation because SEO is very important for those kind of pages and they don't have any dynamic content

## What is your favorite feature?

We have 3 favourite features. The first is the plugins. This is our favourite feature. The mechanism which injects this into the context, it totally makes sense for Vue.js and is easy to use which is why we like the plugin architecture. The next is page components, generating page routing based on page component directory structure as it is so easy to understand. The last one is the mode, compared to other frameworks I think that Nuxt is an all in one framework. In React we needed to choose a framework based on the architecture, which means if we want to use an SPA we needed to use create-react-app and if we want server side rendering Next.js is better and if we want to use Static Site Generation then Next.js or Gatsby is better. On the other hand if you use Vue.js all you have to do is choose Nuxt as you can switch the architecture later. This is why the mode is my favourite option.

## Do you have performances benchmarks before & after using Nuxt?

We haven't had any performance benchmarks yet because of our priority. It has been 8 years since we created [stores.jp](http://stores.jp) and now we are working hard at upgrading it to Nuxt so we don't have any time to look at performance margins. But we are interested in performance so sometimes if our service is slow we will check the lighthouse and try to modify our code. But currently we don't look at any metrics for performance.

## Would you recommend Nuxt?

Yes of course we would especially for a startup companies. As I mentioned earlier the fact you can change the strategy later to have client side rendering or server side rendering or static site generation based on the business requirements. That is why Nuxt is good for startups. And also for Japanese companies the fact that the Nuxt documentation is in Japanese is a big advantage. If there is no Japanese documentation it would be an obstacle for them to get started which is the case of Next.js
