---
title: Guide de contribution
description: Toute contribution à Nuxt.js est plus que bienvenue !
category: prologue
position: 2
---

> Toute contribution à Nuxt.js est plus que bienvenue !

## Signaler des problèmes

Une excellente façon de contribuer au projet est d'envoyer un rapport détaillé (« issue ») lorsque vous rencontrez un problème. Pour simplifier les choses pour les contributeurs et les responsables, nous utilisons [CMTY](https://cmty.nuxtjs.org/).

Merci de vous assurer d'inclure la méthode pour reproduire ou un [CodeSandBox](https://template.nuxtjs.org/) de sorte que les bogues puissent être reproduits sans grands efforts. Plus un bogue peut être reproduit, plus vite nous pourrons commencer à le réparer !

## Propositions de d'amelioration (Merge Request / Pull request)

Nous aimons voir vos propositions d'amélioration, même s'il ne s'agit que d'une faute de frappe !

Cependant, toute amélioration significative doit être associée à une [demande d'amélioration](https://feature.nuxtjs.org/) existante ou un [Rapport de bogue](https://bug.nuxtjs.org/).

### Pour commencer

1. [Dupliquer / Fork](https://help.github.com/articles/fork-a-repo/) ce dépôt sur votre propre compte GitHub puis le [cloner](https://help.github.com/articles/cloning-a-repository/) suir votre appareil.
2. Lancer `npm install` ou `yarn install` pour installer les dépendances.

> _Notez que **npm** et **yarn** peuvent tous les deux oublier d'installer des dépendances. Pour remédier à cela, vous pouvez soit supprimer le répertoire `node_modules` dans votre exemple d'application et installer à nouveau, ou installer localement les dépendances manquantes._

> Si vous ajoutez une dépendance, merci d'utiliser `yarn add`. Le fichier `yarn.lock` est le point de départ de toutes les dépendances de Nuxt.

### Setup

Avant même d'exécuter vos tests, pensez à installer toutes les dépendances.

```sh
yarn
yarn build
```

### Structure de test

Une bonne pull request, qui inclue une correction de bogue ou une nouvelle fonctionnalité, comprendra souvent des tests. Pour écrire de bons tests, laissez-nous expliquer notre structure de test :

#### Correctifs

Les correctifs (que vous trouverez dans `tests/fixtures`) contiennent plusieurs applications Nuxt. Afin de conserver un temps de construction le plus court possible, nous ne construisons pas une application Nuxt par correctifs. Au lieu de cela, les correctifs sont construits (`yarn test:fixtures`) avant d'exécuter les tests unitaires actuels.

Assurez-vous **de modifier** ou **d'ajouter un nouveau correctif** lorsque vous soumettez une pull request afin de refléter correctement les changements (si nécessaire).

De plus, n'oubliez pas de **reconstruire** un correctif après l'avoir modifié en lançant le test correspondant avec `jest test/fixtures/my-fixture/my-fixture.test.js` !

#### Tests unitaires

Les tests unitaires peuvent être trouvés dans `tests/unit` et seront exécutés après la construction des correctifs. Un nouveau serveur Nuxt sera utilisé par test de sorte qu'aucun état partagé (excepté l'état initial de l'étape de construction) ne soit présent.

Après avoir ajouté vos tests unitaires, vous pouvez les exécuter directement :

```sh
jest test/unit/test.js
```

Ou vous pouvez exécuter l'ensemble des tests unitaires à la suite :

```sh
yarn test:unit
```

Encore une fois, sachez que vous devrez peut-être reconstruire vos correctifs avant !

### Tester vos changements

Pendant que vous travaillez sur votre pull request, vous voudrez probablement vérifier si votre correctif est correctement configuré ou bien déboguer vos modifications actuelles.

Pour ce faire, vous pouvez utiliser le scripte Nuxt lui-même pour lancer par exemple votre correctif ou une application d'exemple :

```sh
yarn nuxt examples/your-app
yarn nuxt test/fixtures/your-fixture-app
```

> `npm link` pourrait aussi (et dans une certaine mesure) fonctionner pour cela, mais il est connu pour présenter certains problèmes. C'est pourquoi nous recommandons d'appeler directement `yarn nuxt` pour exécuter les exemples.

### Exemples

Si vous travaillez sur une fonctionnalité plus importante, merci de configurer une application exemple dans `examples/`. Cela aidera grandement à comprendre les changements et aussi aider les utilisateurs de Nuxt à comprendre en profondeur la fonctionnalité que vous avez construite.

### Mise en forme

Comme vous l'avez peut-être remarqué, nous utilisons ESLint pour appliquer un code standard. Merci de lancer `yarn lint` avant d'enregistrer vos changements afin de vérifier que la mise en forme du code est correcte. Sinon, vous pouvez utiliser `yarn lint --fix` ou `npm run lint -- --fix` (sans faute !) pour corriger la plupart des changements de style. S'il reste des erreurs, vous devez les corriger manuellement.

### Documentation

Si vous avez ajouté une nouvelle fonctionnalité, fait une refonte ou changé le comportement de Nuxt d'une autre manière, vous voudrez probablement documenter les changements. Merci de le faire par une pull request sur le dépôt de la [documentation](https://github.com/nuxt/docs/pulls). Vous n'êtes pas obligé de modifier la documentation immédiatement (mais veuillez le faire dès que votre pull request est suffisamment mature).

### Listes de contrôle finales

Lors de la soumission de votre pull request, il y a un formulaire simple que vous devez remplir. Veuillez cocher toutes les "réponses" appropriées dans les listes de contrôle.

### Dépannages

#### Tests de débogage sur macOS

Rechercher `getPort()` vous révèlera qu'il est utilisé pour démarrer de nouveaux processus Nuxt pendant les tests. Il a parfois été constaté qu'il cessait de fonctionner sous macOS et demandait à configurer manuellement un port pour les tests.

Un autre problème courant concerne les processus Nuxt qui peuvent bloquer en mémoire lors de l'exécution des tests des correctifs. Un processus fantôme empêchera souvent les tests ultérieurs de fonctionner. Exécuter `ps aux | grep -i node` pour inspecter tous les processus si vous pensez que cela se produit.
