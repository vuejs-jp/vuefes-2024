<script setup lang="ts">
import { useDecode } from '@vuejs-jp/composable'
import { onMounted, ref } from 'vue'

interface EventFrameProps {
  title: string
  fontClass?: string
  paddingClass?: string
}

const props = withDefaults(defineProps<EventFrameProps>(), {
  fontClass: 'title-1',
  paddingClass: 'content-1',
})

const { decodeHtml } = useDecode()
const titleText = ref('')

onMounted(function () {
  titleText.value = decodeHtml(props.title, 'textarea') ?? props.title
})
</script>

<template>
  <div class="event-frame-root">
    <div class="event-frame-content" :class="paddingClass">
      <h3 :class="fontClass" v-html="titleText" />
      <slot name="content" />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.event-frame-root {
  width: var(--head-width);
  background-color: #E7EFF7;
  border-radius: calc(var(--unit) * 3);

  /*
  メディアクエリの読み込みができなかったため、一旦コメントアウト
  @import url('~/assets/media.css');
  @custom-media --tablet (width <= 768px);
  @custom-media --mobile (width <= 480px);
  */
  @media (width <= 480px) {
    border-radius: calc(var(--unit) * 1.5);
  }
}

.event-frame-content {
  display: grid;
  gap: calc(var(--unit) * 5);
}

.content-1 {
  padding: calc(var(--unit) * 5) calc(var(--unit) * 12) 0;

  /*
  メディアクエリの読み込みができなかったため、一旦コメントアウト
  @import url('~/assets/media.css');
  @custom-media --tablet (width <= 768px);
  @custom-media --mobile (width <= 480px);
  */
  @media (width <= 480px) {
    padding: calc(var(--unit) * 2);
  }
}

.content-2 {
  padding: calc(var(--unit) * 5) calc(var(--unit) * 5) 0;

  /*
  メディアクエリの読み込みができなかったため、一旦コメントアウト
  @import url('~/assets/media.css');
  @custom-media --tablet (width <= 768px);
  @custom-media --mobile (width <= 480px);
  */
  @media (width <= 480px) {
    padding: calc(var(--unit) * 2);
  }
}

h3 {
  font-weight: 700;
  text-align: center;

  @media (width > 480px) {
    &:deep(br) {
      display: none;
    }
  }
}

.title-1 {
  font-size: 36px;

  /*
  メディアクエリの読み込みができなかったため、一旦コメントアウト
  @import url('~/assets/media.css');
  @custom-media --tablet (width <= 768px);
  @custom-media --mobile (width <= 480px);
  */
  @media (width <= 480px) {
    font-size: 24px;
  }
}

.title-2 {
  font-size: 30px;

  /*
  メディアクエリの読み込みができなかったため、一旦コメントアウト
  @import url('~/assets/media.css');
  @custom-media --tablet (width <= 768px);
  @custom-media --mobile (width <= 480px);
  */
  @media (width <= 480px) {
    font-size: 24px;
  }
}
</style>
