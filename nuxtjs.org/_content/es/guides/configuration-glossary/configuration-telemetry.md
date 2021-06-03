---
title: 'La propiedad de telemetría'
description: 'Nuxt.js recopila datos de telemetría anónimos sobre el uso general. Esto nos ayuda a medir con precisión el uso y la personalización de las funciones de Nuxt en todos nuestros usuarios.'
menu: telemetry
category: configuration-glossary
position: 30
---

## La propiedad de telemetría

> Nuxt v2.13.0 presenta Nuxt Telemetry para recopilar datos de telemetría anónimos sobre el uso general. Esto nos ayuda a medir con precisión el uso y la personalización de las funciones de Nuxt en todos nuestros usuarios.

- Tipo: `Boolean`
- El valor predeterminado se basa en sus preferencias de usuario

## Por qué recopilar telemetría

Nuxt.js ha crecido mucho desde su [versión inicial](https://github.com/nuxt/nuxt.js/releases/tag/v0.2.0) (7 de noviembre de 2016) y seguimos escuchando los [comentarios de la comunidad](https://github.com/nuxt/nuxt.js/issues) para mejorarlo.

Sin embargo, este proceso manual solo recopila comentarios de un subconjunto de usuarios que se toma el tiempo para completar la plantilla de problema y puede tener diferentes necesidades o casos de uso que usted.

Nuxt Telemetry recopila **datos de telemetría anónimos sobre el uso general**. Esto nos ayuda a medir con precisión el uso y la personalización de las funciones en todos nuestros usuarios. Estos datos nos permitirán comprender mejor cómo se usa Nuxt.js a nivel mundial, midiendo las mejoras realizadas (DX y rendimiento) y su relevancia.

Recopilamos múltiples eventos:

- Comandos invocados (nuxt dev, nuxt build, etc)
- Versiones de Nuxt.js y Node.js
- Información general de la máquina (MacOS / Linux / Windows y si el comando se ejecuta dentro de CI, nombre de CI)
- Duración de la compilación del Webpack y tamaño promedio de la aplicación, así como las estadísticas de generación (cuando se usa nuxt generate)
- Cuáles son las dependencias públicas de su proyecto (módulos Nuxt)

El código es de código abierto y está disponible en https://github.com/nuxt/telemetry.

## Optar por no participar

Puede deshabilitar [Nuxt Telemetry](https://github.com/nuxt/telemetry) para su proyecto de varias formas:

1. Utilizando `npx nuxt telemetry disable`

```bash
npx nuxt telemetry [status|enable|disable] [-g,--global] [dir]
```

2. Utilizando una variable de entorno

```bash
NUXT_TELEMETRY_DISABLED=1
```

3. Configurando `telemetry: false` en tu `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  telemetry: false
}
```

Puede obtener más información sobre Nuxt Telemetry y los eventos enviados en https://github.com/nuxt/telemetry
