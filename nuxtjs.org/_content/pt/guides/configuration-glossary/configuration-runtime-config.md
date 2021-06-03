---
title: 'As propriedade de RuntimeConfig'
description: RuntimeConfig permite passar variáveis ​​de configuração e ambiente dinâmicas para o contexto do nuxt
menu: runtimeConfig
category: configuration-glossary
position: 25
---

A runtimeConfig permite passar configurações dinâmicas e variáveis ​​de ambiente para o contexto nuxt. Para obter mais informações de uso, consulte o [guia de configuração de tempo de execução](/docs/2.x/configuration-glossary/configuration-runtime-config).

## `publicRuntimeConfig`

- Tipo: `Object`

O valor deste objeto é **acessível tanto no cliente quanto no servidor** usando `$config`.

## `privateRuntimeConfig`

- Tipo: `Object`

O valor deste objeto é acessível no **servidor apenas** usando `$config`. Substitui `publicRuntimeConfig` no servidor.
