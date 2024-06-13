<script setup lang="ts">
import Typography from '../common/Typography.vue'
import IconButton from '../icon/IconButton.vue'
import Avatar from './Avatar.vue'

type SpeakerProps = {
  image: string
  company?: string
  division: string
  name: string
  githubId?: string
  xId?: string
}

defineProps<SpeakerProps>()
</script>

<template>
  <div class="speaker-wrapper">
    <Avatar :src="image" :alt="name" />
    <div class="speaker-info">
      <div class="speaker-affiliation">
        <Typography v-if="company" variant="body/200" color="vue-blue">{{ company }}</Typography>
        <Typography variant="body/200" color="vue-blue">{{ division }}</Typography>
      </div>
      <Typography variant="heading/300" color="vue-blue">{{ name }}</Typography>
    </div>
    <div class="speaker-sns-icons">
      <IconButton
        v-if="githubId"
        :href="`https://github.com/${githubId}`"
        color="vue-blue"
        name="GitHub"
        can-hover
      />
      <IconButton v-if="xId" :href="`https://x.com/${xId}`" color="vue-blue" name="x" can-hover />
    </div>
  </div>
</template>

<style scoped>
.speaker-wrapper {
  display: flex;
  flex-direction: column;
  gap: calc(var(--unit) * 1.5);
}

.speaker-info {
  display: flex;
  flex-direction: column;
  gap: calc(var(--unit));
}

.speaker-sns-icons {
  display: flex;
  gap: calc(var(--unit) * 2.25);
}

@media (--mobile) {
  img {
    width: 168px;
    height: 168px;
  }
}
</style>
