---
title: 'Создание блога на Nuxt Content'
description: 'Модуль Content в Nuxt это headless CMS основанной на git файловой системе, которая предоставляет мощные функции для создания блогов, документации или просто добавления контента на обычный сайт. В этой статье мы разберем большинство преимуществ этого модуля и узнаем как создать блог с его помощью. 
'
imgUrl: blog/creating-blog-with-nuxt-content/main.png
date: 2020-07-02
authors:
  - name: "Debbie O'Brien"
    avatarUrl: https://pbs.twimg.com/profile_images/1252900852156772352/JLIVJ-TC_400x400.jpg
    link: https://twitter.com/debs_obrien
tags:
  - Nuxt
  - Content
  - Markdown
---

Модуль [Content](https://content.nuxtjs.org) в Nuxt это headless CMS основанной на git файловой системе, которая предоставляет мощные функции для создания блогов, документации или просто добавления контента на обычный сайт. В этой статье мы разберем большинство преимуществ этого модуля и узнаем как создать блог с его помощью.

<video poster="https://res.cloudinary.com/nuxt/video/upload/v1588091670/demo-blog-content_shk6kw.jpg" loop="loop" plays-inline="true" controls="controls">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/demo-blog-content_shk6kw.webm" type="video/webm">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1592314331/demo-blog-content_shk6kw.mp4" type="video/mp4">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/demo-blog-content_shk6kw.ogv" type="video/ogg">
</video>

<p align="center">
  <a href="https://blog-with-nuxt-content.netlify.app/" target="_blank" rel="noopener nofollow">Посмотреть демо</a> /
  <a href="https://github.com/nuxt-academy/demo-blog-nuxt-content" target="_blank" rel="noopener nofollow">Код проекта</a>
</p>

- [Начало работы](#начало-работы)
  - [Установка](#установка)
  - [Создаем страницу](#создаем-страницу)
  - [Отображение контента](#отображение-контента)
  - [Введенные переменные по умолчанию](#введенные-переменные-по-умолчанию)
  - [Пользовательские введенные переменные](#custom-injected-variables)
  - [Стилизация markdown контента](#стилизация-markdown-контента)
  - [Добавление иконки к ссылке наших заголовков](#добавление-иконки-к-ссылке-наших-заголовков)
  - [Добавляем оглавление](#добавляем-оглавление)
  - [Использование HTML в .md файлах](#использование-HTML-в-.md-файлах)
  - [Добавление Vue компонента](#добавление-vue-компонента)
  - [Добавление компонента Author и передача ему входящих параметров](#добавление-компонента-Author-и-передача-ему-входящих-параметров)
  - [Добавление блока с кодом в статью](#добавление-блока-с-кодом-в-статью)
  - [Создание компонента предыдущей и следующей статьи](#создание-компонента-предыдущей-и-следующей-статьи)
  - [Работа с API](#работа-с-api)
  - [Список всех статей](#список-всех-статей)
  - [Использование запроса where для создания страницы автора](#использование-запроса-where-для-создания-страницы-автора)
  - [Добавляем поле поиска](#добавляем-поле-поиска)
- [Редактирование контента в режиме реального времени](#редактирование-контента-в-режиме-реального-времени)
- [Генерация приложения](#генерация-приложения)
- [Заключение](#заключение)
- [Дальнейшее изучение](#дальнейшее-изучение)

## Начало работы

### Установка

Чтобы начать работу с модулем Content, нам сначала нужно установить модуль с помощью npm или yarn.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxt/content
```

</code-block>
<code-block label="npm">

```bash
npm install @nuxt/content
```

  </code-block>
</code-group>

Затем мы добавим его в сборку модулей в файле nuxt.config.

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxt/content']
}
```

<base-alert>

Если вы создаете новый проект с помощью create-nuxt-app, можете выбрать опцию добавить модуль Content, и он будет установлен.

</base-alert>

### Создаем страницу

Модуль Content читает файлы в нашем каталоге `content/`.

```bash
mkdir content
```

<base-alert>

Если вы создаете новый проект с помощью `create-nuxt-app`, `content/` директория уже будет создана.

</base-alert>

Давайте создадим директорию `articles/`, куда мы сможем добавлять статьи для нашего блога.

```bash
mkdir content/articles
```

Модуль Content может анализировать markdown, csv, yaml, json, json5 или xml файлы. Давайте создадим нашу первую статью в markdown файле:

```bash
touch content/articles/my-first-blog-post.md
```

Теперь добавим заголовок и текст для нашего сообщения в блоге:

```markdown
# My first blog post

Welcome to my first blog post using content module
```

<base-alert>

В markdown мы создаем заголовок `<h1>` с помощью значка `#`. Убедитесь, что вы оставили пробел между ним и заголовком вашего блога. Для получения дополнительной информации о записи в markdown стиле смотрите [Руководство по основному синтаксису](https://www.markdownguide.org/basic-syntax).

</base-alert>

### Отображение контента

Чтобы отобразить контент на странице, мы используем [динамическую страницу](https://nuxtjs.org/docs/2.x/features/file-system-routing#dynamic-routes), добавив к странице знак подчеркивания (`_`). Создав компонент страницы с именем `_slug.vue` внутри папки `blog`, мы можем использовать переменную `params.slug`, предоставляемую vue router, для получения имени каждой статьи.

```bash
touch pages/blog/_slug.vue
```

Затем используем `asyncData` в компоненте страницы для получения содержимого статьи до того, как страница будет отрисована. Мы можем получить доступ к контенту через context , используя переменную `$content`. Поскольку мы хотим получить динамическую страницу, нам также необходимо знать, какую статью нужно получить с помощью `params.slug`, который доступен нам через [context](https://nuxtjs.org/docs/2.x/internals-glossary/context).

```html{}[pages/blog/_slug.vue]
<script>
  export default {
    async asyncData({ $content, params }) {
      // fetch our article here
    }
  }
</script>
```

Внутри асинхронной функции `asyncData` мы создаем переменную с именем `article`, которая принимает контент, используя `await`, за которым следует `$content`. Нужно передать в `$content` параметры того, что мы хотим получить, в нашем случае это папка `articles` и `slag`, который мы получаем из params. По цепочке в конце добавляем метод fetch, который возвращает нужную статью.

```html{}[pages/blog/_slug.vue]
<script>
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('articles', params.slug).fetch()

      return { article }
    }
  }
</script>
```

Чтобы отобразить контент, используем компонент `<nuxt-content />`, передав переменную в параметр `document`. В этом примере мы заключили его в HTML тег article, согласно правилам семантического синтаксиса, но вы можете использовать div или другой тег HTML, если хотите.

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>
```

Теперь мы можем запустить сервер разработки и перейти по маршруту [http://localhost:3000/blog/my-first-blog-post](http://localhost:3000/blog/my-first-blog-post) . Мы должны увидеть контент из .md файла.

<img alt="content from markdown" src="/blog/creating-blog-with-nuxt-content/get-started-with-nuxt-content.png">

### Введенные переменные по умолчанию

Модуль Content Nuxt дает нам доступ к введенным переменным, которые мы можем показать в нашем шаблоне. Давайте посмотрим на переменные по умолчанию, которые вводятся в документ:

- **body**: содержимое документа
- **dir**: директория
- **extension**: расширение файла (.md в этом примере)
- **path**: путь к файлу
- **slug**: имя файла
- **toc**: массив, содержащий оглавление
- **createdAt**: дата создания файла
- **updatedAt**: дата последнего изменения файла

Мы можем получить доступ ко всем этим переменным, используя созданную ранее переменную `article`. `Article` - это объект, который содержит все эти дополнительные введенные переменные, к которым у нас есть доступ. Давайте проверим их, распечатав с помощью тега `<pre>`.

```html{}[pages/blog/_slug.vue]
<pre> {{ article }} </pre>
```

Теперь на нашей странице мы видим, что у нас есть объект с переменной, которая представляет собой пустой массив, и переменную содержимого(body), которая включает все наши теги h1 и p, а также некоторую другую информацию, которую мы рассмотрим позже. Если мы прокрутим вниз, вы увидите все остальные переменные, к которым есть доступ.

```bash
"dir": "/articles",
"path": "/articles/my-first-blog-post",
"extension": ".md",
"slug": "my-first-blog-post",
"createdAt": "2020-06-22T10:58:51.640Z",
"updatedAt": "2020-06-22T10:59:27.863Z"
```

Это означает, что мы можем получить доступ к этим свойствам, используя нашу переменную article, добавив точку и имя свойства, которую мы хотим использовать. Например, `article.updatedAt` даст нам дату последнего обновления поста.

```html{}[pages/blog/_slug.vue]
<p>Post last updated: {{ article.updatedAt }}</p>
```

Как видите, дата не так уж и читабельна для людей. Мы можем отформатировать ее, создав метод, который принимает дату и возвращает новую дату с параметрами года, месяца и дня, отформатированными так, как мы хотим.

```js{}[pages/blog/_slug.vue]
methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
 }
```

А затем в нашем шаблоне мы можем использовать метод `formatDate`, принимающий дату, которую мы получаем из контента, и возвращающий уже отформатированную дату.

```html{}[pages/blog/_slug.vue]
<p>Article last updated: {{ formatDate(article.updatedAt) }}</p>
```

### Пользовательские введенные переменные

Мы также можем добавить пользовательские введенные переменные, добавив блок YAML в наш md файл. Он должен находиться в верхней части файла, иметь допустимый формат YAML и находиться между двумя тройными пунктирными линиями. Это полезно для добавления переменных SEO, таких как заголовок, описание и изображение вашей статьи.

```yaml{}[content/articles/my-first-blog-post.md]
---
title: My first Blog Post
description: Learning how to use @nuxt/content to create a blog
img: first-blog-post.jpg
alt: my first blog post
---

```

Теперь у нас есть переменные title, description, img и alt, к которым у нас есть доступ из объекта ʻarticle`.

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <h1>{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <img :src="article.image" :alt="article.alt" />
    <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>

    <nuxt-content :document="article" />
  </article>
</template>
```

<base-alert>

Чтобы отрендерить изображения, включенные в YAML разделе файла, нам нужно либо поместить их в статическую папку, либо использовать синтаксис:  
`` :src="require(`~/assets/images/${article.image}`)" ``.

Изображения, включенные в содержимое статьи, всегда следует помещать в папку **static**, поскольку @nuxt/content не зависит от Webpack. Эта папка не пропускается через Webpack, в отличие от папки assets.

</base-alert>

### Стилизация markdown контента

Если мы посмотрим на код получившейся страницы, мы увидим, что все, что написано внутри нашего файла, заключено в div с классом nuxt-content. Это означает, что мы можем легко добавить стили ко всем нашим элементам из нашего markdown файла, заключив их в класс nuxt-content.

```html{}[pages/blog/_slug.vue]
<style>
  .nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
  }
  .nuxt-content h3 {
    font-weight: bold;
    font-size: 22px;
  }
  .nuxt-content p {
    margin-bottom: 20px;
  }
</style>
```

Чтобы использовать стили с ограниченной областью видимости с классом nuxt-content, вам необходимо использовать deep селектор: `/deep/`, `::v-deep` или `>>>`

Все остальные данные, которые поступают из YAML раздела, можно оформить как обычно: используя [TailwindCSS](https://tailwindcss.com/) или добавив в CSS в стиль тега.

Наши теги из md файла преобразуются в правильные теги, что означает, что теперь у нас есть два заголовка, два тега `<h1>`. Удалим один из md файла.

### Добавление иконки к ссылке наших заголовков

Обратите внимание, что внутри тега `<h2>` есть тег `<a>` с `href`, который содержит id для ссылки на себя, и тег `span` внутри него с `icon` и `icon-link` классы. Это полезно для ссылки на этот раздел страницы. Ссылки в заголовках пусты и поэтому скрыты, поэтому давайте добавим им стиль. Используя классы значков, мы можем добавить svg-иконки в качестве фонового изображения для нашего значка. Сначала вам нужно будет добавить сами иконки в папку с ресурсами assets. В этом примере я добавила его в папку svg и взяла иконки [Steve Schoger's Hero Icons.](https://github.com/sschoger/heroicons-ui)

```css{}[pages/blog/_slug.vue]
.icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
```

### Добавляем оглавление

Сгенерированная переменная `toc` позволяет нам добавить оглавление к нашему посту в блоге. Давайте добавим заголовки к нашему сообщению в блоге.

```markdown
## This is a heading

This is some more info

## This is another heading

This is some more info
```

Теперь мы можем видеть эти новые заголовки внутри массива `toc` с идентификатором, глубиной и текстом. Значение глубины является значением тега заголовка, поэтому значение глубины 2 приравнено тегу `<h2>` и равно 2, значение 3 тегу`<h3>` и т. д.

```markdown{}[content/articles/my-first-blog-post.md]
## This is a heading

This is some more info

### This is a sub heading

This is some more info

### This is another sub heading

This is some more info

## This is another heading

This is some more info
```

Поскольку у нас есть доступ к `toc` и тексту, мы можем перебрать и отобразить их все, а в компоненте `<NuxtLink>` сделать ссылку на якорь раздела, на который мы хотим создать ссылку.

```html{}[pages/blog/_slug.vue]
<nav>
  <ul>
    <li v-for="link of article.toc" :key="link.id">
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</nav>
```

Теперь ссылки ToC работают, и нажатие на любую из них приведет нас к нужной части документа. Модуль Content автоматически добавляет идентификатор и ссылку к каждому заголовку. Если мы проверим один из заголовков из нашего .md файла в инструментах разработки браузера, мы увидим, что у нашего тега `<h2>` есть идентификатор. Это тот же идентификатор, который находится в `toc`, который по сути из него и берется для ссылки на правильный заголовок.

Мы можем улучшить верстку дальше, используя динамические классы для стилизации классов заголовков в зависимости от глубины заголовка, которую мы можем добавить в наш тег nuxt-link. Если ссылка имеет глубину 2, добавьте отступ по оси y, а если глубина равна 3, добавьте поле слева и отступ внизу. Здесь мы используем классы [TailwindCSS](https://tailwindcss.com/), но, конечно же, можно использовать собственные имена и стили классов.

```html{}[pages/blog/_slug.vue]
:class="{ 'py-2': link.depth === 2, 'ml-2 pb-2': link.depth === 3 }"
```

### Использование HTML в .md файлах

Иногда нам может понадобиться добавить HTML в наши файлы c разметкой. Давайте добавим div с некоторыми классами, чтобы он имел синий цвет фона с белым текстом, небольшим отступом и нижним краем

```html{}[content/articles/my-first-blog-post.md]
<div class="bg-blue-500 text-white p-4 mb-4">
  This is HTML inside markdown that has a class of note
</div>
```

### Добавление Vue компонента

А также мы можем добавлять Vue компоненты в .md файлы. Это означает, что если мы множество раз используем такие компоненты, как информационное окно или окно предупреждения, мы можем создать его с нужными нам стилями и передать текст в слот.

Теперь мы можем добавлять компоненты в наше приложение, установив для свойства «components» значение «true» в нашем файле «nuxt.config». (начиная с v2.13)

```js{}[nuxt.config.js]
export default {
  components: true
}
```

Автоматический импорт компонентов не будет работать для <nuxt-content>, если мы не зарегистрируем их глобально, добавив глобальную папку внутри папки компонентов.

```bash
mkdir components/global
```

А теперь можно создать наш компонент InfoBox внутри этой папки.

```html{}[components/global/InfoBox.vue]
<template>
  <div class="bg-blue-500 text-white p-4 mb-4">
    <p><slot name="info-box">default</slot></p>
  </div>
</template>
```

Теперь в нашей разметке эти компоненты будут доступны без необходимости их импорта.

```markdown{}[content/articles/my-first-blog-post.md]
<info-box>
  <template #info-box>
    This is a vue component inside markdown using slots
  </template>
</info-box>
```

<base-alert>

Глобальные компоненты будут доступны для всего нашего приложения, поэтому будьте осторожны при добавлении компонентов в эту папку. Это работает иначе, чем добавление компонентов в папку components, которые добавляются только в том случае, если они используются.

</base-alert>

### Добавление компонента Author и передача ему входящих параметров

Другое преимущество переменных в YAML разделе заключается в том, что мы можем сделать их доступными для компонентов через props. Например, у нас может быть компонент об авторе, и если у нас есть несколько человек, пишущих для блога, данные об авторе будут меняться от статьи к статье. В нашем markdown файле мы можем добавить новый объект в шапку файла, который будет содержать имя автора, биографию и изображение.

```yaml{}[content/articles/my-first-blog-post.md]
---
author:
  name: Benjamin
  bio: All about Benjamin
  image: https://images.unsplash.com/.....
---

```

Теперь мы можем создать компонент автора.

```bash
touch components/global/Author.vue
```

В нем мы создадим div, принимающий динамические переменные: с изображением, заголовком Author, именем и биографией автора.

```html{}[components/global/Author.vue]
<template>
  <div>
    <img :src="author.image" />
    <div>
      <h4>Author</h4>
      <p>{{ author.name }}</p>
      <p>{{ author.bio }}</p>
    </div>
  </div>
</template>
```

<base-alert>

Стили были удалены из этих примеров, вы можете добавлять стили самостоятельно или копировать стили [отсюда](https://github.com/nuxt-academy/demo-blog-nuxt-content).

</base-alert>

Затем в нашем теге скрипта мы можем добавить в props переменную author, тип которой обозначим как Object, а для required установим значение true.

```html{}[components/global/Author.vue]
<script>
  export default {
    props: {
      author: {
        type: Object,
        required: true
      }
    }
  }
</script>
```

Чтобы использовать компонент, можно добавить его в файл `my-first-blog-post.md` и передать ему объект `author`.

```markdown{}[content/articles/my-first-blog-post.md]
<author :author="author"></author>
```

<base-alert>

Нельзя использовать самозакрывающиеся теги в markdown, например `<author: author =" author "/>` не будет работать.

</base-alert>

Размещение компонента в файле с разметкой означает, что нам придется повторять его для каждой статьи. В этом случае было бы лучше добавить его прямо в шаблон \_slag. Только теперь нужно будет изменить свойство `author` на `article.author`.

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <h1>{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <img :src="article.img" :alt="article.alt" />
    <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>

    <nuxt-content :document="article" />

    <author :author="article.author" />
  </article>
</template>
```

Теперь мы можем переместить этот компонент из папки `global` напрямую в папку `components`, и он будет автоматически импортирован в \_slag.vue, поскольку мы используем его в шаблоне.

### Добавление блока с кодом в статью

Мы можем стилизовать блок кода с помощью [prismJS](https://prismjs.com/), который будет автоматически подключаться к посту. Это означает, что мы можем написать наш блок кода, используя правильный markdown синтаксис, и наш блок кода будет отображаться со стилями в зависимости от языка.

```js
export default {
  nuxt: 'is the best'
}
```

```html
<p>code styling is easy</p>
```

Мы также можем указать имя файла, содержащего данный кусок кода, добавив его в квадратных скобках после языка блока кода.

```js[my-first-blog-post.md]
export default {
  nuxt: 'is the best'
}
```

Имя файла будет преобразовано в span с классом `filename`, который мы сможем оформить так, как нам нравится. В этом примере я использую классы tailwind, но вы можете использовать обычный CSS, если хотите.

```css{}[assets/css/tailwind.css]
.nuxt-content-highlight {
  @apply relative;
}
.nuxt-content-highlight .filename {
  @apply absolute right-0 text-gray-600 font-light z-10 mr-2 mt-1 text-sm;
}
```

Можно использовать другую тему, например [prism-themes](https://github.com/PrismJS/prism-themes), мы можем установить ее, а затем добавить её в параметры кофига в `nuxt.config `.

```bash
npm install prism-themes
// or
yarn add prism-themes
```

Затем в файле конфигурации `nuxt.config` в параметрах content мы можем добавить объект markdown с параметром prism и в theme указать тему, которую мы хотим использовать.

```js{}[nuxt.config.js]
content: {
  markdown: {
    prism: {
      theme: 'prism-themes/themes/prism-material-oceanic.css'
    }
  }
}
```

### Создание компонента предыдущей и следующей статьи

Теперь у нас есть полноценный пост в блоге, но было бы здорово, если бы пользователи могли легко переходить от одного поста к другому. Сначала давайте продублируем наш пост, чтобы у нас было 3 поста. Затем давайте создадим новый компонент для наших предыдущих и следующих постов.

```bash
touch components/PrevNext.vue
```

В этом компоненте мы используем `v-if` внутри нашего компонента` NuxtLink`, чтобы узнать, есть ли предыдущая запись в блоге, и если есть, мы добавляем на нее ссылку. Мы можем распечатать заголовок нашей статьи, используя переменные `prev` и `next`, поскольку они содержат всю информацию из статьи. Это означает, что мы могли бы создать карточку с изображением и описанием, чтобы показать следующую и предыдущую статью, но для этого примера мы просто отобразим заголовок. Если предыдущего поста нет, мы просто печатаем пустой span, который удобен для стилизации. Затем мы делаем то же самое со следующей ссылкой.

```html{}[components/PrevNext.vue]
<template>
  <div class="flex justify-between">
    <NuxtLink
      v-if="prev"
      :to="{ name: 'blog-slug', params: { slug: prev.slug } }"
      class="text-primary font-bold hover:underline"
    >
      {{ prev.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="next"
      :to="{ name: 'blog-slug', params: { slug: next.slug } }"
      class="font-bold hover:underline"
    >
      {{ next.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>
```

Мы передаем пропсы `prev` и `next` в компонент, чтобы можно было отображать их на странице нашего блога.

```html{}[components/PrevNext.vue]
<script>
  export default {
    props: {
      prev: {
        type: Object,
        default: () => null
      },
      next: {
        type: Object,
        default: () => null
      }
    }
  }
</script>
```

Теперь мы можем получить предыдущие и следующие статьи, добавив их в `asyncData`. Мы создаем массив констант с именами `prev` и `next`, которые получим из папки `articles` с помощью функции `$content`. На этот раз нам нужны только заголовок и slug(имя .md файла), для этого по цепочке привязываем метод `only()`, которому передаем 'title' и 'slug'.

Мы можем использовать метод `sortBy()` для сортировки данных по дате createdAt в возрастающем порядке. Затем мы используем метод `surround()` и передаем `slug` из params, чтобы он мог получить правильный `slug` для предыдущей и следующей публикации.

Затем мы возвращаем prev и next, вместе со статьей `article`.

```js{}[pages/blog/_slug.vue]
async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next
    }
  },
```

Теперь мы можем добавить наш компонент `<prev-next>` на нашу `_slag` страницу, передав параметры prev и next.

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <h1>{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <img :src="article.img" :alt="article.alt" />
    <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>

    <nuxt-content :document="article" />

    <author :author="article.author" />

    <prev-next :prev="prev" :next="next" />
  </article>
</template>
```

<base-alert type="info">

Поскольку мы установили `components: true` в нашем файле nuxt.config, нам не нужно импортировать этот компонент, чтобы его использовать.

</base-alert>

### Работа с API

При запросе данных модуль Content предоставляет доступ к API, чтобы можно было запрашивать их напрямую и видеть, что возвращается. У нас есть доступ к API в режиме разработки по следующему URL-адресу: [http://localhost:3000/\_content/](http://localhost:3000/_content/). В нашем примере запрос ничего не вернет, так как наши статьи находятся в папке с именем article, поэтому нам нужно использовать этот URL [http://localhost:3000/\_content/articles](http://localhost:3000/_content/articles), чтобы увидеть список статей.

<base-alert type="info">

Мы можем увидеть отдельные статьи, добавив имя файла[http://localhost:3000/\_content/articles/my-first-blog-post](http://localhost:3000/_content/articles/my-first-blog-post)

</base-alert>

<base-alert type="info">

Вы можете использовать расширение Chrome, например [JSON Viewer Awesome](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh), для удобства чтения.

</base-alert>

Мы можем запрашивать данные прямо в URL и получать в виде JSON объекта, который затем мы можем использовать для создания главной страницы блога со списком всех статей. Используя API, можно увидеть все доступные данные и решить какие из них нам нужны, в данном случае для главной страницы нам понадобится только заголовок, описание, img, slug и данные автора. Давайте посмотрим, на что это будет похоже.

[http://localhost:3000/\_content/articles?only=title&only=description&only=img&only=slug&only=author](http://localhost:3000/_content/articles?only=title&only=description&only=img&only=slug&only=author)

<video poster="https://res.cloudinary.com/nuxt/video/upload/v1588091670/content-api_aocbcn.jpg" loop="loop" plays-inline="true" controls="controls">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/content-api_aocbcn.webm" type="video/webm">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1592314331/content-api_aocbcn.mp4" type="video/mp4">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/content-api_aocbcn.ogv" type="video/ogg">
</video>

### Список всех статей

Теперь мы можем главную страницу блога, чтобы перечислить все наши статьи. Поскольку у нас уже есть страница index.vue, нам просто нужно удалить весь демонстрационный код на этой странице.

<base-alert type="info">

В [демо](https://github.com/nuxt-academy/demo-blog-nuxt-content) я использовала главную страницу(index.vue в папке `pages`) вместо создания файла index.vue внутри папки `blog`, потому что в этом примере у меня нет других страниц, но обычно у вас может быть домашняя страница, страница контактов, а затем страница блога и т. д.

</base-alert>

Передавая `$content` и `params` из [контекста](https://ru.nuxtjs.org/guides/concepts/context-helpers) в функцию `asyncData`, мы затем создаем константу articles, которая ожидает получения асинхронных данных из `$content`, которой мы передали название папки articles, содержащей все статьи, и параметр slug из params. Затем мы можем использовать `only()`, чтобы получить только заголовок, описание, img, slug и данные автора, поскольку мы тестировали API, и узнали, что это даст нам именно то, что нам нужно. Мы можем использовать `sortBy()` для сортировки по дате `createdAt`, а затем привязываем `fetch()` и возвращаем статьи.

```html{}[pages/index.vue]
<script>
  export default {
    async asyncData({ $content, params }) {
      const articles = await $content('articles', params.slug)
        .only(['title', 'description', 'img', 'slug', 'author'])
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        articles
      }
    }
  }
</script>
```

Массив статей теперь доступен нам, как любая реактивная переменная, поэтому мы можем использовать его в нашем шаблоне, используя `v-for`, чтобы перебирать все статьи и распечатывать заголовок статьи, имя автора, описание, дату публикации, дату обновления и изображение в компоненте `<NuxtLink>` для ссылки на страницу статьи.

```html{}[pages/index.vue]
<template>
  <div>
    <h1>Blog Posts</h1>
    <ul>
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          <img :src="article.img" />
          <div>
            <h2>{{ article.title }}</h2>
            <p>by {{ article.author.name }}</p>
            <p>{{ article.description }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
```

### Использование запроса where для создания страницы автора

Модуль Content дает возможность фильтровать результаты, используя запрос where. У нас может быть страница автора, на которой отображаются данные об авторе и все статьи этого автора.

```bash
touch pages/blog/author/_author.vue
```

Как и раньше, мы используем asyncData для получения данных, но на этот раз мы добавляем метод `where()`. Мы хотим получать статьи, в которых автор совпадает с именем автора, полученным из params.

Например:

[http://localhost:3000/\_content/articles?author.name=Maria](http://localhost:3000/_content/articles?author.name=Maria)

Поскольку мы использовали объект для автора, нам нужно добавить `nestedProperties` в качестве опции к нашему свойству content в нашем файле nuxt.config и передать ему то, что мы хотим запросить (только для запросов с точечной нотацией).

```js{}[nuxt.config.js]
export default {
  content: {
    nestedProperties: ['author.name']
  }
}
```

Как видим, мы получаем все наши данные только для автора Марии. Если бы мы использовали maria без заглавной буквы, мы бы ничего не получили. Поэтому мы можем использовать `$regex`, чтобы оно оставалось с заглавной буквы.

Затем мы получаем все детали, которые хотим показать на этой странице. В последнем примере мы использовали метод `only()` для получения нужных параметров, но поскольку нам требуется довольно много контента, мы можем вместо этого использовать метод `without()` и передать в него то, что мы не хотим получить в теле сообщения.

```html{}[pages/blog/author/_author.vue]
<script>
  export default {
    async asyncData({ $content, params }) {
      const articles = await $content('articles', params.slug)
        .where({
          'author.name': {
            $regex: [params.author, 'i']
          }
        })
        .without('body')
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        articles
      }
    }
  }
</script>
```

<base-alert type="info">

You can use an array and pass in more than just 'body' to the `without()` method:

</base-alert>

```js
without(['body', 'title'])
```

Вы можете использовать массив и передать больше, чем просто тело, методу `without()`:

```html{}[pages/blog/author/_author.vue]
<template>
  <div>
    <h1>Author: {{ articles[0].author.name }}</h1>
    <p>Bio: {{ articles[0].author.bio }}</p>
    <h3>Here are a list of articles by {{ articles[0].author.name }}:</h3>
    <ul>
      <li v-for="article in articles" :key="article.slug">
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          <img :src="article.img" :alt="article.alt" />
          <div>
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
            <p>{{ formatDate(article.updatedAt) }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
```

<base-alert type="info">

Обратите внимание, что все стили были удалены из этого примера. Вы можете стилизовать страницу самостоятельно или скопировать стили из [демонстрационного кода](https://github.com/nuxt-academy/demo-blog-nuxt-content).

</base-alert>

Чтобы отформатировать нашу дату, мы можем добавить метод, который создали ранее:

```js{}[pages/blog/author/_author.vue]
methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
```

И, конечно же, мы должны сделать ссылку из поста в блоге на страницу данного автора.

```html{}[components/Author.vue]
<NuxtLink :to="`/blog/author/${author.name}`">
  <img :src="author.img" />
  <div>
    <h4>Author</h4>
    <p>{{ author.name }}</p>
    <p>{{ author.bio }}</p>
  </div>
</NuxtLink>
```

### Добавляем поле поиска

Модуль Nuxt Content дает нам возможность искать в статьях с помощью метода search().

Давайте сначала создадим компонент поиска.

```bash
touch components/AppSearchInput.vue
```

Добавляем свойство data(), которое будет возвращать searchQuery, которая по умолчанию пустая строка, и массив статей, который также пуст. Затем мы используем метод watch из Vue, чтобы наблюдать за значением searchQuery. Если в searchQuery ничего нет, то массив статей пуст, и мы просто вызываем return. В другом случае, мы асинхронно получаем статьи, с помощью `$content`. Теперь мы можем использовать метод `limit()`, чтобы ограничить количество возвращаемых результатов, а затем мы используем метод `search()`, передаем ему searchQuery в качестве аргумента, а затем мы добавляем метод `fetch()`.

```html{}[components/AppSearchInput.vue]
<script>
  export default {
    data() {
      return {
        searchQuery: '',
        articles: []
      }
    },
    watch: {
      async searchQuery(searchQuery) {
        if (!searchQuery) {
          this.articles = []
          return
        }
        this.articles = await this.$content('articles')
          .limit(6)
          .search(searchQuery)
          .fetch()
      }
    }
  }
</script>
```

Затем нам нужно добавить в шаблон input и с помощью v-model мы подключаем его к нашему свойству данных SearchQuery. Затем, если есть результаты поиска, мы используем `v-for`, чтобы перечислить статьи, используя компонент`<NuxtLink>`для ссылки на их страницы.

```html{}[components/AppSearchInput.vue]
<template>
  <div>
    <input
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      placeholder="Search Articles"
    />
    <ul v-if="articles.length">
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
```

Теперь мы можем использовать наш компонент <AppSearchInput> где угодно на нашей странице.

```html{}[pages/_slug.vue]
<AppSearchInput />
```

<base-alert type="info">

См. [код демо](https://github.com/nuxt-academy/demo-blog-nuxt-content) для улучшения стиля этой страницы, а также добавленный компонент заголовка, который включает компонент поиска и поэтому отображается на странице автора и заглавной странице.

</base-alert>

## Редактирование контента в режиме реального времени

Наш блог выглядит великолепно, и если нужно изменить какой-либо контент на странице, мы можем сделать это прямо в браузере благодаря функции редактирования в реальном времени. Все, что вам нужно сделать, это дважды щелкнуть по своей странице в режиме разработки, и откроется окно редактирования. Здесь вы можете изменить любой текст, а также обложку. Вы даже можете добавить компонент, который находится в папке глобальных компонентов, и, просто щелкнув мышью вне окна редактора, вы увидите свои изменения в реальном времени в браузере, а в редакторе и в консоли вы увидите, что файл был изменен и сохранен.

<video poster="https://res.cloudinary.com/nuxt/video/upload/v1588091670/live-edit-content_kdorvi.jpg" loop="loop" plays-inline="true" controls="controls">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/live-edit-content_kdorvi.webm" type="video/webm">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1592314331/live-edit-content_kdorvi.mp4" type="video/mp4">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/live-edit-content_kdorvi.ogv" type="video/ogg">
</video>

## Генерация приложения

Если теперь мы хотим развернуть наш новый замечательный блог, мы можем запустить команду `nuxt generate`, которая создаст наше приложение, добавив все webpack ресурсы и создав для нас .js бандлы, а затем экспортирует наши html, css, js файлы и изображения как статические ресурсы. Вы также заметите, что нам не нужно было добавлять свойство routes или делать что-либо, чтобы получить новую страницу, поскольку "crawler" будет сканировать все ссылки и генерировать динамические маршруты.

Затем мы можем использовать команду `nuxt start`, которая будет обслуживать наш готовый к работе статический сайт, чтобы мы могли увидеть его в браузере перед развертыванием.

С nuxt generate, если изменяется только наш контент, это означает, что команда `nuxt generate` будет экспортировать только статические страницы и не будет проходить через веб-пакет для восстановления сайта, что означает, что наш контент будет обновлен за секунды.

## Заключение

Работа с Nuxt Content доставляет огромное удовольствие, и вы тоже сможете сделать и построить гораздо больше. Не забудьте продемонстрировать свои работы на нашем канале в Discord под названием **showcase**, чтобы мы смогли увидеть интересные вещи, которые вы создали, и, возможно, даже представить их в нашем NuxtLetter. Еще не зарегистрировались? Что ж, сейчас прекрасное время, чтобы [зарегистрироваться](https://nuxtjs.org/#subscribe-to-newsletter), поскольку мы продолжаем выпускать новые материалы и функции для Nuxt.js. Наслаждайтесь :)

## Дальнейшее изучение

Для получения дополнительной информации о том, как улучшить свой блог, ознакомьтесь с этими статьями [Гарета Редферна](https://twitter.com/garethredfern):

- [Adding a Sitemap Using Nuxt Content](https://redfern.dev/articles/adding-a-sitemap-using-nuxt-content/)
- [Adding Social Media & SEO Meta Data Using Nuxt Content](https://redfern.dev/articles/adding-social-media-seo-meta-data-using-nuxt-content)
- [Adding Pagination With Nuxt Content](https://redfern.dev/articles/adding-pagination-nuxt-content-blog)
