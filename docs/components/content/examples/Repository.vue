<script setup lang="ts">
const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div>
    <div :id="value.name" class="flex items-center gap-4">
      <NuxtImg v-if="value?.owner?.avatar_url" :src="value?.owner?.avatar_url" class="w-8 h-8 rounded-full" />

      <span class="text-2xl font-bold">
        {{ value.name }}
      </span>

      <div class="flex items-center gap-4">
        <Badge type="warning">
          <Icon class="mr-2" name="noto:star" />
          <span class="font-bold">
            {{ value.stargazers_count }}
          </span>
        </Badge>

        <Badge>
          <Icon class="mr-2" name="noto:eye" />
          <span class="font-bold">
            {{ value.subscribers_count }}
          </span>
        </Badge>
      </div>
    </div>

    <ProseP class="font-bold">{{ value.full_name }}</ProseP>

    <ProseBlockquote>{{ value.description }}</ProseBlockquote>

    <div class="flex items-center gap-4">
      <Badge v-for="topic in value.topics" :key="topic">
        {{ topic }}
      </Badge>
    </div>

    <ProseP>
      <ProseA :href="value.html_url" target="_blank">{{ value.html_url }}</ProseA>
    </ProseP>
  </div>
</template>
