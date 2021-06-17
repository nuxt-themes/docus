---
title: Commandes et déploiement
description: Nuxt.js est livré avec un ensemble de commandes utiles, à la fois pour le développement et la production.
position: 4
category: get-started
---

Nuxt.js est livré avec un ensemble de commandes utiles, à la fois pour le développement et la production.

## Utilisation dans package.json

Vous devriez mettre ces commandes dans `package.json`:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

Ensuite, vous pouvez lancer vos commandes via `yarn <command>` ou `npm run <command>` (exemple: `yarn dev` / `npm run dev`).

## Environment de développement

Pour lancer Nuxt en mode développement avec [le module de remplacement à chaud](https://webpack.js.org/concepts/hot-module-replacement/) sur `http://localhost:3000`:

<code-group>

  <code-block label="Yarn" active>

```bash
yarn dev
```

  </code-block>

  <code-block label="npm">

```bash
npm run dev
```

  </code-block>
</code-group>

## Liste des commandes

Vous pouvez exécuter différentes commandes en fonction de la [cible](/docs/2.x/features/deployment-targets):

### target: `server` (default value)

- **nuxt dev** - Lancez le serveur de développement.
- **nuxt build** - Créez et optimisez votre application avec Webpack pour la production.
- **nuxt start** - Démarrez le serveur de production (après avoir lancé `nuxt build`). Utiliser pour un hébergement Node.js comme Heroku, Digital Ocean, etc.

### target: `static`

- **nuxt dev** - Lancez le serveur de développement.
- **nuxt generate** - Construisez l'application (si nécessaire), générez chaque route sous forme de fichier HTML et exportez statiquement vers le répertoire `dist/` (utilisé pour l'hébergement statique).
- **nuxt start** - servir le répertoire `dist/` comme le ferait votre hébergement statique (Netlify, Vercel, Surge, etc.), idéal pour les tests avant le déploiement.

## Webpack Config Inspection

Vous pouvez inspecter la configuration webpack utilisée par nuxt pour créer un projet similaire à [vue inspect](https://cli.vuejs.org/guide/webpack.html#inspecting-the-project-s-webpack-config).

- **nuxt webpack [query...]**

**Arguments:**

- `--name`: nom du bundle à inspecter (client, serveur, moderne)
- `--dev`: inspecter la configuration webpack pour le mode dev
- `--depth`: inspecter en profondeur. La valeur par défaut est 2 pour empêcher la sortie verbeuse.
- `--no-colors`: désactiver les couleurs ANSI (désactivées par défaut lorsque TTY n'est pas disponible ou quand piping vers un fichier)

**Exemples:**

- `nuxt webpack`
- `nuxt webpack devtool`
- `nuxt webpack resolve alias`
- `nuxt webpack module rules`
- `nuxt webpack module rules test=.jsx`
- `nuxt webpack module rules test=.pug oneOf use.0=raw`
- `nuxt webpack plugins constructor.name=WebpackBar options reporter`
- `nuxt webpack module rules loader=vue-`
- `nuxt webpack module rules "loader=.*-loader"`

## Déploiement de production

Nuxt.js vous permet de choisir entre les déploiements de serveur ou statique.

### Déploiement de serveur

Pour déployer une application SSR, nous utilisons `target: server`, où serveur est la valeur par défaut.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn build
```

  </code-block>
  <code-block label="npm">

```bash
npm run build
```

  </code-block>
</code-group>

Nuxt.js créera un répertoire `.nuxt` avec tout ce qu'il contient prêt à être déployé sur votre serveur d'hébergement.

<base-alert type="info">

nous recommandons de mettre `.nuxt` dans `.npmignore` ou `.gitignore`.

</base-alert>

Une fois votre application créée, vous pouvez utiliser la commande `start` pour voir une version de production de votre application.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn start
```

  </code-block>
  <code-block label="npm">

```bash
npm run start
```

  </code-block>
</code-group>

### Déploiement statique (Pré-rendu)

Nuxt.js vous donne la possibilité d'héberger votre application Web sur n'importe quel hébergement statique.

Pour déployer un site statique généré, assurez-vous d'avoir `target: static` dans votre `nuxt.config.js`.(Pour Nuxt >= 2.13:)

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

<code-group>
  <code-block label="Yarn" active>

```bash
yarn generate
```

  </code-block>
  <code-block label="npm">

```bash
npm run generate
```

  </code-block>
</code-group>

Nuxt.js créera un répertoire `dist /` avec tout ce qu'il contient prêt à être déployé sur un service d'hébergement statique.

Depuis Nuxt v2.13, un robot d'exploration est installé qui va maintenant explorer vos liens et générer vos routes lorsque vous utilisez la commande `nuxt generate` basée sur ces derniers.

<base-alert>

**Attention:** les routes dynamiques sont ignorées par la commande `generate` lors de l'utilisation Nuxt <= v2.12: [API de configuration de la génération](/docs/2.x/configuration-glossary/configuration-generate)

</base-alert>

<base-alert type="info">

Lors de la génération de votre application Web avec `nuxt generate`, [le contexte](/docs/2.x/internals-glossary/context) donnée à [asyncData](/docs/2.x/features/data-fetching#async-data) et [fetch](/docs/2.x/features/data-fetching#the-fetch-hook) n'aura pas `req` et `res`.

</base-alert>

#### **Échec en cas d'erreur**

Pour renvoyer un code d'état différent de zéro lorsqu'une erreur de page est rencontrée et laisser le CI/CD échouer lors du déploiement ou de la construction, vous pouvez utiliser l'argument `--fail-on-error`.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn generate --fail-on-error
```

  </code-block>
  <code-block label="npm">

```bash
npm run generate --fail-on-error
```

  </code-block>

</code-group>

## Et après?

<base-alert type="next">

Lisez notre [FAQ](/docs/2.x/deployment/deploying-to-21yunbox) pour trouver des exemples de déploiements sur des hôtes connus.

</base-alert>

</div>
