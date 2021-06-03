---
title: 'A propriedade watch'
description: A propriedade watch permite que você observe os arquivos personalizados para reiniciar o servidor.
menu: watch
category: configuration-glossary
position: 33
---

- Tipo: `Object`
- Padrão: `[]`

> A propriedade watch permite que você observe os arquivos personalizados para reiniciar o servidor.

```js
watch: ['~/custom/*.js']
```

[chokidar](https://github.com/paulmillr/chokidar) é usado para configurar os observadores. Para saber mais sobre as opções padrão do chokidar, consulte a [API chokidar](https://github.com/paulmillr/chokidar#api).
