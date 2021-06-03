---
title: 'Validate Yöntemi'
description: Nuxt.js, dinamik rota bileşeninizin içinde bir doğrulayıcı yöntemi tanımlamanıza olanak tanır.
menu: Validate Yöntemi
category: components-glossary
position: 0
---

> Nuxt.js, dinamik rota bileşeninizin içinde bir doğrulayıcı yöntemi tanımlamanıza olanak tanır.

- **Type:** `Function` veya `Async Function`

Yeni bir rotaya yönlenmeden önce her zaman `validate` çağrılır. Tek seferlik sunucu tarafı (Nuxt uygulamasına ilk istekte) ve daha sonraki rotalara giderken istemci tarafı olarak adlandırılacaktır. Bu yöntem [`context`](/docs/2.x/internals-glossary/context) objesini değişken olarak alır.

```js
validate({ params, query, store }) {
  return true // eğer parametreler geçerliyse
  return false // rotayı oluşturmak ve hata sayfasını görüntülemek için Nuxt.js'i durduracaktır
}
```

```js
async validate({ params, query, store }) {
  // await operasyonları
  return true // eğer parametreler geçerliyse
  return false // rotayı oluşturmak ve hata sayfasını görüntülemek için Nuxt.js'i durduracaktır
}
```

Ayrıca promiseları da döndürebilirsiniz:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

Nuxt.js, dinamik rota bileşeninizin içinde bir doğrulayıcı yöntemi tanımlamanıza izin verir (Bu örnekte: `pages/users/_id.vue`)

Doğrulama yöntemi `true` döndürmezse, Nuxt.js otomatik olarak 404 hata sayfasını yükleyecektir.

```js
export default {
  validate({ params }) {
    // Bir sayı olmalı
    return /^\d+$/.test(params.id)
  }
}
```

Ayrıca [store](/docs/2.x/directory-structure/store)'daki bazı verileri kontrol edebilirsiniz, örneğin ([`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action) aksiyondan önce)

```js
export default {
  validate({ params, store }) {
    // `params.id` nin var olan bir kategori olup olmadığını kontrol edin
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

Doğrulama fonksiyonunun çalışması esnasında beklenen veya beklenmeyen hataları gösterebilirsiniz:

```js
export default {
  async validate({ params, store }) {
    // Özel mesajla birlikte 500 dahili sunucu hatasını verir
    throw new Error('Under Construction!')
  }
}
```
