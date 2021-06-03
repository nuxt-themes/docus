---
title: 'API: Kelas Generator'
description: Kelas Generator
menu: Generator
category: internals
position: 306
---

# Kelas Generator

- Sumber: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## Plugin yang dapat ditukar (Tapable plugins)

Kita bisa mendaftarkan kait (hooks) pada peristiwa siklus hidup (life cycle) tertentu.

```js
nuxt.plugin('generator', generator => {
    generator.plugin('generate', ({routes}) => {
        // ...
    }))
})
```

| Plugin           | Argumen                     | Keterangan                                                                                                   |
| ---------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `generateRoutes` | {generator, generateRoutes} | Setelah menyelesaikan rute untuk menghasilkan (generate), maka kita memiliki perubahan untuk menyesuaikannya |
| `generate`       | {generator, routes}         | Tepat sebelum mulai menghasilkan rute. Rute didekorasi dengan payload                                        |
