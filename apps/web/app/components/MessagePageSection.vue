<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'

const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
</script>

<template>
  <section>
    <div class="message-root">
      <div class="title">
        <VFTypography variant="heading/700" color="vue-blue">
          {{ $t('message.title') }}
        </VFTypography>
      </div>
      <div
        class="body"
        :style="{
          fontWeight: fontWeight('body/400'),
          fontSize: fontSize('body/400'),
          color: color('vue-blue'),
        }"
      >
        <MarkDownText path="message" />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 120px 20px 120px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(2px);
}
.message-root {
  display: grid;
  gap: 40px;
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  grid-template-columns: minmax(0, 1fr);
}
.title {
  text-align: center;
}
.body {
  display: grid;
  place-items: center;
  gap: 40px;
}
.body :deep(p + p) {
  margin-bottom: 32px;
}
</style>
