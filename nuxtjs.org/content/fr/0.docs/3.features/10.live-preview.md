---
title: Mode de prévisualisation
description: Prévisualisation en temps réel pour une génération statique avec le mode de prévisualisation
category: features
position: 12
---

Avec Nuxt.js et une génération axée sur de l'intégralement statique, nous pouvons maintenant utiliser la prévisualisation en temps réel, sans configuration additionnelle. Cela nous permettra d'appeler notre API ou notre CMS afin que nous puissions voir les changements avant de déployer.

<base-alert>Seulement disponible dans le cas d'un [target:static](/docs/2.x/features/deployment-targets#static-hosting)</base-alert>

Le mode de prévisualisation va s'occuper de rafraîchir automatiquement la data de la page vu qu'il utilise `$nuxt.refresh` (et donc fait les appels de `nuxtServerInit`, `asyncData` et `fetch`) du côté client.

Pour activer la prévisualisation en temps réel, il faudra ajouter le plugin suivant:

```js{}[plugins/preview.client.js]
export default function ({ query, enablePreview }) {
  if (query.preview) {
    enablePreview()
  }
}
```

<base-alert>
`EnablePreview` est seulement disponible dans l'objet contexte des plugins. Les prévisualisations sont gérées côté client et donc, le plugin doit s'exécuter sur le client: `preview.client.js`
</base-alert>

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/preview.client.js']
}
```

Une fois que l'on a ajouté le plugin, on peut maintenant générer et servir notre site.

<code-group>
<code-block label="npx" active>

```bash
npx nuxt generate
npx nuxt start
```

</code-block>
<code-block label="Yarn" >

```bash
yarn generate
yarn start
```

  </code-block>
</code-group>

Nous pouvons maintenant voir la page de prévisualisation en ajoutant une query param à la fin de la page qui nous intéresse:

```js
?preview=true
```

<base-alert>
`enablePreview` doit être testé localement avec `yarn start` et non `yarn dev`
</base-alert>

### Prévisualiser les pages qui ne sont pas encore générées

Pour les pages qui ne sont pas encore générées, la solution de rechange de la SPA va continuer de s'occuper de faire un appel à l'API avant de montrer une page 404 vu que ces pages existent sur l'API mais ne sont pas encore générées.

Si nous avons configuré un crochet de validation (webhook), on aura sans doute besoin de le modifier afin d'accommoder le fait qu'il ne redirige plus vers une 404 en mode de prévisualisation.

```js
validate({ params, query }) {
  if (query.preview) {
    return true
}
```

### Passer la data à enablePreview

On peut passer de la data à la fonction `enablePreview`. La data sera ainsi disponible sur le helper de contexte `$preview` et sur `this.$preview`.

### Et ensuite ?

<base-alert type="next">

Se référer au [document sur la structure des répertoires](/docs/2.x/directory-structure/nuxt).

</base-alert>
