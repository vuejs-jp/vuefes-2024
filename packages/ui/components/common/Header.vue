<script setup lang="ts">
import Logo from './Logo.vue'
import { useHeader } from '@vuejs-jp/composable'
import Button from '../Button.vue'
import { computed } from 'vue';

type HeaderProps = {
  top?: number
  loginUser: object
}

const p = withDefaults(defineProps<HeaderProps>(), {
  top: 0,
  loginUser: null
})

const emit = defineEmits(['login', 'debug'])
const { headerRef } = useHeader()
const hasAuth = computed(() => p.loginUser !== null)
const userName = computed(() => {
  if (p.loginUser) return p.loginUser.user_name
  return ''
})
</script>

<template>
  <header ref="headerRef" :style="{ top }">
    <div class="header-root">
      <a class="link" href="/" aria-label="Vue Fes Japan 2024">
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
  /* justify-content: space-between; */
}

.header-root>button {
  margin-left: 1em;
}

.link {
  line-height: 0;
  margin-right: auto;
}
</style>
