---
title: Chargement
description: Nuxt.js fournit sa propre barre de chargement lors de la navigation entre les routes. Nous pouvons la personnaliser, la désactiver ou même créer la notre.
position: 8
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/08_loading?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Qu'avons-nous besoin de faire pour faire fonctionner la barre de progression de Nuxt.js ?
    answers:
      - Rien, cela marche, tout simplement !
      - passer la propriété `loading` à `true` dans le fichier `nuxt.config.js`
      - créer un composant `loading`
    correctAnswer: Rien, cela marche, tout simplement !
  - question: Où pouvons-nous modifier les styles pour la barre de progression ?
    answers:
      - dans le composant `layout`
      - dans le composant `page`
      - dans le fichier `nuxt.config.js`
    correctAnswer: dans le composant `layout`
  - question: Dans le fichier `nuxt.config.js`, dans quelle propriété faut-il définir les styles pour la barre de progression de Nuxt.js ?
    answers:
      - progress
      - loading
      - loadingBar
    correctAnswer: loading
  - question: Que faut-il ajouter au fichier `nuxt.config.js` pour désactiver la barre de progression ?
    answers:
      - 'loadingBar: false'
      - "loading: 'none'"
      - 'loading: false'
    correctAnswer: 'loading: false'
  - question: On peut désactiver la barre de progression sur des pages spécifiques
    answers:
      - vrai
      - faux
    correctAnswer: vrai
  - question: Qu'utilise-t-on pour démarrer la barre de progression de manière programmatique ?
    answers:
      - $nuxt.loading.start()
      - $nuxt.loading()
      - $loading.start()
    correctAnswer: $nuxt.loading.start()
  - question: Quelle propriété est utilisée pour faire en sorte que la barre de progression soit continue lorsque la chargement prend plus de temps ?
    answers:
      - "duration: 'continuous'"
      - "loading: 'continuous'"
      - 'continuous: true'
    correctAnswer: 'continuous: true'
  - question: Quelles sont les deux méthodes requises lors de la création d'un composant de chargement personnalisé ?
    answers:
      - start() and fail()
      - start() and finish()
      - loading() and finish()
    correctAnswer: start() and finish()
  - question: Lorsque nous avons créé notre propre composant `loading.vue`, comment l'utilise-t-on ?
    answers:
      - importons-le dans la page des layouts
      - ajoutons-le dans le fichier `nuxt.config.js` dans la propriété `loading`
      - ajoutons-le dans le fichier `nuxt.config.js` dans la propriété `plugins`
    correctAnswer: ajoutons le dans le fichier `nuxt.config.js` dans la propriété `loading`
  - question: Pour ajouter un tourniquet lorsque notre application Nuxt.js est en mode SPA, que faut-il ajouter à la propriété `loading` ?
    answers:
      - 'circle: true'
      - 'spinner: circle'
      - 'name: circle'
    correctAnswer: 'name: circle'
---

Nuxt.js fournit sa propre barre de chargement lors de la navigation entre les routes. Nous pouvons la personnaliser, la désactiver ou même créer la notre.

## Personnaliser la barre de progression

Parmi les propriétés que nous pouvons modifier, on peut lister la couleur, la taille, la durée et la direction de la barre de progression, cela afin de correspondre aux besoins de notre application. Cela peut être fait en mettant à jour la propriété `loading` du fichier `nuxt.config.js` avec les propriétés correspondantes (`color`, `size`, `duration`, `direction`).

Par exemple, pour définir une barre de progression bleue d'une hauteur de 5 pixels, nous pouvons mettre à jour le fichier `nuxt.config.js` avec:

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

Voici la liste des propriétés que nous pouvons utiliser pour personnaliser la barre de progression.

| Propriété   | Type    | Défaut  | Description                                                                                                                     |
| ----------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| color       | String  | 'black' | Couleur CSS de la barre de progression                                                                                          |
| failedColor | String  | 'red'   | Couleur CSS de la barre de progression lors d'une erreur lors du render d'une route (ex: de la data ou un fetch ont échoué).    |
| height      | String  | '2px'   | Hauteur de la barre de progression (utilisé dans la propriété `style` de la barre de progression)                               |
| throttle    | Number  | 200     | En millisecondes, le temps a attendre avant que la barre de navigation ne soit affichée. Utile pour éviter de créer des flashs. |
| duration    | Number  | 5000    | En millisecondes, la durée maximum de la barre de progression, Nuxt.js assume que la route sera render en moins de 5 secondes.  |
| continuous  | Boolean | false   | Continuer d'animer la barre de progression lorsque le chargement prends plus de temps que la valeur de la propriété `duration`. |
| css         | Boolean | true    | Définir à `false` pour enlever tous les styles appliqués à la barre de progression (y compris les vôtres).                      |
| rtl         | Boolean | false   | Définit la direction de la barre de progression, de droite à gauche.                                                            |

## Désactiver la barre de progression

Si nous ne voulons pas afficher la barre de progression entre les routes, il suffit d'ajouter `loading: false` à notre fichier `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  loading: false
}
```

La propriété `loading` nous donne l'option de désactiver la barre de progression sur une page spécifique.

```html{}[pages/index.vue]
<template>
  <h1>Ma page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```

## Lancer la barre de progression de manière programmatique

La barre de progression peut aussi être lancée de manière programmatique dans nos composants en appelant `this.$nuxt.$loading.start()` pour lancer le chargement et `this.$nuxt.$loading.finish()` pour le finir.

Durant le process de montage du composant page, la propriété `$loading` peut ne pas être immédiatement accessible. Pour remédier à cette problématique et nous permettre de commencer la progression dans la méthode `mounted`, il faut enrouler notre méthode `$loading` dans un `this.$nextTick` comme montré ci-dessous:

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## Les rouages de la barre de progression

Malheureusement, il n'est pas possible pour le composant de chargement de connaître en avance le temps que va mettre une page pour charger. Ainsi, il n'est pas possible d'animer la barre de progression de manière adéquate pour correspondre au temps de chargement.

Le composant de chargement de Nuxt.js résout ce problème en nous laissant la possibilité de définir une durée (`duration`), nous permettant de définir une estimation de la durée de chargement que cela devrait prendre. À moins que nous n'utilisions un composant de chargement personnalisé, la barre de progression ira toujours de 0 à 100% de la durée (`duration`), peu importe la progression actuelle. Lorsque le chargement réel prend plus de temps que la durée définie, la barre de progression va rester à 100% jusqu'à ce que le chargement soit fini.

Nous pouvons changer le comportement par défaut en passant la propriété `continuous` à `true`. Ainsi, la barre de progression reviendra à 0% de nouveau, après avoir atteint les 100%. L'animation va se répéter (de 0 à 100%) jusqu'à ce que le chargement ne soit fini.

```js
export default {
  loading: {
    continuous: true
  }
}
```

_Exemple d'une barre de progression continue:_

![https://nuxtjs.org/api-continuous-loading.gif](https://nuxtjs.org/api-continuous-loading.gif)

## Utiliser un composant de chargement personnalisé

Nous pouvons aussi créer notre propre composant que Nuxt.js se chargera d'appeler au lieu d'utiliser celui par défaut. Pour ce faire, nous aurons besoin de spécifier le chemin de du composant dans l'option `loading`.

Notre composant devra fournir certaines des méthodes suivantes:

| Méthode       | Requis    | Description                                                                                                        |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| start()       | Requis    | Appelé lors d'un changement de route, c'est à ce moment là que nous affichons notre composant.                     |
| finish()      | Requis    | Appelé lorsqu'une route est chargée (et la data collectée), c'est à ce moment là que nous cachons notre composant. |
| fail(error)   | Optionnel | Appelé lorsqu'une de nos routes n'a pas pu être chargée (ex: le chargement de la data a échoué)                    |
| increase(num) | Optionnel | Appelé durant le chargement du composant de la route, `num` est un `Integer` < 100.                                |

Nous pouvons créer notre composant personnalisé dans `components/LoadingBar.vue`:

```html{}[components/LoadingBar.vue]
<template>
  <div v-if="loading" class="loading-page">
    <p>Chargement...</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
```

Ensuite, il faut mettre à jour le fichier `nuxt.config.js` pour dire à Nuxt.js d'utiliser notre composant:

```js{}[nuxt.config.js]
export default {
  loading: '~/components/LoadingBar.vue'
}
```

## La propriété du tourniquet de chargement

Lorsque nous utilisons Nuxt.js en mode SPA, il n'y a pas de contenu provenant du serveur lors du premier chargement de la page. Ainsi, au lieu d'afficher une page vide pendant que la page charge, Nuxt.js nous permet d'utiliser un tourniquet que nous pouvons personnaliser afin d'ajouter nos propres couleurs, notre background et même changer le tourniquet lui même.

```js{}[nuxt.config.js]
export default {
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  }
}
```

## Tourniquets intégrés

Ces tourniquets sont importés depuis le projet génial qu'est [Spinkit](http://tobiasahlin.com/spinkit). Nous pouvons regarder la page de démonstration pour avoir un aperçu des tourniquets disponibles. Afin d'utiliser l'un des tourniquets, tout ce nous avons à faire est d'ajouter son nom à la propriété `name`. Pas besoin d'importer ou d'installer quoi que ce soit. Voici la liste de tous les tourniquets intégrés que nous pouvons utiliser:

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

Les tourniquets intégrés supportent les options `color` et `background`.

## Tourniquets personnalisés

Si nous souhaitons avoir notre propre tourniquet, une chaîne de caractères ou un nom peuvent aussi être un chemin vers un template de tourniquet. Toutes les options seront ainsi passées au template.

Si nous voulons nous inspirer du tourniquet de base de Nuxt.js, nous pouvons retrouver le code [ici](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading) !

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
