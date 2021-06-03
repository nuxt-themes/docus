---
title: 'Properti modern'
description: Bangun dan sajikan kode dengan sintaks modern
menu: modern
category: configuration-glossary
position: 18
---

> Fitur ini terinspirasi dari [mode modern dari vue-cli](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode)

- Tipe Data: `String` atau `Boolean`
  - Nilai anggapan: `false`
  - Nilai yang mungkin:
    - `'client'`: Sajikan kode dengan sintaks modern melalui perintah `<script type="module">` dan kode dengan sintaks lama melalui perintah `<script nomodule>`, juga menambahkan tag `<link rel="modulepreload">` untuk menyajikan kode dengan sintaks modern. Setiap peramban yang memahami tipe `module` akan menyajikan kode dengan sintaks modern sedangkan peramban lama akan menyajikan kode dengan sintaks lama.
    - `'server'` atau `true`: Peladen Node.js akan memeriksa versi peramban berdasarkan nilai `User-Agent` dan menyajikan kode dengan sintaks yang sesuai.
    - `false`: Menonaktifkan pembangunan kode dengan sintaks modern.

Dua versi kode yang dihasilkan antara lain:

1. Kode modern: kode yang disajikan untuk peramban yang mendukung modul ES.
2. Kode _legacy_: kode yang disajikan untuk peramban lama berdasarkan konfigurasi babel (kompatibel dengan IE 9)

**Informasi:**

- Gunakan perintah opsi `[--modern | -m]=[mode]` untuk membangun atau memulai pembangunan kode dengan sintaks modern:

```json{}[package.json]
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

**Catatan mengenai _nuxt generate_:** Properti `modern` juga dapat digunakan pada perintah `nuxt generate`, namun kasus tersebut hanya didukung apabila opsi bernilai `client` dan nilai tersebut akan dipilih secara otomatis ketika menjalankan perintah `nuxt generate --modern` tanpa memberikan nilai apapun.

- Nuxt akan mendeteksi kode `modern` secara otomatis pada perintah `nuxt start` ketika opsi `modern` tidak diberikan, mode yang terdeteksi secara otomatis adalah:

| ssr   | Mode Modern |
| ----- | :---------: |
| true  |   server    |
| false |   client    |

- Perintah `nuxt generate` hanya mendukung mode modern dengan nilai `client`.
- Gunakan opsi [`render.crossorigin`](/docs/2.x/configuration-glossary/configuration-render#crossorigin) untuk menyetel atribut `crossorigin` pada `<link>` dan `<script>`

> Anda dapat membaca [artikel buatan Phillip Walton](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) untuk informasi lebih lanjut tentang kode dengan sintaks modern.
