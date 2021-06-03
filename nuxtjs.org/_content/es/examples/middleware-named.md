---
title: Middleware nombrado
description: Utlizando middleware nombrado para autenticar un usuario utilizando el store y permitiéndole visitar la página una vez autenticado.
position: 602
category: middleware
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/middleware/named-middleware?fontsize=14&hidenavigation=1&module=%2Fpages%2Fnamed-middleware.vue&theme=dark&view=editor
---

<example-intro></example-intro>

`pages/named-middleware.vue` contiene una propiedad `middleware` con valor `auth` la cual es llamada antes de que el usuario acceda a la ruta.

`middleware/auth.js` comprueba que el usuario está autenticado y si no lo está le redireccionará a la página de autentificación.

`pages/auth.vue` utiliza el store para autenticar al usuario.

`store/auth.js` establece los valores de usuario y de contraseña y redirecciona al usuario.

<base-alert type="next">

Obtén más información en el capítulo [middleware](/docs/2.x/directory-structure/middleware#named-middleware) del libro de Estructura del Directorio.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
