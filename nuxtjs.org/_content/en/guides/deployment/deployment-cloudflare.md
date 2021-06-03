---
title: Deploy Nuxt on Cloudflare
description: What needs to be considered when using Nuxt with Cloudflare
menu: Cloudflare
category: deployment
position: 118
---

In most cases, Nuxt can work with third party content that is not generated or created by Nuxt itself. But sometimes such content can cause problems, especially Cloudflare's "Minification and Security Options".

Accordingly, you should make sure that the following options are unchecked / disabled in Cloudflare. Otherwise, unnecessary re-rendering or hydration errors could impact your production application.

1. Speed > Optimization > Auto Minify: **Uncheck** JavaScript, CSS and HTML
2. Speed > Optimization > **Disable** "Rocket Loader™"
3. Speed > Optimization > **Disable** "Mirage"
4. Scrape Shield > **Disable** "Email Address Obfuscation"
5. Scrape Shield > **Disable** "Server-side Excludes"

With these settings, you can be sure that Cloudflare won't inject scripts into your Nuxt application that may cause unwanted side effects.
