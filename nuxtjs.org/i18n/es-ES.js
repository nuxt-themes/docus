import es from '~docus-i18n/es-ES'

export default {
  ...es,
  common: {
    an_error_occurred: 'Ha ocurrido un error',
    page_not_found: 'Página no encontrada',
    please_define_title: 'Por favor, añade un título',
    please_define_description: 'Por favor, añade una descripción',
    search: 'Buscar ("/" recibir el foco)',
    version: 'Versión'
  },
  iso: 'es',

  links: {
    download: 'Descargar',
    live_edit: 'Editar en línea'
  },
  header: {
    links: [
      {
        name: 'Docs',
        icon: 'books',
        slug: 'docs-2.x-book-slug'
      },
      {
        name: 'Ejemplos',
        icon: 'code',
        slug: 'examples'
      },
      {
        name: 'Recursos',
        icon: 'resources',
        slug: 'resources'
      },
      {
        name: 'Blog',
        icon: 'blog',
        slug: 'blog'
      },
      {
        name: 'Video Courses',
        icon: 'video',
        href: 'https://masteringnuxt.com/?utm_source=nuxt&utm_medium=link&utm_campaign=navbar_link'
      }
    ],
    search: {
      placeholder: 'Buscar ("/" recibir el foco)'
    }
  },
  homepage: {
    meta: {
      title: 'Nuxt.js - El Framework intuitivo de Vue',
      description:
        'Construye tu siguiente aplicación de Vue.js con confianza usando NuxtJS. Un framework de código abierto que trabaja para conseguir que el desarrollo web sea simple y poderoso.'
    },
    welcome: {
      title: 'El Framework {br} {frameworkType} Intuitivo',
      description:
        'Construye tu siguiente aplicación de Vue.js con confianza usando NuxtJS. Un framework de {openSource} que trabaja para conseguir que el desarrollo web sea simple y poderoso.',
      openSource: 'código abierto',
      get_started: 'comenzar',
      get_updates: 'Obtenga actualizaciones de NuxtJS cada mes en su bandeja de entrada',
      video: 'Video produced by {company}, download their free {cheatSheet}.',
      cheatSheet: 'Nuxt Cheat Sheet.'
    },
    why: {
      title: 'Por qué {nuxt}',
      try_nuxtjs_online: 'Experimenta con NuxtJS Online',
      enjoyable: {
        title: 'Agradable',
        description:
          'Nuestro enfoque principal es la experiencia del desarrollador. Nos encanta Nuxt.js y mejoramos continuamente, ¡así que a ti también te encanta! {break} Espere soluciones atractivas, mensajes de error descriptivos, poderosos valores predeterminados y documentación detallada. Si surgen preguntas o problemas, nuestra comunidad te ayudará.'
      },
      modular: {
        title: 'Modular',
        description:
          'Nuxt se basa en una potente arquitectura modular. Puede elegir entre más de 50 módulos para que su desarrollo sea más rápido y sencillo. No tiene que reinventar la rueda para obtener los beneficios de PWA, agregar Google Analytics a su página o generar un mapa del sitio.'
      },
      performant: {
        title: 'Rendimiento',
        description:
          'Con Nuxt.js, tu aplicación se optimizará desde el primer momento. Hacemos todo lo posible para crear aplicaciones de alto rendimiento utilizando las mejores prácticas de Vue.js y Node.js.Para exprimir cada bit innecesario de tu aplicación, Nuxt incluye un analizador de paquetes y muchas oportunidades para ajustar tu aplicación.'
      }
    },
    companies: {
      title: 'Quién usa {nuxt}'
    },
    modes: {
      title: '{nuxt} rendering',
      ssr: {
        title: 'Server Side Rendered',
        description:
          'El modo más popular para Nuxt. Con SSR, también llamado modo "universal" o "isomórfico", se utilizará un servidor Node.js para entregar HTML basado en tus componentes de Vue al cliente en lugar del javascript puro. El uso de SSR generará un gran impulso de SEO, una mejor UX y más oportunidades (en comparación con un Vue SPA tradicional). {Break} Debido a que implementar SSR por tu cuenta puede ser realmente tedioso, Nuxt.js le brinda soporte completo listo para usar y se encargará de los errores comunes.'
      },
      ssg: {
        title: 'Statically Generated',
        description:
          'La generación de sitios estáticos es un tema muy candente en este momento (también conocido como JAMStack). En lugar de cambiar a otro framework y dedicar tiempo a acostumbrarse a él, ¿por qué no matar dos pájaros de un tiro? {proverbial} Nuxt.js admite la generación de un sitio web estático basado en tu aplicación Vue. Es "lo mejor de ambos mundos", ya que no necesitas un servidor, pero todavía tiene beneficios de SEO porque Nuxt pre-renderizará todas las páginas e incluirá el HTML necesario. Además, puede implementar la página resultante fácilmente en páginas de Netlify o GitHub.',
        proverbial: 'sólo proverbial'
      }
    },
    sponsors: {
      title: 'Patrocinadores',
      description:
        'NuxtJS es un proyecto de código abierto con licencia del MIT y de uso completamente gratuito. Sin embargo, la cantidad de esfuerzo necesaria para mantener y desarrollar nuevas funciones para el proyecto no es sostenible sin el respaldo financiero adecuado. Si dirige un negocio y está utilizando Nuxt en un producto que genera ingresos, tiene sentido comercial patrocinar el desarrollo de Nuxt: asegura que el proyecto en el que se basa su producto se mantenga saludable y mantenido activamente. También puede ayudar a su exposición en la comunidad de Vue / Nuxt y facilita la atracción de desarrolladores de Vue / Nuxt. Si es un usuario individual y ha disfrutado de la productividad de usar Nuxt, considere donar como una señal de agradecimiento.',
      become_a_sponsor: 'Conviértete en patrocinador'
    },
    newsletter: {
      title: '{nuxt} Newsletter',
      description:
        'Recibe las últimas noticias de Nuxt en tu bandeja de entrada, organizado por el equipo de Nuxt y los contribuidores.',
      form: {
        email: 'Email',
        subscribing: 'Suscribiéndote...',
        subscribe: 'Suscríbete',
        subscribed_messages: {
          pre: 'Para confirmar tu suscripción hemos enviado un email a',
          post: '💚'
        }
      }
    }
  },
  design: {
    meta: {
      title: 'NuxtJS Design',
      description: 'Descargue los recursos de diseño de NuxtJS (SVG, iconos, emoji y favicon)'
    },
    title: '{nuxt} Design',
    description:
      'Nuxt JS es un proyecto de código abierto con licencia del MIT y de uso completamente gratuito. {break} Puede usar libremente nuestros logotipos siempre que mencione Nuxt JS y enlace a nuxtjs.org.',
    other_download_message: 'También puede descargar nuestro {favicon} o nuestro archivo {sketch}.'
  },
  resources: {
    meta: {
      title: 'NuxtJS Recursos',
      description:
        'Descubra un panel de recursos elaborado por nuestros socios. Al utilizar estos enlaces de recursos para afiliados, nos ayuda a mantener y desarrollar el framework de código abierto.'
    },
    title: '{nuxt} Recursos',
    description:
      'Descubra un panel de recursos elaborado por nuestros socios. Al utilizar estos enlaces de recursos para afiliados, nos ayuda a mantener y desarrollar el framework de código abierto.',
    themes: {
      title: 'Temas'
    },
    videos: {
      title: 'Video cursos'
    }
  },
  shop: {
    meta: {
      title: 'La tienda NuxtJS',
      description:
        '¿Quieres apoyar el proyecto NuxtJS y mostrar tu amor al resto de la comunidad? ¡Aquí nuestros productos con la mejor calidad!'
    },
    title: 'La tienda {nuxt}',
    description:
      '¿Quieres apoyar el proyecto NuxtJS y mostrar tu amor al resto de la comunidad? {Break} ¡Aquí nuestros productos con la mejor calidad!',
    button: 'Próximamente'
  },
  team: {
    meta: {
      title: 'Equipo NuxtJS',
      description:
        'NuxtJS tiene un equipo muy activo y comprometido que se esfuerza constantemente por impulsar a Nuxt hacia adelante.'
    },
    title: 'Equipo de {nuxt}',
    description:
      'El desarrollo de NuxtJS y su ecosistema está guiado por un equipo internacional. Contamos con un equipo muy activo y comprometido que se esfuerza constantemente por impulsar a Nuxt.'
  },
  themes: {
    meta: {
      title: 'NuxtJS Temas',
      description:
        'Con los temas creados por nuestros socios de Creative Tim y Theme Forest, puede ver cómo se construye una aplicación del mundo real, con Nuxt.js.'
    },
    title: '{nuxt} Temas',
    description:
      'Con los temas creados por nuestros socios de Creative Tim y Theme Forest, puede ver cómo se construye una aplicación del mundo real, con Nuxt.js.',
    button: 'OBTENERLO por'
  },
  'video-courses': {
    meta: {
      title: 'NuxtJS Video Cursos',
      description:
        'Con los cursos en video creados por nuestro socio VueSchool, puede descubrir y aprender más sobre Nuxt.js.'
    },
    title: '{nuxt} Video Cursos',
    description:
      'Con los cursos en video creados por nuestro socio VueSchool, puede descubrir y aprender más sobre Nuxt.js.',
    cta: {
      discover: 'Descubrir vueschool',
      start: 'INICIAR CURSO'
    }
  },
  sponsor: {
    meta: {
      title: 'Patrocinar el desarrollo de NuxtJS',
      description:
        'Puede respaldar el desarrollo de NuxtJS a través de diferentes métodos y garantizar actualizaciones periódicas del framework.'
    },
    title: 'Patrocinar el desarrollo de {nuxt}',
    description:
      'NuxtJS es un proyecto de código abierto con licencia del MIT y de uso completamente gratuito. {Break} Sin embargo, la cantidad de esfuerzo necesario para mantener y desarrollar nuevas funciones para el proyecto no es sostenible sin el respaldo financiero adecuado. {Break} Puede respaldar el desarrollo de NuxtJS a través de los siguientes métodos:',
    donations: {
      title: 'Donaciones únicas',
      description: 'Aceptamos donaciones a través de estos canales'
    },
    pledges: {
      title: 'Compromisos recurrentes',
      description:
        'El compromiso recurrente vienen con ventajas exclusivas, p. Ej. tener su nombre en el repositorio de NuxtJS GitHub, o colocar el logotipo de su empresa en este sitio web. Conviértase en nuxter o patrocinador a través de {opencollective} (entra en un fondo con modelos de gastos transparentes que respaldan los esfuerzos y eventos de la comunidad).'
    },
    become_a_sponsor: 'Conviértete en patrocinador'
  },
  support: {
    meta: {
      title: 'El soporte de NuxtJS',
      description:
        'Nuestro equipo de NuxtJS ahora ofrece servicios de consultoría oficiales para sus aplicaciones NuxtJS.'
    },
    title: 'Asistencia de consultoría {nuxt}',
    description:
      'Nuestro {equipo} ahora ofrece servicios de consultoría oficial para sus aplicaciones NuxtJS. {Break} Ofrecemos diferentes servicios según sus necesidades, desde soporte técnico hasta desarrollo personalizado. Espere una respuesta dentro de un día hábil, podemos firmar un acuerdo de confidencialidad personalizado y puede obtener un reembolso completo si no está satisfecho con nuestro servicio.',
    technical: {
      title: 'Soporte técnico',
      description:
        'Obtenga auditorías de proyectos, implementaciones de aplicaciones, desarrollo personalizado y soporte técnico del equipo de NuxtJS.',
      start: 'Comenzar chat',
      partner: {
        pre: 'Nos asociamos',
        post: 'para ofrecer estos servicios y poder enfocarnos en ayudarlo lo más rápido posible.'
      }
    },
    entreprise: {
      title: 'para empresas',
      description:
        'NuxtJS y los responsables de mantenimiento de miles de otros paquetes están trabajando con Tidelift para ofrecer una suscripción empresarial que cubra todo el código abierto que utiliza. {Break} Si desea la flexibilidad del código abierto y la confianza del software de calidad comercial, esto es para ti.',
      partner: {
        pre: 'Disponible como parte de la',
        post: 'suscripción.'
      },
      learn_more: 'Aprende más',
      request_a_demo: 'Solicite una demostración'
    }
  },
  blog: {
    meta: {
      title: 'NuxtJS Blog',
      description:
        'Descubra artículos del equipo de NuxtJS y de la comunidad de NuxtJS sobre NuxtJS, ¡se incluyen consejos y trucos!'
    },
    title: '{nuxt} Blog',
    description:
      'Descubra artículos de {nuxtTeam} y {nuxtCommunity} sobre NuxtJS, ¡con sugerencias y trucos incluidos!',
    nuxt_team: 'NuxtJS Team',
    nuxt_community: 'Comunidad Nuxt.js',
    contribute: '¿Te has equivocado o quieres contribuir a esta publicación de blog?'
  },
  guide: {
    release_notes: 'Notas de publicación (en)',
    toc_title: 'En esta página'
  },
  quiz: {
    title: 'Quiz'
  },
  tryNewDocs: {
    msg1: '¿Quieres echar un vistazo a nuestra nueva documentación? Nuestras ',
    link: 'nuevas docs',
    msg2: 'están ahora en modo beta. Pásalo bien!'
  },
  contribute: {
    title: 'Colaboradores',
    docs: '¿Has encontrado un error o quieres contribuir en la documentación?',
    blog: '¿Has encontrado un error o quieres contribuir en este artículo?',
    edit_on_github: 'Edita esta página en GitHub!',
    msg1: 'La contribución en esta página está cerrada. Si quieres contribuir, por favor, revisa nuestra',
    link: 'nueva documentación'
  },
  example: {
    intro: 'En esta ejemplo:'
  },
  codeSandbox: {
    open: 'Ver Ejemplo'
  },
  content: {
    guide: {
      prologue: 'Prólogo',
      'getting-started': 'Empecemos'
    },
    api: {
      essential: 'Esencial',
      pages: 'Páginas',
      components: 'Componentes',
      utils: 'Utilidades',
      configuration: 'Configuración',
      programmatically: 'Programación',
      internals: 'Mecanismos'
    },
    examples: {
      routing: 'Routing',
      dataFetching: 'Data Fetching',
      assetManagement: 'Asset Management',
      transitions: 'Transitions',
      seo: 'SEO',
      loading: 'Loading',
      miscellaneous: 'Miscellaneous',
      middleware: 'Middleware',
      plugins: 'Plugins',
      modules: 'Modules',
      customization: 'Customization',
      advanced: 'Advanced'
    },
    faq: {
      configuration: 'Configuración',
      development: 'Desarrollo',
      deployment: 'Deployment'
    },
    guides: {
      'get-started': 'Comenzar',
      concepts: 'Conceptos',
      features: 'Características',
      'directory-structure': 'Estructura de directorios',
      'configuration-glossary': 'Glosario de configuración',
      'internals-glossary': 'Glosario de aspectos internos',
      'components-glossary': 'Glosario de componentes'
    }
  },
  footer: {
    links: {
      discover: {
        title: 'Discover',
        shop: 'Our Goodies Store',
        consulting: 'Training & consultancy',
        sponsorNuxt: 'Sponsoring & donations'
      },
      about: {
        title: 'About',
        team: 'Our team',
        design: 'Design kit',
        contact: 'Contact us'
      },
      support: {
        title: 'Support',
        resources: 'Resources',
        discord: 'Chat with us',
        contributionGuide: 'Contribution guide'
      }
    }
  },
  cookies: {
    consent: 'Usamos cookies para análisis de usuarios y mejoras en la página.',
    linkLabel: 'Más información sobre las cookies',
    button: 'Entendido'
  }
}
