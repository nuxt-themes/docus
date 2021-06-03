---
title: Görüntüleme
description: Görüntüleme kısmı, Nuxt.js uygulamanızda belirli bir yol için verileri ve görünümleri yapılandırmakta bilmeniz gereken her şeyi açıklar.
position: 1
category: concepts
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/01_views?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Bir Nuxt görünümünün (yukarıdan aşağıya) yapı sırası nedir?
    answers:
      - Tasarım → Sayfa → Belge
      - Sayfa → Tasarım → Belge
      - Belge → Tasarım → Sayfa
    correctAnswer: Belge → Tasarım → Sayfa
  - question: Varsayılan olarak çağrılan tasarım hangisidir?
    answers:
      - default.vue
      - layout.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: Özel bir tasarım nasıl oluşturursunuz?
    answers:
      - pages klasörüne bir .vue dosyası ekleyerek
      - layouts klasörüne bir .vue dosyası ekleyerek
      - components klasörüne bir .vue dosyası ekleyerek
    correctAnswer: layouts klasörüne bir .vue dosyası ekleyerek
  - question: Sayfanızdaki 'blog' adı verilen özel layout'ı nasıl etkinleştirirsiniz?
    answers:
      - "layout: 'blog'"
      - "layout: 'default'"
      - "blog: 'blog'"
    correctAnswer: "layout: 'blog'"
  - question: Özelleştirilmiş bir hata sayfası olan error.vue dosyanızı nereye eklersiniz?
    answers:
      - pages dizininde
      - errors dizininde
      - layouts dizininde
    correctAnswer: layouts dizininde
---

Görüntüleme kısmı, Nuxt.js uygulamanızda belirli bir yol için verileri ve görünümleri yapılandırmakta bilmeniz gereken her şeyi açıklar. Görünümler bir uygulama şablonu, bir tasarım ve gerçek sayfadan oluşur. Ayrıca her sayfanın baş bölümü için SEO(Arama Motoru Optimizasyonu) bakımından önemli olan özel meta etiketler tanımlayabilirsiniz.

![Nuxt.js'de Görünümün Kompozisyonu](/docs/2.x/views.png)

Nuxt.js'de Görünümün Kompozisyonu

## Sayfalar

Her Sayfa bileşeni bir Vue bileşenidir ancak Nuxt.js, uygulamanızın geliştirilmesini olabildiğince kolaylaştırmak için özel nitelikler ve fonksiyonlar ekler.

```html{}[pages/index.vue]
<template>
  <h1 class="red">Merhaba Dünya</h1>
</template>

<script>
  export default {
    head() {
      // Bu sayfa için meta etiketlerini ayarlayın
    }
    // ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## Bir sayfa bileşeninin özellikleri

Yukarıdaki örnekte head özelliği gibi sayfa bileşeninin birçok özelliği vardır.

<base-alert type="next">

Sayfanızda kullanabileceğiniz tüm özellikler hakkında daha fazla bilgi edinmek için [Directory Structure book](/docs/2.x/directory-structure/nuxt)'na bakın.

</base-alert>

## Tasarımlar (layouts)

Tasarımlar, Nuxt.js uygulamanızın görünümünü ve tarzını değiştirmek için size kolaylık sağlar. Örnek olarak, bir kenar çubuğu eklemek veya mobil/masaüstü için farklı düzenlere sahip olmak istiyorsanız.

### Varsayılan Tasarım

layouts dizini içerisine bir `default.vue` dosyası ekleyerek varsayılan bir tasarım tanımlayabilirsiniz. Bu, belirli bir tasarımı olmayan tüm sayfalar için kullanılacaktır. Tasarıma eklemeniz gereken tek şey, sayfa bileşenini oluşturan `<Nuxt />` bileşenidir.

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

<base-alert type="next">

Bileşenler bölümünde [Nuxt component](/docs/2.x/features/nuxt-components) hakkında daha fazla bilgi edinin

</base-alert>

### Özel Tasarım (Layout)

layouts dizinine bir `.vue` dosyası ekleyerek özel tasarım oluşturabilirsiniz. Özel tasarımı kullanmak için, o tasarımı kullanmak istediğiniz sayfa bileşeninde `layout` özelliğini ayarlamanız gerekir. Değeri oluşturduğunuz özel tasarımın adı olacaktır.

Bir blog tasarımı oluşturmak için `layouts/blog.vue` layouts dizininize bir `blog.vue` dosyası ekleyin:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>Blog gezinti çubuğum</div>
    <Nuxt />
  </div>
</template>
```

<base-alert>

Sayfa bileşenini içerecek bir tasarım oluştururken `<Nuxt/>` bileşenini eklediğinizden emin olun.

</base-alert>

layout özelliğini, o layout'un kullanılmasını istediğimiz 'blog' değeriyle kullanırız.

```html{}[pages/posts.vue]
<template>
  <!-- Şablonunuz -->
</template>
<script>
  export default {
    layout: 'blog'
    // sayfa bileşeni tanımları
  }
</script>
```

<base-alert type="info">

Sayfanıza bir layout özelliği eklemezseniz, örnek olarak `layout: 'blog'`, `default.vue` layout'u kullanılacaktır.

</base-alert>

## Hata Sayfası

Hata sayfası, bir hata oluştuğunda görüntülenen bir _sayfa bileşenidir_ (sunucu tarafı işleme anında olmaz)

<base-alert>

Bu dosya `layouts` dizinine eklense de, bir sayfa olarak işlem görmelidir.

</base-alert>

Yukarı belirtildiği gibi, bu layout özeldir çünkü şablonun içine `<Nuxt/>` bileşenini dahil etmemelisiniz. Bu layout'u, bir hata oluştuğu zaman (`404`, `500`, vb.) görüntülenen bir bileşen olarak görmelisiniz. Diğer sayfa bileşenlerine benzer şekilde, hata sayfası için de her zamanki gibi özel bir tasarım ayarlayabilirsiniz.

Bir `layouts/error.vue` dosyası ekleyerek hata sayfasını özelleştirebilirsiniz:

```html{}[layouts/error.vue]
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Sayfa bulunamadı</h1>
    <h1 v-else>Bir hata oluştu</h1>
    <NuxtLink to="/">Ana Sayfa</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // hata sayfası için özel bir tasarım ayarlayabilirsiniz
  }
</script>
```

## Belge: App.html

Uygulama şablonu, başlık ve gövde değişkenlerinin yanı sıra içeriği de alan Nuxt.js uygulamanız için belgenizin gerçek HTML çerçevesini oluşturmak için kullanılır. Bu dosya sizin için otomatik oluşturulu ve az sıklıkta değiştirilmesi gerekir. Projenizin kaynak dizininde varsayılan olarak root dizin olan bir `app.html` dosyası oluşturarak, Nuxt.js tarafından kullanılan HTML uygulama şablonunu komut dosyalarını veya koşullu CSS sınıflarını içerecek şekilde özelleştirebilirsiniz.

Nuxt.js tarafından kullanılan varsayılan şablon şudur:

```html{}[app.html]
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

Özel bir uygulama şablonu kullanımı, IE için koşullu CSS sınıfları eklemektir:

```html{}[app.html]
<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<base-alert type="info">

`app.html`'e JavaScript ve CSS dosyaları ekleyebilseniz de, bunun yerine `nuxt.config.js`'nin kullanılması önerilir.

</base-alert>

<quiz :questions="questions"></quiz>
