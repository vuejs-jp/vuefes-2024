<script setup lang="ts">
import Logo from './Logo.vue'
import { useHeader } from '@vuejs-jp/composable'

type HeaderProps = {
  top?: number
}

withDefaults(defineProps<HeaderProps>(), {
  top: 0,
})

const { headerRef } = useHeader()
</script>

<template>
  <header ref="headerRef" :style="{ top }">
    <div class="header-root">
      <a class="link" href="/2024/" aria-label="Vue Fes Japan 2024">
        <Logo class="logo" color="vue-blue" />
      </a>
      <slot />
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  z-index: 10;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 8px rgba(198, 202, 207, 0.8);
}

.header-root {
  padding: 20px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.link {
  line-height: 0;
}
</style>
