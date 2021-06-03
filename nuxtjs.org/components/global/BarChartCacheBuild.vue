<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: [
          '[vercel] Basic',
          '[netlify] Basic',
          '[netlify] strapi.nuxtjs.org',
          '[netlify] content.nuxtjs.org',
          '[netlify] nuxtjs.org'
        ],
        datasets: [
          {
            label: 'Build',
            backgroundColor: '#2d3748',
            data: [9, 16.4, 34.3, 41, 114]
          },
          {
            label: 'Cache',
            backgroundColor: '#108775',
            data: [3, 5.6, 7.2, 13, 25]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    )
  }
}
</script>
