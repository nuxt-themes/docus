<template>
  <div class="py-16 d-container-content">
    <div v-for="team in teams" :key="team.slug">
      <TeamTitle :slug="team.slug" :title="team.title" class="text-center pb-16" />
      <div class="flex justify-center">
        <div class="flex flex-wrap justify-center pb-16">
          <div v-for="member in team.members" :key="member.name">
            <TeamMember :member="member" />
          </div>
        </div>
      </div>
    </div>
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
    })
    return {
      teams
    }
  }
})
</script>
