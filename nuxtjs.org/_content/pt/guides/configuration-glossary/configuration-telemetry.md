---
title: 'A propriedade telemetry'
description: 'Nuxt.js coleta dados anônimos de telemetria sobre o uso geral. Isso nos ajuda a avaliar com precisão o uso e a personalização dos recursos do Nuxt em todos os nossos usuários.'
menu: telemetry
category: configuration-glossary
position: 30
---

## A propriedade telemetry

> O Nuxt v2.13.0 apresenta o Nuxt Telemetry para coletar dados anônimos de telemetria sobre o uso geral. Isso nos ajuda a avaliar com precisão o uso de recursos do Nuxt e personalização em todos os nossos usuários.

- Tipo: `Boolean`
- O padrão é baseado nas suas preferências de usuário

## Por que coletar telemetria

O Nuxt.js cresceu muito desde seu [lançamento inicial](https://github.com/nuxt/nuxt.js/releases/tag/v0.2.0) (7 de novembro de 2016) e continuamos ouvindo o [feedback da comunidade](https://github.com/nuxt/nuxt.js/issues) para melhorá-lo.

No entanto, esse processo manual coleta apenas feedback de um subconjunto de usuários que leva tempo para preencher o modelo de problema e pode ter necessidades ou casos de uso diferentes dos seus.

A Telemetria do Nuxt coleta **dados anônimos de telemetria sobre o uso geral**. Isso nos ajuda a avaliar com precisão o uso de recursos e personalização de todos os nossos usuários. Esses dados nos permitirão entender melhor como o Nuxt.js é usado globalmente, medindo as melhorias realizadas (DX e desempenhos) e sua relevância.

Coletamos vários eventos:

- Comandos invocados (nuxt dev, nuxt build, etc)
- Versões do Nuxt.js e Node.js
- Informações gerais da máquina (MacOS/Linux/Windows e se o comando foi executado no CI, nome do ci)
- Duração da construção do Webpack e tamanho médio da aplicação, bem como as estatísticas de geração (ao usar nuxt generate)
- Quais são as dependências públicas do seu projeto (módulos Nuxt)

O código é open source e está disponível em https://github.com/nuxt/telemetry.

## Opting-out

Você pode desativar a [Telemetria do Nuxt](https://github.com/nuxt/telemetry) para o seu projeto de várias maneiras:

1. Utilizando `npx nuxt telemetry disable`

```bash
npx nuxt telemetry [status|enable|disable] [-g,--global] [dir]
```

2. Usando variável de ambiente

```bash
NUXT_TELEMETRY_DISABLED=1
```

3. Configurando `telemetry: false` no seu `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  telemetry: false
}
```

Você pode aprender mais sobre Nuxt Telemetry e os eventos enviados em https://github.com/nuxt/telemetry
