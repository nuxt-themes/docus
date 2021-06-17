---
title: Déploiement sur Netlify
description: Comment déployer une application Nuxt.js sur Netlify ?
category: deployment
position: 309
---

Déployer sur [Netlify](https://www.netlify.com) est une option sans friction pour obtenir en ligne rapidement un site Nuxt.js **généré statiquement**.

Le coeur du processus tire parti de la commande `nuxt generate` lors du déploiement pour créer une version statique de votre application Nuxt.js dans le répertoire `dist`. Le contenu de ce répertoire peut ensuite être déployé sur une URL de production.

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/how-to-deploy-nuxtjs-to-netlify?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Visionner un cours gratuit sur <strong>Comment déployer une application Nuxt.js sur Netlify</strong> sur Vue School (EN)
    </p>
  </a>
</div>

## Pour commencer

Appuyez sur le bouton _"Nouveau site depuis Git"_ sur le dashboard Netlify. Authentifiez-vous avec votre hôte de référentiels, sélectionnez un référentiel à déployer, et sur "continuer". Vous devriez atterrir à l'étape 3 : _"Options de Build, et déploiement !"_

## Configurer :

### Pour un site générée statiquement

1. **Branche à déployer :** `master`, ou bien la branche que vous préférez
1. **Commande de Build :** `npm run generate`
1. **Répertoire de publication :** `dist`

### Pour un site généré en mode monopage (SPA)

1. **Branche à déployer :** `master`, ou bien la branche que vous préférez
1. **Commande de Build :** `npm run build`
1. **Répertoire de publication :** `dist`

Pour les applications monopages il y a un problème avec le rafraichissement de l'application. En effet par défaut Netlify redirige vers _"404 not found"_. Ce problème peut être [évité](https://www.netlify.com/docs/redirects/#rewrites-and-proxying) en configurant des redirections. Il existe à cet effet [nuxt-netlify](https://www.bazzite.com/docs/nuxt-netlify) qui permet d'aider à configurer les en-têtes et les redirections de l'application.

> Pour une explication simple des redirections Netlify, vous pouvez lire cet [article (EN)](https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site) par Divya Sasidharan.

> Optionellement, vous pouvez ajouter des variables supplémentaires ENV via le bouton _"Avancé"_. Cela peut être utile afin de changer pour des informations d'identification aux API ou autre. Netlify fournit également des [variables d'environnement ENV par défaut](https://www.netlify.com/docs/build-settings/#build-environment-variables) qui peuvent être lu par votre application Nuxt.js au moment du build.

Cliquez sur _"Deployer le site"_ pour déclencher immédiatement le déploiement. Votre site Netlify se verra assigner une URL aléatoire et déployez en utilisant la commande `nuxt generate`.

Voilà ! Votre application Nuxt.js est maintenant hébergée sur Netlify !
