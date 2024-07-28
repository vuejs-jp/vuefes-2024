<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

type OgCardProps = {
  title: string
}

const props = defineProps<OgCardProps>()

const HeaderBlock = defineAsyncComponent(() => import('../../assets/common/bg_og_header_template.svg?component'))
</script>

<template>
  <div class="og-base-card-root">
    <div class="components-wrapper">
      <component :is="HeaderBlock" class="header-bg" />
    </div>
    <div class="title-wrapper">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<style scoped>
.og-base-card-root {
  position: relative;
  width: 1200px;
  height: 630px;
}

.components-wrapper {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.title-wrapper {
  display: grid;
  place-items: flex-start;
  gap: calc(var(--unit) * 1);
  top: 16%;
  left: 57%;
  transform: translateX(-50%);
  width: 100%;
  position: absolute;
  z-index: 3;
}

.title-wrapper h2 {
  color: var(--color-vue-blue);
  font-size: 84px;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
