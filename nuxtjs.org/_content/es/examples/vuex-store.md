---
title: Vuex Store
description: En el primer ejemplo mostramos cómo trabaja el store mediante una app todo
position: 7
category: miscellaneous
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/14_store?fontsize=14&hidenavigation=1&theme=dark&view=editor
---

<example-intro></example-intro>

`store/todos.js` almacena estado y mutaciones para nuestra lista _todo_.

`pages/index.vue` importa `mapMutations` del `store` y hace uso de propiedades `computed` y `methods` para añadir y eliminar _todos_ del `store`.

<base-alert type="next">

Obtén más información en el capítulo [store](/docs/2.x/directory-structure/store) del libro de Estructura de Directorios.

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
