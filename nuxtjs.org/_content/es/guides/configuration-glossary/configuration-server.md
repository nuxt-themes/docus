---
title: 'La propiedad server'
description: Nuxt.js le permite definir las variables de conexión del servidor para su aplicación dentro de `nuxt.config.js`.
menu: server
category: configuration-glossary
position: 26
---

- Tipo: `Object`

> Nuxt.js le permite definir las variables de conexión del servidor para su aplicación dentro de `nuxt.config.js`.

## Ejemplo básico:

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000, // por defecto: 3000
    host: '0.0.0.0', // por defecto: localhost,
    timing: false
  }
}
```

Esto le permite especificar el [host y puerto](/docs/2.x/features/configuration#edit-host-and-port) para su instancia de servidor Nuxt.js.

## Ejemplo usando la configuración HTTPS

```js{}[nuxt.config.js]
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

Puede encontrar información adicional sobre la creación de claves de servidor y certificados en el artículo `localhost` en [certificados para localhost](https://letsencrypt.org/docs/certificates-for-localhost/).

## Ejemplo de configuración de sockets

```js{}[nuxt.config.js]
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```

## timing

- Tipo: `Object` o `Boolean`
- Por defecto: `false`

Habilitar la opción `server.timing` agrega un middleware para medir el tiempo transcurrido durante la renderización del lado del servidor y lo agrega a los encabezados como 'Server-Timing'

### Ejemplo usando configuración de timing

`server.timing` puede ser un objeto para proporcionar opciones. Actualmente, solo se admite `total` (que rastrea directamente todo el tiempo dedicado a la representación del lado del servidor)

```js{}[nuxt.config.js]
export default {
  server: {
    timing: {
      total: true
    }
  }
}
```

### Usando la api de timing

La api `timing` también se inyecta en la `response` en el lado del servidor cuando `server.time` está habilitado.

#### Sintaxis

```js
res.timing.start(name, description)
res.timing.end(name)
```

#### Ejemplo de uso de timing en servermiddleware

```js
export default function (req, res, next) {
  res.timing.start('midd', 'Middleware timing description')
  // operación del lado del servidor..
  // ...
  res.timing.end('midd')
  next()
}
```

Luego, el encabezado `server-timing` se incluirá en el encabezado de respuesta como:

```bash
Server-Timing: midd;desc="Middleware timing description";dur=2.4
```

Consulte [Server-Timing MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) para obtener más detalles.
