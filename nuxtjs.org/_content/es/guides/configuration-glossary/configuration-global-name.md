---
title: 'La propiedad globalName'
description: Nuxt.js te permite personalizar el ID global utilizado en la plantilla HTML principal, así como el nombre de la instancia principal de Vue y otras opciones.
menu: globalName
category: configuration-glossary
position: 11
---

> Nuxt.js te permite personalizar el ID global utilizado en la plantilla HTML principal, así como el nombre de la instancia principal de Vue y otras opciones.

- Tipo: `String`
- Por defecto: `nuxt`

```js{}[nuxt.config.js]
{
  globalName: 'myCustomName'
}
```

<base-alert>

`globalName` debe ser un identificador válido de JavaScript, y cambiarlo puede romper el soporte de ciertos plugins que dependen de funciones con nomenclatura de Nuxt. Si estás buscando cambiar sólo el ID HTML visible `__nuxt`, entonces usa la propiedad `globals`.

</base-alert>

## La propiedad globals

> Personaliza los nombres globales específicos basados en `globalName` por defecto.

- Tipo: `Object`
- Por defecto:

```js{}[nuxt.config.js]
globals: {
  id: globalName => `__${globalName}`,
  nuxt: globalName => `$${globalName}`,
  context: globalName => `__${globalName.toUpperCase()}__`,
  pluginPrefix: globalName => globalName,
  readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
  loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
},
```
