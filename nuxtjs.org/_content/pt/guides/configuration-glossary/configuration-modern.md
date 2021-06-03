---
title: 'A propriedade modern'
description: Crie e administre um pacote moderno
menu: modern
category: configuration-glossary
position: 18
---

> Este recurso é inspirado no [modo moderno vue-cli](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode)

- Tipo: `String` ou `Boolean`
  - Padrão: `false`
  - Possíveis valores:
    - `'client'`: Servem ambos, os scripts com o pacote moderno `<script type="module">` e o pacote legado `<script nomodule>`, também fornecem um `<link rel="modulepreload">` para o pacote moderno. Cada navegador que entende o tipo `module` carregará o pacote moderno enquanto os navegadores mais antigos voltam para o legado (transpilado).
    - `'server'` ou `true`: O servidor Node.js verificará a versão do navegador com base no agente do usuário e servirá o pacote moderno ou legado correspondente.
    - `false`: Desativa o build moderno

As duas versões de pacotes são:

1. Pacote moderno: direcionado a navegadores modernos que suportam módulos ES
2. Pacote legado: direcionado a navegadores mais antigos com base na configuração do babel (compatível com o IE9 por padrão).

**Info:**

- Use a opção de comando `[--modern | -m]=[modo]` para construir/iniciar pacotes modernos:

```json{}[package.json]
{
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  }
}
```

**Nota sobre _nuxt generate_:** A propriedade `modern` também funciona com o comando `nuxt generate`, mas neste caso apenas a opção `client` é respeitada e será selecionada automaticamente ao iniciar o comando `nuxt generate --modern` sem fornecer quaisquer valores.

- O Nuxt detectará automaticamente o build `modern` em `nuxt start` quando `modern` não for especificado, o modo de detecção automática é:

| Mode      | Modern Mode |
| --------- | :---------: |
| universal |   server    |
| spa       |   client    |

- O modo moderno para `nuxt generate` só pode ser `cliente`
- Use [`render.crossorigin`](/docs/2.x/configuration-glossary/configuration-render#crossorigin) para definir o atributo `crossorigin` em `<link>` e `<script>`

> Por favor, consulte a [excelente postagem de Phillip Walton](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) para adquirir mais conhecimento sobre builds modernas.
