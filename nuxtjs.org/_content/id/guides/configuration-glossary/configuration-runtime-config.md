---
title: 'Properti RuntimeConfig'
description: RuntimeConfig memperbolehkan Anda untuk meneruskan konfigurasi dan variabel lingkungan yang dinamis pada konteks Nuxt
menu: runtimeConfig
category: configuration-glossary
position: 25
---

Konfigurasi _runtime_ memperbolehkan Anda untuk meneruskan konfigurasi dan variabel lingkungan pada konteks Nuxt. Anda dapat membaca [panduan konfigurasi runtime](/docs/2.x/directory-structure/nuxt-config#runtimeconfig) untuk mengetahui informasi lebih lanjut mengenai penggunaan konfigurasi _runtime_.

## `publicRuntimeConfig`

- Tipe data: `Object`

Nilai dari objek ini **dapat diakses oleh klien dan peladen** melalui `$config`.

## `privateRuntimeConfig`

- Tipe data: `Object`

Nilai dari objek ini **hanya dapat diakses oleh peladen** melalui `$config`. Nilai dari objek ini akan mengganti nilai `publicRuntimeConfig` untuk peladen.
