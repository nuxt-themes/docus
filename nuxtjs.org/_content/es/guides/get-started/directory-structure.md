---
title: Estructura del Directorio
description: La estructura por defecto de una aplicación Nuxt.js está pensada para ofrecer un buen punto de partida tanto para pequeñas como grandes aplicaciones. Eres libre de organizar tu aplicación como más te guste así como crear otros directorios según los vayas necesitando.
position: 3
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/03_directory_structure?fontsize=14&hidenavigation=1&theme=dark
---

La estructura por defecto de una aplicación Nuxt.js está pensada para ofrecer un buen punto de partida tanto para pequeñas como grandes aplicaciones. Eres libre de organizar tu aplicación como más te guste así como crear otros directorios según los vayas necesitando.

Vamos a crear los directorios y archivos que aún no existen en nuestro proyecto.

```bash
mkdir components assets static
touch nuxt.config.js
```

Estos son los principales directorios y archivos que usaremos al crear una aplicación Nuxt.js. Encontrarás una explicación de cada uno de ellos más abajo.

<base-alert type="info">

Crear directorios con estos nombres habilita funcionalidades en tu proyecto Nuxt.js.

</base-alert>

## Directorios

### El directorio pages

El directorio `pages` contiene las vistas y las rutas de tu aplicación. Como ya aprendiste en el capítulo anterior, Nuxt.js lee todos los archivos `.vue` que se encuentren dentro de este directorio y los usa para crear las rutas de la aplicación.

<base-alert type="next">

Aprende más sobre el [directorio pages](/docs/2.x/directory-structure/pages)

</base-alert>

### El directorio components

El directorio `components` es donde pones todos tus componentes de Vue.js que luego son importados a tus páginas.

Con Nuxt.js, puedes crear tus componentes e importarlos automáticamente dentro de tus archivos .vue sin necesidad de referenciarlos manualmente en la sección script. Nuxt.js los escaneará e importará por ti de forma automática siempre que hayas configurado la propiedad components a true en el archivo de configuración nuxt.config.js.

<base-alert type="next">

Aprende más sobre el [directorio components](/docs/2.x/directory-structure/components)

</base-alert>

### El directorio assets

El directorio `assets` contiene tus recursos sin compilar, como estilos, imágenes o fuentes.

<base-alert type="next">

Aprende más sobre el [directorio assets](/docs/2.x/directory-structure/assets)

</base-alert>

### El directorio static

El directorio `static` se mapea directamente al servidor raíz y contiene archivos cuyos nombres deben mantenerse (p.ej. `robots.txt`) o probablemente no cambiarán (p.ej. el favicon).

<base-alert type="next">

Aprende más sobre el [directorio static](/docs/2.x/directory-structure/static)

</base-alert>

### El archivo nuxt.config.js

El archivo `nuxt.config.js` es el único punto de configuración de Nuxt.js. Si quieres añadir módulos o sobreescribir la configuración por defecto, es aquí donde debes aplicar los cambios.

<base-alert type="next">

Aprende más sobre el [archivo nuxt.config.js](/docs/2.x/directory-structure/nuxt-config)

</base-alert>

### El archivo  package.json

El archivo `package.json` contiene todas las dependencias y scripts de tu aplicación.

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

## Más sobre las estructuras del proyecto

Existen más directorios y archivos de gran ayuda como [content](/docs/2.x/directory-structure/content), [layouts](/docs/2.x/directory-structure/layouts), [middleware](/docs/2.x/directory-structure/middleware), [modules](/docs/2.x/directory-structure/modules), [plugins](/docs/2.x/directory-structure/plugins) y [store](/docs/2.x/directory-structure/store). Pero al no ser necesarios para desarrollar pequeñas aplicaciones no los tratamos aquí.

<base-alert type="next">

Para aprender en detalle sobre todos los directorios, puedes leer el [libro Directory Structure](/docs/2.x/directory-structure/nuxt).

</base-alert>
