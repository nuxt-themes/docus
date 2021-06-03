---
title: Cara menggunakan JSX ?
description: Bagaimana cara menggunakan JSX dengan Nuxt.js?
category: configuration
position: 3
---

Nuxt.js menggunakan [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app), yang mana didasarkan _official_ dari [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) untuk konfigurasi babel secara _default_, sehingga Anda dapat menggunakan JSX di komponen.

Anda sekarang dapat menggunakan JSX dalam _method_ `render` pada komponen Anda:

```html
<script>
  export default {
    data() {
      return { name: 'World' }
    },
    render(h) {
      return <h1 class="red">{this.name}</h1>
    }
  }
</script>
```

<div class="Alert Alert--orange">

Alias `createElement` menjadi `h` adalah konvensi umum yang akan Anda lihat di ekosistem Vue, tetapi sebenarnya opsional untuk JSX karena itu [_inject_ secara otomatis](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` dalam beberapa _method_ dan pengambilan apapun (bukan _function_ atau _arrow function_) yang dideklarasikan dalam sintaks ES2015 yang memiliki JSX sehingga Anda dapat menghapus parameter (h).

</div>

Anda dapat mempelajari lebih lanjut tentang cara menggunakannya di [Bagian JSX](https://vuejs.org/v2/guide/render-function.html#JSX) dari dokumentasi Vue.js.
