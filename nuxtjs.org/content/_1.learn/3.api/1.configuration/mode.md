---
title: 'The mode Property'
description: Change default nuxt mode
category: api-configuration
---

- Type: `string`
  - Default: `universal`
  - Possible values:
    - `'spa'`: No server-side rendering (only client-side navigation)
    - `'universal'`: Isomorphic application (server-side rendering + client-side navigation)

> You can use this option to change default nuxt mode for your project using `nuxt.config.js`

<alert type="warning">

Deprecated: please use `ssr: false` instead of `mode: spa`

</alert>

<alert type="next">

To learn more about the `ssr` option, checkout the [ssr property](/docs/2.x/configuration-glossary/configuration-ssr).

</alert>

<alert type="next">

To learn more about the `mode` option, checkout the [rendering modes section](/docs/2.x/features/rendering-modes).

</alert>
