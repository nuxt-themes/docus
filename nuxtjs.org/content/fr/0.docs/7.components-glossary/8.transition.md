---
title: La propriété `transition` de la page
description: Nuxt.js utilise le composant `<transition>` pour nous permettre de créer et appliquer de superbes transitions/animations lors de la navigation entre les pages.
menu: La propriété transition
category: components-glossary
position: 7
---

> Nuxt.js utilise le composant [`<transition>`](https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) pour nous permettre de créer et appliquer de superbes transitions/animations lors de la navigation entre les pages.

- **Type:** `String` ou `Object` ou `Function`

Pour définir une transition personnalisée pour une route spécifique, il suffit d'ajouter la propriété `transition` au composant page.

```js
export default {
  // Peut être une chaîne de caractères
  transition: ''
  // Ou un Objet
  transition: {}
  // Ou une fonction
  transition (to, from) {}
}
```

## Chaîne de caractères

Si le paramètre `transition` est défini en tant que chaîne de caractères, il sera utilisé sous la forme `transition.name`.

```js
export default {
  transition: 'test'
}
```

Nuxt.js va utiliser ces paramètres pour définir le composant comme suit:

```html
<transition name="test"></transition>
```

## Objet

Si la propriété `transition` est définie en tant qu'objet:

```js
export default {
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
```

Nuxt.js va utiliser ces paramètres pour définir le composant comme suit:

```html
<transition name="test" mode="out-in"></transition>
```

L'objet `transition` peut avoir les propriétés suivantes:

<!-- The ToC below seems so wrong, in the english version too.. -->

| Propriété          | Type      | Par défaut | Définition                                                                                                                                                                                                                  |
| ------------------ | --------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | `String`  | `"page"`   | Le nom de la transition appliquée à toutes les transitions de routes.                                                                                                                                                       |
| `mode`             | `String`  | `"out-in"` | Le mode qui s'applique aux transitions sur toutes les routes, se référer à la [documentation de Vue.js](https://vuejs.org/v2/guide/transitions.html#Transition-Modes).                                                      |
| `css`              | `Boolean` | `true`     | Définit l'application ou non des classes CSS sur les transitions. Si définit à `false`, seulement les hooks JavaScript définis par des évènements seront exécutés.                                                          |
| `duration`         | `Integer` | non défini | La durée (en millisecondes) appliquée à la transition, voir la [documentation de Vue.js](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations).                                                        |
| `type`             | `String`  | non défini | Spécifie le type des évènements de transition à attendre pour déterminer la fin d'une transition. Les valeurs disponibles sont `"transition"` et `"animation"`. Par défaut, le type qui a la plus longue durée sera choisi. |
| `enterClass`       | `String`  | non défini | Le state du départ d'une classe de transition. Voir la [documentation de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                    |
| `enterToClass`     | `String`  | non défini | Le state de fin d'une classe de transition. Voir la [documentation de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                       |
| `enterActiveClass` | `String`  | non défini | La classe appliquée pendant l'intégralité de la durée de la transition. Voir la [documentation de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                           |
| `leaveClass`       | `String`  | non défini | Le state du départ d'une classe de transition. Voir la [documentation de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                    |
| `leaveToClass`     | `String`  | non défini | Le state de fin d'une classe de transition. Voir la [documentation de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                                                       |
| `leaveActiveClass` | `String`  | non défini | La classe appliquée pendant l'intégralité de la durée de la transition. Voir la [documentation de Vue.js](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes).                                           |

On peut aussi définir des méthodes dans la propriété `transition` de la page, celles-ci sont pour des [hooks JavaScript](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks):

- `beforeEnter(élément)`
- `enter(élément, terminé)`
- `afterEnter(élément)`
- `enterCancelled(élément)`
- `beforeLeave(élément)`
- `leave(élément, terminé)`
- `afterLeave(élément)`
- `leaveCancelled(élément)`

```js
export default {
  transition: {
    afterLeave(élément) {
      console.log('afterLeave', élément)
    }
  }
}
```

_Note: une bonne pratique serait d'explicitement déclarer `css:false` pour des transitions uniquement en JavaScript, ainsi Vue pourra ignorer la détection du CSS. Cela prévient de plus de potentiels conflits accidentels avec des règles CSS._

### Mode de transition

**Le mode de transition par défaut pour les pages est différent de celui de Vue.js**. Il est défini à `out-in`. Si l'on souhaite exécuter les transitions entrantes et sortantes simultanément, il faut passer le mode à une chaîne de caractères vide `mode: ''`.

```js
export default {
  transition: {
    name: 'test',
    mode: ''
  }
}
```

## Fonction

Si la propriété `transition` est définie en tant que fonction:

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

Voici ce que cela va générer comme transitions lors de la navigation:

- `/` to `/posts` => `slide-left`
- `/posts` to `/posts?page=3` => `slide-left`
- `/posts?page=3` to `/posts?page=2` => `slide-right`
