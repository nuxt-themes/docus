---
title: Nuxt Yaşam Döngüsü
description: Hangi aracı kullanırsanız kullanın, aracın nasıl çalıştığını anladığınızda kendinizi her zaman daha güvende hissedeceksiniz.
position: 5
category: concepts
img: /docs/2.x/nuxt-lifecycle.svg
imgAlt: understanding-nuxt-2-12-lifecycle-hooks
questions:
  - question: Nuxt.js yaşam döngüsü ne zaman başlar?
    answers:
      - Yanıt istemciye gönderileceği zaman
      - Derleme aşamasından sonra
      - nuxt dev çalışırken
    correctAnswer: Derleme aşamasından sonra
  - question: Yaşam döngüsünün içeriği hangi ana faktörlere bağlıdır?
    answers:
      - Sunucuyu başlatırken sahip olduğumuz saat ve tarih
      - Sunucu tarafında oluşturma etkinse, kullanılan tip
      - Nuxt.js uygulamasının üzerinde çalıştığı işletim sistemi
    correctAnswer: Sunucu tarafında oluşturma etkinse, kullanılan tip
  - question: nuxtServerInit ne zaman çağrılır?
    answers:
      - Sunucu tarafı ve istemci tarafı
      - Vue hidrasyonundan sonra
      - Sadece sunucu tarafı
    correctAnswer: Sadece sunucu tarafı
  - question: Üç tür ara katman hangileridir?
    answers:
      - Global, Layout, Route
      - Global, Layout, Page
      - Global, Group, Route
    correctAnswer: Global, Layout, Route
  - question: Yalnızca istemci tarafında hangi adım olabilir?
    answers:
      - Vue Hidrasyon
      - Ara katman çalıştırma
      - fetch fonksiyonun çağrılması
    correctAnswer: Vue Hidrasyon
  - question: İstemci tarafında hangi adım asla olmaz?
    answers:
      - asyncData'nın çalıştırılması
      - serverMiddleware'nın çalıştırılması
      - fetch'in çalıştırılması
    correctAnswer: serverMiddleware'nın çalıştırılması
  - question: Hem sunucu hem de istemci tarafında hangi Vue metodları çağrılır?
    answers:
      - mounted ve beforeMount
      - beforeDestroy ve destroyed
      - created ve beforeCreate
    correctAnswer: created ve beforeCreate
  - question: <NuxtLink> ile gezindikten sonra hangi adım gerçekleşmez?
    answers:
      - fetch çağrılması
      - İstemci tarafında Nuxt.js eklentilerini çalıştırma
      - beforeCreate çağrılması
    correctAnswer: İstemci tarafında Nuxt.js eklentilerini çalıştırma
  - question: asyncData ile <NuxtLink> üzerinden gezindikten sonra fetch arasındaki özel fark nedir?
    answers:
      - asyncData fetch'den daha hızlıdır
      - asyncData fetch'den sonra çağrılır
      - asyncData fetch değilken engellenir
    correctAnswer: asyncData fetch değilken engellenir
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Hangi aracı kullanırsanız kullanın, aracın nasıl çalıştığını anladığınızda kendinizi her zaman daha güvende hissedeceksiniz. Aynısı Nuxt.js için de geçerlidir. Bu bölümün amacı, size esas yapının farklı bölümleri, bunların uygulama sıraları ve birlikte nasıl çalıştıkları hakkında üst düzey bir genel bakış sunmaktır.

Nuxt.js yaşam döngüsü; uygulamanızın paketlendiği, parçalandığı ve küçültüldüğü derleme aşamasından sonra ne olduğunu açıklar. Bu aşamadan sonra ne olacağı, sunucu tarafında görüntülemenin etkin olup olmamasına bağlıdır. Eğer varsa, ayrıca seçtiğiniz sunucu tarafı oluşturma türüne bağlıdır:

Dinamik SSR (`nuxt start`)

veya Statik Site Oluşturma (`nuxt generate`).

## Yaşam döngüsü

### Sunucu

SSR için, uygulamanıza yönelik her ilk istek için bu adımlar yürütülecektir

- Sunucu başlar (`nuxt start`)

Statik site oluşturma kullanılırken, sunucu adımları yalnızca derleme zamanında yürütülür, ancak oluşturulacak her sayfa için bir kez gerçekleştirilir.

- Üretim süreci başlar (`nuxt generate`)

- Nuxt hookları
- serverMiddleware
- Sunucu tarafı Nuxt eklentileri
  - nuxt.config.js'de tanımlandığı gibi
- nuxtServerInit
  - Store'u önceden doldurmak için yalnızca sunucu tarafında çağrılan Vuex aksiyonu
  - İlk bağımsız değişken **Vuex context**, ikinci bağımsız değişken **Nuxt.js context**
    - Diğer eylemleri buradan gönderin → sunucu tarafında sonraki depolama eylemleri için yalnızca "entry point"
  - yalnızca `store/index.js` içerisinde tanımlanabilir
- Middleware
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData
- beforeCreate (Vue yaşam döngüsü metodu)
- created (Vue yaşam döngüsü metodu)
- Yeni fetch (yukarıdan aşağıya, siblings = parallel)
- Durumun serileştirilmesi (`render:routeContext` Nuxt.js hook)

- HTML oluşturma gerçekleşir (`render:route` Nuxt.js hook)

- Tarayıcıya HTML gönderildiğinde `render:routeDone`

- `generate:before` Nuxt.js hook
- HTML dosyaları oluşturulur
  - **Tam statik üretme**
    - örneğin. statik ifadeler çıkarılır(payload)
  - `generate:page` (HTML düzenlenebilir)
  - `generate:routeCreated` (Rota oluşturuldu)
- Tüm HTML dosyaları oluşturulduğunda `generate:done`

### İstemci

Yaşam döngüsünün bu kısmı, hangi Nuxt.js modunu seçmiş olursanız olun, tarayıcıda yürütülür.

- HTML'i alır
- Varlıkları yükleme (örnek. JavaScript)
- Vue Hidrasyon
- Middleware
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (engelleme)
- İstemci tarafı Nuxt.js eklentisi
  - nuxt.config.js'de tanımlandığı sırada
- beforeCreate (Vue yaşam döngüsü metodu)
- created (Vue yaşam döngüsü metodu)
- Yeni fetch (yukarıdan aşağıya, siblings = parallel) (engellleme olmadan)
- beforeMount (Vue yaşam döngüsü metodu)
- mounted (Vue yaşam döngüsü metodu)

### NuxtLink bileşenini kullanarak gezinin

_client_ kısmındaki gibi, her şey tarayıcıda olur fakat yalnızca `<NuxtLink>` üzerinden gezinirken. Ayrıca tüm _blocking_ görevleri yerine getirilene kadar hiçbir sayfa içeriği görüntülenemez.

<base-alert type="info">

Daha fazla bilgi için [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component)

</base-alert>

- middleware (engelleme)
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (engelleme)
- asyncData (engelleme) [veya tam statik yük yüklemesi]
- beforeCreate & created (Vue yaşam döngüsü metodu)
- fetch (engellemesiz)
- beforeMount & mounted

### Sırada ne var?

<base-alert type="next">

[Features book](/docs/2.x/features/rendering-modes)'na göz atın

</base-alert>

<quiz :questions="questions"></quiz>
