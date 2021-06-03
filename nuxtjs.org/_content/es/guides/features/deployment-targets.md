---
title: Destinos de despliegue
description: Destinos de despliegue
position: 2
category: features
---

## Alojamiento Estático

Con alojamiento estático, alojamiento donde no se necesita un servidor o donde no se usa `serverMiddleware`, puedes elegir alojar una aplicación de página única (single page application o SPA) o una aplicación con páginas múltples, también conocidas como sitios estáticos. Con el alojamiento estático no se necesita servidor, lo que significa que tu SPA o sitio estático se puede alojar en cualquier alojamiento serverless o en cualquier CDN gratuitamente.

### SPA

Las SPAs son páginas que se renderizan solo en el lado del cliente sin necesidad de un servidor. Para desplegar sin soporte a renderizado server-side (solo SPA) configura [ssr a `false`](/docs/2.x/features/rendering-modes#spa) y usa el comando `build` para construir tu aplicación.

```js{}[nuxt.config.js]
export default {
  ssr: false
}
```

### Sitios estáticos

Como Nuxt.js también funciona como un generador de sitios estáticos, puedes generar tu aplicación como un sitio estático. Renderiza tu aplicación Nuxt.js estáticamente y obtén todos los beneficios de una app universal sin servidor. El comando `nuxt generate` generará una versión completamente estática de tu sitio web, generando el HTML para cada una de tus rutas y situándolo en su propio archivo en la carpeta `dist`. Básicamente cualquier archivo que esté situado en la carpeta `pages` se generará como un archivo html estático. Esto mejorará tanto el rendimiento como el SEO y el soporte sin conexión.

<base-alert type="info">

Las rutas dinámicas también se generan gracias al [Nuxt Crawler](/docs/2.x/configuration-glossary/configuration-generate#crawler)

</base-alert>
  
Para sitios estáticos debes añadir el `target` `static` a tu archivo `nuxt.config`.

```js{}[nuxt.config.js]
export default {
  target: 'static' // el valor por defecto es 'server'
}
```

**Ejecutando nuxt dev con el destino estático va a mejorar la experiencia de desarrollo:**

- Elimina `req` & `res` de `context`
- Retrocede al renderizado en cliente cuando hay un 404, errores y redirecciones [ver SPA fallback](/docs/2.x/concepts/static-site-generation#spa-fallback)
- `$route.query` siempre será igual a `{}` en el renderizado server-side
- `process.static` es `true`

<base-alert type="info">

Tambien estamos exponiendo `process.target`para que los autores de módulos puedan añadir lógica dependiendo del destino.

</base-alert>

## Alojamiento en servidor

El alojamiento en servidor es un alojamiento que necesita un servidor y que está destinado a aplicaciones con SSR o aplicaciones que usan [serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware). El renderizado en el lado del servidor, también conocido como SSR (Server-Side Rendering) significa que tu página se renderiza en el servidor cuando la solicita el usuario. Cuando el usuario abre tu página en un navegador, el navegador envía una petición al servidor solicitando esa página. La página se renderizará en el servidor y se enviará de vuelta al navegador con todo su contenido.

Para el alojamiento en servidor se utiliza el `target` `server`, que es el valor por defecto. Con SSR se utiliza el comando `build` para construir la aplicación.

```js{}[nuxt.config.js]
export default {
  target: 'server'
}
```
