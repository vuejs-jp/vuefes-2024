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
      :company="currentLocale === 'en' ? paneler.company_en : paneler.company_ja"
      :division="currentLocale === 'en' ? paneler.position_en : paneler.position_en"
      :name="currentLocale === 'en' ? paneler.name_en : paneler.name_ja"
      :github-id="paneler.github_id"
      :x-id="paneler.x_id"
      row-position
    />
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.eventcard-persons {
  --head-img-width: 103px;
  --head-img-height: 103px;

  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--unit) * 2);
  padding: 0 calc(var(--unit) * 2) calc(var(--unit) * 5);

  @media (--mobile) {
    gap: calc(var(--unit) * 1);
  }
}

.eventcard-persons div {
  width: calc(calc(100% - 16px) / 2);
  height: 120px;

  @media (--mobile) {
    width: 100%;
  }
}

.eventcard-persons ::v-deep(img) {
  width: var(--head-img-width);
  height: var(--head-img-height);

  @media (--mobile) {
    --head-img-width: 103px;
  }
}
</style>
