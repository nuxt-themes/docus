---
title: 'API: La propriété loading'
description: Nuxt.js utilise son propre composant pour afficher une barre de progression entre les chemins. Vous pouvez la personnaliser, la désactiver ou créer votre propre composant.
menu: loading
category: configuration
position: 115
---

- Type: `Boolean` ou `Object` ou `String`

> Prêt à l'emploi, Nuxt.js vous offre son propre composant de barre de progression de chargement qui est affiché entre les routes. Vous pouvez la personnaliser, la désactiver ou créer votre propre composant.

La barre de progression peut également être démarrée par programme dans vos composants en appelant `this.$Nuxt.$Loading.start()` pour démarrer la barre de progression et `this.$Nuxt.$Loading.finish()` pour la terminer.

Pendant le processus de montage du composant de votre page, la propriété `$loading` peut ne pas être immédiatement accessible. Pour contourner ce problème, si vous souhaitez démarrer le chargement dans la méthode `mount`, assurez-vous de placer vos appels de méthode `$loading` dans `this.$NextTick` comme indiqué ci-dessous.

```javascript
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

## Désactiver la barre de progression

- Type: `Boolean`

Si vous ne voulez pas afficher la barre de progression entre les routes, ajoutez simplement `loading: false` dans votre fichier`nuxt.config.js`:

```js
export default {
  loading: false
}
```

## Personnalisation de la barre de progression

- Type: `Object`

Entre autre : les propriétés, la couleur, la taille, la durée et la direction de la barre de progression peuvent être personnalisées pour répondre aux besoins de votre application. Cela se fait en mettant à jour la propriété `loading` du `nuxt.config.js` avec les propriétés correspondantes.

Par exemple, pour définir une barre de progression bleu avec une hauteur de 5 pixels, nous mettons à jour le `nuxt.config.js` comme suit:

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

Liste des propriétés pour personnaliser la barre de progression.

| Clé           | Type    | Par défaut | Description                                                                                                                                                  |
| ------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color`       | String  | `'black'`  | Couleur CSS de la barre de progression                                                                                                                       |
| `failedColor` | String  | `'red'`    | Couleur CSS de la barre de progression lorsqu'une erreur s'est ajoutée lors du rendu de l'itinéraire (si `data` ou`fetch` a renvoyé une erreur par exemple). |
| `height`      | String  | `'2px'`    | Hauteur de la barre de progression (utilisée dans la propriété `style` de la barre de progression)                                                           |
| `throttle`    | Number  | `200`      | En ms, attendez le temps spécifié avant d'afficher la barre de progression. Utile pour empêcher la barre de clignoter.                                       |
| `duration`    | Number  | `5000`     | En ms, la durée maximale de la barre de progression, Nuxt.js suppose que l'itinéraire sera rendu avant 5 secondes.                                           |
| `continuous`  | Boolean | `false`    | Continuez à animer la barre de progression lorsque le chargement prend plus de temps selon `duration`.                                                       |
| `css`         | Boolean | `true`     | Définissez sur faux pour supprimer les styles de barre de progression par défaut (et ajoutez les vôtres).                                                    |
| `rtl`         | Boolean | `false`    | Définissez la direction de la barre de progression de droite à gauche.                                                                                       |

## Explications de la barre de progression

Malheureusement, il n'est pas possible pour le composant Loading de savoir à l'avance combien de temps prendra le chargement d'une nouvelle page. Par conséquent, il n'est pas possible d'animer avec précision la barre de progression à 100% du temps de chargement.

Le composant de chargement de Nuxt résout partiellement cela en vous permettant de définir la `duration`, celle-ci doit être définie sur une estimation de la durée du processus de chargement. À moins que vous n'utilisiez un composant de chargement personnalisé, la barre de progression passera toujours de 0% à 100% selon la propriété `duration` (quelle que soit la progression réelle). Lorsque le chargement prend plus de temps que la durée, la barre de progression reste à 100% jusqu'à la fin du chargement.

Vous pouvez changer le comportement par défaut en définissant `continuous` a vrai, puis après avoir atteint 100%, la barre de progression recommencera à se réduire à 0% selon la propriété `duration`. Lorsque le chargement n'est toujours pas terminé après avoir atteint 0%, il recommencera à croître de 0% à 100%, ceci se répètera jusqu'à la fin du chargement.

_Exemple de barre de progression continue:_

<img src="/api-continuous-loading.gif" alt="continuous loading"/>

## Utilisation d'un composant de chargement personnalisé

- Type: `String`

Vous pouvez également créer votre propre composant que Nuxt.js appellera au lieu de son composant de barre de progression de chargement par défaut. Pour ce faire, vous devez donner un chemin à votre composant dans l'option `loading`. Ensuite, votre composant sera appelé directement par Nuxt.js.

**Votre composant doit exposer certaines de ces méthodes:**

| Method          | Required    | Description                                                                                             |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `start()`       | Obligatoire | Appelé lorsqu'un chemin change, c'est ici que vous affichez votre composant.                            |
| `finish()`      | Obligatoire | Appelé lorsqu'un chemin est chargé (et données récupérées), c'est ici que vous masquez votre composant. |
| `fail(error)`   | _Optionnel_ | Appelé lorsqu'un chemin n'a pas pu être chargé (impossible de récupérer les données par exemple).       |
| `increase(num)` | _Optionnel_ | Appelé lors du chargement du chemin, `num` est un entier < 100.                                         |

Nous pouvons créer notre composant personnalisé dans `components/loading.vue`:

```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
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

Ensuite, nous mettons à jour notre `nuxt.config.js` pour indiquer à Nuxt.js d'utiliser notre composant :

```js
export default {
  loading: '~/components/loading.vue'
}
```
