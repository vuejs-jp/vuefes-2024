<script setup lang="ts">
import Logo from './Logo.vue'
import { useColor, useHeader } from '@vuejs-jp/composable'

type HeaderProps = {
  top?: number
}

withDefaults(defineProps<HeaderProps>(), {
  top: 0,
})

const { headerRef } = useHeader()
const { color } = useColor()
</script>

<template>
  <header ref="headerRef" :style="{ top, backgroundColor: color('white') }">
    <div class="header-root">
      <a class="link" href="/" aria-label="Vue Fes Japan 2024">
        <Logo class="logo" color="vue-blue" />
      </a>
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
  box-shadow: 0 0 8px rgba(198, 202, 207, 0.8);
}
.header-root {
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.link {
  line-height: 0;
}
.logo {
  height: 32px;
}
</style>
