---
title: 'Create a Blog with Nuxt Content'
description: 'The Content module is a git files based headless CMS that provides powerful features when it comes to write blogs, documentation sites or just adding content to any regular website. In this post we will go through most of the benefits of this module and discover how we can create a blog with it.'
imgUrl: https://source.unsplash.com/user/agk42/1280x720
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

The [content module](https://content.nuxtjs.org) is a git files based headless CMS that provides powerful features when it comes to write blogs, documentation sites or just adding content to any regular website. In this post we will go through most of the benefits of this module and discover how we can create a blog with it.

<video poster="https://res.cloudinary.com/nuxt/video/upload/v1588091670/demo-blog-content_shk6kw.jpg" loop="loop" plays-inline="true" controls="controls">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/demo-blog-content_shk6kw.webm" type="video/webm">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1592314331/demo-blog-content_shk6kw.mp4" type="video/mp4">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/demo-blog-content_shk6kw.ogv" type="video/ogg">
</video>

<p align="center">
  <a href="https://blog-with-nuxt-content.netlify.app/" target="_blank" rel="noopener nofollow">View demo</a> /
  <a href="https://github.com/nuxt-academy/demo-blog-nuxt-content" target="_blank" rel="noopener nofollow">Source code</a>
</p>

- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Let's create our markdown page](#lets-create-our-markdown-page)
  - [Displaying your content](#displaying-your-content)
  - [Default Injected variables](#default-injected-variables)
  - [Custom Injected variables](#custom-injected-variables)
  - [Styling our markdown content](#styling-our-markdown-content)
  - [Adding an icon to our headings anchor](#adding-an-icon-to-our-headings-anchor)
  - [Add a table of contents](#add-a-table-of-contents)
  - [Use HTML in your markdown files](#use-html-in-your-markdown-files)
  - [Adding a Vue component](#adding-a-vue-component)
  - [Adding an Author component with props](#adding-an-author-component-with-props)
  - [Adding a code block to your post](#adding-a-code-block-to-your-post)
  - [Creating a previous and next component](#creating-a-previous-and-next-component)
  - [Working with the API](#working-with-the-api)
  - [List all the blog posts](#list-all-the-blog-posts)
  - [Using the where query to create an Author page](#using-the-where-query-to-create-an-author-page)
  - [Add a search field](#add-a-search-field)
- [Live editing our content](#live-editing-our-content)
- [Generating our content](#generating-our-content)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

## Getting started

### Installation

To get started with content module we will first need to install the module using npm or yarn.

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

Then we can add it to our modules property inside our nuxt.config file.

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxt/content']
}
```

<base-alert>

If you have created a new project with `create-nuxt-app` you can choose to add the content module and therefore it will be installed for you.

</base-alert>

### Let's create our markdown page

The content module works by reading the files in our `content/` directory.

```bash
mkdir content
```

<base-alert>

If you have created your project with `create-nuxt-app`, the `content/` directory will be already created.

</base-alert>

Let's create an `articles/` directory where we can add the articles for our blog.

```bash
mkdir content/articles
```

The content module can parse markdown, csv, yaml, json, json5 or xml. Let's create our first article with a markdown file:

```bash
touch content/articles/my-first-blog-post.md
```

We can now add a title and text for our blog post:

```markdown
# My first blog post

Welcome to my first blog post using content module
```

<base-alert>

In markdown we create a `<h1>` title by using `#`. Make sure you leave a space between it and your blog title. For more info on writing in markdown see the [basic syntax guide](https://www.markdownguide.org/basic-syntax).

</base-alert>

### Displaying your content

To display our content in our page, we can use a [dynamic page](/docs/2.x/directory-structure/pages#dynamic-pages) by prefixing the page with an underscore(`_`). By creating a page component named `_slug.vue` inside our blog folder, we are able to use the `params.slug` variable provided by vue router to get the name of each article.

```bash
touch pages/blog/_slug.vue
```

Then we can use `asyncData` in our page component to fetch our article content before the page has been rendered. We can have access to our content through the context by using the variable `$content`. As we want to fetch a dynamic page we also need to know which article to fetch with `params.slug` which is available to us through [the context](/docs/2.x/internals-glossary/context).

```html{}[pages/blog/_slug.vue]
<script>
  export default {
    async asyncData({ $content, params }) {
      // fetch our article here
    }
  }
</script>
```

Inside our `asyncData` function we create a variable named `article` and fetch our content using the `await` followed by `$content`. We need to pass into `$content` what we want to fetch, which in our case is the article folder followed by the slug, which we get from our URL params. We then chain the fetch method to the end and return the article which will contain the result of our fetch.

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

To display our content we are using the `<nuxt-content />` component by passing in the variable we returned into the `document` prop. In this example we have wrapped it in a HTML article tag as it is better semantic HTML but you can use a div or another HTML tag if you prefer.

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>
```

We can now run our dev server and go to the route [http://localhost:3000/blog/my-first-blog-post](http://localhost:3000/blog/my-first-blog-post) and we should see our content from our markdown file.

<img alt="content from markdown" src="/blog/creating-blog-with-nuxt-content/get-started-with-nuxt-content.png">

### Default Injected variables

The nuxt content module gives us access to injected variables that we can access and show in our template. Let's take a look at the default variables that are injected into our document:

- **body**: body text
- **dir**: directory
- **extension**: file extension (.md in this example)
- **path**: the file path
- **slug**: the file slug
- **toc**: an array containing our table of contents
- **createdAt**: the file creation date
- **updatedAt**: the date of the last file update

We can access all these variables by using the `article` variable that we created earlier. `article` is an object that contains all these extra injected variables that we have access to. Let's inspect them by printing it out using a `<pre>` tag.

```html{}[pages/blog/_slug.vue]
<pre> {{ article }} </pre>
```

Now on our page we can see we have an object with a variable property which is an empty array and a body variable which has our h1 and p tag as well as some other info that we will look at later. If we scroll down you will see we have all the other variables that we have access to.

```bash
"dir": "/articles",
"path": "/articles/my-first-blog-post",
"extension": ".md",
"slug": "my-first-blog-post",
"createdAt": "2020-06-22T10:58:51.640Z",
"updatedAt": "2020-06-22T10:59:27.863Z"
```

This means we can access these variables by using our article variable followed by the what we want to use. For example `article.updatedAt` will give us the date the post was last updated.

```html{}[pages/blog/_slug.vue]
<p>Post last updated: {{ article.updatedAt }}</p>
```

As you can see the date is not that human friendly. We can format this by creating a method that takes in a date and returns a new date with the options of year, month and day formatted to how we want.

```js{}[pages/blog/_slug.vue]
methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
 }
```

And then in our template we can use the formatDate method passing in the date we get from our content which will return a nicely formatted date for us.

```html{}[pages/blog/_slug.vue]
<p>Article last updated: {{ formatDate(article.updatedAt) }}</p>
```

### Custom Injected variables

We can also add custom injected variables by adding a block of YAML front matter to our markdown file. It must be at the top the file and must be a valid YAML format set between three triple dashed lines. This is useful for adding SEO variables such as title, description and image of your article.

```yaml{}[content/articles/my-first-blog-post.md]
---
title: My first Blog Post
description: Learning how to use @nuxt/content to create a blog
img: first-blog-post.jpg
alt: my first blog post
---

```

We now have a title, description, img and alt variable that we can access to by using our `article` object variable.

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <h1>{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <img :src="article.img" :alt="article.alt" />
    <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>

    <nuxt-content :document="article" />
  </article>
</template>
```

<base-alert>

In order to render images included in the YAML of the article we either need to place them in the static folder or use the syntax: `` :src="require(`~/assets/images/${article.img}`)" ``.

Images included in the article content should always be placed **in the static folder** as @nuxt/content is independent of Webpack. The static folder doesn't go through webpack whereas the assets folder does.

</base-alert>

### Styling our markdown content

If we inspect this page we can see that everything written inside our markdown is wrapped inside a div with a class of nuxt-content. That means we can easily add styles to all our elements coming from our markdown file by wrapping them in the nuxt-content class.

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

All other tags that come from our YAML front matter can be styled as normal either using [TailwindCSS](https://tailwindcss.com/) or adding css in the style tag.

To use scoped styles with the nuxt-content class you need to use a deep selector: `/deep/`, `::v-deep` or `>>>`

Our markdown tags are converted into the correct tags which means we now have two `<h1>` tags. We should now remove the one from our markdown file.

### Adding an icon to our headings anchor

Notice that inside the `<h2>` tag there is an `<a>` tag with a `href` that includes an anchor to link to itself and a `span` tag inside it with `icon` and `icon-link` classes. This is useful for linking to that section of the page. The links in the headings are empty and therefore hidden so let's add a style to them. Using the icon classes we can add an svg as a background image for our icon. You will have to first add the svg to your assets folder. In this example I have added it to an svg folder and I have taken the icon from [Steve Schoger's Hero Icons.](https://github.com/sschoger/heroicons-ui)

```css{}[pages/blog/_slug.vue]
.icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
```

### Add a table of contents

The generated `toc` variable allows us to add a table of contents to our blog post. Let's add some headings to our blog post.

```markdown
## This is a heading

This is some more info

## This is another heading

This is some more info
```

Now we can see these new headings inside the `toc` array with an id, a depth and the text. The depth value refer to the heading tag value, so `<h2>` value is 2, `<h3>` value is 3, etc.

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

As we have access to the `toc` id and text we can loop over these and print each one out and use the `<NuxtLink>` component to link to the id of the section we want to link to.

```html{}[pages/blog/_slug.vue]
<nav>
  <ul>
    <li v-for="link of article.toc" :key="link.id">
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</nav>
```

Now the ToC links are working and clicking on one will bring us to the correct part of the document. The content module automatically adds an id and a link to each heading. If we inspect one of the headings from our markdown file in our dev tools we will see our `<h2>` tag has an id. This is the same id that is found in the `toc` which is basically how the `toc` can link to the correct heading.

We can improve this further by using dynamic classes to style the heading classes based on the depth of the heading which we can add to our nuxt-link tag. If the link has a depth of 2 add a padding on the y axis and if the the depth is 3 add a margin left and a padding bottom. Here we are using [TailwindCSS](https://tailwindcss.com/) classes but feel free to use custom class names and styles.

```html{}[pages/blog/_slug.vue]
:class="{ 'py-2': link.depth === 2, 'ml-2 pb-2': link.depth === 3 }"
```

### Use HTML in your markdown files

Sometimes we might want to add HTML to our markdown files. Let's add a div with some classes so it has a background color of blue with white text, some padding and a margin bottom.

```html{}[content/articles/my-first-blog-post.md]
<div class="bg-blue-500 text-white p-4 mb-4">
  This is HTML inside markdown that has a class of note
</div>
```

### Adding a Vue component

We can also add Vue components inside our markdown files. This means if we are re-using components such as an info or alert box, we can create one with the styles we need and pass in the text as a slot.

We can now add components to our application by setting the property `components` to `true` in our `nuxt.config file`. (since v2.13)

```js{}[nuxt.config.js]
export default {
  components: true
}
```

Auto importing components will not work for `<nuxt-content>` unless we globally register them by adding a global folder inside the components folder.

```bash
mkdir components/global
```

We can then create our InfoBox component inside this folder.

```html{}[components/global/InfoBox.vue]
<template>
  <div class="bg-blue-500 text-white p-4 mb-4">
    <p><slot name="info-box">default</slot></p>
  </div>
</template>
```

Then in our markdown these components will be available without having to import them.

```markdown{}[content/articles/my-first-blog-post.md]
<info-box>
  <template #info-box>
    This is a vue component inside markdown using slots
  </template>
</info-box>
```

<base-alert>

The global components will be available throughout our whole application so be careful when adding components to this folder. This works different to adding components in the components folder which are only added if they are being used.

</base-alert>

### Adding an Author component with props

An other advantage of the YAML properties is that we can make them available to our component through props. For example, we can have an about the author component and if we have guest bloggers the author will change. In our markdown file we can add a new object to our frontmatter which contains the author's name and bio and image.

```yaml{}[content/articles/my-first-blog-post.md]
---
author:
  name: Benjamin
  bio: All about Benjamin
  image: https://images.unsplash.com/.....
---

```

We can now create the author component.

```bash
touch components/global/Author.vue
```

Here we create a div the author image, a title of Author and a dynamic name and bio of the author.

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

Styles have been removed from these examples, feel free to add the styles yourself or copy the styles from the [demo code](https://github.com/nuxt-academy/demo-blog-nuxt-content).

</base-alert>

Then in our script tag we can add our props of author which is an object and set required to true.

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

To use the component we will need to add it to our markdown and pass in our props.

```markdown{}[content/articles/my-first-blog-post.md]
<author :author="author"></author>
```

<base-alert>

You cannot use self closing tags in markdown, for instance, `<author :author="author" />` won't work.

</base-alert>

Putting the component here means we will have to repeat it for every article. In this case it would be better to add it directly to the slug page. We will need to change the author prop to `article.author`.

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

We can now move this component out of the global folder and into the components folder directly and it will be auto imported into our slug page as we are using it in the template.

### Adding a code block to your post

With the content module we can style our code blocks with the automatic inclusion of [Prism](https://prismjs.com/). That means we can write our code block using the correct markdown syntax and our code block will display with styling depending on the language.

```js
export default {
  nuxt: 'is the best'
}
```

```html
<p>code styling is easy</p>
```

We can also add the file name of the code block by adding it inside square brackets after the code block's language.

```js[my-first-blog-post.md]
export default {
  nuxt: 'is the best'
}
```

The file name will be converted to a span with a filename class which we can then style how we like. For this example I am using tailwind classes but you can use ordinary CSS if you prefer.

```css{}[assets/css/tailwind.css]
.nuxt-content-highlight {
  @apply relative;
}
.nuxt-content-highlight .filename {
  @apply absolute right-0 text-gray-600 font-light z-10 mr-2 mt-1 text-sm;
}
```

Different theme can be used, for example [prism-themes](https://github.com/PrismJS/prism-themes), we can install it and then add our preferred theme to the content options of your `nuxt.config file`.

```bash
npm install prism-themes
// or
yarn add prism-themes
```

Then in our `nuxt.config` file, in the content options, we can add a markdown object with prism and add the theme that we want to use.

```js{}[nuxt.config.js]
content: {
  markdown: {
    prism: {
      theme: 'prism-themes/themes/prism-material-oceanic.css'
    }
  }
}
```

### Creating a previous and next component

We now have a pretty complete blog post but wouldn't it be great if users could easily go from one post to another. First let's duplicate our post so we have 3 posts. Then, let's create a new component for our previous and next posts.

```bash
touch components/PrevNext.vue
```

In this component we use a `v-if` inside our `NuxtLink` component to see if there is a previous blog post and if there is we add a link to it. We can print out the title of our article using the `prev` and `next` variables as these contain all the information from the article. This means we could create a card with an image and description to show the next and previous article but for this example we will just display the title. If there isn't a previous post we just print an empty span which is useful for styling purposes. We then do the exact same with our next link.

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

In our component we pass the props `prev` and `next` to makes them available to us on our blog post page.

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

We can now get our previous and next articles by adding them to our `asyncData`. We create an array of const with the name `prev` and `next` and we await the content from the articles folder. This time we only need the title and the slug so we can chain `only()` to our await and pass in title and slug.

We can use the `sortBy()` method to sort our data by the createdAt date in ascending order. We then use the `surround()` method and pass in the slug from params so that it can get the correct slug for the previous and next posts.

We then return prev and next just like we did with article.

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

We can now add our `<prev-next>` component to our slug page passing in the props of prev and next.

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

As we have set `components: true` in our nuxt.config file we do not need to import this component in order to be able to use it.

</base-alert>

### Working with the API

When querying data the Content module gives us access to the API so that we can query it directly to see what is being returned. We have access to the API in dev mode with the following url: [http://localhost:3000/\_content/](http://localhost:3000/_content/). In our example this will be empty as our articles are in a folder called articles therefore we need to use this url [http://localhost:3000/\_content/articles](http://localhost:3000/_content/articles) to see our list of articles.

<base-alert type="info">

We can see individual articles by adding the name of the slug [http://localhost:3000/\_content/articles/my-first-blog-post](http://localhost:3000/_content/articles/my-first-blog-post)

</base-alert>

<base-alert type="info">

You can use a chrome extension such as [JSON Viewer Pro](https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc) so you can better see your results.

</base-alert>

We can now query our results directly in the url and see our results as a JSON which we can then use to create our blog index page that will have a list of all the blog posts. We can see using our API what we have available to us and for the blog index page we only want to return the title, description, img, slug and author. Let's take a look at what that would be like.

[http://localhost:3000/\_content/articles?only=title&only=description&only=img&only=slug&only=author](http://localhost:3000/_content/articles?only=title&only=description&only=img&only=slug&only=author)

<video poster="https://res.cloudinary.com/nuxt/video/upload/v1588091670/content-api_aocbcn.jpg" loop="loop" plays-inline="true" controls="controls">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/content-api_aocbcn.webm" type="video/webm">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1592314331/content-api_aocbcn.mp4" type="video/mp4">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/content-api_aocbcn.ogv" type="video/ogg">
</video>

### List all the blog posts

We can now create our blog index page to list out our blog posts. As we already have an index page created we just need to delete all the demo code inside this page.

<base-alert type="info">

In the [demo code](https://github.com/nuxt-academy/demo-blog-nuxt-content) I used the main index page instead of creating an index file inside the blog folder because for this example I have no other pages but normally you might have a home page, contact page and then the blog page etc.

</base-alert>

Passing in `$content` and `params` to the context in our `asyncData` function we then use a const of articles to await our returned content by passing into `$content` the arguments of articles, as that is the folder where our articles are and our slug from params. We can then use `only()` to get our title, description, img, slug and author as we tested from our API this will give us exactly what we need. We can use `sortBy()` to sort by the createdAt date and then we chain our `fetch()` to the end and return our articles.

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

Our articles are now available to us just like any data property so we can use it in our template using a `v-for` to loop over all the articles and print out the article title and author name, the description, the date it was updated and the image using the `<NuxtLink>` component to link to the slug of the article.

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

### Using the where query to create an Author page

With the content module we can also filter our results using the where query. We could have an author page that shows the author details and all posts by that author.

```bash
touch pages/blog/author/_author.vue
```

Just like before we use asyncData to fetch our data but this time we add in a where() method. We want to get the posts where the author is the same as the author name that comes from params.

For example:

[http://localhost:3000/\_content/articles?author.name=Maria](http://localhost:3000/_content/articles?author.name=Maria)

Because we have used an object for our author we need to add nestedProperties as an option to our content property in our nuxt.config file and pass in what we want to query (only for dot notation queries).

```js{}[nuxt.config.js]
export default {
  content: {
    nestedProperties: ['author.name']
  }
}
```

As we can see we get all our data back only for the author Maria. If we were to use maria without a capital letter we wouldn't get anything back. We can therefore use `$regex` so that it remains with a capital letter.

We then fetch all the details we want to show on this page. In the last example we used the `only()` method to return what we wanted but as we require quite a lot of content we can instead use the `without()` method and pass in what we don't want to return which is the body of the post.

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

We can then use our data to print out a nice author page showing the author name and bio as well as each post.

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

Please note all styles have been removed from this example. You can either style the page yourself or copy the styles from the [demo code](https://github.com/nuxt-academy/demo-blog-nuxt-content).

</base-alert>

To format our date we can add the method we created earlier:

```js{}[pages/blog/author/_author.vue]
methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
```

And of course we should link from our blog post to our new author page.

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

### Add a search field

The Nuxt content module gives us the possibility of searching through our articles by using the `search()` method.

Let's first create a search component.

```bash
touch components/AppSearchInput.vue
```

We then add a data property which will return the searchQuery which starts off as an empty string and the articles array which is also empty. We then use the watch method from Vue to watch our searchQuery function passing in the argument of searchQuery. If there is no searchQuery then the articles array is empty and we just call return. If not we get our articles and await our `$content` passing in articles. We can now use the `limit()` method to limit the number of returned results and then we use the `search()` method passing in our searchQuery as an argument and then we chain the `fetch()` method to the end.

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

Next we need to add to our template an input and using `v-model` we connect it to our SearchQuery data property. Then if there are articles we use a `v-for` to list out the articles using the `<NuxtLink>` component to link to them.

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

We can now use our `<AppSearchInput>` component by adding it anywhere on our page.

```html{}[pages/_slug.vue]
<AppSearchInput />
```

<base-alert type="info">

See the [demo code](https://github.com/nuxt-academy/demo-blog-nuxt-content) for improved styling of this page as well as the header component that was added which includes the search component and is therefore displayed on the author and index page.

</base-alert>

## Live editing our content

Our blog is looking really great and if we need to modify any of the content on the page we can do so directly in the browser thanks to the live edit feature. All you have to do is double click on your page while in dev mode and and the live edit will open. Here you can modify any of your text and also the front matter. You can even add a component that is in the global components folder and just by clicking away you will see your changes live in the browser and you will see in your editor and console that the file has been modified and saved.

<video poster="https://res.cloudinary.com/nuxt/video/upload/v1588091670/live-edit-content_kdorvi.jpg" loop="loop" plays-inline="true" controls="controls">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/live-edit-content_kdorvi.webm" type="video/webm">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1592314331/live-edit-content_kdorvi.mp4" type="video/mp4">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1588091670/live-edit-content_kdorvi.ogv" type="video/ogg">
</video>

## Generating our content

If we now want to deploy our amazing new blog we can run the `nuxt generate` command which will build our app adding all our webpack assets and creating .js bundles for us and then export our html, css, js and images as static assets. You will also notice that we didn't have to add a routes property or do anything to get our new page as the **crawler** will crawl all links for us and generate our dynamic routes for us.

We can then use the `nuxt start` command which will serve our production ready static site so we can see it in our browser before deploying.

With nuxt generate if only our content changes it means the `nuxt generate` command will only export the static pages and will not go through webpack to rebuild the site meaning our content will be updated in seconds.

## Conclusion

Working with content is great fun and there is so much more you can do and build. Don't forget to showcase your work to use on our discord channel named **showcase** so we can see the cool things you have created and perhaps even feature them in our NuxtLetter. Not signed up yet? Well now is a great time to [sign up](https://nuxtjs.org/#subscribe-to-newsletter) as we keep releasing more new content and features for Nuxt.js. Enjoy :)

## Further Reading

For more info on how to improve your blog check out these articles by by [Gareth Redfern](https://twitter.com/garethredfern):

- [Adding a Sitemap Using Nuxt Content](https://redfern.dev/articles/adding-a-sitemap-using-nuxt-content/)
- [Adding Social Media & SEO Meta Data Using Nuxt Content](https://redfern.dev/articles/adding-social-media-seo-meta-data-using-nuxt-content)
- [Adding Pagination With Nuxt Content](https://redfern.dev/articles/adding-pagination-nuxt-content-blog)
