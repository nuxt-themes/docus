---
title: Les modes de rendu
description: Les modes de rendu
position: 1
category: features
---

## Rendu côté serveur et sites statiques

**Les sites de rendus côté serveur** sont rendus sur le serveur chaque fois que l'utilisateur demande une page, par conséquent un serveur est nécessaire pour pouvoir servir la page à chaque demande.

**Les sites statiques** sont très similaires aux applications rendues côté serveur, la principale différence étant que les sites statiques sont rendus au moment de la construction, aucun serveur n'est donc nécessaire. La navigation d'une page à l'autre se fait alors côté client.

Voir les [cibles de déploiements](/docs/2.x/features/deployment-targets) pour plus d'informations sur l'hébergement statique et serveur.

```js{}[nuxt.config.js]
export default {
  ssr: true // default value
}
```

<base-alert type="info">

Vous n'avez pas besoin d'ajouter `ssr: true` à votre configuration nuxt pour activer le rendu côté serveur vu qu'il est activé par défaut.

</base-alert>

## Rendu côté client uniquement

Avec le rendu côté client uniquement, il n'y a pas de rendu côté serveur. Le rendu côté client signifie le rendu du contenu dans le navigateur à l'aide de JavaScript. Au lieu d'obtenir tout le contenu du HTML, nous obtenons simplement un document HTML de base avec un fichier JavaScript qui rendra ensuite le reste du site à l'aide du navigateur. Pour le rendu côté client, définissez ssr sur `false`.

```js{}[nuxt.config.js]
export default {
  ssr: false
}
```

<base-alert type="next">

[La propriété ssr](/docs/2.x/configuration-glossary/configuration-ssr)

</base-alert>
