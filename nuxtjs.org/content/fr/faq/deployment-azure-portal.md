---
title: Comment déployer sur Azure Portal ?
description: Comment déployer une application Nuxt.js application sur Azure Portal ?
menu: Deploy on Azure Portal
category: deployment
position: 302
---

## Exigences

- Il est nécessaire de sélectionner un backend lors de la configuration du projet. Même si vous n'en avez pas besoin, sinon le site ne démarrera pas.
- Le serveur exécute Node 8 ou plus

## Et si j'ai déjà un projet sans backend ?

Pas de soucis. Il est facile d'ajouter un serveur express à un projet existant.

Créez un nouveau dossier appelé `server` à la racine du projet. Créez ensuite un fichier `index.js` dans le dossier `server` et collez ce qui suit dans `index.js`:

```
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Importer et définir les options Nuxt.js
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  // Donnez le middleware nuxt à express
  app.use(nuxt.render)

  // Écoutez le serveur
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
```

Modifiez ensuite votre nuxt.config.js:

Avant:

```
import pkg from './package'

export default {
... config
}
```

Après:

```
module.exports = {
... config
}

```

**N'oubliez pas de supprimer les références à l'objet pkg dans la configuration.**

C'est tout !

## Comment définir la version de Node d'une application Web dans DevOps

Vous pouvez définir la version Node sur le serveur, via le paramètre d'application dans la tâche "Deploy Azure Web Service" dans le pipeline de versions

Ajoutez ceci au champ paramètres de l'application sous "Application and Configuration Settings"

```
-WEBSITE_NODE_DEFAULT_VERSION 10.16.3
```

Il est recommandé d'utiliser la version LTS.

## Artefacts

Si vous utilisez Azure DevOps et laissez le pipeline de génération faire son travail lui-même et souhaitez stocker des artefacts. Les dossiers qui sont préfixés par un `.` doivent être déplacés explicitement dans le dossier d'artefact. Ensuite, vous pouvez créer une archive d'artefacts et la télécharger ensuite dans votre version de déploiement.

## Exécution du webserver

Pour Azure Portal, vous aurez besoin d'un fichier `web.config`. S'il n'est pas fourni, il en créera un lui-même. Celui-ci **ne fonctionnera pas pour Nuxt** cependant. Ajoutez un fichier web.config à votre projet. Pour la dernière version de `Nuxt`, le fichier serveur se trouve dans `server/index.js`. Dans le web.config, ne spécifiez pas le chemin exact `server/index.js` mais juste `server`. Voir l'exemple web.config ci-dessous. Si vous ne le faites pas, les logs vous diront que Vue ne peut trouver aucun chemin.

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--
     Ce fichier de configuration est requis si iisnode est utilisé pour exécuter des processus node derrière
     IIS ou IIS Express. Pour plus d'informations, visitez:

     https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config
-->

<configuration>
  <system.webServer>
    <!-- Visitez https://azure.microsoft.com/en-us/blog/introduction-to-websockets-on-windows-azure-web-sites/ pour plus d'informations sur le support WebSocket -->
    <webSocket enabled="false" />
    <handlers>
      <!-- Indique que le fichier server.js est un site node.js à gérer par le module iisnode -->
      <add name="iisnode" path="server" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <!-- Ne pas interférer avec les demandes de débogage de l'inspecteur de node -->
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server\/debug[\/]?" />
        </rule>

        <!-- Nous examinons d'abord si l'URL entrante correspond à un fichier physique dans le dossier /public -->
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>

        <!-- Toutes les autres URL sont mappées au point d'entrée du site node.js -->
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server"/>
        </rule>
      </rules>
    </rewrite>

    <!-- le répertoire 'bin' n'a pas de signification particulière dans node.js et des applications peuvent y être placées -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>

    <!-- Assurez-vous que les réponses d'erreurs restent inchangées -->
    <httpErrors existingResponse="PassThrough" />

    <!--
      Vous pouvez contrôler la façon dont Node est hébergé dans IIS à l'aide des options suivantes:
        * watchedFiles: liste de fichiers séparés par des points-virgules qui seront surveillés pour les modifications de redémarrage du serveur
        * node_env: sera propagé à Node en tant que variable d'environnement NODE_ENV
        * debuggingEnabled - contrôle si le débogueur intégré est activé

      Voir https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config pour une liste complète des options
    -->
    <!--<iisnode watchedFiles="web.config;*.js"/>-->
  </system.webServer>
</configuration>
```
