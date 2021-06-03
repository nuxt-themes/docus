---
title: Actualizar
description: Actualizar Nuxt.js es rápido, pero requiere algo más que actualizar tu package.json
position: 5
category: get-started
---

> Actualizar Nuxt.js es rápido, pero requiere algo más que actualizar tu package.json.

Si estás actualizando a Nuxt v2.14 y quieres usar un alojamiento estático tendrás que añadir [target:static](/docs/2.x/features/deployment-targets#static-hosting) a tu archivo nuxt.config.js para que el comando de generación funcione correctamente.

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

## Primeros pasos

1. Revisa las [notas de publicación](/docs/release-notes) de la versión a la que quieres actualizar para ver si hay alguna instrucción adicional en esa publicación concreta.
2. Actualiza la versión específica del paquete `nuxt` en tu archivo `package.json`.

A partir de aquí, las instrucciones varían dependiendo de si has usado Yarn o npm. _[Yarn](https://yarnpkg.com/en/docs/usage) es el gestor de paquetes preferido para trabajar con Nuxt ya que es la herramienta de desarrollo con la que se han escrito los tests._

## Yarn

3. Elimina el archivo `yarn.lock`.
4. Elimina la carpeta `node_modules`.
5. Ejecuta el comando `yarn`.
6. Después de que termine la instalación y hayas ejecutado los tests, considera actualizar también las dependencias. Puedes usar el comando `yarn outdated` para ello.

## npm

3. Elimina el archivo `package-lock.json`.
4. Elimina la carpeta `node_modules`.
5. Ejecuta el comando `npm install`.
6. Después de que termine la instalación y hayas ejecutado los tests, considera actualizar también las dependencias. Puedes usar el comando `npm outdated` para ello.
