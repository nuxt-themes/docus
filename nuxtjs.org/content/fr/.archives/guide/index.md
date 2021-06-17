---
title: Introduction
description: 'Nuxt.js est un framework pour créer des applications Vue, vous pouvez choisir entre application Universelle, Générée Statiquement ou Monopage.'
category: prologue
position: 1
---

> Nuxt.js est un framework pour créer des applications Vue, vous pouvez choisir entre application Universelle, Générée Statiquement ou Monopage.

## Nuxt.js, qu’est-ce que c’est ?

Son principal objectif est le **rendu de l'Interface Utilisateur** tout en faisant abstraction de la distribution client/serveur.

Notre but est de créer un framework suffisamment flexible afin que vous puissiez l'utiliser comme base dans un projet principal ou que vous puissiez l'implémenter incrementalement sur votre projet actuel basé sur Node.js.

Nuxt.js fournit toute la configuration nécessaire pour rendre votre développement de **rendu côté serveur** avec Vue.js agréable avec son mode **universel** par défaut.

De plus, nous fournissons également une option de déploiement appelée [_nuxt generate_](https://fr.nuxtjs.org/api/configuration-generate/#la-propri-t-generate). Elle va créer une application Vue.js pré-rendu et pré-configuré avec **génération statique**. Elle vous permettra donc de profiter du SSR sans avoir besoin d'un vrai server nuxt. Nous pensons que cette option sera la prochaine grosse étape dans le développement de vos applications web avec micro services.

Bien entendu, vous pouvez également utiliser Nuxt.js pour créer des applications monopages rapidement (mode `spa`), ce qui est utile pour conserver les fonctionnalités de Nuxt quand vous travaillez sur la partie backoffice de vos applications.

En tant que framework, Nuxt.js est doté de nombreuses fonctionnalités pour vous aider dans votre développement entre côté client et serveur tels que les données asynchrones, les _middlewares_, les _layouts_, etc.

## Comment ça marche

![Vue avec webpack et Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js inclut les éléments suivants afin de créer une expérience de développement optimale :

- [Vue 2](https://fr.vuejs.org/)
- [Vue Router](https://router.vuejs.org/fr/)
- [Vuex](https://vuex.vuejs.org/fr/) (inclut uniquement quand l'[option `store`](/guide/vuex-store) est activée)
- [Vue Server Renderer](https://ssr.vuejs.org/) (exclut quand le [`mode: 'spa'`](/api/configuration-mode) est utilisé)
- [vue-meta](https://github.com/nuxt/vue-meta)

Un total de seulement **57ko min+gzip** (60ko avec Vuex).

Sous le capot, nous utilisons [webpack](https://github.com/webpack/webpack) avec [vue-loader](https://github.com/vuejs/vue-loader) et [babel-loader](https://github.com/babel/babel-loader) pour empaqueter (« bundle »), scinder (« code-splitting ») et minifier votre code.

## Fonctionnalités

- Écriture des fichiers Vue (`*.vue*`)
- Splitting de code automatique
- Rendu coté serveur (ou « SSR » pour « Server-Side Rendering »)
- Routage automatique et puissant à l'aide de données asynchrones
- Serveur de fichiers statiques
- Transpilation [ES2015+](https://babeljs.io/docs/en/learn/)
- Empaquetage et minification de vos fichiers JS et CSS
- Gestion des éléments de balise d'en-tête `<head>` HTML (`<title>`, `<meta>`, etc.)
- Rechargement à chaud pendant le développement (hot module reload or HMR)
- Préprocesseur : Sass, Less, Stylus, etc.
- Entête HTTP/2 PUSH
- Extensibilité avec une architecture modulaire

## Schéma

Ce schéma (en anglais) montre ce qui est invoqué par Nuxt.js quand le serveur est appelé ou quand l'utilisateur navigue dans l'application à l'aide de `<nuxt-link>` :

![nuxt-schema](/nuxt-schema.svg)

## Rendu côté serveur (SSR universel)

Vous pouvez utiliser Nuxt.js comme framework pour gérer le rendu complet de l'interface utilisateur de votre projet.

En utilisant la commande `nuxt`, Nuxt démarrera un serveur de développement avec rechargement à chaud et [Vue Server Renderer](https://ssr.vuejs.org/fr/) sera configuré pour faire automatiquement le rendu de votre application côté serveur.

## Application monopage

Si pour une quelconque raison vous préférez ne pas utiliser le rendu côté serveur ou que vous avez besoin d'un hébergement statique pour votre application, vous pouvez simplement utiliser le mode application monopage (ou « SPA » pour « Simple Page Application ») en utilisant la commande `nuxt --spa`. Combiné avec la fonctionnalité de _génération_, vous avez la une puissante application monopage qui ne nécessite aucunement Node.js ou un serveur spécial pour fonctionner.

Jetez un œil à [la liste des commandes](/guide/commands) pour en savoir plus.

Si vous avez déjà un serveur, vous pouvez greffer Nuxt.js en l'utilisant comme _middleware_. Il n'y a aucune restriction quand vous utilisez Nuxt.js pour développer votre application web universelle. Consultez le guide d'[Utilisation de Nuxt.js par programmation](/api/nuxt).

## Génération statique (pré-rendu)

La grande innovation de Nuxt.js est sa commande `nuxt generate`.

Lors de la création de votre application, il génèrera le code HTML de chacune de vos routes pour le stocker dans un fichier.

<div>
  <a href="https://vueschool.io/courses/static-site-generation-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
    <img src="/static-site-generation-with-nuxtjs.png" alt="Génération de site statique avec Nuxt.js par vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Génération de site statique avec Nuxt.js</h4>
      <p class="Promote__Content__Description">Apprendre comment générer des sites web statiques (pré-rendus) pour améliorer les performances et le SEO tout en éliminant les coûts d'hébergement.</p>
      <p class="Promote__Content__Signature">Cours en vidéo réalisés par VueSchool pour aider au développement de Nuxt.js.</p>
    </div>
  </a>
</div>

Par exemple, la structure de fichier suivante :

```bash
-| pages/
----| about.vue
----| index.vue
```

générera :

```
-| dist/
----| about/
------| index.html
----| index.html
```

De cette façon, vous pouvez héberger votre application web sur n'importe quel hébergement statique !

Le meilleur exemple est ce site web. Il est généré et hébergé sur [Netlify](https://www.netlify.com), consultez notre [code source](https://github.com/nuxt/nuxtjs.org) ou [Comment déployer Nuxt.js sur Netlify](https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-netlify?friend=nuxt) sur Vue School.

Nous ne voulons pas générer manuellement l'application à chaque fois que nous mettons à jour la [documentation](https://github.com/nuxt/docs), il déclenche un point d'ancrage pour Netlify qui :

1. Clone le [dépôt nuxtjs.org](https://github.com/nuxt/nuxtjs.org)
2. Installe les dépendances via `npm install`
3. Lance `npm run generate`
4. Sert le dossier `dist`

Et nous voilà avec une **application web générée statique** :)

Nous pouvons aller plus loin en imaginant une application d'e-commerce créée avec `nuxt generate` et hébergée sur un CDN. Chaque fois qu'un produit est en rupture de stock ou de nouveau en stock nous régénérons l'application. Mais si l'utilisateur navigue sur l'application en même temps, il verra les informations à jour grâce aux appels d'API effectués sur l'API de l'e-commerce. Pas besoin d'avoir plusieurs instances d'un serveur d'un cache !

<div class="Alert">

Vous pouvez consulter [Comment déployer sur Netlify ?](/faq/netlify-deployment) pour plus d'informations sur un hébergement sur Netlify.

</div>
