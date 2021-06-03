---
title: 'Properti ssr'
description: Mengubah nilai dari ssr milik Nuxt.js
menu: ssr
category: configuration-glossary
position: 28.1
---

- Tipe data: `boolean`
- Nilai asali: `true`
- Nilai yang diizinkan:
  - `true`: Mengaktifkan _server-side rendering_
  - `false`: Menonaktifkan _server-side rendering_ (Nuxt hanya akan menyediakan _client-side rendering_)

> Anda dapat menyetel opsi ini ke `false` ketika Anda **hanya menginginkan _client-side rendering_**.

```js{}[nuxt.config.js]
export default {
  ssr: false // Menonaktifkan server-side rendering
}
```

<base-alert type="next">

Sebelumnya, opsi `mode` digunakan untuk menonaktifkan atau mengaktifkan _server-side rendering_. Berikut merupakan [dokumentasi dari `mode`](/docs/2.x/configuration-glossary/configuration-mode).

</base-alert>
