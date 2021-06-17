---
title: 'API : la propriété transition'
description: Nuxt.js utilise le composant de `<transition>` afin de créer des transitions / animations époustouflantes entre vos pages.
menu: transition
category: pages
position: 29
---

> Nuxt.js utilise le composant de `<transition>` afin de créer des transitions / animations époustouflantes entre vos pages.

- **Type :** `String` ou `Object` ou `Function`

Pour définir une transition personnalisée pour une route spécifique, ajoutez la propriété `transition` au composant de page.

```js
export default {
  // Peut-être une chaine de caractères
 transition: ''
  // Ou un objet
  transition: {}
  // Ou une fonction
  transition (to, from) {}
}
```

## Chaine de caractères

Si la propriété `transition` est définie en tant que chaine de caractère, elle sera utilisée comme `transition.name`.

```js
export default {
  transition: 'test'
}
```

Nuxt.js utilisera ces paramètres pour définir le composant comme suit :

```html
<transition name="test"></transition>
```

## Objet

Si la propriété `transition` est un objet :

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js utilisera ces paramètres pour définir le composant comme suit :

```html
<transition name="test" mode="out-in"></transition>
```

L'objet `transition` peut avoir les propriétés suivantes :

| Propriété          | type      | défaut     | définition                                                                                                                                                                                                                                         |
| ------------------ | --------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | `String`  | `"page"`   | Le nom de la transition appliqué aux transitions de route.                                                                                                                                                                                         |
| `mode`             | `String`  | `"out-in"` | Le mode de la transition appliqué aux routes. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Les-modes-de-transition).                                                                                              |
| `css`              | `Boolean` | `true`     | Défini s'il faut utiliser les transitions de classes CSS. Par défaut à `true`. Si mis à `false`, cela ne déclenchera que les points d'ancrage JavaScript abonnés via les évènements de composant.                                                  |
| `duration`         | `Integer` | aucune     | La durée (en millisecondes) appliquée a une transition, voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Durees-de-transition-explicites).                                                                            |
| `type`             | `String`  | aucune     | Spécifie le type d'évènement de transition attendu pour déterminer le moment de fin de transition. Les valeurs disponibles sont `"transition"` et `"animation"`. Par défaut, cela sera automatiquement déterminé s'il n'y a pas de durée précisée. |
| `enterClass`       | `String`  | aucune     | L'état de départ de la classe de transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees).                                                                                  |
| `enterToClass`     | `String`  | aucune     | L'état final de la transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees).                                                                                                |
| `enterActiveClass` | `String`  | aucune     | La classe appliquée pendant l'intégralité de la transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees)                                                                    |
| `leaveClass`       | `String`  | aucune     | L'état de départ de la classe de transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees).                                                                                  |
| `leaveToClass`     | `String`  | aucune     | L'état final de la transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees).                                                                                                |
| `leaveActiveClass` | `String`  | aucune     | La classe appliquée pendant l'intégralité de la transition. Voir la [documentation Vue.js](https://fr.vuejs.org/v2/guide/transitions.html#Classes-de-transition-personnalisees).                                                                   |

Vous pouvez également définir des méthodes dans l'objet `transition` afin de pouvoir utiliser des [points d'ancrage JavaScript](https://fr.vuejs.org/v2/guide/transitions.html#JavaScript-Hooks) :

- `beforeEnter(el)`
- `enter(el, done)`
- `afterEnter(el)`
- `enterCancelled(el)`
- `beforeLeave(el)`
- `leave(el, done)`
- `afterLeave(el)`
- `leaveCancelled(el)`

_Note : c'est une bonne pratique que de définir explicitement `css: false` pour les transitions uniquement JavaScript afin que Vue passe la détection CSS. Cela prévient également les potentielles interférences entre les déclarations CSS._

### Mode de transition

**Le mode par défault pour les transitions diffère de Vue.js**. Le mode par défaur pour `transition` est `out-in`. Si vous voulez avoir les transitions de sortie et d'entrée en même temps, vous devez mettre `mode: ''`.

```js
export default {
  transition: {
    name: 'test',
    mode: ''
  }
}
```

## Fonction

Si la propriété `transition` est une fonction :

```js
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

Transitions appliquées à la navigation :

- `/` vers `/posts` => `slide-left`,
- `/posts` vers `/posts?page=3` => `slide-left`,
- `/posts?page=3` vers `/posts?page=2` => `slide-right`.
