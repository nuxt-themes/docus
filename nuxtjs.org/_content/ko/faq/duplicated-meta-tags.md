---
title: 중복된 메타태그
description: 메타태그가 중복된 경우에는?
category: development
position: 104
---

# 메타태그가 중복된 경우에는?

이것은 [vue-meta](https://github.com/nuxt/vue-meta)의 "특징" 입니다. [head 요소 문서](/docs/2.x/concepts/views#html-head)를 참고해 주세요.

> 컴포넌트에서 vue-meta 를 사용할 때, 중복을 피하기 위해서는 유일한 식별자를 hid 키에 붙여서 사용합니다. 자세한 내용은 [vue-meta 테그 리스트](https://vue-meta.nuxtjs.org/api/#tagidkeyname)를 참고해주세요.

예를 들어서 description 메타태그에는 `hid`라는 유일한 식별자를 붙여야 합니다. 그러면 vue-meta는 디폴트 태그를 덮어써야 한다는 것을 알게 될 것입니다.

`nuxt.config.js`:

```js
...head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'keyword 1, keyword 2'},
      { hid: 'description', name: 'description', content: 'This is the generic description.'}
    ],
  },
...
```

그리고 개별페이지에는 다음과 같이 작성합니다:

```js
export default {
  head() {
    return {
      title: `Page 1 (${this.name}-side)`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Page 1 description'
        }
      ]
    }
  }
}
```

페이지의 `head` 프로퍼티의 자세한 사용 방법에 대해서는 [HTML head 정보 문서](/docs/2.x/concepts/views#html-head)를 참고해 주세요.
