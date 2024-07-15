<script setup lang="ts">
type Props = {
  arialabel?: string
  ariaModal?: boolean
}
withDefaults(defineProps<Props>(), {
  arialabel: '',
  ariaModal: false,
})
</script>
<template>
  <div class="mask" @click="$emit('on-close')">
    <div
      role="dialog"
      class="root"
      :aria-label="arialabel"
      :aria-modal="ariaModal"
      @click="(e) => e.stopPropagation()"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.root {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 80%;
  max-width: 960px;
  transition: 0.2s;
  background-color: #fff;
  border: 2px solid var(--color-vue-blue);
}
.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
