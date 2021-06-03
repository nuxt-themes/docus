---
title: Personalizar el indicador de carga de Nuxt
description: Personalizar el indicador de carga de Nuxt para cuando ssr se establezca en falso
position: 2
category: loading
csb_link: https://codesandbox.io/embed/github/nuxt-academy/examples/tree/master/loading/customize-loading-indicator?fontsize=14&hidenavigation=1&module=%2Fnuxt.config.js&theme=dark&view=editor
---

<example-intro></example-intro>

`nuxt.config.js` contiene:

- `ssr: false` por lo que solo tenemos renderizado del lado del cliente.
- `loadingIndicator` propiedad para modificar el indicador de carga predeterminado.

<base-alert type="next">

Obtenga más información en el libro de Características en el capítulo [carga](/docs/2.x/features/loading).

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
