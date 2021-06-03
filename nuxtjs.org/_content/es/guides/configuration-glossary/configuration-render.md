---
title: 'La propiedad render'
description: Nuxt.js le permite personalizar las opciones de tiempo de ejecución para representar páginas
menu: render
category: configuration-glossary
position: 22
---

> Nuxt.js le permite personalizar las opciones de tiempo de ejecución para representar páginas

## bundleRenderer

- Tipo: `Object`

> Utilice esta opción para personalizar el renderizador de paquetes vue SSR. Esta opción se omite para el modo spa.

```js{}[nuxt.config.js]
export default {
  render: {
    bundleRenderer: {
      directives: {
        custom1(el, dir) {
          // something ...
        }
      }
    }
  }
}
```

Obtenga más información sobre las opciones disponibles en [Vue SSR API Reference](https://ssr.vuejs.org/en/api.html#renderer-options). Se recomienda no utilizar esta opción, ya que Nuxt.js ya proporciona los mejores valores predeterminados de SSR y una configuración incorrecta puede provocar problemas de SSR.

## etag

- Tipo: `Object`
  - Por defecto: `{ weak: true }`

Para deshabilitar etag para las páginas, configure `etag: false`

Consulte los documentos de [etag](https://www.npmjs.com/package/etag) para conocer las posibles opciones.

Puede usar su propia función hash especificando `etag.hash`:

```js{}[nuxt.config.js]
import { murmurHash128 } from 'murmurhash-native'

export default {
  render: {
    etag: {
      hash: html => murmurHash128(html)
    }
  }
}
```

En este caso usamos [murmurhash-native](https://github.com/royaltm/node-murmurhash-native), que es más rápido para tamaños corporales html más grandes. Tenga en cuenta que la opción `weak` se ignora al especificar su propia función hash.

## compressor

- Tipo `Object`
  - Por defecto: `{ threshold: 0 }`

Al proporcionar un objeto, se utilizará el middleware [compression](https://www.npmjs.com/package/compression) (con las opciones respectivas).

Si desea utilizar su propio middleware de compresión, puede hacer referencia a él directamente (p. Ej., `otherComp ({ myOptions: 'example' })`).

Para deshabilitar la compresión, use `compressor: false`.

## fallback

- Tipo `Object`
  - Por defecto: `{ dist: {}, static: { skipUnknown: true } }`

> Opciones para el middleware [serve-placeholder](https://github.com/nuxt/serve-placeholder).

Si desea deshabilitar uno de ellos o ambos, puede pasar un valor falso.

## http2

- Tipo `Object`
  - Por defecto: `{ push: false, pushAssets: null }`

> Active los encabezados push HTTP2.

Puede controlar qué enlaces enviar mediante la función `pushAssets`.

Ejemplo:

```js
pushAssets: (req, res, publicPath, preloadFiles) =>
  preloadFiles
    .filter(f => f.asType === 'script' && f.file === 'runtime.js')
    .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
```

También puede agregar sus propios activos a la matriz. Usando `req` y `res` puede decidir qué enlaces enviar basándose en los encabezados de la solicitud, por ejemplo, usando la cookie con la versión de la aplicación.

Los activos se unirán con `,` y se pasarán como un solo encabezado `Link`.

## injectScripts

- Tipo: `Boolean`
  - Por defecto: `true`

> Agrega el `<script>` para los paquetes Nuxt, configúrelo en `false` para renderizar HTML puro sin JS (disponible con `2.8.0 +`)

## resourceHints

- Tipo: `Boolean`
  - Por defecto: `true`

> Agrega enlaces `prefetch` y `preload` para acelerar el tiempo de carga inicial de la página.

Es posible que solo desee deshabilitar esta opción si tiene muchas páginas y rutas.

## ssr

- Tipo: `Boolean`
  - Por defecto: `true` en modo universal y `false` en modo spa

> Habilitar la representación SSR

Esta opción se establece automáticamente en función del valor de `modo` si no se proporciona. Esto puede ser útil para habilitar / deshabilitar SSR dinámicamente en tiempo de ejecución después de la construcción de la imagen (con Docker, por ejemplo).

## crossorigin

- Tipo: `String`
- Por defecto: `undefined`

  Configure el atributo `crossorigin` en las etiquetas `<link rel = "stylesheet">` y `<script>` en el HTML generado.

  Más información en: [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)

## ssrLog

- Tipo: `Boolean` | `String`
  - Por defecto: `true` en modo de desarrollo y `false` en producción

> Reenvíe los registros del lado del servidor al navegador para una mejor depuración (solo disponible en desarrollo)

Para contraer los registros, use el valor `'collapsed'`.

## static

- Tipo: `Object`
  - Por defecto: `{}`

> Configure el comportamiento del directorio `static/`

Consulte los documentos de [serve-static](https://www.npmjs.com/package/serve-static) para conocer las posibles opciones.

Además de ellos, introdujimos una opción de `prefix` que por defecto es `true`. Agregará la base del enrutador a sus activos estáticos.

**Ejemplo:**

- Assets: `favicon.ico`
- Base de enrutador: `/t`
- Con `prefix: true` (por defecto): `/t/favicon.ico`
- Con `prefix: false`: `/favicon.ico`

**Advertencias:**

Es posible que algunas reescrituras de URL no respeten el prefijo.

## dist

- Tipo: `Object`
  - Por defecto: `{ maxAge: '1y', index: false }`

> Opciones utilizadas para entregar archivos de distribución. Solo aplicable en producción.

Consulte los documentos de [serve-static](https://www.npmjs.com/package/serve-static) para conocer las posibles opciones.

## csp

- Tipo: `Boolean` o `Object`
  - Por defecto: `false`

> Use esto para configurar la carga de recursos externos de Content-Security-Policy

Tenga en cuenta que los hash de CSP no se agregarán si la política `script-src` contiene `'unsafe-inline'`. Esto se debe a que el navegador ignora `'unsafe-inline'` si hay hashes presentes. Establezca la opción `unsafeInlineCompatibility` en `true` si desea tanto hashes como `'unsafe-inline'` para compatibilidad con CSPv1.

Para agregar [`<meta http-equiv =" Content-Security-Policy "/>`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) con todos los CSP políticas que necesita para establecer `csp.addMeta` en `true`.

```js{}[nuxt.config.js]
export default {
  render: {
    csp: true
  }
}

// O

export default {
  render: {
    csp: {
      hashAlgorithm: 'sha256',
      policies: {
        'script-src': [
          'https://www.google-analytics.com',
          'https://name.example.com'
        ],
        'report-uri': ['https://report.example.com/report-csp-violations']
      },
      addMeta: true
    }
  }
}

// O
/*
  El siguiente ejemplo permite a Google Analytics, LogRocket.io y Sentry.io
  para registro y seguimiento analítico.

  Revise este blog en Sentry.io
  https://blog.sentry.io/2018/09/04/how-sentry-captures-csp-violations

  Para saber qué enlace de seguimiento debe utilizar.
*/
const PRIMARY_HOSTS = `loc.example-website.com`
export default {
  render: {
    csp: {
      reportOnly: true,
      hashAlgorithm: 'sha256',
      policies: {
        'default-src': ["'self'"],
        'img-src': ['https:', '*.google-analytics.com'],
        'worker-src': ["'self'", `blob:`, PRIMARY_HOSTS, '*.logrocket.io'],
        'style-src': ["'self'", "'unsafe-inline'", PRIMARY_HOSTS],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          PRIMARY_HOSTS,
          'sentry.io',
          '*.sentry-cdn.com',
          '*.google-analytics.com',
          '*.logrocket.io'
        ],
        'connect-src': [PRIMARY_HOSTS, 'sentry.io', '*.google-analytics.com'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': [PRIMARY_HOSTS],
        'report-uri': [
          `https://sentry.io/api/<project>/security/?sentry_key=<key>`
        ]
      }
    }
  }
}
```
