---
title: Deploy Nuxt on Layer0
description: How to deploy Nuxt.js app on Layer0?
menu: Layer0
target: Server
category: deployment
position: 110
---

Layer0 supports universal (SSR) Nuxt.js applications.

[Layer0](https://www.layer0.co) is an all-in-one platform to develop, deploy, preview, experiment on, monitor, and run your headless frontend. It is focused on large, dynamic websites and best-in-class performance through EdgeJS (a JavaScript-based Content Delivery Network), predictive prefetching, and performance monitoring. Layer0 offers a free tier.

For detailed instructions consult the [Layer0 Nuxt.js documentation](https://docs.layer0.co/guides/nuxt).

## Getting Started

1. Sign up for a free account on [Layer0's signup page](https://app.layer0.co/signup).

2. Install the [Layer0 CLI](https://docs.layer0.co/guides/cli)

<code-group>
  <code-block label="Yarn" active>

```bash
yarn global add @layer0/cli
```

  </code-block>
  <code-block label="npm">

```bash
npm i -g @layer0/cli
```

  </code-block>

</code-group>

## Configure your project

3. Make sure [server side rendering is enabled](/docs/2.x/configuration-glossary/configuration-ssr) and in your `nuxt.config.js` add the `@layer0/nuxt` module:

```js
// nuxt.config.js

module.exports = {
  modules: ['@layer0/nuxt/module']
}
```

4. Run `layer0 init` which will configure your project for Layer0.

## Running and deploying your project

5. To test your app locally, run the following in your project directory:

```js
layer0 run
```

6. To deploy your app, run the following in your project directory:

```js
layer0 deploy
```

## Optimize your project's performance

- (Optional) To optimize the performance of server side rendering in Nuxt.js, Layer0 recommends moving most your modules into `buildModules` as described in the [modules vs buildModules section](https://docs.layer0.co/guides/nuxt#section_modules_vs_buildmodules) of the Layer0 Nuxt.js guide.
- (Optional) Layer0 automatically supports Nuxt.js's built-in routing scheme. However you can and should optimize the performance by customizing the routing, caching, and prefetching via EdgeJS as shown in the [Routing section](https://docs.layer0.co/guides/nuxt#section_routing) of the Layer0 Nuxt.js guide.

## Get help

If you have issues please check the [Troubleshooting section](https://docs.layer0.co/guides/nuxt#section_troubleshooting) of the guide or create a ticket in the [forums](https://forum.layer0.co).