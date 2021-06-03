---
title: Statik Site Oluşturma
description: Statik site oluşturma ile, uygulamanızı derleme aşamasında oluşturabilir ve Netlify, Github, Vercel vb. gibi herhangi bir statik barındırma hizmetine dağıtabilirsiniz.
position: 4
category: concepts
questions:
  - question: Statik sitenizi barındırmak için bir sunucuya ihtiyacınız var
    answers:
      - True
      - False
    correctAnswer: False
  - question: Static sitenizi oluşturmak için hangi komutu kullanıyorsunuz?
    answers:
      - nuxt build
      - nuxt prerender
      - nuxt generate
    correctAnswer: nuxt generate
  - question: API'nız ne zaman çağrılır?
    answers:
      - API içeriğinin bulunduğu sayfaya her gittiğinizde
      - Sitenizi oluşturduğunuzda
      - Sitenizi oluşturduğunuzda ve API içeriğinin bulunduğu sayfaya her gittiğinizde
    correctAnswer: Sitenizi oluşturduğunuzda
  - question: Hangi sayfalar tek sayfa uygulama modune geçecektir?
    answers:
      - Hata sayfası
      - generate.excludes ile üretilenden dışta kalanlar
      - Navigasyondaki tüm sayfalar
    correctAnswer: generate.excludes ile üretilenden dışta kalanlar
  - question: Sitenizin içeriğini nasıl güncellersiniz?
    answers:
      - Otomatik olarak güncellenir
      - Sitenizi yeniden oluşturmanız gerekiyor
    correctAnswer: Sitenizi yeniden oluşturmanız gerekiyor
---

Statik site oluşturma ile, uygulamanızı derleme aşamasında oluşturabilir ve Netlify, Github, Vercel vb. gibi herhangi bir statik barındırma hizmetine dağıtabilirsiniz. Bu, uygulamanızı dağıtmak için hiçbir sunucuya gerek olmadığı anlamına gelir.

### Sitenizi oluşturma

Sitenizi [target:static](/docs/2.x/features/deployment-targets#static-hosting) ile dağıtırken, tüm `.vue` sayfalarınız HTML ve JacaScript dosyaları içerisine oluşturulur. API'lara yapılan tüm çağrılar, oluşturulan içeriğinizin içinde statik olarak adlandırılan bir klasörde yapılır ve önbelleğe alınır, böylece istemci tarafında gezinmede API'nıza çağrı yapılmasına gerek kalmaz.

### Adım 1: Tarayıcıdan CDN'e

Bir tarayıcı ilk isteği gönderdiğinde, CDN'e gelecektir.

### Adım 2: CDN'den Tarayıcıya

CDN, önceden oluşturulmuş HTML, JavaScript ve statik varlıkları tarayıcıya geri gönderecektir. İçerik görüntülenir ve Vue.js hidrasyonu devreye girerek reaktif hale getirir. Bu işlemden sonra sayfa etkileşimli hale gelir.

### Adım 3: Tarayıcıdan Tarayıcıya

[`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) ile sayfalar arasında gezinmek istemci tarafında yapılır, böylece CDN'e ve tüm API çağrılarına tekrar basmazsınız. Tarayıcıyı seri bir şekilde yenileseniz bile önceden önbelleğe alınmış statik klasörden yüklenecektir.

### SPA Geri Dönüşü

`generate.exclude` özelliği kullanılarak üretimden dışa çıkarılan sayfalar tek sayfalık bir uygulama haline gelecektir. Bu nedenle bu sayfalar CDN'de bulunmayacak ve kullanıcı o sayfaya gittiğinde tarayıcıda istemci tarafında görüntülenecektir.

<base-alert type="next">

Daha fazla bilgi edinmek için [generate property](/docs/2.x/configuration-glossary/configuration-generate#exclude)

</base-alert>

### İçeriğinizi güncelleme

API'nızdan sitenize yeni içerik almak için sitenizi yeniden oluşturmanız gerekecektir. Statik site barındırma sağlayıcılarının çoğunda bunu, master dalına git komutu veya bir pr yoluyla değişikliklerinizi göndererek yapabilirsiniz.

### Önizleme modu

Önizleme modu API'nızı veya CMS'nizi çağırır, böylece dağıtımdan önce değişiklikleri canlı olarak görebilirsiniz. Bu özelliğin nasıl etkinleştirileceğini öğrenmek için [preview mode](/docs/2.x/features/live-preview)'na bakın.

<quiz :questions="questions"></quiz>
