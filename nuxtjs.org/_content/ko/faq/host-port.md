---
title: host와 port 번호
description: Nuxt.js에서 host와 port 번호를 변경하려면?
category: configuration
position: 7
---

# host 와 port 번호를 변경하려면?

port 번호를 설정하는 방법에는 2가지 방법이 있습니다.

- 환경변수를 사용:

```js
"scripts": {
  "dev": "HOST=0.0.0.0 PORT=3333 nuxt"
}
```

- `package.json`에서 nuxt 설정을 사용:

```js
"config": {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3333"
  }
},
"scripts": {
  "dev": "nuxt"
}
```
