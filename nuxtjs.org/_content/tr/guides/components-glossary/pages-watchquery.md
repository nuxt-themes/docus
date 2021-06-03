---
title: 'WatchQuery Özelliği'
description: Sorgu stringlerini seyredin ve değişiklik üzerine bileşen yöntemlerini çalıştırın (asyncData, fetch, validate, layout, ...)
menu: WatchQuery Özelliği
category: components-glossary
position: 0
---

> Sorgu stringlerini seyredin ve değişiklik üzerine bileşen yöntemlerini çalıştırın (asyncData, fetch, validate, layout, ...)

- **Tip:** `Boolean` veya `Array` veya `Function` (varsayılan: `[]`)

Sorgu stringlerine bir seyredici ayarlamak için `watchQuery` anahtarını kullanın. Eğer tanımlanan stringler değişirse, tüm bileşen yöntemleri (asyncData, fetch(context), validate, layout, ...) çağrılacaktır. Performansı arttırmak için watching varsayılan olarak devre dışı bırakılmıştır.

Tüm sorgu stringleri için bir seyredici kurmak istiyorsanız, `watchQuery: true` olarak ayarlayın.

```js
export default {
  watchQuery: ['page']
}
```

Daha ayrıntılı seyredicilere sahip olmak için `watchQuery(newQuery, oldQuery)` fonksiyonunu da kullanabilirsiniz.

```js
export default {
  watchQuery(newQuery, oldQuery) {
    // Sadece eski sorgu stringi `bar` içeriyorsa bileşen yöntemlerini yürütün
    // ve yeni sorgu stringi `foo` içeriyorsa
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert>

**Uyarı**: 2.12'de tanıtılan yeni `fetch`, `watchQuery`'den etkilenmez. Daha fazla bilgi için bkz.[sorgu stringi değişikliklerini dinleme](/docs/2.x/features/data-fetching#the-fetch-hook).

</base-alert>
