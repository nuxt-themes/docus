---
title: Plugins
description: Nuxt.js vous permet de définir les plugins JavaScript à exécuter avant d'instancier l'application Vue.js racine. Cela est particulièrement pratique quand vous utilisez vos propres bibliothèques ou modules externes.
category: getting-started
position: 108
---

> Nuxt.js vous permet de définir les plugins JavaScript à exécuter avant d'instancier l'application Vue.js racine. Cela est particulièrement pratique quand vous utilisez vos propres bibliothèques ou modules externes.

<div class="Alert">

Il est important de savoir que, dans le [cycle de vie d'une instance de Vue](https://fr.vuejs.org/v2/guide/instance.html#Diagramme-du-cycle-de-vie), les hooks `beforeCreate` et `created` sont appelés **à la fois du côté client et du côté serveur**. Tous les autres _hooks_ ne sont appelés que depuis le client.

</div>

## Modules externes

Nous souhaitons utiliser des packages / modules externes dans notre application, un excellent exemple est [axios](https://github.com/mzabriskie/axios) pour les requêtes HTTP depuis le serveur et le client.

Tout d'abord, nous l'installons via npm :

```bash
npm install --save axios
```

Puis nous pouvons l'utiliser directement dans nos pages :

```html
<template>
  <h1>{{ titre }}</h1>
</template>

<script>
  import axios from 'axios'

  export default {
    async asyncData({ params }) {
      let { data } = await axios.get(`https://my-api/posts/${params.id}`)
      return { titre: data.titre }
    }
  }
</script>
```

## Plugins Vue

Si nous voulons utiliser [vue-notifications](https://github.com/se-panfilov/vue-notifications) pour afficher des notifications dans notre application, nous devons configurer le plugin avant de lancer l'application.

Dans `plugins/vue-notifications.js` :

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Puis nous ajoutons le fichier dans l'attribut `plugins` de `nuxt.config.js` :

```js
export default {
  plugins: ['~/plugins/vue-notifications']
}
```

Pour en savoir plus sur l'attribut `plugins`, consultez [La propriété `plugins`](/api/configuration-plugins) de l'API.

### ES6 plugins

Si le plugin est situé dans `node_modules` et exporter en tant que module ES6, vous devrez ajouter l'option de construction `transpile` :

```js
module.exports = {
  build: {
    transpile: ['vue-notifications']
  }
}
```

Vous pouvez vous référer à la documentation de [configuration](/api/configuration-build/#transpile) pour plus d'options de construction.

## Injection dans \$root et le contexte

Parfois vous souhaitez rendre des fonctions ou des valeurs disponibles à travers votre application. Vous pouvez injecter ces variables dans les instances Vue (côté client), le contexte (côté serveur) et même dans le magasin Vuex. C'est une convention de préfixer ces fonctions avec un `$`.

### Injection dans les instances Vue

L'injection de contenu dans les instances Vue fonctionne de la même façon que vous pourriez le faire dans une application Vue standard.

`plugins/injection-vue.js`:

```js
import Vue from 'vue'

Vue.prototype.$maFonctionInjectee = chaine =>
  console.log('Ceci est un example', chaine)
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/injection-vue.js']
}
```

Vous pouvez maintenant utiliser cette fonction dans tous vos composants Vue.

`composant-exemple.vue`:

```js
export default {
  mounted() {
    this.$maFonctionInjectee('test')
  }
}
```

### Injection dans le contexte

L'injection de contenu dans les instances Vue fonctionne de la même façon que vous pourriez le faire dans une application Vue standard.

`plugins/injection-contexte.js`:

```js
export default ({ app }, inject) => {
  // Défini la fonction directement dans l'objet context.app
  app.maFonctionInjectee = chaine =>
    console.log('Ok, une autre fonction', chaine)
}
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/injection-contexte.js']
}
```

La fonction est maintenant disponible partout où vous aurez accès au `context` (par exemple dans `asyncData` et `fetch`).

`composant-exemple-contexte.vue`:

```js
export default {
  asyncData(context) {
    context.app.maFonctionInjectee('Contexte !')
  }
}
```

### Injection combinée

Si vous avez besoin de la fonction dans le `context`, les instances Vue et peut-être aussi dans le magasin Vuex, vous pouvez utiliser la fonction `inject`, qui est le second paramètre de la fonction exportée des plugins.

L'injection de contenu dans les instances Vue fonctionne de la même façon que vous pourriez le faire dans une application Vue standard. le `$` sera automatiquement ajouté au début de la fonction.

`plugins/injection-combinee.js`:

```js
export default ({ app }, inject) => {
  inject('maFonctionInjectee', (chaine) => console.log('C'est simple !', chaine))
}
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/injection-combinee.js']
}
```

Maintenant la fonction peut être utilisé depuis `context`, via `this` dans les instances Vue et via `this` dans le magasin `actions`/`mutations`.

`composant-exemple-contexte.vue`:

```js
export default {
  mounted() {
    this.$maFonctionInjectee('fonctionne dans mounted()')
  },
  asyncData(context) {
    context.app.$maFonctionInjectee('fonctionne avec le contexte')
  }
}
```

`store/index.js`:

```js
export const state = () => ({
  uneValeur: ''
})

export const mutations = {
  changeUneValeur(state, nouvelleValeur) {
    this.$maFonctionInjectee('accessible dans les mutations')
    state.uneValeur = nouvelleValeur
  }
}

export const actions = {
  setUneValeurAvecQuelquechose({ commit }) {
    this.$maFonctionInjectee('accessible dans les actions')
    const nouvelleValeur = 'quelquechose'
    commit('changeUneValeur', nouvelleValeur)
  }
}
```

## Côté client uniquement

Certains plugins fonctionnent **uniquement dans un navigateur** due à un manque de support SSR. Vous pouvez utiliser l'option `ssr: false` dans `plugins` pour exécuter le fichier uniquement côté client.

Exemple :

`nuxt.config.js`:

```js
export default {
  plugins: [{ src: '~/plugins/notifications-vue', ssr: false }]
}
```

`plugins/notifications-vue.js`:

```js
import Vue from 'vue'
import NotificationsVue from 'notifications-vue'

Vue.use(NotificationsVue)
```

Dans le cas où vous devez importer certaines bibliothèques uniquement _côté serveur_, vous pouvez vérifier si la variable `process.server` est définie à `true`.

Si vous avez besoin également de savoir si vous êtes dans une application générée (via `nuxt generate`), vous pouvez vérifier la propriété `process.static` est à `true`. C'est le cas seulement pendant la génération et après.

Vous pouvez aussi combiner les deux options pour connaitre si une page qui est en train d'être rendue par le serveur avec `nuxt generate` avant d'être sauvée (`process.static && process.server`).

**Note**: Depuis Nuxt.js 2.4+, `mode` a été introduit comme option de `plugins` pour spécifier le type de plugin, les valeurs possibles sont : `client` ou `server`. `ssr: false` sera adapté pour `mode: 'client'` et déprécié dans le futur livrable majeur.

Exemple:

`nuxt.config.js`:

```js
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

### Convention de nommage d'un plugin

Si votre plugin doit être executé uniquement côté client ou serveur, `.client.js` ou `.server.js` peut être appliqué comme extension de fichier, le fichier sera automatiquement inclu dans le mode correspondant.

Exemple:

`nuxt.config.js`:

```js
export default {
  plugins: [
    '~/plugins/foo.client.js', // côté client uniquement
    '~/plugins/bar.server.js', // côté serveur uniquement
    '~/plugins/baz.js' // côté client et serveur
  ]
}
```
