<script setup lang="ts">
import IconButton from '../icon/IconButton.vue'
import Avatar from './Avatar.vue'
import { useColor } from '@vuejs-jp/composable'

type SpeakerProps = {
  image: string
  company?: string
  division?: string
  name: string
  githubId?: string
  xId?: string
  rowPosition?: boolean
}

defineProps<SpeakerProps>()

const { color } = useColor()
</script>

<template>
  <div class="speaker-wrapper" :style="rowPosition ? '' : 'flex-direction: column;'">
    <Avatar :src="image" :alt="name" />
    <div class="speaker-info">
      <div class="speaker-affiliation">
        <p
          v-if="company"
          :style="{
            color: color('vue-blue'),
          }"
        >
          {{ company }}
        </p>
        <p
          :style="{
            color: color('vue-blue'),
          }"
        >
          {{ division }}
        </p>
      </div>
      <h3
        class="speaker-name"
        :style="{
          color: color('vue-blue'),
        }"
      >
        {{ name }}
      </h3>
    </div>
    <div v-if="!rowPosition" class="speaker-sns-icons">
      <IconButton
        v-if="githubId"
        :href="`https://github.com/${githubId}`"
        color="vue-blue"
        name="GitHub24"
        target-blank
        class="speaker-sns-icon"
      />
      <IconButton
        v-if="xId"
        :href="`https://x.com/${xId}`"
        color="vue-blue"
        name="x24"
        target-blank
        class="speaker-sns-icon"
      />
    </div>
  </div>
</template>

<style scoped>
.speaker-wrapper {
  display: flex;
  gap: calc(var(--unit) * 1.5);
}

.speaker-info {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.speaker-affiliation {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
}

.speaker-name {
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.66px;
}

.speaker-sns-icons {
  display: flex;
  gap: calc(var(--unit) * 2);
}

.speaker-sns-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--unit) * 3);
  height: calc(var(--unit) * 3);
}

/* TODO: メディアクエリは変数に変えたい（--mobile） */
@media (width <= 480px) {
  .speaker-wrapper {
    gap: calc(var(--unit));
  }

  .speaker-name {
    font-size: 0.875rem;
    letter-spacing: 0.4px;
  }

  .speaker-affiliation {
    font-size: 0.6875rem;
  }

  .speaker-sns-icons {
    gap: calc(var(--unit) * 1.5);
  }

  .speaker-sns-icon {
    width: calc(var(--unit) * 2.25);
    height: calc(var(--unit) * 2.25);
  }
}
</style>
