---
title: 'API: Le composant <client-only>'
description: Rendre un composant uniquement côté client et afficher un texte d'espace réservé côté serveur.
menu: client-only
category: components
position: 44
---

> Ce composant est utilisé pour rendre intentionnellement un composant uniquement côté client. Pour importer un composant uniquement sur le client, enregistrez-le dans un [plugin côté client uniquement](/guide/plugins#client-side-only).

<div class="Alert Alert--orange">

**Attention:** Si vous utilisez une version de Nuxt < `v2.9.0`, utiliser `<no-ssr>` à la place de `<client-only>`.

</div>

**Propriétés**:

- chaine prédéfinie : `string`
  - Utiliser un texte comme chaine prédéfinie jusqu'à ce que `<client-only />` soit monté côté client.

```html
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- ce composant ne sera rendu que côté client -->
      <comments />
    </client-only>
  </div>
</template>
```

**Slots**:

- chaine prédéfinie :
  - Utiliser un espace comme chaine prédéfinie jusqu'à ce que `<client-only />` soit monté côté client.

```html
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- ce composant ne sera rendu que côté client -->
      <comments />

      <!-- indicateur de chargement, rendu côté serveur -->
      <comments-placeholder slot="placeholder" />
    </client-only>
  </div>
</template>
```

Ce composant est importé de [egoist/vue-client-only](https://github.com/egoist/vue-client-only). Merci [@egoist](https://github.com/egoist) !
