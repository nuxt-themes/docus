---
title: Режим предварительного просмотра
description: Режим предварительно просмотра для статической сборки(static mode)
category: features
position: 12
---

С помощью Nuxt.js вы можете использовать режим live preview для статической сборки прямо из коробки.
Это позволяет вызывать ваше API или CMS, и сразу отобразит изменения в реальном времени, без предварительной сборки.

<base-alert> Это работает только для статической сборки [target:static](/docs/2.x/features/deployment-targets#static-hosting) </base-alert>

Режим предварительного просмотра(live preview) автоматически обновить данные на странице, поскольку использует `$nuxt.refresh` под капотом, в результате nuxtServerInit, asyncData и fetch будут выполнены на стороне клиента.

Чтобы запустить режим предварительного просмотра(live preview), нужно подключить следующий плагин:

```js{}[plugins/preview.client.js]
export default function ({ query, enablePreview }) {
  if (query.preview) {
    enablePreview()
  }
}
```

<base-alert>

EnablePreview доступен только в области видимости объекта plugins.
Предварительный просмотр обрабатывается на стороне клиента, поэтому плагин должен быть запущен на клиенте: preview.client.js

</base-alert>

```js{}[nuxt.config.js]
export default {
  plugins: ['plugins/preview.client.js']
}
```

После того, как вы добавили плагин вы можете сгенерировать свой сайт и работать с ним.

<code-group>
<code-block label="npx" active>

```bash
npx nuxt generate
npx nuxt start
```

</code-block>
<code-block label="Yarn" >

```bash
yarn generate
yarn start
```

  </code-block>
</code-group>

После чего, вы можете просмотреть свою страницу в режиме live preview добавив параметр запроса в конце адресной строки:

```js
?preview=true
```

<base-alert>
enablePreview нужно тестировать локально при помощи yarn start, а не yarn dev
</base-alert>

### Предварительный просмотр страниц, которые еще не были созданы

Для страниц, которые еще не были сгенерированы, SPA все-равно вызовет API перед показом 404 страницы. Потому что эти страницы существуют в API, но еще не сгенерированы.

Если у вас установлен хук валидации, скорей всего, вам придется изменить его так, чтобы он не перенаправлял на 404 страницу в режиме live preview.

```js
validate({ params, query }) {
  if (query.preview) {
    return true
}
```

### Передача данных в enablePreview

Вы можете передать данные в функцию `enablePreview`. После чего эти данные будут доступны в контексте `$preview` и `this.$preview`.

### Что делать дальше

<base-alert type="next">

Посмотрите тут [Directory Structure book](/docs/2.x/directory-structure/nuxt)

</base-alert>
