---
title: 'ویژگی transition صفحه'
description: Nuxt.js از کامپوننت `<transition>` برای ایجاد و استفاده از انیمیشن‌های خارق‌العاده هنگام تغییر صفحات استفاده می‌کند.
menu: ویژگی Transition
category: components-glossary
position: 0
---

> Nuxt.js از کامپوننت [`<transition>`](https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) برای ایجاد و استفاده از انیمیشن‌های خارق‌العاده هنگام تغییر صفحات استفاده می‌کند.

- **نوع:** `String` یا `Object` یا `Function`

برای تعریف یک انیمیشن انتقال سفارشی برای یک مسیر بخصوص تنها کافی است از کلید واژه `transition` در کامپوننت صفحه استفاده کنید.

```js
export default {
  // Can be a String
  transition: ''
  // Or an Object
  transition: {}
  // or a Function
  transition (to, from) {}
}
```

## String

اگر مقدار ویژگی `transition` برابر با یک رشته (string) باشد به عنوان نام انیمیشن انتقال (transition.name) استفاده خواهد شد.

```js
export default {
  transition: 'test'
}
```

Nuxt.js از این تنظیمات برای تنظیم کامپوننت به صورت زیر استفاده خواهد کرد:

```html
<transition name="test"></transition>
```

## Object

اگر مقدار ویژگی `transition` برابر با یک Object باشد:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js از این تنظیمات برای تنظیم کامپوننت به صورت زیر استفاده خواهد کرد:

```html
<transition name="test" mode="out-in"></transition>
```

آبجکت `transition` می‌توانید ویژگی‌های زیر را داشته باشد:

| کلید               | نوع       | پیشفرض     | توضیخ                                                                                                                                                                             |
| ------------------ | --------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | `String`  | `"page"`   | نام انیمیشن انتقال اعمال شده به روی تمام مسیرها.                                                                                                                                  |
| `mode`             | `String`  | `"out-in"` | نوع انیمیشن انتقال اعمال شده به روی تمام مسیر ها. برای اطلاعات بیشتر به [مستندات Vue.js](https://vuejs.org/v2/guide/transitions.html#Transition-Modes) مراجعه کنید.               |
| `css`              | `Boolean` | `true`     | جهت تنظیم اینکه آیا کلاس‌های CSS نیز در انیمیشن انتقال اعمال شوند یا خیر. اگر برابر با `false` باشد تنها هوک‌های ثبت شده در ایونت‌‌های کامپوننت اجرا می‌شوند.                     |
| `duration`         | `Integer` | n/a        | مدت زمان اجرای انیمیشن انتقال به میلی ثانیه. برای اطلاعات بیشتر به [مستندات Vue.js](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations) مراجعه کنید.       |
| `type`             | `String`  | n/a        | جهت تنظیم نوع واقعه (ایونت) برای اتمام انتقال. گزینه‌های قابل انتخاب `"transition"` و `"animation"` است. به صورت پیشفرض طولانی‌ترین حالت انتخاب می‌شود.                           |
| `enterClass`       | `String`  | n/a        | حالت اولیه کلاس انتقال. برای اطلاعات بیشتر به [مستندات Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) مراجعه کنید.                                |
| `enterToClass`     | `String`  | n/a        | حالت پایانی انتقال. برای اطلاعات بیشتر به [مستندات Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) مراجعه کنید.                                    |
| `enterActiveClass` | `String`  | n/a        | کلاسی که در سراسر انتقال مورد استفاده قرار خواهد گرفت. برای اطلاعات بیشتر به [مستندات Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) مراجعه کنید. |
| `leaveClass`       | `String`  | n/a        | حالت اولیه کلاس انتقال. برای اطلاعات بیشتر به [مستندات Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) مراجعه کنید.                                |
| `leaveToClass`     | `String`  | n/a        | حالت پایانی انتقال. برای اطلاعات بیشتر به [مستندات Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) مراجعه کنید.                                    |
| `leaveActiveClass` | `String`  | n/a        | کلاسی که در سراسر انتقال مورد استفاده قرار خواهد گرفت. برای اطلاعات بیشتر به [مستندات Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) مراجعه کنید. |

همچنین می‌توانید متدهایی در ویژگی `transition` صفحه تعریف کنید، این متدها برای [هوک‌های JavaScript](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) مورد استفاده قرار می‌گیرد:

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

**یادداشت:** توصیه می‌شود تا به صورت دستی مقدار `css: false` را برای انتقال‌هایی که فقط از JavaScript استفاده می‌کنند تعریف کنید. در این صورت Vue می‌تواند شناسایی CSS را نادیده بگیرد همچنین باعث می‌شود تا قوانین CSS به اشتباه مورد استفاده قرار نگیرند.

### حالت انتقال

**حالت پیشفرض انتقال برای صفحات از حالت پیشفرض در Vue.js متفاوت است.** حالت انتقال به صورت پیشفرض `out-in` است. اگر می‌خواهید انتقال‌های ورودی و خروجی را به صورت همزمان اجرا کنید باید مقدار `mode` را برابر یک استرینگ خالی (`''`) قرار دهید.

```js
export default {
  transition: {
    name: 'test',
    mode: ''
  }
}
```

## تابع

اگر مقدار `transition` برابر یک تابع باشد:

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

انتقال‌ها به صورت زیر اعمال می‌شوند:

- `/` to `/posts` => `slide-left`,
- `/posts` to `/posts?page=3` => `slide-left`,
- `/posts?page=3` to `/posts?page=2` => `slide-right`.
