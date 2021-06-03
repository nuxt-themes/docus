---
title: Modos de Renderizado
description: Modos de Renderizado
position: 1
category: features
---

## Sitios con renderizado server-side y sitios estáticos

Los sitios estáticos son muy similares a las aplicaciones con renderizado server-side, siendo la mayor diferencia que los sitios estáticos se renderizan en tiempo de construcción, por lo que no se necesita un servidor. La navegación entre páginas se realiza en el lado del cliente.

Los sitios con renderizado server-side se renderizan en el servidor cada vez que el usuario solicita una página, por lo que se necesita un servidor para poder servir la página con cada petición.

Ver [destinos de despliegue](/docs/2.x/features/deployment-targets) para más información acerca de alojamiento estático y en servidor.

```js{}[nuxt.config.js]
export default {
  ssr: true // valor por defecto
}
```

<base-alert type="info">

No necesitas agregar `ssr: true` esto a tu configuración nuxt para activar el renderizado server-side, ya que está habilitado por defecto.

</base-alert>

## SPA

Con Single Page Applications (aplicaciones de página única) no hay renderizado en el lado del servidor, solo en el lado del cliente. El renderizado en el lado del cliente significa renderizar el contenido en el navegador mediante JavaScript. En lugar de obtener todo el contenido del HTML, solo obtenemos un documento HTML básico con un archivo Javascript que renderizará el resto del sitio usando el navegador. para [desplegar una SPA](/docs/2.x/features/deployment-targets#spa) marca `ssr` como `false` y utiliza el comando `build` para construir tu aplicación.

```js{}[nuxt.config.js]
export default {
  ssr: false
}
```

<base-alert type="next">

[La propiedad mode](/docs/2.x/configuration-glossary/configuration-mode)

</base-alert>
