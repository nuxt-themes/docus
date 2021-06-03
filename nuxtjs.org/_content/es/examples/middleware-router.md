---
title: Router Middleware
description: Utilizando router middleware para establecer una clase en body y aplicarle diferentes estilos dependiento de la ruta.
position: 601
category: middleware
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/middleware/router-middleware?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

<example-intro></example-intro>

`store/class.js` establece una clase en el body.

`middleware/class.js` utiliza router middleware para establecer una clase antes de acceder a la ruta.

`components/Navigation.vue` cambia el tamaño de la fuente para la ruta con nombre `router-middleware`.

`nuxt.config.js` contiene la propiedad `router` para activar el middleware.

<base-alert type="next">

Obtén más información en el capíutlo de [middleware](/docs/2.x/directory-structure/middleware#router-middleware) del libro de Estructura de Directorio.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
