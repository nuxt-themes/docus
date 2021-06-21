---
title: content
description: Augmentez le potentiel de votre application Nuxt.js avec le module `@nuxt/content` grâce auquel on peut écrire dans un répertoire `content/` et récupérer du Markdown, JSON, YAML et des fichiers CSV à travers une API dans le style de MongoDB, qui remplit donc le rôle d'un **CMS headless basé sur Git**.
position: 4
category: directory-structure
img: /guides/nuxt-content.svg
imgAlt: module content de nuxt
questions:
  - question: Quel est le nom par défaut du répertoire dans lequel on ajoute nos fichiers markdown ?
    answers:
      - markdown
      - content
      - pages
    correctAnswer: content
  - question: Quel composant est utilisé dans les templates pour afficher le corps de votre page markdown ?
    answers:
      - <markdown>
      - <nuxt>
      - <nuxt-content>
    correctAnswer: <nuxt-content>
  - question: Quelle classe est automatiquement ajoutée afin que l'on puisse ajouter du style à notre markdown ?
    answers:
      - .content
      - .nuxt-content
      - .markdown
    correctAnswer: .nuxt-content
  - question: Le module content peut gérér le markdown, csv, yaml et les fichiers json
    answers:
      - true
      - false
    correctAnswer: true
  - question: On peut ajouter des composants vue à nos fichiers markdown
    answers:
      - true
      - false
    correctAnswer: true
  - question: Qu'utilise-t-on pour lister, filtrer et chercher notre contenu ?
    answers:
      - $nuxt-content()
      - $content()
      - $nuxt()
    correctAnswer: $content()
  - question: Qu'utilise-t-on pour récupérer les articles précédents et suivants ?
    answers:
      - .surround(slug)
      - .prev-next(slug)
      - .slug()
    correctAnswer: .surround(slug)
  - question: Des classes PrismJS sont ajoutées par défaut à nos blocks de code
    answers:
      - true
      - false
    correctAnswer: true
  - question: Quel est l'URL par défaut pour accéder à l'API et voir notre JSON ?
    answers:
      - http://localhost:3000/content
      - http://localhost:3000/_content
      - http://localhost:3000/api
    correctAnswer: http://localhost:3000/_content
  - question: Quelles balises d'entête sont utilisées pour créer une table des matières ?
    answers:
      - h1 et h2
      - h2 et h3
      - h1, h2 et h3
    correctAnswer: h2 et h3
  - question: On peut utiliser le module content avec la génération de site statique
    answers:
      - true
      - false
    correctAnswer: true
---

Augmentez le potentiel de votre application Nuxt.js avec le module `@nuxt/content` grâce auquel on peut écrire dans un répertoire `content/` et récupérer du Markdown, JSON, YAML et des fichiers CSV à travers une API dans le style de MongoDB, qui remplit donc le rôle d'un **CMS headless basé sur Git**.

<app-modal :src="img" :alt="imgAlt"></app-modal>

### Rechargement à chaud lors du développement

En développement, le module `content` est super rapide quand il s'agit de rechargement à chaud car il ne doit pas passer par Webpack lorsque l'on fait des changements à nos fichiers markdown. On peut aussi écouter l'événement `content:update` et créer un plugin qui à chaque fois que l'on va mettre à jour un fichier dans le répertoire `content`, va propager une méthode `fetchCategories` par exemple.

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/advanced#handling-hot-reload) pour davantage de détails.

</base-alert>

### Afficher le contenu

On peut directement utiliser le composant `<nuxt-content>` dans notre template pour afficher le corps de la page.

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>
```

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/displaying#component) pour davantage de détails.

</base-alert>

### Styliser votre contenu

En fonction de ce que l'on va utiliser pour styliser notre application, on pourrait avoir besoin d'écrire un peu de style pour afficher notre markdown proprement.

Le composant `<nuxt-content>` va automatiquement ajouter une classe `.nuxt-content`, afin que nous puissions personnaliser nos styles.

```html
<style>
  .nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
  }
  .nuxt-content p {
    margin-bottom: 20px;
  }
</style>
```

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/displaying#style) pour davantage de détails.

</base-alert>

### Gérer les formats Markdown, CSV, YAML, JSON(5)

This module converts your .md files into a JSON AST tree structure, stored in a body variable. You can also add a YAML front matter block to your markdown files or a .yaml file which will be injected into the document. You can also add a json/json5 file which can also be injected into the document. And you can use a .csv file where rows will be assigned to the body variable.

Ce module convertit nos fichiers `.md` en une structure arborescente de type [JSON AST](https://astexplorer.net/#/gist/6e328cf76a27ca85e552c9cb583cdd74/1077c8842337972509a29bc9063d17bf90a1a492), stockée dans une variable `body`.

```md
---
title: Mon premier article de blog
description: Apprendre à se servir de @nuxt/content pour créer un blog
---
```

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/writing#markdown) pour davantage de détails.

</base-alert>

### Composants Vue dans le markdown

On peut utiliser les composants Vue directement dans les fichiers markdown. Il faudra cependant utiliser les composants sous leur écriture `kebab-case` et non avec des balises auto-fermantes.

```html{}[components/global/InfoBox.vue]
<template>
  <div class="bg-blue-500 text-white p-4 mb-4">
    <p><slot name="info-box">valeur par défault</slot></p>
  </div>
</template>
```

```html{}[content/articles/my-first-blog-post.md]
<info-box>
  <template #info-box>
    Ceci est un composant Vue à l'intérieur d'un markdown, ici on injecte du
    contenu en utilisant les slots
  </template>
</info-box>
```

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/writing#vue-components) pour davantage de détails.

</base-alert>

### API entièrement recherchable

On peut utiliser `$content()` pour lister, filtrer et chercher notre contenu facilement.

```html{}[pages/blog/index.vue]
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

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/fetching#methods) pour davantage de détails.

</base-alert>

### Articles précédents et suivants

Le module `content` inclut un `.surround(slug)` qui nous permet de récupérer facilement les articles précédents et suivants.

```js
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

```html
<prev-next :prev="prev" :next="next" />
```

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/fetching#surroundslug-options) pour davantage de détails.

</base-alert>

### Recherche par texte complet

Le module `content` possède une recherche par texte complet afin que l'on puisse rechercher simplement dans nos fichiers markdown sans avoir à installer quoi que ce soit d'autre.

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

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/fetching#searchfield-value) pour davantage de détails.

</base-alert>

### Surbrillance de la syntaxe

Ce module va automatiquement envelopper les blocks de code et y appliquer les classes de [PrismJS](https://prismjs.com/). On peut bien sûr ajouter un thème PrismJS différent voire même le désactiver totalement.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add prism-themes
```

  </code-block>
  <code-block label="npm">

```bash
npm install prism-themes
```

  </code-block>
</code-group>

```js{}[nuxt.config.js]
content: {
  markdown: {
    prism: {
      theme: 'prism-themes/themes/prism-material-oceanic.css'
    }
  }
}
```

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/writing#syntax-highlighting) pour davantage de détails.

</base-alert>

### Personnaliser le parsing du markdown

À l'origine, le markdown ne supporte pas la surbrillance des lignes que ce soit dans les blocks de code ou dans les noms de fichiers. Le module `content` permet cela avec sa propre syntaxe. Les lignes numérotées seront ajoutées à une balise `pre` dans l'attribut data-line et le nom du fichier sera converti en un `span` avec une classe `filename`, afin d'être stylisé.

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/writing#codeblocks) pour davantage de détails.

</base-alert>

### Génération d'une table des matières

Une propriété `toc` (pour Table of Contents) contenant un tableau, sera injectée dans notre document, listant tous les entêtes avec leurs titres et identifiants, afin que l'on puisse les lier.

```html{}[pages/blog/_slug.vue]
<nav>
  <ul>
    <li v-for="lien of article.toc" :key="lien.id">
      <NuxtLink :to="`#${lien.id}`">{{ lien.text }}</NuxtLink>
    </li>
  </ul>
</nav>
```

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/writing#table-of-contents) pour davantage de détails.

</base-alert>

### Un QueryBuilder d'API puissant

Le module `content` possède un puissant QueryBuilder d'API (similaire à MongoDB) qui nous permet de facilement voir le JSON de chaque répertoire à l'URL `http://localhost:3000/_content/`. L'extrémité est accessible via des requêtes `GET` et `POST`, on peut donc utiliser des query params.

`http://localhost:3000/_content/articles?only=title&only=description&limit=10`

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/advanced/#api-endpoint) pour davantage de détails.

</base-alert>

### Personnaliser avec des hooks

On peut utiliser des hooks pour personnaliser le module afin d'ajouter de la data au document avant que ce dernier ne soit stocké.

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/advanced#hooks) pour davantage de détails.

</base-alert>

### Intégration avec @nuxtjs/feed

Dans le cas d'articles, le contenu peut être utilisé pour générer un fil d'actualité en utilisant le module [@nuxtjs/feed](https://www.npmjs.com/package/@nuxtjs/feed).

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/integrations/#nuxtjsfeed) pour davantage de détails.

</base-alert>

### Support pour la génération de site statique

Ce module marche avec la génération de site statique en utilisant `nuxt generate`. Toutes les routes seront automatiquement générées grâce à la fonctionnalité du crawler de Nuxt.js.

<base-alert>

Si on utilise Nuxt.js avec une version <2.13 et que l'on a besoin de spécifier des routes dynamiques, il faut utiliser la méthode `generate` avec le module `@nuxt/content` de manière programmatique.

</base-alert>

<base-alert type="next">

Se référer à la [documentation du module content](https://content.nuxtjs.org/advanced#programmatic-usage) pour davantage de détails.

</base-alert>

<base-alert type="next">

Pour voir la documentation complète du [module content](https://content.nuxtjs.org/).

</base-alert>

<quiz :questions="questions"></quiz>
