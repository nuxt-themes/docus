---
title: Données asynchrones dans les composants
description: Comment gérer les données asynchrones dans les composants avec NuxtJS ?
category: development
position: 203
---

Étant donné que les composants ne comportent pas de méthode `asyncData`, vous ne pouvez pas récupérer directement côté serveur de données asynchrones dans un composant. Pour contourner cette limitation, vous avez deux possibilités :

1. Effectuez l'appel à l'API dans le point d'ancrage `mounted` et définissez les propriétés des données quand le composant est chargé. _Problème : ne fonctionne pas pour le rendu côté serveur_.
2. Effectuez l'appel à l'API dans la méthode `asyncData` ou `fetch` du composant de page et passez les données en tant que props au sous-composant. Le rendu côté serveur fonctionnera correctement. _Problème : les méthodes `asyncData` ou `fetch` pour une page peuvent être moins lisibles car elles chargent les données pour d'autres composants_.
