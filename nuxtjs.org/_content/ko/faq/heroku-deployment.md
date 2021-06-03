---
title: Heroku에 배포하기
description: Heroku에 배포하려면?
menu: Deploy on Heroku
category: deployment
position: 208
---

# Heroku에 배포하려면?

[Node.js용 Heroku 문서](https://devcenter.heroku.com/articles/nodejs-support) 를읽어두시는 것을 추천합니다.

우선 `npm run build`를 실행할 수 있도록, Heroku에게 프로젝트의 `devDependencies` 를 설치하도록 합니다:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

또한 어플리케이션에 `0.0.0.0` 포트를 listen 하도록 하고, 프로덕션 모드로 기동하도록 합니다:

```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

Heroku 대쉬보드의 (세팅 색션)을 봅시다.

![nuxt config vars Heroku](https://i.imgur.com/EEKl6aS.png)

그리고 `package.json`에 `heroku-postbuild`스크립트를 사용해서 Heroku에게 `npm run build`를 실행하도록 합니다:

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "heroku-postbuild": "npm run build"
}
```

마지막으로, 어플리케이션을 Heroku에 `git push` 합니다:

```bash
git push heroku master
```

자！ 이걸로 Nuxt.js 어플리케이션은 이제 Heroku에서 호스팅되도록 되었습니다！
