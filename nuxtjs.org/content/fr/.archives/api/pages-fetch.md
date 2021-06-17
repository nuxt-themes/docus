---
title: 'API : la méthode fetch'
description: La méthode `fetch` est utilisée pour remplir le store avant de rendre la page, elle est similaire à la méthode `asyncData` sauf qu'elle ne définit pas les données du composant.
menu: fetch
category: pages
position: 22
---

## Nuxt >= 2.12

Nuxt.js `v2.12` introduit un nouvel écouteur appelé `fetch` **dans n'importe lequel de vos composants Vue**.

Voir la [démo en direct](https://nuxt-new-fetch.surge.sh) et [le code d'exemple](https://github.com/nuxt/nuxt.js/tree/dev/examples/new-fetch).

<div class="Alert Alert--orange">

`fetch(context)` est obsolète, vous pouvez utiliser à la place un [middleware anonyme](/api/pages-middleware#anonymous-middleware) dans votre page: `middleware(context)`

</div>

### Quand utiliser fetch?

Chaque fois que vous devez obtenir des données **asynchrones**. `fetch` est appelé côté serveur lors du rendu du chemin et côté client lors de la navigation.

Il expose `$fetchState` au niveau du composant:

- `$fetchState.pending`: `Boolean`, vous permet d'afficher quelque chose lorsque `fetch` est appelé _côté client_.
- `$fetchState.error`: `null` ou `Error`, vous permet d'afficher un message d'erreur.
- `$fetchState.timestamp`: `Integer`, est un timestamp de la dernière extraction, utile pour la mise en cache avec `keep-alive`

Si vous souhaitez appeler `fetch` à partir de vos méthodes de composant ou de votre mise en page, utilisez:

```html
<button @click="$fetch">Refresh</button>
```

Vous pouvez accéder au [contexte](/api/context) de Nuxt à travers l'écouteur de fetch en utilisant `this.$nuxt.context`.

### Options

- `fetchOnServer`: `Boolean` ou `Function` (par défaut: `true`), appeler `fetch()` lors du rendu du serveur sur la page
- `fetchDelay`: `Integer` (par défaut: `200`), définir le temps d'exécution minimum en millisecondes (pour éviter les flashs rapides)

<div class="Alert Alert--green">
  
Lorsque `fetchOnServer` est définie sur faux (`false` ou renvoie `false`), `fetch` sera appelée uniquement côté client 
et `$fetchState.pending` renverra `true` lors du rendu du serveur par le composant.

</div>

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    },
    fetchOnServer: false
  }
</script>
```

### Exemple

<div class="Alert Alert--green">

Nous allons utiliser le [module http](https://http.nuxtjs.org) officiel pour faire des requêtes HTTP.

</div>

Récupérons un blog avec notre page d'accueil répertoriant nos articles:

`pages/index.vue`

```html
<template>
  <div>
    <h1>Blog posts</h1>
    <p v-if="$fetchState.pending">Fetching posts...</p>
    <p v-else-if="$fetchState.error">
      Error while fetching posts: {{ $fetchState.error.message }}
    </p>
    <ul v-else>
      <li v-for="post of posts" :key="post.id">
        <n-link :to="`/posts/${post.id}`">{{ post.title }}</n-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    }
  }
</script>
```

Si vous allez directement sur [http://localhost:3000/](http://localhost:3000/), vous verrez directement la liste complète des articles qui ont été **rendus par le serveur** (idéal pour le référencement) .

<img width="669" alt="Screenshot 2019-03-11 at 23 04 57" src="https://user-images.githubusercontent.com/904724/54161334-1f9e8400-4452-11e9-97bf-996a6e69d9db.png">

<div class="Alert Alert--green">
  
Nuxt détectera intelligemment les données que vous avez mutées dans `fetch` et optimisera le JSON inclus dans le code HTML renvoyé.

</div>

Maintenant, ajoutons la page `pages/posts/_id.vue` pour afficher une publication sur `/posts/:id`.

`pages/posts/_id.vue`

```html
<template>
  <div v-if="$fetchState.pending">Fetching post #{{$route.params.id}}...</div>
  <div v-else>
    <h1>{{ post.title }}</h1>
    <pre>{{ post.body }}</pre>
    <p><n-link to="/">Back to posts</n-link></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        post: {}
      }
    },
    async fetch() {
      this.post = await this.$http.$get(
        `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
      )
    }
  }
</script>
```

Lors de la navigation, vous devriez maintenant voir `"Fetching post #... "` côté client, et pas de chargement lors de l'actualisation d'un article (actualisation depuis le navigateur).

<img width="669" alt="fetch-nuxt3" src="https://user-images.githubusercontent.com/904724/54161844-d3544380-4453-11e9-9586-7428597db40e.gif">

<div class="Alert Alert--green">
  
Si le composant contient l'écouteur `fetch`, vous aurez également accès à `this.$fetch()` pour rappeler l'écouteur 
`fetch` (`$fetchState.pending` deviendra à nouveau` true`).

</div>

### Écoute des modifications de chaîne de requête

L'écouteur `fetch` **n'est pas appelé** lors des changements de chaîne de requête par défaut. Pour surveiller les changements de requête, vous pouvez ajouter un observateur sur `$route.query` et appeler `$fetch`:

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // Appelé également lors des modifications de requête
  }
}
```

### Mise en cache

Vous pouvez utiliser la directive `keep-alive` dans les composants `<nuxt />` et `<nuxt-child />` pour enregistrer les appels `fetch` sur les pages que vous avez déjà visitées:

`layouts/default.vue`

```html
<template>
  <nuxt keep-alive />
</template>
```

<div class="Alert Alert--green">
  
Vous pouvez également spécifier les [propriétés](https://vuejs.org/v2/api/#keep-alive) transmis à `<keep-alive>` en 
passant une propriété `keep-alive-props` au composant `<nuxt>` component.<br>
Exemple: `<nuxt keep-alive :keep-alive-props="{ max: 10 }" />` pour ne conserver que 10 composants de page en mémoire.

</div>

### Utilisation de l'écouteur `activated`

Nuxt remplira directement `this.$fetchState.timestamp` (timestamp) du dernier appel `fetch` (ssr inclus). Vous pouvez utiliser cette propriété combinée avec l'écouteur `activated` pour ajouter un cache de 30 secondes à `fetch`:

`pages/posts/_id.vue`

```html
<template> ... </template>

<script>
  export default {
    data() {
      return {
        post: {}
      }
    },
    activated() {
      // Récupération de l'appel si la dernière récupération remonte à plus de 30 secondes
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
      }
    },
    async fetch() {
      this.post = await this.$http.$get(
        `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
      )
    }
  }
</script>
```

La navigation vers la même page n'appellera pas `fetch` si le dernier appel `fetch` remonte à moins de 30 secondes.

![fetch-keep-alive-nuxt](https://user-images.githubusercontent.com/904724/54164405-c6881d80-445c-11e9-94e0-366406270874.gif)

## Nuxt <= 2.11

> La méthode fetch est utilisée pour remplir le store avant le rendu de la page, elle est similaire à la méthode `asyncData` sauf qu'elle ne définit pas les données du composant.

- **Type:** `Function`

La méthode `fetch`, _si définie_, est appelée à chaque fois avant de charger le composant (**uniquement pour les composants de page**). Elle sera appelée une fois côté serveur (lors de la première requête à l'application Nuxt) et côté client lors de la navigation vers d'autres routes.

La méthode `fetch` reçoit l'object [`context`](/api/context) comme premier argument. Nous pouvons l'utiliser pour récupérer des données et remplir le store. Pour rendre la méthode `fetch` asynchrone, **renvoyer une promesse**, Nuxt.js attendra que la promesse soit résolue avant de restituer le composant.

<div class="Alert Alert--orange">

**Avertissement**: Vous **n'avez** pas accès à l'instance du composant via `this` avec`fetch` car elle s'appelle **avant d'initier** le composant.

</div>

Exemple `pages/index.vue`:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    fetch({ store, params }) {
      return axios.get('http://my-api/stars').then(res => {
        store.commit('setStars', res.data)
      })
    }
  }
</script>
```

Vous pouvez également utiliser `async`/`await` pour rendre votre code plus propre:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    async fetch({ store, params }) {
      let { data } = await axios.get('http://my-api/stars')
      store.commit('setStars', data)
    }
  }
</script>
```

## Vuex

Si vous souhaitez appeler une action du store, utilisez `store.dispatch` à l'intérieur de la méthode `fetch`, assurez-vous d'attendre la fin de l'action en utilisant `async`/`await`:

```html
<script>
  export default {
    async fetch({ store, params }) {
      await store.dispatch('GET_STARS')
    }
  }
</script>
```

`store/index.js`

```js
// ...
export const actions = {
  async GET_STARS({ commit }) {
    const { data } = await axios.get('http://my-api/stars')
    commit('SET_STARS', data)
  }
}
```

## Écoute des changements de chaîne de requête

Par défaut, la méthode `fetch` **n'est pas appelée** lors d'un changement de chaîne de requête. Si vous souhaitez modifier ce comportement, par exemple lors de la construction d'un composant de pagination, vous pouvez configurer les paramètres à écouter via la propriété `watchQuery` de votre composant de page. En savoir plus sur la [propriété `watchQuery`](/api/pages-watchquery).
