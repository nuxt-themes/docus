---
title: 'API: The <nuxt-child> Component'
description: Menampilkan halaman saat ini.
menu: nuxt-child
category: components
position: 42
---

# Komponen &lt;nuxt-child&gt;

> Komponen ini digunakan untuk menampilkan "children" komponen pada [rute bersarang](/guide/routing#nested-routes).

Contoh:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

File tree di atas akan menghasilkan rute sebagai berikut:

```js
;[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Untuk menampilkan komponen `child.vue`, kita harus memasukkan `<nuxt-child/>` di dalam `pages/parent.vue`:

```html
<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child />
  </div>
</template>
```

Untuk melihat contoh, silakan lihat [contoh rute-bersarang](/examples/nested-routes).
