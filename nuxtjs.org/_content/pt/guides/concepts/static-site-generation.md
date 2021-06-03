---
title: Geração de Sites Estáticos
description: Com a geração de sites estáticos, você pode renderizar sua aplicação durante o build e fazer deploy em qualquer serviço de hospedagem estática como Netlify, Github Pages, Vercel, etc.
position: 4
category: concepts
questions:
  - question: Você precisa de um servidor para hospedar seu site estático?
    answers:
      - True
      - False
    correctAnswer: False
  - question: Que comando você usa para gerar seu site estático?
    answers:
      - nuxt build
      - nuxt prerender
      - nuxt generate
    correctAnswer: nuxt generate
  - question: Quando sua API é chamada?
    answers:
      - Sempre que você navegar para a página com o conteúdo da API
      - Quando você gera seu site
      - Quando você gera seu site e sempre que navegar para a página com o conteúdo da API
    correctAnswer: Quando você gera seu site
  - question: Quais páginas voltarão ao modo de SPA?
    answers:
      - A página de erro
      - Aqueles que são excluídos da geração estática com generate.exclude
      - Todas as páginas de navegação
    correctAnswer: Aqueles que são excluídos da geração estática com generate.exclude
  - question: Como você atualiza o conteúdo do seu site?
    answers:
      - É atualizado automaticamente
      - Você precisa regerar seu site
    correctAnswer: Você precisa regerar seu site
---

Com a geração de sites estáticos, você pode renderizar sua aplicação durante o build e fazer deploy em qualquer serviço de hospedagem estática, como Netlify, Github Pages, Vercel, etc. Isso significa que nenhum servidor é necessário para fazer deploy da sua aplicação.

### Gerando seu site

Ao fazer o deploy do seu site com [target:static](/docs/2.x/features/deployment-targets#static-hosting), todas as suas páginas `.vue` serão geradas em arquivos HTML e JavaScript. Todas as chamadas para APIs serão feitas e armazenadas em cache em uma pasta chamada static, dentro do conteúdo gerado, para que nenhuma chamada para sua API precise ser feita pela navegação no cliente.

### Etapa 1: Navegador para CDN

Quando um navegador envia a solicitação inicial, ele atinge o CDN.

### Etapa 2: CDN para Navegador

O CDN enviará o HTML, JavaScript e arquivos estáticos já gerados, de volta ao navegador. O conteúdo é exibido e a hidratação do Vue.js entra em ação, tornando-o reativo. Após este processo, a página é interativa.

### Etapa 3: Navegador para Navegador

A navegação entre as páginas com [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) é feita no lado do cliente para que você não acesse o CDN novamente e todas as chamadas API serão carregadas da pasta static já armazenada em cache, mesmo se você for atualizar o navegador.

### Contingência para SPA

As páginas que foram excluídas da geração estática, usando a propriedade `generate.exclude`, serão tratadas como uma SPA. Essas páginas, portanto, não existirão no CDN e serão renderizadas no lado do cliente, no navegador, assim que o usuário navegar para essa página.

<base-alert type="next">

Saiba mais sobre a [propriedade generate](/docs/2.x/configuration-glossary/configuration-generate#exclude)

</base-alert>

### Atualizando seu conteúdo

Para obter novos conteúdos para seu site, a partir de sua API, você precisará gerar seu site novamente. Na maioria dos provedores de hospedagem de sites estáticos, você pode fazer isso enviando suas alterações para o branch master por meio de comando git ou por meio de uma pull request.

### Modo de Pré-visualização

O modo de Pré-visualização chamará sua API ou CMS para que você possa ver as alteraçoes antes de fazer o deploy. Consulte o [modo de pré-visualização](/docs/2.x/features/live-preview) para saber como habilitar esse recurso.

<quiz :questions="questions"></quiz>
