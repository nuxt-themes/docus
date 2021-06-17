export default {
  common: {
    an_error_occurred: 'Terjadi kesalahan',
    page_not_found: 'Halaman tidak ditemukan',
    please_define_title: 'Silakan tentukan judul di bagian depan',
    please_define_description: 'Silakan tentukan deskripsi di bagian depan',
    search: 'Cari ("/" untuk fokus)',
    version: 'Versi'
  },
  iso: 'id',

  links: {
    download: 'Unduh',
    live_edit: 'Sunting Langsung'
  },
  header: {
    links: [
      {
        name: 'Panduan',
        icon: 'books',
        slug: 'docs-2.x-book-slug'
      },
      {
        name: 'Contoh',
        icon: 'code',
        slug: 'examples'
      },
      {
        name: 'Sumber Daya',
        icon: 'resources',
        slug: 'resources'
      },
      {
        name: 'Blog',
        icon: 'blog',
        slug: 'blog'
      },
      {
        name: 'Kursus Video',
        icon: 'video',
        href: 'https://masteringnuxt.com/?utm_source=nuxt&utm_medium=link&utm_campaign=navbar_link'
      }
    ],
    search: {
      placeholder: 'Cari ("/" untuk fokus)'
    }
  },
  homepage: {
    meta: {
      title: 'Nuxt.js - Aplikasi Vue.js Universal',
      description:
        'Nuxt.js adalah kerangka kerja minimalis untuk membuat aplikasi Vue.js dengan server side rendering, hot-reloading, static generation, dan banyak lagi!'
    },
    welcome: {
      title: 'Kerangka Kerja {br} {frameworkType} nan Intuitif',
      description:
        'Bangun aplikasi Vue.js Anda berikutnya dengan percaya diri menggunakan NuxtJS. Kerangka kerja {openSource} yang membuat pengembangan web menjadi sederhana dan efektif.',
      openSource: 'sumber terbuka',
      get_started: 'memulai',
      get_updates:
        'Dapatkan pembaruan NuxtJS ke kotak masuk surel Anda setiap bulannya',
      video:
        'Video diproduksi oleh {company}, unduh {cheatSheet} gratis dari mereka.',
      cheatSheet: 'cheatsheet Nuxt'
    },
    why: {
      title: 'Mengapa {nuxt}',
      try_nuxtjs_online: 'Coba NuxtJS secara Daring',
      enjoyable: {
        title: 'Menyenangkan',
        description:
          'Fokus utama kami adalah pengalaman pengembang. Kami menyukai Nuxt.js dan terus meningkatkan kerangka kerja ini sehingga Anda juga akan menyukainya! {break} Harapkan solusi yang menarik, pesan kesalahan deskriptif, standar kuat dan dokumentasi terperinci. Jika ada pertanyaan atau masalah, komunitas kami akan membantu Anda.'
      },
      modular: {
        title: 'Modular',
        description:
          'Nuxt didasarkan pada arsitektur modular yang efektif. Anda dapat memilih dari lebih dari 50 modul untuk membuat pengembangan Anda lebih cepat dan lebih mudah. Anda tidak harus "reinventing the wheel" untuk mendapatkan manfaat PWA, menambahkan Google Analytics ke halaman Anda atau menghasilkan peta situs.'
      },
      performant: {
        title: 'Kinerja',
        description:
          'Dengan Nuxt.js, aplikasi Anda akan dioptimalkan secara otomatis. Kami melakukan yang terbaik untuk membangun aplikasi yang efisien dengan memanfaatkan praktik terbaik Vue.js dan Node.js. Untuk membuang setiap bagian yang tidak perlu dari aplikasi Anda, Nuxt menyertakan penganalisa bundel dan banyak peluang untuk menyempurnakan aplikasi Anda.'
      }
    },
    companies: {
      title: 'Siapa yang menggunakan {nuxt}'
    },
    modes: {
      title: '{nuxt} rendering',
      ssr: {
        title: 'Server Side Rendered',
        description:
          'Mode paling populer untuk Nuxt. Dengan SSR, juga disebut mode "universal" atau "isomorphic", server Node.js akan digunakan untuk mengirimkan HTML berdasarkan komponen Vue Anda ke klien alih-alih JavaScript murni. Menggunakan SSR membawa keuntungan besar seperti peningkatan SEO, UX yang lebih baik, dan lebih banyak peluang (dibandingkan dengan Vue SPA tradisional). {Break} Dikarenakan menerapkan SSR dari awal bisa jadi sangat menjemukan, Nuxt.js sudah memiliki dukungan penuh untuk SSR dan dirancang untuk terhindar dari kesulitan-kesulitan tersembunyi yang umum terjadi.'
      },
      ssg: {
        title: 'Generate Secara Statis',
        description:
          'Static Site Generation (alias JAMStack) adalah topik yang banyak dibicarakan saat ini. Alih-alih beralih ke kerangka kerja lain dan menghabiskan waktu untuk membiasakan diri, mengapa tidak membunuh dua burung dengan satu batu? {proverbial} Nuxt.js mendukung pembuatan situs web statis berdasarkan aplikasi Vue Anda. Ini adalah "yang terbaik dari kedua dunia" karena Anda tidak memerlukan server tetapi masih memiliki manfaat SEO karena Nuxt akan melakukan pra-render terhadap semua halaman Anda dan menyertakan HTML yang diperlukan. Anda juga dapat men-deploy halaman yang dihasilkan dengan mudah ke Netlify atau GitHub.',
        proverbial: 'hanya pepatah'
      }
    },
    sponsors: {
      title: 'Menjadi Sponsor',
      description:
        'NuxtJS adalah proyek sumber terbuka berlisensi MIT dan sepenuhnya gratis untuk digunakan. Namun, jumlah upaya yang diperlukan untuk mempertahankan dan mengembangkan fitur-fitur baru untuk proyek ini tidak memungkinkan untuk dilakukan secara berkelanjutan tanpa dukungan keuangan yang memadai. Jika Anda menjalankan bisnis dan menggunakan Nuxt dalam produk Anda serta menghasilkan pendapatan, secara bisnis, masuk akal bagi Anda untuk mensponsori pengembangan Nuxt: memastikan proyek yang diandalkan produk Anda tetap sehat dan dipelihara secara aktif. Hal ini juga dapat membantu exposure Anda di komunitas Vue/Nuxt dan membuat Anda lebih mudah untuk menarik pengembang Vue/Nuxt. Jika Anda adalah pengguna individu dan telah menikmati produktivitas menggunakan Nuxt, pertimbangkan untuk memberi donasi sebagai tanda penghargaan.',
      become_a_sponsor: 'Menjadi sponsor'
    },
    newsletter: {
      title: 'Buletin {nuxt}',
      description:
        'Dapatkan berita Nuxt terbaru ke kotak masuk surel Anda, dikurasi oleh tim NuxtJS.',
      form: {
        email: 'Alamat Surel',
        subscribing: 'Berlangganan...',
        subscribe: 'Langganan',
        subscribed_messages: {
          pre: 'Pesan untuk mengonfirmasi langganan Anda telah dikirim',
          post: '💚'
        }
      }
    }
  },
  design: {
    meta: {
      title: 'Desain NuxtJS',
      description:
        'Unduh sumber daya desain NuxtJS (SVG, ikon, emoji, dan favicon).'
    },
    title: 'Desain {nuxt}',
    description:
      'NuxtJS adalah proyek open source berlisensi MIT dan sepenuhnya gratis untuk digunakan. {break} Anda dapat dengan bebas menggunakan logo kami selama Anda menyebutkan NuxtJS dan mencantumkan tautan ke nuxtjs.org.',
    other_download_message:
      'Anda juga dapat mengunduh berkas {favicon} atau {sketch} kami.'
  },
  resources: {
    meta: {
      title: 'Sumber Daya NuxtJS',
      description:
        'Temukan panel sumber daya yang dibuat oleh mitra kami. Dengan menggunakan tautan sumber daya afiliasi itu, Anda membantu kami memelihara dan mengembangkan Kerangka Sumber Terbuka.'
    },
    title: 'Sumber Daya {nuxt}',
    description:
      'Temukan panel sumber daya yang dibuat oleh mitra kami. Dengan menggunakan tautan sumber daya afiliasi mereka, Anda membantu kami menjaga dan mengembangkan Kerangka Sumber Terbuka.',
    themes: {
      title: 'Tema'
    },
    videos: {
      title: 'Video Kursus'
    }
  },
  shop: {
    meta: {
      title: 'Toko NuxtJS',
      description:
        'Anda ingin mendukung proyek NuxtJS dan menunjukkan cinta Anda kepada seluruh komunitas? Berikut produk kami dengan kualitas terbaik yang pernah ada!'
    },
    title: 'Toko {nuxt}',
    description:
      'Anda ingin mendukung proyek NuxtJS dan menunjukkan cinta Anda kepada seluruh komunitas? {Break} Ini produk kami dengan kualitas terbaik yang pernah ada!',
    button: 'Segera hadir'
  },
  team: {
    meta: {
      title: 'Tim NuxtJS',
      description:
        'NuxtJS memiliki tim yang sangat aktif dan sibuk yang terus berupaya untuk mendorong perkembangan Nuxt.'
    },
    title: 'Tim {nuxt}',
    description:
      'Pengembangan NuxtJS dan ekosistemnya dipandu oleh tim internasional. Kami memiliki tim yang sangat aktif dan sibuk yang terus berupaya untuk mendorong perkembangan Nuxt.'
  },
  themes: {
    meta: {
      title: 'Tema NuxtJS',
      description: ''
    },
    title: 'Tema {nuxt}',
    description:
      'Dengan tema di bawah ini yang dibangun oleh mitra kami dari Tim Kreatif dan Hutan Tema Anda dapat melihat bagaimana aplikasi dunia nyata dibangun, dengan Nuxt.js menumpuk di belakang.',
    button: 'Dapatkan harga'
  },
  'video-courses': {
    meta: {
      title: 'Video Kursus NuxtJS',
      description:
        'Dengan kursus video di bawah ini yang dibuat oleh mitra kami VueSchool, Anda dapat menemukan dan mempelajari lebih lanjut tentang kerangka kerja Nuxt.js.'
    },
    title: 'Video Kursus {nuxt}',
    description:
      'Dengan kursus video di bawah ini yang dibuat oleh mitra kami VueSchool Anda dapat menemukan dan mempelajari lebih lanjut tentang kerangka kerja Nuxt.js.',
    cta: {
      discover: 'Discover vueschool',
      start: 'MULAI KURSUS'
    }
  },
  sponsor: {
    meta: {
      title: 'Sponsor Pengembang NuxtJS',
      description:
        'Anda dapat mendukung pengembangan NuxtJS melalui metode yang berbeda dan memastikan pembaruan berkala pada kerangka kerja ini.'
    },
    title: 'Sponsor Pengembang {nuxt}',
    description:
      'NuxtJS adalah proyek sumber terbuka berlisensi MIT dan sepenuhnya gratis untuk digunakan. {Break} Namun, jumlah upaya yang diperlukan untuk mempertahankan dan mengembangkan fitur baru untuk proyek ini tidak dapat dilakukan secara berkelanjutan tanpa dukungan keuangan yang memadai. {Break} Anda dapat mendukung pengembangan NuxtJS melalui metode berikut:',
    donations: {
      title: 'Satu kali donasi',
      description: 'Kami menerima donasi melalui saluran ini'
    },
    pledges: {
      title: 'Janji Berulang',
      description:
        'Janji berulang datang dengan tunjangan eksklusif, mis. membuat nama Anda terdaftar di repositori NuxtJS GitHub, atau menempatkan logo perusahaan Anda di situs web ini. Menjadi nuxter atau sponsor melalui {opencollective} (masuk ke dana dengan model pengeluaran transparan yang mendukung upaya dan acara komunitas).'
    },
    become_a_sponsor: 'Menjadi sponsor'
  },
  support: {
    meta: {
      title: 'Dukungan NuxtJS',
      description:
        'Tim NuxtJS kami sekarang menawarkan layanan konsultasi resmi untuk aplikasi NuxtJS Anda.'
    },
    title: 'Konsultasi {nuxt} Dukungan',
    description:
      '{team} kami sekarang menawarkan layanan konsultasi resmi untuk aplikasi NuxtJS Anda. {Break} Kami menawarkan layanan berbeda tergantung kebutuhan Anda, dari dukungan teknis hingga pengembangan kustom. Anda dapat mengharapkan balasan dalam satu hari kerja, kami dapat menandatangani Perjanjian Larangan Pengungkapan Informasi Rahasia (_Non-Disclosure Agreement_) khusus dan Anda bisa mendapatkan pengembalian dana penuh jika Anda tidak puas dengan layanan kami.',
    technical: {
      title: 'Dukungan teknis',
      description:
        'Dapatkan audit proyek, penerapan aplikasi, pengembangan kustom, dan dukungan teknis dari tim NuxtJS.',
      start: 'Memulai obrolan',
      partner: {
        pre: 'Kami bermitra dengan',
        post: 'untuk menawarkan layanan ini sehingga kami dapat fokus membantu Anda secepat mungkin.'
      }
    },
    entreprise: {
      title: 'untuk perusahaan',
      description:
        'NuxtJS dan pengelola ribuan paket lainnya bekerja dengan Tidelift untuk memberikan satu langganan perusahaan yang mencakup semua sumber terbuka yang Anda gunakan. {Break} Jika Anda ingin fleksibilitas open source dan kepercayaan diri dari perangkat lunak kelas komersial, ini tepat untuk Anda.',
      partner: {
        pre: 'Tersedia sebagai bagian dari',
        post: 'subscription.'
      },
      learn_more: 'Pelajari lebih lanjut',
      request_a_demo: 'Minta demo'
    }
  },
  blog: {
    meta: {
      title: 'Blog NuxtJS',
      description:
        'Temukan artikel dari tim inti NuxtJS dan kontributor NuxtJS tentang NuxtJS, termasuk tips dan trik!'
    },
    title: 'Blog {nuxt}',
    description:
      'Temukan artikel tentang NuxtJS dari {nuxtTeam} dan {nuxtCommunity} NuxtJS, termasuk tips dan trik!',
    nuxt_team: 'Tim NuxtJS',
    nuxt_community: 'Komunitas Nuxt.js',
    contribute:
      'Menemukan kesalahan atau ingin berkontribusi pada pengeposan blog ini?'
  },
  guide: {
    release_notes: 'Catatan Rilis',
    toc_title: 'Di halaman ini'
  },
  quiz: {
    title: 'Kuis'
  },
  tryNewDocs: {
    msg1: 'Ingin melihat dokumen baru kami? ',
    link: 'dokumen baru',
    msg2: ' kami sekarang dalam versi beta. Selamat bersenang-senang!'
  },
  contribute: {
    title: 'Kontributor',
    docs: 'Jumpa kesalahan atau ingin berkontribusi pada dokumentasi ini?',
    blog: 'Jumpa kesalahan atau ingin berkontribusi pada posting blog ini?',
    edit_on_github: 'Sunting halaman ini di GitHub!',
    msg1: 'Kontribusi untuk halaman ini sekarang ditutup. Jika Anda ingin berkontribusi, silakan periksa ',
    link: 'dokumen baru'
  },
  example: {
    intro: 'Dalam contoh berikut:'
  },
  codeSandbox: {
    open: 'Buka CodeSandbox'
  },
  content: {
    guide: {
      prologue: 'Prolog',
      'getting-started': 'Memulai'
    },
    api: {
      essential: 'Penting',
      pages: 'Halaman',
      components: 'Komponen',
      utils: 'Utilitas',
      configuration: 'Konfigurasi',
      programmatically: 'Secara Terprogram',
      internals: 'Internal'
    },
    examples: {
      essentials: 'Penting',
      customization: 'Kustomisasi',
      advanced: 'Lanjutan'
    },
    faq: {
      configuration: 'Konfigurasi',
      development: 'Development',
      deployment: 'Deployment'
    },
    guides: {
      'get-started': 'Memulai',
      concepts: 'Konsep',
      features: 'Fitur',
      'directory-structure': 'Struktur Direktori',
      'configuration-glossary': 'Konfigurasi Glosarium',
      'internals-glossary': 'Internal Glosarium',
      'components-glossary': 'Komponen Glosarium'
    }
  },
  footer: {
    links: {
      discover: {
        title: 'Discover',
        shop: 'Our Goodies Store',
        consulting: 'Konsultasi & Training',
        sponsorNuxt: 'Donasi dan Menjadi Sponsor'
      },
      about: {
        title: 'Tentang',
        team: 'Tim kami',
        design: 'Kit desain',
        contact: 'Kontak kami'
      },
      support: {
        title: 'Dukungan',
        resources: 'Sumber Daya',
        discord: 'Mengobrol dengan kami',
        contributionGuide: 'Panduan kontribusi'
      }
    }
  },
  cookies: {
    consent:
      'Kami menggunakan Cookie untuk menganalisis pengguna dan melakukan peningkatan pada halaman!',
    linkLabel: 'Pelajari tentang cookie',
    button: 'Mengerti'
  }
}
