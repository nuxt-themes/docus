<template>
  <div class="py-16 d-container-content">
    <div v-for="team in teams" :key="team.slug">
      <TeamTitle :slug="team.slug" :name="team.name" class="text-center pb-4" />
      <div class="text-center text-lg pb-16"><DocusContent :document="team" /></div>
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
      teams.value = await $docus.search('/teams', { deep: true }).sortBy('position', 'asc').fetch()
      teams.value = teams.value.filter(team => team.name)
    })
    return {
      teams
    }
  }
})
</script>
