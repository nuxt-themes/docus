---
title: 'La propiedad modern'
description: Construye y sirve un paquete moderno
menu: modern
category: configuration-glossary
position: 18
---

> Esta funcionalidad está inspirada por [vue-cli modern mode](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode)

- Tipo: `String` o `Boolean`
  - Por defecto: false
  - Valores posibles:
    - `'client'`: Sirve tanto el script de paquete moderno `<script type="module">` como _legacy_ `<script nomodule>`, además de ofrecer un `<link rel="modulepreload">` para el paquete moderno. Los navegadores que entiendan el tipo `module`, cargarán el paquete moderno, mientras que navegadores más antiguos usarán el _legacy_ (_transpiled_).
    - `'server'` or `true`: El servidor Node.js comprobará la versión del navegador a partir del user agent, y servirá el paquete moderno o _legacy_ correspondiente.
    - `false`: Deshabilitar el _build_ moderno.

Las dos versiones de paquetes son:

1. Paquete moderno: orientado a navegadores modernos que soportan módulos ES.
1. Paquete _legacy_: orientado a navegadores más antiguos, basado en config de babel (compatible con IE9 por defecto).

**Info:**

- Usa la opción `[--modern | -m]=[mode]` para construir/iniciar paquetes modernos:

```json{}[package.json]
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

**Nota sobre _nuxt generate_:** La propiedad `modern` también funciona con el comando `nuxt generate`, pero en este caso, sólo se admite la opción `client`, y ésta será seleccionada automáticamente al ejecutar el comando `nuxt generate --modern` sin especificar ningún valor.

- Nuxt detectará automáticamente el _build_ `modern` en `nuxt start` cuando `modern` no esté definido, modo auto-detectado es:

| Modo      | Modo moderno |
| --------- | :----------: |
| universal |    server    |
| spa       |    client    |

- El modo moderno para `nuxt generate` sólo puede ser `client`
- Utiliza [`render.crossorigin`](/docs/2.x/configuration-glossary/configuration-render#crossorigin) para definir el atributo `crossorigin` en `<link>` y `<script>`

> Por favor, visita este [excelente post de Phillip Walton](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) para más información sobre _builds_ modernos.
