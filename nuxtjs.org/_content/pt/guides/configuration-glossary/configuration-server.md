---
title: 'A propriedade server'
description: Nuxt.js permite definir as variáveis ​​de conexão do servidor para sua aplicação dentro de `nuxt.config.js`.
menu: server
category: configuration-glossary
position: 26
---

- Tipo: `Object`

> Nuxt.js permite definir as variáveis ​​de conexão do servidor para sua aplicação dentro de `nuxt.config.js`.

## Exemplo básico:

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000, // padrão: 3000
    host: '0.0.0.0', // padrão: localhost,
    timing: false
  }
}
```

Isso permite que você especifique o [host e port](/docs/2.x/features/configuration#edit-host-and-port) para sua instância do servidor Nuxt.js.

## Exemplo usando configuração HTTPS

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

Você pode encontrar informações adicionais sobre a criação de chaves e certificados do servidor em `localhost` no artigo [certificados para localhost](https://letsencrypt.org/docs/certificates-for-localhost/).

## Exemplo de configuração de soquetes

```js{}[nuxt.config.js]
export default {
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
```

## timing

- Tipo: `Object` ou `Boolean`
- Padrão: `false`

Habilitar a opção `server.timing` adiciona um middleware para medir o tempo decorrido durante a renderização do lado do servidor e adiciona aos cabeçalhos como 'Server-Timing'.

### Exemplo usando configuração timing

`server.timing` pode ser um objeto para fornecer opções. Atualmente, apenas `total` é suportado (que rastreia diretamente todo o tempo gasto na renderização do lado do servidor).

```js{}[nuxt.config.js]
export default {
  server: {
    timing: {
      total: true
    }
  }
}
```

### Usando api timing

A api `timing` também é injetada no `response` no lado do servidor quando `server.time` é habilitado.

#### Sintaxe

```js
res.timing.start(name, description)
res.timing.end(name)
```

#### Exemplo usando timing em servermiddleware

```js
export default function (req, res, next) {
  res.timing.start('midd', 'Descrição do middleware timing')
  // operação do lado do servidor ..
  // ...
  res.timing.end('midd')
  next()
}
```

Em seguida, o cabeçalho `server-timing` será incluído no cabeçalho de resposta como:

```bash
Server-Timing: midd;desc="Descrição do middleware timing";dur=2.4
```

Consulte [Server-Timing MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) para obter mais detalhes.
