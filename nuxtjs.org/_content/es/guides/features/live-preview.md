---
title: Modo de vista previa
description: Vista previa en vivo para target estáticos con modo vista previa
category: features
position: 12
---

Con Nuxt.js y full static ahora puedes usar el modo vista previa en vivo que llamará a tu API o tu CMS para que puedas ver los cambios en vivo antes del deploy.

<base-alert> Solo disponible usando [target:static](/docs/2.x/features/deployment-targets#static-hosting) </base-alert>

El modo de vista previa actualizará automáticamente la página los datos de la página, ya que utiliza `$nuxt.refresh` debajo y por lo tanto llama a nuxtServerInit, asyncData y fetch en el lado del cliente.

A fin de activar el modo vista previa en vivo tienes que añadir el siguiente plugin:

```js{}[plugins/preview.client.js]
export default function ({ query, enablePreview }) {
  if (query.preview) {
    enablePreview()
  }
}
```

<base-alert>
EnablePreview solo está disponible en el objeto de contexto de plugins. Las vistas previas se manejan del lado del cliente y por lo tanto, el plugin tiene que correr en el cliente: preview.client.js
</base-alert>

```js{}[nuxt.config.js]
export default {
  plugins: ['plugins/preview.client.js']
}
```

Una vez que hayas agregado el plugin, ahora puedes generar tu sitio y servirlo.

<code-group>
<code-block label="npx" active>

```bash
npx nuxt generate
npx nuxt start
```

</code-block>
<code-block label="Yarn" >

```bash
yarn generate
yarn start
```

  </code-block>
</code-group>

Luego puedes ver la pagina de vista previa agregando el parámetro query al final de la página que deseas ver:

```js
?preview=true
```

<base-alert>
enablePreview debe ser probado localmente con yarn start y no yarn
dev
</base-alert>

### Previsualización de páginas que aún no se han generado

Para las páginas que aún no se han generado, la SPA fallback seguirá llamando a la API antes de mostrar la página 404, ya que estas páginas existen en la API pero no se han generado todavía.

Si has establecido un hook de validación, probablemente necesitarás modificarlo para que no redirija a la página 404 en modo vista previa.

```js
validate({ params, query }) {
  if (query.preview) {
    return true
}
```

### Pasar datos a enablePreview

Puedes pasar datos a la función `enablePreview`. Esos datos estarán disponibles en el context helper `$preview` y en `this.$preview`.

### Que sigue?

<base-alert type="next">

Echa un vistazo al [Libro de la estructura del directorio](/docs/2.x/directory-structure/nuxt)

</base-alert>
