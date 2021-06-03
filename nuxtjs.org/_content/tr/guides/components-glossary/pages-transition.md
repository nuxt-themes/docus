---
title: 'Sayfa `transition` Özelliği'
description: Nuxt.js, sayfalarınız arasında gezinirken harika geçişler/animasyonlar oluşturup, uygulayabilmeniz için `<transition>` bileşenini kullanır.
menu: Transition Özelliği
category: components-glossary
position: 0
---

> Nuxt.js, sayfalarınız arasında gezinirken harika geçişler/animasyonlar oluşturup, uygulayabilmeniz için [`<transition>`](https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) bileşenini kullanır.

- **Type:** `String` veya `Object` veya `Function`

Belirli bir rotaya özel bir geçiş tanımlamak için, sayfa bileşenine `transition` anahtarını eklemeniz yeterlidir.

```js
export default {
  // String olabilir
  transition: ''
  // Veya bir obje
  transition: {}
  // veya bir fonksiyon
  transition (to, from) {}
}
```

## String

Eğer `transition` anahtarı bir string olarak ayarlanmışsa, `transition.name` olarak kullanılacaktır.

```js
export default {
  transition: 'test'
}
```

Nuxt.js, bileşeni aşağıdaki gibi ayarlayabilmek için bu ayarları kullanır:

```html
<transition name="test"></transition>
```

## Obje

Eğer `transition` anahtarı bir obje olarak ayarlanmışsa:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js, bileşeni aşağıdaki gibi ayarlayabilmek için bu ayarları kullanır:

```html
<transition name="test" mode="out-in"></transition>
```

`transition` objesi aşağıdaki özelliklere sahip olabilir:

| anahtar            | Tip       | Varsayılan | tanım                                                                                                                                                                                                                |
| ------------------ | --------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | `String`  | `"page"`   | Tüm rota geçişlerine uygulanan geçiş ismidir.                                                                                                                                                                        |
| `mode`             | `String`  | `"out-in"` | Tüm rotalara uygulanan geçiş modu, [Vue.js belgeleri](https://vuejs.org/v2/guide/transitions.html#Transition-Modes).                                                                                                 |
| `css`              | `Boolean` | `true`     | CSS geçiş sınıflarının uygulanıp uygulanmayacağıdır. Varsayılan olarak `true` değerindedir. Eğer `false` olarak ayarlanırsa, yalnızca bileşen etkinlikleri aracılığıyla kaydedilen JavaScript hooklarını tetikler.   |
| `duration`         | `Integer` | n/a        | Geçişte uygulanan süredir (milisaniye cinsinden), bkz. [Vue.js belgeleri](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations).                                                                |
| `type`             | `String`  | n/a        | Geçiş bitiş zamanlamasını belirlemek için beklenecek geçiş olaylarının tipini belirtin. Mevcut değerler `"transition"` ve `"animation"`'dır. Varsayılan olarak, daha uzun süreye sahip tipi otomatik olarak algılar. |
| `enterClass`       | `String`  | n/a        | Geçiş sınıfının başlangıç durumu. Bkz. [Vue.js belgeleri](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                    |
| `enterToClass`     | `String`  | n/a        | Geçiş sınıfının bitiş durumu. Bkz. [Vue.js belgeleri](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                        |
| `enterActiveClass` | `String`  | n/a        | Tüm geçiş süresi boyunca uygulanan sınıf. Bkz. [Vue.js belgeleri](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                            |
| `leaveClass`       | `String`  | n/a        | Geçiş sınıfının başlangıç durumu. Bkz. [Vue.js belgeleri](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                    |
| `leaveToClass`     | `String`  | n/a        | Geçiş için bitiş durumu. Bkz. [Vue.js belgeleri](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                                             |
| `leaveActiveClass` | `String`  | n/a        | Tüm geçiş süresi boyunca uygulanan sınıf. Bkz. [Vue.js belgeleri](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                            |

Ayrıca sayfa `transition` özelliğinde yöntemler de tanımlayabilirsiniz, bunlar [JavaScript hooks](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) içindir:

- `beforeEnter(el)`
- `enter(el, done)`
- `afterEnter(el)`
- `enterCancelled(el)`
- `beforeLeave(el)`
- `leave(el, done)`
- `afterLeave(el)`
- `leaveCancelled(el)`

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```

_Not: Yalnızca JavaScript geçişleri için `css: false` eklemek de iyi bir fikirdir, böylece Vue CSS'i tespit etmeyi atlayabilir. Bu aynı zamanda CSS kurallarının geçişe yanlışlıkla da olsa müdahele etmesini önler._

### Geçiş Modu

**Sayfalar için varsayılan geçiş modu, Vue.js'deki varsayılan moddan farklıdır**. `transition` modu varsayılan olarak `out-in`'a ayarlanmıştır. Aynı anda giriş ve çıkış geçişlerini çalıştırmak istiyorsanız mode'u boş stringe ayarlamanız gerekir `mode: ''`.

```js
export default {
  transition: {
    name: 'test',
    mode: ''
  }
}
```

## Fonksiyon

`transition` anahtari bir fonksiyon olarak ayarlanmışsa:

```js
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

Yönlendirmeye uygulanan geçişler:

- `/` dan `/posts` a => `slide-left`,
- `/posts` dan `/posts?page=3` a => `slide-left`,
- `/posts?page=3` dan `/posts?page=2` a => `slide-right`.
