---
title: 'La propiedad mode'
description: Cambia el modo por defecto de nuxt
menu: mode
category: configuration-glossary
position: 17
---

- Tipo: `string`
  - Por defecto: `universal`
  - Posibles valores:
    - `'spa'`: No hay renderizado del lado del servidor (sólo navegación del lado del cliente)
    - `'universal'`: Aplicación isomórfica (renderizado del lado del servidor + navegación del lado del cliente)

> Puedes utilizar esta opción para cambiar el modo de nuxt por defecto de tu proyecto usando `nuxt.config.js`

<base-alert type="warning">

Obsoleta: por favor, utiliza `ssr: false` en lugar de `mode: spa`

</base-alert>

<base-alert type="next">

Para aprender más sobre la opción `ssr`, échale un vistazo a la [sección propiedad ssr](/docs/2.x/configuration-glossary/configuration-ssr).

</base-alert>

<base-alert type="next">

Para aprender más sobre la opción `mode`, échale un vistazo a la [sección modos de renderizado](/docs/2.x/features/rendering-modes).

</base-alert>
