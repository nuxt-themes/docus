---
title: 'Properti telemetry'
description: 'Nuxt.js mengumpulkan data-data telemetri secara anonim mengenai penggunaan Nuxt.js secara umum. Hal tersebut membantu kami untuk mengukur penggunaan fitur dan kustomisasi dalam Nuxt.js secara akurat pada seluruh pengguna Nuxt.js.'
menu: telemetry
category: configuration-glossary
position: 30
---

## Properti telemetry

> Nuxt versi 2.13.0 memperkenalkan _Nuxt Telemetry_ untuk mengumpulkan data-data telemetri secara anonim mengenai penggunaan Nuxt.js secara umum. Hal tersebut membantu kami untuk mengukur penggunaan fitur dan kustomisasi dalam Nuxt.js secara akurat pada seluruh pengguna Nuxt.js.

- Tipe: `Boolean`
- Anggapan akan dibuat berdasarkan preferensi Anda.

## Mengapa mengumpulkan telemetri

Nuxt.js telah berkembang pesat sejak [rilis pertama](https://github.com/nuxt/nuxt.js/releases/tag/v0.2.0) (7 November 2016) dan kami tetap mendengarkan [umpan balik komunitas](https://github.com/nuxt/nuxt.js/issues) untuk meningkatkan kualitas Nuxt.js.

Namun, proses manual tersebut hanya mengumpulkan umpan balik dari sebagian pengguna yang mau meluangkan waktu mereka untuk mengisi kerangka isu dan mereka mungkin saja memiliki kebutuhan yang berbeda dengan Anda.

_Nuxt Telemetry_ mengumpulkan **data telemetri secara anonim mengenai penggunaan Nuxt.js secara umum**. Hal tersebut membantu kami untuk mengukur penggunaan fitur dan kustomisasi pada seluruh pengguna Nuxt.js. Data ini akan membuat kami lebih memahami bagaimana cara Nuxt.js digunakan secara global, mengukur efektivitas peningkatan yang dibuat (DX dan performa) dan relevansi peningkatan tersebut.

Kami mengumpulkan beberapa kejadian:

- Perintah yang dijalankan (`nuxt dev`, `nuxt build`, dan lain sebagainya)
- Versi Nuxt.js dan Node.js yang digunakan.
- Informasi umum mengenai komputer yang digunakan (MacOS/Linux/Windows dan bila perintah dijalankan melalui sebuah layanan integrasi berkelanjutan, nama layanan tersebut juga akan kami kumpulkan)
- Lama pengerjaan pembangunan aplikasi oleh Webpack dan ukuran rata-rata dari aplikasi, juga keadaan saat kode program dibuat (ketika menggunakan `nuxt generate`)
- Paket publik apa saja yang Anda butuhkan dalam proyek Anda (modul Nuxt).

Kode telemetri bersumber terbuka dan tersedia di: https://github.com/nuxt/telemetry.

## Menonaktifkan fitur telemetri

Anda dapat menonaktifkan fitur [Nuxt Telemetry](https://github.com/nuxt/telemetry) pada proyek anda melalui beberapa cara:

1. Menggunakan `npx nuxt telemetry disable`

```bash
npx nuxt telemetry [status|enable|disable] [-g,--global] [dir]
```

2. Menggunakan sebuah variabel lingkungan

```bash
NUXT_TELEMETRY_DISABLED=1
```

3. Menyetel `telemetry: false` pada `nuxt.config.js` Anda:

```js{}[nuxt.config.js]
export default {
  telemetry: false
}
```

Anda dapat mempelajari lebih lanjut mengenai _Nuxt Telemetry_ dan kejadian yang dikirmkan pada https://github.com/nuxt/telemetry
