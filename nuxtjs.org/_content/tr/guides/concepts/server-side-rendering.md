---
title: Sunucu Tarafında Oluşturma
description: Sunucu tarafında oluşturma, bir uygulamayı web tarayıcısında görüntülemek yerine sunucuda görüntüleme yeteneğidir.
position: 3
category: concepts
questions:
  - question: Sunucu tarafında oluşturma için ne tür bir sunucuya ihtiyacınız var?
    answers:
      - PHP sunucusu
      - JavaScript sunucusu
      - Node.js sunucusu
    correctAnswer: Node.js sunucusu
  - question: Sunucuyu genişletmek ve kontrol etmek için ne kullanıyorsunuz?
    answers:
      - Middleware
      - ServerMiddleware
      - Sunucuyu kontrol etmek mümkün değil
    correctAnswer: ServerMiddleware
  - question: Sunucusuz bir sağlayıcıda sunucu tarafında oluşturulan bir uygulamayı barındırabilirsiniz
    answers:
      - true
      - false
    correctAnswer: false
  - question: Sunucu tarafındaki belgeye erişimimiz var mı?
    answers:
      - evet, her zaman mevcuttur
      - hayır, nesne tarayıcıya ait ve sunucuda mevcut değil
    correctAnswer: hayır, nesne tarayıcıya ait ve sunucuda mevcut değil
  - question: Sayfanız ne zaman etkileşimli hale geliyor?
    answers:
      - Tarayıcı, oluşturulan HTML'i sunucudan aldığında
      - Vue.js hidrasyon başladığında
      - Bir tarayıcı ilk isteği gönderdiğinde
    correctAnswer: Vue.js hidrasyon başladığında
  - question: <NuxtLink> kullanılarak sayfalar arasında gezinme yapılır
    answers:
      - İstemci tarafı
      - Sunucu tarafı
    correctAnswer: İstemci tarafı
  - question: Doğru adımlar nelerdir?
    answers:
      - tarayıcı → sunucu, sunucu → tarayıcı, tarayıcı → tarayıcı
      - sunucu → tarayıcı, tarayıcı → sunucu, sunucu → sunucu
      - tarayıcı → sunucu, sunucu → tarayıcı, tarayıcı → sunucu
    correctAnswer: tarayıcı → sunucu, sunucu → tarayıcı, tarayıcı → tarayıcı
---

Sunucu tarafında oluşturma, bir uygulamayı web tarayıcısında görüntülemek yerine sunucuda görüntüleme yeteneğidir. Sunucu tarafı, istemciye tam olarak işlenmiş bir sayfa gönderir; istemcinin JavaScript paketi devreye girer ve daha sonra Vue.js uygulamasının hidrasyonu başlar [hydrate](https://ssr.vuejs.org/guide/hydration.html).

## Node.js sunucusu gerekli

Web sayfanızı oluşturmak için bir JavaScript ortamı gereklidir.

Vue.js uygulamanızı yürütmek için bir Node.js sunucusunun yapılandırılması gerekir.

## Sunucuyu genişletin ve kontrol edin

Sunucuyu serverMiddleware ile genişletebilir ve middleware ile rotaları kontrol edebilirsiniz.

```js{}[middleware/api/logger.js]
export default function (req, res, next) {
  console.log(req.url)
  next()
}
```

```js{}[nuxt.config.js]
export default {
  serverMiddleware: ['~/middleware/api/logger']
}
```

Sunucu middleware'niz, uzantılarla eşleşen fonksiyonların listesinden oluşuyorsa:

## Sunucu ve Tarayıcı ortamları

Node.js ortamında olduğunuz için, `req` ve `res` gibi Node.js nesnelerine erişiminiz vardır. Tarayıcı ortamına ait oldukları için `window` veya `document` nesnelerine erişiminiz yoktur. Bununla birlikte, `beforeMount` veya `mounted` hooklarını kullanarak `window` veya `document` kullanabilirsiniz.

```js
beforeMount () {
  window.alert('merhaba');
}
mounted () {
  window.alert('merhaba');
}
```

## Nuxt.js ile sunucu tarafı oluşturma adımları

### Adım 1: Tarayıcıdan Sunucuya

Bir tarayıcı ilk isteği gönderdiğinde, Node.js dahili sunucusuna ulaşacaktır. Nuxt.js, HTML'i oluşturur ve çalıştırılan fonksiyonların sonuçlarıyla birlikte tarayıcıya geri gönderir, örn. `asyncData`, `nuxtServerInit` veya `fetch`. Hook fonksiyonları da gerçekleştirilir.

### Adım 2: Sunucudan Tarayıcıya

Tarayıcı, oluşturulan HTML ile sunucudan oluşturulan sayfayı alır. İçerik görüntülenir ve Vue.js hidrasyonu devreye girerek reaktif hale getirir. Bu işlem sonrasında sayfa etkileşimli hale gelir.

### Adım 3: Tarayıcıdan Tarayıcıya

[`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) ile sayfalar arasında gezinme, istemci tarafında yapılır böylece tarayıcıyı sık bir şekilde yenilemediğiniz sürece sunucuya tekrar basmazsınız.

<quiz :questions="questions"></quiz>
