---
title: 'Properti `transisi` halaman'
description: Nuxt.js menggunakan komponen `<transisi>` untuk memungkinkan Anda membuat dan menerapkan transisi / animasi yang menakjubkan saat Anda menavigasi di antara halaman Anda.
menu: Properti Transisi
category: components-glossary
position: 0
---

> Nuxt.js menggunakan komponen [`<transition>`] (https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) untuk memungkinkan Anda membuat transisi/animasi luar biasa di antara laman Anda.

- **Type:** `String` atau `Object` atau `Function`

Untuk menentukan transisi kustom untuk rute tertentu, cukup tambahkan kunci `transisi` ke komponen halaman.

```js
export default {
  // Bisa jadi string
  transition: ''
  // atau sebuah obyek
  transition: {}
  // atau sebuah fungsi
  transition (to, from) {}
}
```

## String

Jika kunci `transisi` diatur sebagai _string_, itu akan digunakan sebagai `transition.name`.

```js
export default {
  transition: 'test'
}
```

Nuxt.js akan menggunakan pengaturan ini untuk mengatur komponen sebagai berikut:

```html
<transition name="test"></transition>
```

## obyek

Jika kunci `transisi` diatur sebagai objek:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js akan menggunakan pengaturan ini untuk mengatur komponen sebagai berikut:

```html
<transition name="test" mode="out-in"></transition>
```

Objek `transisi` dapat memiliki properti berikut:

| kunci              | Jenis     | Default    | definisi                                                                                                                                                                                                           |
| ------------------ | --------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`             | `String`  | `"page"`   | Nama transisi diterapkan pada semua transisi rute.                                                                                                                                                                 |
| `mode`             | `String`  | `"out-in"` | Mode transisi diterapkan pada semua rute, lihat [dokumentasi Vue.js](https://vuejs.org/v2/guide/transitions.html#Transition-Modes).                                                                                |
| `css`              | `Boolean` | `true`     | Apakah akan menerapkan kelas transisi CSS. Default-nya adalah `true`. Jika diatur ke `false`, hanya akan memicu hook JavaScript yang didaftarkan melalui event komponen.                                           |
| `duration`         | `Integer` | n/a        | Durasi (dalam milidetik) yang diterapkan pada transisi, lihat [dokumentasi Vue.js](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations).                                                     |
| `type`             | `String`  | n/a        | Tentukan jenis events transisi untuk menentukan waktu akhir transisi. Nilai yang tersedia adalah `"transition"` dan `"animation"`. Secara default, otomatis akan mendeteksi jenis yang memiliki durasi lebih lama. |
| `enterClass`       | `String`  | n/a        | Status awal kelas transisi. Lihat [dokumentasi Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                     |
| `enterToClass`     | `String`  | n/a        | Status akhir untuk transisi. Lihat [dokumentasi Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                    |
| `enterActiveClass` | `String`  | n/a        | Kelas diterapkan di seluruh durasi transisi. Lihat [dokumentasi Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                    |
| `leaveClass`       | `String`  | n/a        | Status awal kelas transisi. Lihat [dokumentasi Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                     |
| `leaveToClass`     | `String`  | n/a        | Status akhir untuk transisi. Lihat [dokumentasi Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                    |
| `leaveActiveClass` | `String`  | n/a        | Kelas diterapkan di seluruh durasi transisi. Lihat [dokumentasi Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                    |

Anda juga dapat menentukan metode di properti `transition` halaman, ini untuk [JavaScript hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks):

- `beforeEnter(el)`
- `enter(el, done)`
- `afterEnter(el)`
- `enterCancelled(el)`
- `beforeLeave(el)`
- `leave(el, done)`
- `afterLeave(el)`
- `leaveCancelled(el)`

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```

_Catatan: Sebaiknya tambahkan juga secara eksplisit `css: false` untuk transisi khusus JavaScript sehingga Vue dapat melewati deteksi CSS. Ini juga mencegah aturan CSS secara tidak sengaja mengganggu transisi._

### Mode Transisi

**Mode transisi default untuk halaman berbeda dari mode default di Vue.js**. Mode `transiton` secara default disetel ke `out-in`. Jika Anda ingin meninggalkan dan memasuki transisi secara bersamaan, Anda harus mengatur ke mode string kosong `mode: ''`.

```js
export default {
  transition: {
    name: 'test',
    mode: ''
  }
}
```

## Fungsi

Jika tombol `transisi` diatur sebagai fungsi:

```js
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

Transisi diterapkan pada navigasi:

- `/` to `/posts` => `slide-left`,
- `/posts` to `/posts?page=3` => `slide-left`,
- `/posts?page=3` to `/posts?page=2` => `slide-right`.
