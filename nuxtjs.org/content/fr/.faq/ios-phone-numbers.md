---
title: iOS et numéros de téléphone
description: Safari sur iOS change les numéros de téléphone en liens qui peuvent causer des problèmes de rendu avec NuxtJS
category: development
position: 205
---

Si vous incluez des numéros de téléphone dans votre page Nuxt, assurez-vous de les remplacer directement par un lien :

```html
<!-- Exemple de numéro de téléphone : +7 (982) 536-50-77 -->

<template>
  <a href="tel: +7 (982) 536-50-77">+7 (982) 536-50-77</a>
</template>
```

Sinon, certaines versions de Safari pour téléphone mobile transformeront automatiquement ces numéros en liens. Ce serait intéressant et utile à première vue, mais déclenchera un avertissement `NodeMismatch` car le contenu SSR ne correspond plus au contenu du site web. Cela peut rendre votre application inutilisable sur ces versions de Safari.
