<template>
  <div class="shadow-nuxt">
    <div class="container mx-auto px-4 pt-16 pb-12">
      <div class="flex flex-wrap justify-between mb-8">
        <div class="lg:w-6/12 lg:text-left text-center p-4 sm:p-0">
          <i18n
            path="team.title"
            tag="h1"
            class="text-3xl xl:text-4xl text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary font-medium leading-normal mb-6 lg:pt-4 transition-colors duration-300 ease-linear"
          >
            {{ $t('team.title') }}
            <template #nuxt>
              <AppTitle />
            </template>
          </i18n>
          <h3
            class="xl:text-lg text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary font-medium leading-relaxed mb-6"
          >
            {{ $t('team.description') }}
          </h3>
        </div>
        <TeamIllustration
          class="w-2/3 mx-auto lg:mx-0 lg:w-5/12 lg:-mt-8 text-light-elevatedSurface dark:text-dark-elevatedSurface"
        />

        <TeamMembers :team="nuxtCompany.team" :title="nuxtCompany.title" />
        <TeamMembers :team="nuxtCommunity.team" :title="nuxtCommunity.title" />
      </div>
    </div>
  </div>
</template>

<script>
import TeamIllustration from '~/assets/illustrations/team.svg?inline'

export default {
  components: {
    TeamIllustration
  },
  data() {
    return {
      nuxtCompany: {
        title: 'NuxtJS Company',
        team: [
          {
            name: 'Alexandre Chopin',
            city: 'Bordeaux, France',
            github: 'alexchopin',
            twitter: 'iamnuxt',
            website: 'https://alexchopin.com',
            role: 'CEO',
            badges: ['framework']
          },
          {
            name: 'Sébastien Chopin',
            city: 'Bordeaux, France',
            github: 'Atinux',
            twitter: 'Atinux',
            website: 'https://atinux.com',
            role: 'CTO',
            badges: ['framework']
          },
          {
            name: 'Pooya Parsa',
            alias: 'پویا پارسا',
            city: 'Amsterdam, Netherlands',
            github: 'pi0',
            twitter: '_pi0_',
            role: 'Head of Framework',
            badges: ['framework']
          },
          {
            name: "Debbie O'Brien",
            city: 'Palma de Mallorca, Spain',
            github: 'debs-obrien',
            twitter: 'debs_obrien',
            website: 'https://debbie.codes',
            role: 'Head of Learning'
          },
          {
            name: 'Florent Delerue',
            city: 'Bordeaux, France',
            github: 'Flosciante',
            twitter: 'flosciante',
            role: 'Chief Process Officer'
          },
          {
            name: 'Sergey Bedritsky',
            city: 'Kiev, Ukraine',
            github: 'bdrtsky',
            twitter: 'sergeybedritsky',
            website: 'https://sergeybedritsky.me/',
            role: 'Lead Developer'
          },
          {
            name: 'Vincent Rodriguez',
            city: 'Bordeaux, France',
            github: 'R-mooon',
            twitter: 'RodrigodelaNoch',
            role: 'Creative Developer'
          },
          {
            name: 'Sarah Moriceau',
            city: 'Bordeaux, France',
            github: 'sarahnuxtjs',
            twitter: 'moriceau_sarah',
            role: 'Web Designer'
          },
          {
            name: 'Benjamin Canac',
            city: 'Bordeaux, France',
            github: 'benjamincanac',
            twitter: 'benjamincanac',
            role: 'Back-end developer'
          },
          {
            name: 'Ahad Birang',
            city: 'Tehran, Iran',
            github: 'farnabaz',
            twitter: 'a_birang',
            website: 'https://farnabaz.ir',
            role: 'Lead developer'
          },
          {
            name: 'Jeremy Riera',
            city: 'Bordeaux, France',
            github: 'JeremmNuxt',
            twitter: 'K_Jeremy_',
            role: 'Growth Hacker'
          },
          {
            name: 'Sylvain Marroufin',
            city: 'Bordeaux, France',
            github: 'smarroufin',
            twitter: 'smarroufin',
            role: 'JS developer'
          }
        ]
      },
      nuxtCommunity: {
        title: 'Nuxt.js Community',
        team: [
          {
            name: 'Clark Du',
            alias: '杜欣',
            city: 'Dublin, Ireland',
            github: 'clarkdo',
            twitter: 'ClarkDu_',
            website: 'https://clark.js.org/',
            badges: ['framework']
          },
          {
            name: 'Daniel Roe',
            city: 'Durham, UK',
            github: 'danielroe',
            twitter: 'danielcroe',
            website: 'https://roe.dev',
            badges: ['framework']
          },
          {
            name: 'Jonas Galvez',
            city: 'Barretos, Brazil',
            github: 'galvez',
            twitter: 'anothergalvez',
            website: 'https://hire.jonasgalvez.com.br',
            badges: ['maintainer']
          },
          {
            name: 'Dmitry Molotkov',
            alias: 'Дзмітрый Малаткоў',
            city: 'Gomel, Belarus',
            github: 'aldarund',
            twitter: 'aldarund',
            badges: ['maintainer']
          },
          {
            name: 'Kevin Marrec',
            city: 'Rennes, France',
            github: 'kevinmarrec',
            twitter: 'K_Marrec',
            website: 'https://marrec.io',
            badges: ['maintainer']
          },
          {
            name: 'Pim',
            city: 'The Netherlands',
            github: 'pimlie',
            badges: ['maintainer']
          },
          {
            name: 'Alexander Lichter',
            city: 'Leipzig, Germany',
            github: 'manniL',
            twitter: 'TheAlexLichter',
            website: 'https://blog.lichter.io',
            badges: ['maintainer']
          },
          {
            name: 'Ricardo Gobbo de Souza',
            city: 'São José dos Campos, São Paulo, Brasil',
            github: 'ricardogobbosouza',
            twitter: '@gobbo_ricardo',
            website: 'https://datalogix.com.br/',
            badges: ['maintainer']
          },
          {
            name: 'Krutie Patel',
            city: 'Brisbane, Australia',
            github: 'Krutie',
            twitter: 'KrutiePatel',
            website: 'https://krutiepatel.com',
            badges: ['ambassador']
          },
          {
            name: 'Josh Deltener',
            city: 'North Dakota, USA',
            github: 'hecktarzuli',
            twitter: 'JoshDeltener',
            website: 'https://deltener.com/',
            badges: ['ambassador']
          },
          {
            name: 'Maya Shavin',
            city: 'Israel',
            github: 'mayashavin',
            twitter: 'MayaShavin',
            website: 'https://mayashavin.com',
            badges: ['ambassador']
          },
          {
            name: 'Giraud Florent',
            city: 'Montreal, Canada',
            github: 'f3ltron',
            twitter: 'giraud_florent',
            website: 'https://florent.dev/',
            badges: ['ambassador']
          },
          {
            name: 'Alba Silvente',
            city: 'Amsterdam, The Netherlands',
            github: 'Dawntraoz',
            twitter: 'dawntraoz',
            website: 'https://www.dawntraoz.com/',
            badges: ['ambassador']
          },
          {
            name: 'Tim Benniks',
            city: 'Paris, France',
            github: 'timbenniks',
            twitter: 'timbenniks',
            website: 'https://timbenniks.dev/',
            badges: ['ambassador']
          },
          {
            name: 'Gift Egwuenu',
            city: 'Amsterdam, The Netherlands',
            github: 'lauragift21',
            twitter: 'lauragift_',
            website: 'https://www.giftegwuenu.com/',
            badges: ['ambassador']
          }
        ]
      }
    }
  },
  head() {
    const title = this.$t('team.meta.title')
    const description = this.$t('team.meta.description')

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description
        }
      ]
    }
  }
}
</script>
