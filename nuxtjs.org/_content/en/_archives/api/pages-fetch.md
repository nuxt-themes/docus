---
title: 'The fetch Method'
description: The `fetch` method is used to fill the store before rendering the page, it's like the `asyncData` method except it doesn't set the component data.
menu: fetch
category: pages
position: 22
---

## Nuxt >= 2.12

Nuxt.js `v2.12` introduces a new hook called `fetch` **in any of your Vue components**.

See [live demo](https://nuxt-new-fetch.surge.sh) and [code example](https://github.com/nuxt/nuxt.js/tree/dev/examples/new-fetch).

<div class="Alert Alert--orange">

`fetch(context)` has been deprecated, instead you can use an [anonymous middleware](/api/pages-middleware#anonymous-middleware) in your page: `middleware(context)`

</div>

### When to use fetch?

Every time you need to get **asynchronous** data. `fetch` is called on server-side when rendering the route, and on client-side when navigating.

It exposes `$fetchState` at the component level:

- `$fetchState.pending`: `Boolean`, allows you to display a placeholder when `fetch` is being called _on client-side_.
- `$fetchState.error`: `null` or `Error`, allows you to display an error message
- `$fetchState.timestamp`: `Integer`, is a timestamp of the last fetch, useful for caching with `keep-alive`

If you want to call the `fetch` hook from your template use:

```html
<button @click="$fetch">Refresh</button>
```

or component method:

```javascript
// from component methods in script section
export default {
  methods: {
    refresh() {
      this.$fetch()
    }
  }
}
```

You can access the Nuxt [context](/api/context) within the fetch hook using `this.$nuxt.context`.

### Options

- `fetchOnServer`: `Boolean` or `Function` (default: `true`), call `fetch()` when server-rendering the page
- `fetchDelay`: `Integer` (default: `200`), set the minimum executing time in milliseconds (to avoid quick flashes)

<div class="Alert Alert--green">
  
When `fetchOnServer` is falsy (`false` or returns `false`), `fetch` will be called only on client-side and `$fetchState.pending` will return `true` when server-rendering the component.

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

### Example

<div class="Alert Alert--green">

We are going to use the official [http module](https://http.nuxtjs.org) to make HTTP requests.

</div>

Let's have a blog with our home page listing our posts:

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

If you go directly to [http://localhost:3000/](http://localhost:3000/), you will see directly the full list of posts which has been **server-rendered** (great for SEO).

<img width="669" alt="Screenshot 2019-03-11 at 23 04 57" src="https://user-images.githubusercontent.com/904724/54161334-1f9e8400-4452-11e9-97bf-996a6e69d9db.png">

<div class="Alert Alert--green">
  
Nuxt will intelligently detect what data you mutated inside `fetch` and will optimize the JSON included in the returned HTML.

</div>

Now, let's add `pages/posts/_id.vue` page to display a post on `/posts/:id`.

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

When navigating, you should now see `"Loading post #..."` on client-side, and no loading when refreshing a post (hard refresh on the browser).

<img width="669" alt="fetch-nuxt3" src="https://user-images.githubusercontent.com/904724/54161844-d3544380-4453-11e9-9586-7428597db40e.gif">

<div class="Alert Alert--green">
  
If the component contains the `fetch` hook, you will also have access to `this.$fetch()` to re-call the `fetch` hook (`$fetchState.pending` will become `true` again).

</div>

### Listening to query string changes

The `fetch` hook **is not called** on query string changes by default. To watch for query changes you can add a watcher on `$route.query` and call `$fetch`:

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // Called also on query changes
  }
}
```

### Caching

You can use `keep-alive` directive in `<nuxt/>` and `<nuxt-child/>` component to save `fetch` calls on pages you already visited:

`layouts/default.vue`

```html
<template>
  <nuxt keep-alive />
</template>
```

<div class="Alert Alert--green">
  
You can also specify the [props](https://vuejs.org/v2/api/#keep-alive) passed to `<keep-alive>` by passing a prop `keep-alive-props` to the `<nuxt>` component.<br>
Example: `<nuxt keep-alive :keep-alive-props="{ max: 10 }" />` to keep only 10 page components in memory.

</div>

### Using `activated` hook

Nuxt will directly fill `this.$fetchState.timestamp` (timestamp) of the last `fetch` call (SSR included). You can use this property combined with `activated` hook to add a 30 seconds cache to `fetch`:

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
      // Call fetch again if last fetch more than 30 sec ago
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

The navigation to the same page will not call `fetch` if last `fetch` call was before 30 sec ago.

![fetch-keep-alive-nuxt](https://user-images.githubusercontent.com/904724/54164405-c6881d80-445c-11e9-94e0-366406270874.gif)

## Nuxt <= 2.11

> The fetch method is used to fill the store before rendering the page, it's like the `asyncData` method except it doesn't set the component data.

- **Type:** `Function`

The `fetch` method, _if set_, is called every time before loading the component (**only for page components**). It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes.

The `fetch` method receives [the `context`](/api/context) object as the first argument, we can use it to fetch some data and fill the store. To make the `fetch` method asynchronous, **return a Promise**, Nuxt.js will wait for the promise to be resolved before rendering the component.

<div class="Alert Alert--orange">

**Warning**: You **don't** have access to the component instance through `this` inside `fetch` because it is called **before initiating** the component.

</div>

Example of `pages/index.vue`:

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

You can also use `async`/`await` to make your code cleaner:

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

### Vuex

If you want to call a store action, use `store.dispatch` inside `fetch`, make sure to wait for the end of the action by using `async`/`await` inside:

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

### Listening to query string changes

The `fetch` method **is not called** on query string changes by default. If you want to change this behavior, for example when building a pagination component, you can setup parameters that should be listened to through the `watchQuery` property of your page component. Learn more on the [API `watchQuery` page](/api/pages-watchquery).
