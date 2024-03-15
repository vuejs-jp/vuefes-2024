<script setup lang="ts">
import Logo from './Logo.vue'
import { useColor, useNav } from '@vuejs-jp/composable'

const { navRef } = useNav()
const { color } = useColor()
</script>

<template>
  <nav
    ref="navRef"
    :style="{ backgroundColor: color('white') }"
  >
    <div class="nav-root">
      <h1>
        <Logo color="vue-blue" />
      </h1>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 0;
  margin: 0;
}
.nav-root {
  padding: 20px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
