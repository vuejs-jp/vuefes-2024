<script setup lang="ts">
import LinkButton from '../link/LinkButton.vue'

interface RelatedEventFrameProps {
  src: string
  alt: string
  registerUrl: string
  registerActionText: string
  disabled?: boolean
}

const props = withDefaults(defineProps<RelatedEventFrameProps>(), {
  disabled: false,
})
</script>

<template>
  <div class="related-event">
    <img width="475" height="210" :alt :src decoding="async" loading="lazy" />
    <div class="event-explain">
      <div class="title">
        <slot name="title" />
      </div>
      <div class="description">
        <slot name="description" />
      </div>
    </div>
    <div class="event-register">
      <LinkButton
        is="a"
        background-color="vue-green/200"
        color="white"
        :href="registerUrl"
        target="_blank"
        :disabled
      >
        {{ registerActionText }}
      </LinkButton>
    </div>
  </div>
</template>

<style scoped>
.related-event {
  --img-size: 475px;
  max-width: 475px;
  display: grid;
  gap: 0.6em;
}

.related-event img {
  height: 210px;
}

.event-explain {
  min-height: 180px;
}

.title {
  font-weight: bold;
  font-size: 22px;
  white-space: pre-wrap;
  line-height: 1.2;
}

.description {
  font-size: 16px;
}

.description a {
  color: var(--color-vue-green);
  text-decoration: underline;

  &:hover {
    opacity: 0.4;
    transition: 0.2s;
  }
}

.event-register {
  --height-button: 66px;

  display: flex;
  justify-content: center;
  height: var(--height-button);
  border-radius: var(--height-button);
}

@media (max-width: 1024px) {
  .related-event {
    --img-size: 368px;
    max-width: 368px;
  }

  .event-register {
    --height-button: 58px;
  }
}

@media (max-width: 768px) {
  .related-event {
    --img-size: 690px;
    max-width: 690px;
  }

  .related-event img {
    height: 100%;
  }

  .title {
    font-size: 16px;
  }
}
</style>
