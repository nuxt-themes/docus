---
title: Deploy Nuxt with Moovweb XDN
description: How to deploy Nuxt.js app with Moovweb XDN?
menu: Moovweb XDN
target: Server
category: deployment
position: 110
---

Moovweb XDN supports universal (SSR) Nuxt.js applications.

The [Moovweb XDN](https://www.moovweb.com/) is an all-in-one platform to develop, deploy, preview, experiment on, monitor, and run your headless frontend. The XDN is focused on large, dynamic websites and best-in-class performance through an integrated Content Delivery Network (CDN), CDN-as-JavaScript, predictive prefetching, and performance monitoring. Moovweb offers a free tier.

For detailed instructions consult the [Moovweb XDN Nuxt.js documentation](https://developer.moovweb.com/guides/nuxt).

## Getting Started

1. Sign up for a free account on the [XDN signup page](https://moovweb.app/signup).

2. Install the XDN CLI

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -g @xdn/cli
```

  </code-block>
  <code-block label="npm">

```bash
npm i -g @xdn/cli
```

  </code-block>

</code-group>

## Configure your project

3. Make sure [server side rendering is enabled](/docs/configuration-glossary/configuration-ssr) and in your `nuxt.config.js` add the `@xdn/nuxt` module:

```js
// nuxt.config.js

module.exports = {
  modules: ['@xdn/nuxt/module']
}
```

4. Run `xdn init` which will configure your project for the XDN.

## Running and deploying your project

5. To test your app locally, run the following in your project directory:

```js
xdn run
```

6. To deploy your app, run the following in your project directory:

```js
xdn deploy
```

## Optimize your project's performance

- (Optional) To optimize the performance of server side rendering in Nuxt.js, Moovweb recommends moving most your modules into `buildModules` as described in the [modules vs buildModules section](https://developer.moovweb.com/guides/nuxt#section_modules_vs_buildmodules) of the XDN Nuxt.js guide.
- (Optional) The XDN automatically supports Nuxt.js's built-in routing scheme. However you can and should optimize the performance by customizing the routing, caching, and prefetching via CDN-as-JavaScript as shown in the [Routing section](https://developer.moovweb.com/guides/nuxt#section_routing) of the XDN Nuxt.js guide.

## Get help

If you have issues please check the [Troubleshooting section](https://developer.moovweb.com/guides/nuxt#section_troubleshooting) of the guide or create a ticket in the [forums](https://forum.moovweb.com/).
