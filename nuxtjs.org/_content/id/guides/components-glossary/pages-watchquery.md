---
title: 'Properti watchQuery'
description: Perhatikan kueri string dan jalankan metode komponen pada perubahan (asyncData, fetch, validate, layout, ...)
menu: Properti watchQuery
category: components-glossary
position: 0
---

> Perhatikan kueri string dan jalankan metode komponen saat ada perubahan (asyncData, fetch(context), validate, layout, ...)

- **Jenis:** `Boolean` atau `Array` atau `Function` (default: `[]`)

Gunakan kata kunci `watchQuery` untuk menyiapkan pengamat untuk kueri string. Jika string yang ditentukan berubah, semua metode komponen (asyncData, fetch (konteks), validate, layout, ...) akan dipanggil. Pengamatan dinonaktifkan secara default untuk meningkatkan kinerja.

Jika Anda ingin menyiapkan pengamat untuk semua kueri string, Tentukan `watchQuery: true`.

```js
export default {
  watchQuery: ['page']
}
```

Anda juga dapat menggunakan fungsi tersebut `watchQuery(newQuery, oldQuery)` untuk memiliki pengamat yang lebih baik.

```js
export default {
  watchQuery(newQuery, oldQuery) {
    // Hanya jalankan metode komponen jika string kueri lama berisi `bar`
    // dan string kueri baru berisi `foo`
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert>

**Peringatan**: Hook `fetch` baru yang diperkenalkan di 2.12 tidak terpengaruh oleh `watchQuery`. Untuk informasi lebih lanjut, lihat [menjadi perubahan kueri fetch hook](/docs/2.x/features/data-fetching#the-fetch-hook).

</base-alert>
