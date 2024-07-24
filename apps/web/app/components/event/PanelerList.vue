<script setup lang="ts">
import type { Speaker } from '@vuejs-jp/model'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'

interface PanelerListProps {
  panelers: Speaker[]
}

const props = defineProps<PanelerListProps>()

const currentLocale = useLocaleCurrent().locale
</script>

<template>
  <div class="eventcard-persons">
    <VFSpeaker
      v-for="paneler in panelers"
      :key="paneler.id"
      :image="paneler.image_url"
      :company="currentLocale === 'en' ? paneler.caption_en : paneler.caption_ja"
      :division="currentLocale === 'en' ? paneler.description_en : paneler.description_ja"
      :name="currentLocale === 'en' ? paneler.name_en : paneler.name_ja"
      :github-id="paneler.github_id"
      :x-id="paneler.x_id"
    />
  </div>
</template>

<style scoped>
.eventcard-persons {
  --head-img-width: 193px;

  display: flex;
  gap: calc(var(--unit) * 2);
  padding: 0 calc(var(--unit) * 2);
}

.eventcard-persons ::v-deep(img) {
  width: var(--head-img-width);

  @media (--mobile) {
    --head-img-width: 93px;
  }
}
</style>
