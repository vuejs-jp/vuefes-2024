<script setup lang="ts">
import { ref } from 'vue'
import CssResetButton from './CssResetButton.vue'

interface AccordionProps {
  title: string;
}

const props = defineProps<AccordionProps>()

const showPanel = ref(false)
const togglePanel = (event) => showPanel.value = !showPanel.value
</script>

<template>
  <div class="panel">
    <CssResetButton class="parent-panel" @click.prevent="togglePanel">
      {{ title }} >
    </CssResetButton>
    <div v-if="showPanel" class="panel-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.parent-panel {
  padding: 22px 24px;
  border-radius: 6px;
  box-shadow: var(--box-shadow-button);
  border: var(--border);
  outline: none;
  color: var(--color-vue-blue);
  font-weight: normal;
  width: 100%;
  text-align: left;
}
.panel-content {
  padding: 22px 24px;
}
</style>
