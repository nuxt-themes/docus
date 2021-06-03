---
title: 'Properti server'
description: Nuxt.js memungkinkan Anda untuk menentukan variabel untuk koneksi ke peladen (server) melalui `nuxt.config.js`.
menu: server
category: configuration-glossary
position: 26
---

- Tipe Data: `Object`

> Nuxt.js memungkinkan Anda untuk menentukan variabel untuk koneksi ke peladen (_server_) melalui `nuxt.config.js`.

## Contoh Sederhana:

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000, // nilai bawaan: 3000
    host: '0.0.0.0', // nilai bawaan: localhost,
    timing: false
  }
}
```

Hal ini memungkinan Anda untuk menentukan [_host_ dan _port_](/docs/2.x/features/configuration#edit-host-and-port) _instance_ peladen (_server_) Nuxt.js Anda.

## Contoh Menggunakan Konfigurasi HTTPS

```js{}[nuxt.config.js]
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

Anda dapat menemukan informasi lebih lanjut terkait pemembuatan _key_ dan sertifikat server di `localhost` pada [sertifikat untuk localhost](https://letsencrypt.org/docs/certificates-for-localhost/)

## Contoh Menggunakan Konfigurasi Sockets

```js{}[nuxt.config.js]
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```

## timing

- Tipe data: `Object` atau `Boolean`
- Nilai bawaan: `false`

Dengan mengaktifkan properti `server.timing`, Nuxt.js akan membuat _middleware_ yang bertugas mengukur berapa lama waktu yang diperlukan untuk melakukan _server-side rendering_. _Middleware_ ini kemudian akan mencantumkan hasil pengukurannya ke _headers_ respon peladen (_server_) Anda pada _key_ `Server-Timing`.

### Contoh Menggunakan Konfigurasi timing

`server.timing` dapat berupa objek yang berisi properti-properti yang bertindak sebagai opsi pengukuran. Saat ini, Nuxt.js hanya mendukung properti `total` sebagai opsi (dengan mengaktifkan properti ini, Nuxt.js secara langsung memantau keseluruhan waktu yang dihabiskan pada proses _server-side rendering_).

```js{}[nuxt.config.js]
export default {
  server: {
    timing: {
      total: true
    }
  }
}
```

### Menggunakan API timing

API `timing` juga akan dicantumkan di `response` di sisi peladen (_server_) jika `server.time` diaktifkan.

#### Sintaks

```js
res.timing.start(name, description)
res.timing.end(name)
```

#### Contoh Menggunakan timing di serverMiddleware

```js
export default function (req, res, next) {
  res.timing.start('midd', 'Deskripsi timing middleware')
  // operasi di sisi server
  // ...
  res.timing.end('midd')
  next()
}
```

Lalu _head_ `Server-Timing` akan secara otomatis dibuat di dalam _header_ respon server:

```bash
Server-Timing: midd;desc="Deskripsi timing middleware";dur=2.4
```

Silakan merujuk pada [Server-Timing MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) untuk detail lebih lanjut.
