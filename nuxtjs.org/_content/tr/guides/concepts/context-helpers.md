---
title: Bağlam ve Yardımcılar
description: Bağlam, uygulamaya yönelik mevcut istek hakkında *fazladan* ve genellikle isteğe bağlı bilgiler sağlar.
position: 2
category: concepts
csb_link_context: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-context?fontsize=14&hidenavigation=1&theme=dark
csb_link_helpers: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-helpers?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/context.svg
imgAlt: nuxt-js-context-keys
questions:
  - question: Bağlamın var olmasının nedeni nedir?
    answers:
      - SSR
      - Evrensel duruma sahip olmak
      - Tembellik
    correctAnswer: SSR
  - question: Bağlamda hangi anahtar yoktur?
    answers:
      - env
      - isDev
      - $store
    correctAnswer: $store
  - question: Hangi bağlam anahtarı yalnızca *sunucu* tarafında kullanılabilir?
    answers:
      - from
      - app
      - req
    correctAnswer: req
  - question: Hangi bağlam anahtarı yalnızca *istemci* tarafında kullanılabilir?
    answers:
      - from
      - res
      - app
    correctAnswer: from
  - question: '$nuxt yardımcısı neyi yapamaz?'
    answers:
      - Nuxt sürümünü görüntüleme
      - Kullanıcıların internet bağlantısı hakkında bilgi sunma
      - Açıktaki modül işlevlerine erişim
    correctAnswer: Nuxt sürümünü görüntüleme
  - question: Süreç yardımcılarının isimleri nelerdir?
    answers:
      - global, client ve server
      - server, client ve static
      - ssr, spa ve static
    correctAnswer: server, client ve static
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

`context` nesnesi, [asyncData](/docs/2.x/features/data-fetching#async-data), [plugins](/docs/2.x/directory-structure/plugins), [middleware](/docs/2.x/directory-structure/middleware) ve [nuxtServerInit](/docs/2.x/directory-structure/store#the-nuxtserverinit-action) gibi belirli Nuxt işlevlerinde bulunur. Uygulamaya yönelik mevcut istek hakkında _fazladan_ ve genellikle isteğe bağlı bilgiler sağlar.

İlk ve en önemlisi; bağlam Nuxt.js uygulamasının diğer bölümlerine erişim sağlayabilmek için kullanılır, örn. Vuex `store` veya temeldeki `connect` örneği. Böylelikle, bağlamda `req` ve `res` nesneleri sunucu tarafında olur ve `store` her zaman kullanılabilir durumdadır. Ancak zamanla bağlam, diğer birçok yararlı değişken ve kısayolla genişletildi. Artık `development` modunda, geçerli `route`, `params` sayfası ve `query` deki HMR işlevlerine, ayrıca bağlam aracılığıyla erişebiliriz. Buna ek olarak, modül işlevleri ve yardımcıları, hem istemci hem de sunucu tarafında mevcut olacak bağlam aracılığıyla açığa çıkarılabilir.

**Varsayılan olarak mevcut olan tüm bağlam anahtarları**

```js
function (context) { // asyncData, nuxtServerInit, ... olabilir
  // Her zaman kullanılabilir
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
   $config
  } = context

  // Yalnızca sunucu tarafında mevcut
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }

  // Yalnızca istemci tarafında mevcut
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

<base-alert>

Burada bahsedilen _context_ [Vuex Actions](https://vuex.vuejs.org/guide/actions.html)'da veya `nuxt.config.js` içerisindeki `build.extend` işlevinde bulunan `context` nesnesiyle karıştırılmamalıdır. Bunların hiçbirisi birbiriyle ilgili değildir!

</base-alert>

[Internals Glossary](/docs/2.x/internals-glossary/context)'daki farklı bağlam anahtarları hakkında daha fazla bilgi edinebilirsiniz.

### API sorgunuz için sayfa parametrelerini kullanma

Bağlam, rotanın olabilecek dinamik parametrelerini `context.params` aracılığıyla gösterir. Aşağıdaki örnekte, URL'nin bir parçası olarak dinamik bir sayfa parametresi kullanıp `nuxt/http` aracılığıyla bir API çağırıyoruz. [nuxt/http](https://http.nuxtjs.org/) modülü gibi modüller, [context.app](http://context.app) nesnesi aracılığıyla kullanılabilen kendi işlevlerini açığa çıkarabilir.

Ayrıca, olası hataları yakalayabilmek için API çağrısını bir `try/catch` içerisine alırız. `context.error` fonksiyonu ile Nuxt'un hata sayfasını doğrudan gösterebilir ve oluşan hatayı iletebiliriz.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData(context) {
    const id = context.params.id
    try {
      // Using the nuxtjs/http module here exposed via context.app
      const post = await context.app.$http.$get(
        `https://api.nuxtjs.dev/posts/${id}`
      )
      return { post }
    } catch (e) {
      context.error(e) // Atılan hata sayfasıyla birlikte nuxt hata sayfasını göster
    }
  }
}
```

[ES6](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/) ile birlikte bağlam nesnenizi yok etmek için bu sözdizimini kullanabilirsiniz. Erişmek istediğiniz nesneleri içeri aktarabilir ve daha sonra bunları bağlam kelimesini kullanmadan kodda kullanabilirsiniz.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      // Using the nuxtjs/http module here exposed via context.app
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (e) {
      error(e) // Atılan hata ile nuxt hata sayfasını göster
    }
  }
}
```

Bunun yerine sorgu parametrelerini kullanmak istiyorsanız, [context.query.id](/docs/2.x/internals-glossary/context#query)'i kullanabilirsiniz.

### Kullanıcıları yeniden yönlendirme ve store'a erişim

Vuex store'a (bunu `store` dizini aracılığıyla kurduğunuzda) erişmek bağlam aracılığıyla da mümkündür. Vue bileşenlerinde `this.$store` olarak değerlendirilebilecek bir `store` nesnesi sağlar. Buna ilaveten, `authenticated` durumun yanlış olması halinde kullanıcıyı yeniden yönlendirmek için bağlam aracılığıyla açık bir yardımcı olan `redirect` yöntemini kullanırız.

```js
export default {
  middleware({ store, redirect }) {
    // nesne yok etme yoluyla anahtarların alınması
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```

<base-alert type="next">

[redirect method](/docs/2.x/internals-glossary/context#redirect) ile ilgili daha fazla örnek için Internals Glossary kitabına bakın.

</base-alert>

## Yardımcıları

Bağlamdaki kısayolların yanı sıra, Nuxt.js uygulamanızda bulunan başka küçük yardımcılar da vardır.

## `$nuxt`: Nuxt.js yardımcısı

`$nuxt` kullanıcı deneyimini geliştirmek ve bazı durumlarda bir kaçış yolu olmak için tasarlanmış bir yardımcıdır. Vue bileşenlerinde `this.$nuxt` ve istemci tarafında `window.$nuxt` aracılığıyla erişilir.

### Bağlantı denetleyicisi

`$nuxt` yardımcısı, bir kullanıcının internet bağlantısının olup olmadığının kontrolünü sağlar: `isOffline` ve `isOnline` mantıksal değerlerini ortaya çıkarır. Bunları, kullanıcı çevrimdışı olduğu zaman mesaj göstermek için kullanırız(örneğin).

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">Çevrimdışısınız</div>
    <Nuxt />
  </div>
</template>
```

### Root örneğine erişim

`$nuxt` yardımcısı, DX/UX özelliklerini sağlamanın yanı sıra, diğer tüm bileşenlerden uygulamanızın root örneğine bir kısayol sağlar. Fakat hepsi bu değil - Vue bileşenlerinizin dışından `$axios` gibi modül yöntemlerine erişim sağlamak için bir çıkış yolu olarak kullanılabilen `$nuxt` yardımcısına `window.$nuxt` üzerinden de erişebilirsiniz. Bu akıllıcadır fakat **yalnızca son çare olarak kullanılmalıdır**.

### Sayfa verilerini yenileme

Kullanıcı için geçerli sayfayı yenilemek istediğinizde, sayfayı tamamen yeniden yüklemek istemezsiniz çünkü sunucuya tekrar düşebilir ve en azından tüm Nuxt.js uygulamasını yeniden başlatabilirsiniz. Bunun yerine, genelde yalnızca `asyncData` veya `fetch` tarafından sağlanan verileri yenilemeyi tercih edersiniz.

Bunu `this.$nuxt.refresh()` kullanarak yapabilirsiniz!

```html
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Yenile</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Created at: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

#### Yükleme çubuğunu kontrol etme

`$nuxt` ile Nuxt'un yükleme çubuğunu programatik bir şekilde `this.$nuxt.$loading` ile kontrol edebilirsiniz.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

Daha fazla için ilgili bölümü okuyun [loading feature chapter](../features/loading)

## onNuxtReady yardımcısı

Nuxt.js uygulamanız yüklenip hazır olduktan _sonra_ bazı betikleri çalıştırmak istiyorsanız, `window.onNuxtReady` fonksiyonunu kullanabilirsiniz.

```js
window.onNuxtReady(() => {
  console.log('Nuxt.js is ready and mounted')
})
```

## Süreç yardımcıları

Nuxt.js, uygulamanızın sunucuda mı yoksa tamamen istemcide mi oluşturulduğunu belirlemenize ve statik site oluşturmayı kontrol etmenize yardımcı olacak global `process` nesnesine üç mantıksal değer ekler. Bu yardımcılar, uygulamanızın tamamında mevcuttur ve genellikle `asyncData` kullanıcı alanı kodunda kullanılır.

```html{}[pages/about.vue]
<template>
  <h1>{{ renderedOn }} tarafından oluşturuldum</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'client' : 'server' }
    }
  }
</script>
```

Örnekte, `renderedOn` sunucu tarafı oluşturmada kullanılırken `'server'` olarak değerlendirilir ve bir kullanıcı sayfaya doğrudan erişir. Kullanıcı uygulamanın başka bir kısmından sayfaya gittiğinde, örn: bir `<NuxtLink>` tıkladığında, istemciye değerlendirilir.

<quiz :questions="questions"></quiz>
