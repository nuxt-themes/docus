---
title: 'Fetch Yöntemi'
description: fetch yöntemi verileri asenkron bir şekilde getirmek için kullanılır. Yol oluşturulurken sunucu tarafında ve gezinme sırasında istemci tarafında çağırılır.
menu: Fetch Yöntemi
category: components-glossary
position: 0
---

## Nuxt >= 2.12

Nuxt.js `v2.12`, **Vue bileşenlerinizden herhangi birinde** kullanabileceğiniz `fetch` isimli yeni bir yöntem sunar. Her **eşzamansız** veri almanız gerektiğinde fetch kullanın. `fetch` yol oluşturulurken sunucu tarafında ve gezinme sırasında istemci tarafında çağırılır.

Bileşen seviyesinde `$fetchState`'i gösterir:

- `$fetchState.pending`: `Boolean`, istemci tarafında `fetch` çağrılırken bir yer tutucu görüntülemenizi sağlar.
- `$fetchState.error`: `null` veya `Error`, bir hata mesajı görüntülemenizi sağlar.
- `$fetchState.timestamp`: `Integer`, en son fetch'in zaman bilgisidir, `keep-alive` ile önbelleğe almak için kullanışlıdır

Şablonunuzdan `fetch` yöntemini çağırmak istiyorsanız:

```html
<button @click="$fetch">Yenile</button>
```

veya bileşen yöntemi:

```javascript
// kod kısmındaki bileşen yöntemlerinden
export default {
  methods: {
    refresh() {
      this.$fetch()
    }
  }
}
```

`this.$nuxt.context` kullanarak fetch yöntemi içerisindeki Nuxt [context](/docs/2.x/internals-glossary/context)'a erişebilirsiniz.

### Seçenekler

- `fetchOnServer`: `Boolean` veya `Function` (default: `true`), sayfayı sunucu oluştururken `fetch()` çağırın
- `fetchDelay`: `Integer` (default: `200`), minimum çalıştırma süresini milisaniye olarak ayarlayın (hızlı yanıp sönmeleri önlemek için)

`fetchOnServer` yanlış değerinde olduğu zaman (`false` veya `false` döndürür), `fetch` yalnızca istemci tarafında çağrılır ve `$fetchState.pending` bileşen sunucu tarafında oluşturulduğu zaman `true` değerini döndürür.

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get('https://api.nuxtjs.dev/posts')
    },
    fetchOnServer: false
  }
</script>
```
