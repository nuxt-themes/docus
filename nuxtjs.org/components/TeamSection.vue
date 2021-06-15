<template>
  <div>
    <div v-for="team in teams" :key="team.slug">
      <TeamTitle :slug="team.slug" :title="team.title" />
      <div v-for="member in team.members" :key="member.name">
        {{ member.name }}
      </div>
    </div>
    <!-- Title -->
    <!-- Avatar Component -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useFetch } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const teams = ref()
    useFetch(async () => {
      teams.value = await $docus
        .search('/teams', { deep: true })
        .where({ slug: { $in: ['core', 'community'] } })
        .sortBy('position', 'asc')
        .fetch()

      console.log(teams.value)
    })
    return {
      teams
    }
  }
})
</script>
