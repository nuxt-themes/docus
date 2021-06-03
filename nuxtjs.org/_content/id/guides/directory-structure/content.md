---
title: content
description: Berdayakan aplikasi Nuxt.js Anda dengan modul `@nuxt/content` tempat Anda dapat menulis di direktori `content/` dan mengambil berkas Markdown, JSON, YAML, dan CSV melalui API mirip MongoDB, yang bertindak sebagai **Git-based Headless CMS**.
position: 4
category: directory-structure
img: /docs/2.x/nuxt-content.svg
imgAlt: nuxt content module
questions:
  - question: Apa nama direktori default dari direktori tempat Anda menambahkan berkas markdown?
    answers:
      - markdown
      - content
      - pages
    correctAnswer: content
  - question: Komponen apa yang Anda gunakan dalam template Anda untuk menampilkan badan halaman markdown?
    answers:
      - <markdown>
      - <nuxt>
      - <nuxt-content>
    correctAnswer: <nuxt-content>
  - question: Kelas apa yang ditambahkan secara otomatis sehingga Anda dapat mengatur gaya markdown Anda?
    answers:
      - .content
      - .nuxt-content
      - .markdown
    correctAnswer: .nuxt-content
  - question: Modul konten dapat menangani berkas markdown, csv, yaml dan json
    answers:
      - true
      - false
    correctAnswer: true
  - question: Manakah yang Anda gunakan untuk mendaftar, memfilter, dan mencari konten Anda?
    answers:
      - $nuxt-content()
      - $content()
      - $nuxt()
    correctAnswer: $content()
  - question: Apa yang Anda gunakan untuk mendapatkan artikel sebelumnya dan berikutnya?
    answers:
      - .surround(slug)
      - .prev-next(slug)
      - .slug()
    correctAnswer: .surround(slug)
  - question: Kelas PrismJS diterapkan ke blok kode secara default?
    answers:
      - true
      - false
    correctAnswer: true
  - question: Apa URL default yang Anda gunakan untuk mengakses API untuk melihat JSON Anda?
    answers:
      - http://localhost:3000/content
      - http://localhost:3000/_content
      - http://localhost:3000/api
    correctAnswer: http://localhost:3000/_content
  - question: Tag judul mana yang digunakan untuk membuat daftar isi
    answers:
      - h1 dan h2
      - h2 dan h3
      - h1 dan h2 dan h3
    correctAnswer: h2 dan h3
  - question: Anda dapat menggunakan modul konten dengan pembuatan situs statis
    answers:
      - true
      - false
    correctAnswer: true
---

Berdayakan aplikasi Nuxt.js Anda dengan modul `@nuxt/content` tempat Anda dapat menulis di direktori `content/` dan mengambil berkas _Markdown_, _JSON_, _YAML_, dan _CSV_ melalui _API_ mirip MongoDB, yang bertindak sebagai **Git-based Headless CMS**.

<app-modal :src="img" :alt="imgAlt"></app-modal>

### Hot reload in development

Modul content sangat cepat dalam hal hot reload dalam pengembangan karena tidak harus melalui webpack saat Anda membuat perubahan pada berkas _markdown_ Anda. Anda juga dapat mendengarkan peristiwa `content:update` dan membuat plugin sehingga setiap kali Anda mengupdate berkas di direktori content Anda, metode fetchCategories sebagai contoh.

<base-alert type="next">

[Lihat dokumen modul konten untuk lebih jelasnya](https://content.nuxtjs.org/advanced#handling-hot-reload)

</base-alert>

### Displaying content

Anda dapat menggunakan komponen `<nuxt-content>` langsung di template Anda untuk menampilkan badan halaman.

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>
```

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/displaying#component) untuk mengetahui detail selengkapnya

</base-alert>

### Styling your content

Bergantung pada apa yang Anda gunakan untuk mendesain aplikasi, Anda mungkin perlu menulis beberapa gaya untuk menampilkan _markdown_ dengan benar.

Komponen `<nuxt-content>` akan secara otomatis menambahkan kelas `.nuxt-content`, Anda dapat menggunakannya untuk menyesuaikan gaya Anda.

```html
<style>
  .nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
  }
  .nuxt-content p {
    margin-bottom: 20px;
  }
</style>
```

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/displaying#style) untuk mengetahui detail selengkapnya

</base-alert>

### Handles Markdown, CSV, YAML, JSON(5)

Modul ini mengonversi berkas .md Anda menjadi struktur pohon _JSON AST_, disimpan dalam variabel body. Anda juga dapat menambahkan blok materi depan _YAML_ ke berkas _markdown_ atau berkas .yaml yang akan dimasukkan ke dalam dokumen. Anda juga dapat menambahkan berkas _json/json5_ yang juga dapat dimasukkan ke dalam dokumen. Dan Anda dapat menggunakan berkas .csv di mana baris akan ditetapkan ke variabel body.

```md
---
title: My first Blog Post
description: Learning how to use @nuxt/content to create a blog
---
```

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/writing#markdown) untuk mengetahui detail selengkapnya

</base-alert>

### Vue components in Markdown

Anda dapat menggunakan komponen Vue langsung di berkas _markdown_ Anda. Namun Anda perlu menggunakan komponen Anda sebagai _kebab case_ dan tidak dapat menggunakan tag penutup sendiri.

```html{}[components/global/InfoBox.vue]
<template>
  <div class="bg-blue-500 text-white p-4 mb-4">
    <p><slot name="info-box">default</slot></p>
  </div>
</template>
```

```html{}[content/articles/my-first-blog-post.md]
<info-box>
  <template #info-box>
    This is a vue component inside markdown using slots
  </template>
</info-box>
```

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/writing#vue-components) untuk mengetahui detail selengkapnya

</base-alert>

### Fully Searchable API

Anda dapat menggunakan `$content()` untuk membuat daftar, memfilter, dan mencari konten Anda dengan mudah.

```html{}[pages/blog/index.vue]
<script>
  export default {
    async asyncData({ $content, params }) {
      const articles = await $content('articles', params.slug)
        .only(['title', 'description', 'img', 'slug', 'author'])
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        articles
      }
    }
  }
</script>
```

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/fetching#methods) untuk mengetahui detail selengkapnya

</base-alert>

### Previous and Next articles

Modul _content_ menyertakan `.surround(slug)` sehingga Anda mendapatkan artikel sebelumnya dan berikutnya dengan mudah.

```js
async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next
    }
  },
```

```html
<prev-next :prev="prev" :next="next" />
```

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/fetching#surroundslug-options) untuk mengetahui detail selengkapnya

</base-alert>

### Full-text search

Modul _content_ hadir dengan pencarian teks lengkap sehingga Anda dapat dengan mudah mencari di seluruh berkas _markdown_ Anda tanpa harus menginstal apa pun.

```html{}[components/AppSearchInput.vue]
<script>
  export default {
    data() {
      return {
        searchQuery: '',
        articles: []
      }
    },
    watch: {
      async searchQuery(searchQuery) {
        if (!searchQuery) {
          this.articles = []
          return
        }
        this.articles = await this.$content('articles')
          .limit(6)
          .search(searchQuery)
          .fetch()
      }
    }
  }
</script>
```

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/fetching#searchfield-value) untuk mengetahui detail selengkapnya

</base-alert>

### Syntax highlighting

Modul ini secara otomatis menggabungkan blok kode dan menerapkan kelas [PrismJS](https://prismjs.com/). Anda juga dapat menambahkan tema PrismJS yang berbeda atau menonaktifkannya sama sekali.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add prism-themes
```

  </code-block>
  <code-block label="npm">

```bash
npm install prism-themes
```

  </code-block>
</code-group>

```js{}[nuxt.config.js]
content: {
  markdown: {
    prism: {
      theme: 'prism-themes/themes/prism-material-oceanic.css'
    }
  }
}
```

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/writing#syntax-highlighting) untuk mengetahui detail selengkapnya

</base-alert>

### Extend Markdown Parsing

Awalnya markdown tidak mendukung penyorotan baris di dalam blok kode atau nama berkas. Modul konten memungkinkannya dengan sintaks kustomnya sendiri. Nomor baris ditambahkan ke tag `pre` dalam atribut baris data dan nama berkas akan diubah menjadi `span` dengan kelas `namafile`, sehingga Anda dapat mengatur gayanya.

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/writing#codeblocks) untuk mengetahui detail selengkapnya

</base-alert>

### Table of contents generation

Properti larik toc (Daftar Isi) akan dimasukkan ke dalam dokumen Anda, mencantumkan semua judul dengan judul dan idnya, sehingga Anda dapat menautkannya.

```html{}[pages/blog/_slug.vue]
<nav>
  <ul>
    <li v-for="link of article.toc" :key="link.id">
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</nav>
```

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/writing#table-of-contents) untuk mengetahui detail selengkapnya

</base-alert>

### Powerful QueryBuilder API (MongoDB like)

Modul konten dilengkapi dengan _QueryBuilder API_ yang mirip dengan MongoDB yang memungkinkan Anda untuk dengan mudah melihat _JSON_ dari setiap direktori di `http://localhost:3000/_content/`. _Endpoint_ dapat diakses pada permintaan _GET_ dan _POST_, sehingga Anda dapat menggunakan parameter kueri.

`http://localhost:3000/_content/articles?only=title&only=description&limit=10`

<base-alert type="next">

Lihat [content module docs](https://content.nuxtjs.org/advanced/#api-endpoint) untuk mengetahui detail selengkapnya

</base-alert>

### Extend with hooks

Anda dapat menggunakan _hooks_ untuk memperluas modul sehingga Anda dapat menambahkan data ke dokumen sebelum disimpan.

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/advanced#hooks) untuk mengetahui detail selengkapnya

</base-alert>

### Integration with @nuxtjs/feed

Untuk artikel, konten dapat digunakan untuk membuat _feed_ berita menggunakan modul [@nuxtjs/feed](https://www.npmjs.com/package/@nuxtjs/feed).

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/integrations/#nuxtjsfeed) untuk mengetahui detail selengkapnya

</base-alert>

### Support static site generation

Modul _content_ bekerja dengan pembuatan situs statis menggunakan `nuxt generate`. Semua rute akan dibuat secara otomatis berkat fitur _crawler_ nuxt.

<base-alert>

Jika menggunakan Nuxt <2.13 dan Anda perlu menentukan rute dinamis, Anda dapat melakukannya menggunakan properti generate dan menggunakan @nuxt/content secara terprogram.

</base-alert>

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/advanced#programmatic-usage) untuk mengetahui detail selengkapnya tentang penggunaan terprogram

</base-alert>

### What's next

<base-alert type="next">

Lihat tutorial kami tentang [Cara Membuat Blog dengan Konten Nuxt](/blog/create-blog-with-nuxt-content)

</base-alert>

<base-alert type="next">

Lihat [dokumen modul konten](https://content.nuxtjs.org/) untuk penggunaan dan contoh lebih lanjut

</base-alert>

<quiz :questions="questions"></quiz>
