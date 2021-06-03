---
title: 'La propiedad watch'
description: La propiedad watch permite observar archivos personalizados para reiniciar el servidor.
menu: watch
category: configuration-glossary
position: 33
---

- Tipo: `Object`
- Por defecto: `[]`

> La propiedad watch permite observar archivos personalizados para reiniciar el servidor.

```js
watch: ['~/custom/*.js']
```

Usamos [chokidar](https://github.com/paulmillr/chokidar) para configurar los observadores. Para saber más sobre las opciones de plantillas de chokidar, visita la [API de chokidar](https://github.com/paulmillr/chokidar#api).
