---
title: Transitions
description: Nuxt.js utilise le composant `<transition>` pour permettre de créer de superbes transitions/animations entre nos routes.
position: 10
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/05_transitions?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Pour définir une transition personnalisée pour une route spécifique, quel est la propriété qu'il faut ajouter à notre page ?
    answers:
      - pageTransition
      - transition
      - layoutTransition
    correctAnswer: transition
  - question: Quel est le mode de transition par défaut de Nuxt.js ?
    answers:
      - in-out
      - out-in
      - none
    correctAnswer: out-in
  - question: Quel est le nom par défaut de la transition pour les transitions de page ?
    answers:
      - .page
      - .pages
      - .page-transition
    correctAnswer: .page
  - question: Quel est le meilleur endroit pour ajouter nos classes de transition CSS afin que nous ayons des transitions globales sur toutes nos routes ?
    answers:
      - index.vue
      - un fichier CSS global
      - layouts/default.vue
    correctAnswer: un fichier CSS global
  - question: Dans quel tableau dans le fichier nuxt.config.js avons-nous besoin d'ajouter notre feuille de style globale ?
    answers:
      - 'css: []'
      - 'styles: []'
      - 'transitions: []'
    correctAnswer: 'css: []'
  - question: Quelle est la classe par défaut pour les transitions de layout ?
    answers:
      - layout
      - layout-transition
      - transition
    correctAnswer: layout
  - question: Dans le fichier nuxt.config.js, quelle est la propriété qu'il faut utiliser afin de configurer les paramètres par défaut pour les transitions de layout ?
    answers:
      - layout
      - layoutTransition
      - layoutTransitions
    correctAnswer: layoutTransition
  - question: Si l'on renomme le layout par défaut pour être appelé 'mon-layout', quelle classe faut-il utiliser pour créer les transitions CSS ?
    answers:
      - layout
      - mon-layout
      - monLayout
    correctAnswer: mon-layout
  - question: Dans le fichier nuxt.config.js, quelle est la propriété qu'il faut utiliser afin de configurer les paramètres par défaut pour les transitions de page ?
    answers:
      - page
      - pageTransition
      - layoutTransition
    correctAnswer: pageTransition
  - question: Où pouvons-nous modifier les paramètres par défaut pour les transitions de notre page ?
    answers:
      - main.css
      - pages.vue
      - nuxt.config.js
    correctAnswer: nuxt.config.js
---

Nuxt.js utilise le composant [`<transition>`](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) pour permettre de créer de superbes transitions/animations entre nos routes.

Pour définir une transition personnalisée pour une route spécifique, il faut ajouter la propriété `transition` au composant page.

```js{}[pages/index.vue]
export default {
  // peut être une chaîne de caractères
  transition: ''
  // ou un objet
  transition: {}
  // ou une fonction
  transition (to, from) {}
}
```

## Chaîne de caractères

Si la propriété `transition` est une chaîne de caractères, ce sera utilisé comme `transition.name`.

```js{}[pages/index.vue]
export default {
  transition: 'home'
}
```

Nuxt.js va utiliser ces paramètres pour configurer le composant comme suit:

```html{}[pages/index.vue]
<transition name="home"></transition>
```

<base-alert>

Ceci est fait automatiquement pour nous et nous n'avons pas besoin d'ajouter de composant `<transition>` à nos pages ou layouts.

</base-alert>

Maintenant, il ne nous reste plus qu'à créer la nouvelle classe pour nos transitions.

```html{}[pages/index.vue]
<styles>
  .home-enter-active, .home-leave-active { transition: opacity .5s; }
  .home-enter, .home-leave-active { opacity: 0; }
</styles>
```

## Objet

Si la propriété `transition` est un objet:

```js{}[pages/index.vue]
export default {
  transition: {
    name: 'home',
    mode: 'out-in'
  }
}
```

Nuxt.js va utiliser ces paramètres pour configurer le composant comme suit:

```html{}[pages/index.vue]
<transition name="test" mode="out-in"></transition>
```

L'objet `transition` peut avoir des propriétés telles que le nom, le mode, le CSS, la durée et encore tout plein d'autres ! La [documentation de Vue](https://vuejs.org/v2/guide/transitions.html) a plus d'informations sur ce sujet. On peut aussi définir des méthodes dans la propriété `transition` de la page.

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```

### Mode de transition

<base-alert>

La mode de transition par défaut pour les pages diffère de celui de Vue.js. Ici, le mode par défaut est à `out-in`. Si l'on souhaite avoir des transitions d'entrée/sortie simultanées, il faudra changer le mode en lui attribuant une chaîne de caractères vide `mode: ''`.

</base-alert>

```js{}[pages/index.vue]
export default {
  transition: {
    name: 'home',
    mode: ''
  }
}
```

## Function

Si la propriété `transition` est une fonction:

```js{}[pages/index.vue]
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

Voici ce que cela va générer comme transitions:

- `/` to `/posts` => `slide-left`
- `/posts` to `/posts?page=3` => `slide-left`
- `/posts?page=3` to `/posts?page=2` => `slide-right`

## Paramètres globaux

Le nom de la transition par défaut de Nuxt.js est `"page"`. Pour ajouter une transition d'estompage à chaque page de notre application, nous avons seulement besoin d'un fichier CSS qui est partagé entre toutes les routes.

Notre fichier global CSS `assets/main.css`:

```css{}[assets/main.css]
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
```

Nous l'ajoutons à notre tableau CSS dans le fichier `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/main.css']
}
```

## Paramètres de configuration

## La propriété layoutTransition

`layoutTransition` est utilisée pour définir les propriétés par défaut pour les transitions du layout.

Les paramètres par défaut sont:

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

```js{}[assets/main.css]
.layout-enter-active, .layout-leave-active {
  transition: opacity .5s
}
.layout-enter, .layout-leave-active {
  opacity: 0
}
```

Pour les changer, rendons-nous dans le fichier `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  layoutTransition: 'mes-layouts'
  // ou
  layoutTransition: {
    name: 'mes-layouts',
    mode: 'out-in'
  }
}
```

```css{}[assets/main.css]
.mes-layouts-enter-active,
.mes-layouts-leave-active {
  transition: opacity 0.5s;
}
.mes-layouts-enter,
.mes-layouts-leave-active {
  opacity: 0;
}
```

## La propriété pageTransition

Les paramètres par défaut sont:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

Pour les changer, rendons-nous dans le fichier `nuxt.config.js`

```js{}[nuxt.config.js]
export default {
  pageTransition: 'ma-page'
  // ou
  pageTransition: {
    name: 'ma-page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Avant de rentrer...');
    }
  }
}
```

Si l'on modifie `pageTransition`, il faudra faire attention à renommer les classes CSS qui vont avec.

```css{}[assets/main.css]
.ma-page-enter-active,
.ma-page-leave-active {
  transition: opacity 0.5s;
}
.ma-page-enter,
.ma-page-leave-to {
  opacity: 0;
}
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
