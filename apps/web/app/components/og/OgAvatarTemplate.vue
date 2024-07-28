<script setup lang="ts">
import type { NamecardUser } from '@vuejs-jp/model'
import AvatarLogo from './logo/AvatarLogo.vue'
import { useUserRole } from '@vuejs-jp/composable'
import { onMounted, ref } from 'vue'

type OgCardProps = {
  user: NamecardUser
}

defineProps<OgCardProps>()

const { backgroundColor } = useUserRole()
const vuefesLogoImagePath = ref('')
const sponsorImagePath = ref('')
onMounted(() => {
  vuefesLogoImagePath.value = new URL('../../assets/namecard/vuefes_logo.svg', import.meta.url).href
  sponsorImagePath.value = new URL('../../assets/namecard/support.svg', import.meta.url).href
})
</script>

<template>
  <div class="og-card-root">
    <div class="og-card-logo">
      <img :src="vuefesLogoImagePath" alt="" />
      <span>Vue Fes Japan 2024</span>
    </div>
    <div class="og-card-avatar">
      <div class="og-card-avatar-logo-wrapper">
        <AvatarLogo :user="user" />
      </div>
      <div class="og-card-avatar-name">
        {{ user.display_name }}
      </div>
      <div
        class="og-card-role"
        :style="{ '--background-color-role': backgroundColor(user.role ?? 'staff') }"
      >
        {{ user.role }}
      </div>
    </div>
    <div class="og-card-sponsor">
      <img :src="sponsorImagePath" alt="Supported by Stockmark" />
    </div>
    <img class="og-card-background" src="../../assets/namecard/bg_texture_og.png" alt="" />
  </div>
</template>

<style scoped>
.og-card-root {
  position: relative;
  display: grid;
  place-items: center;
  width: 60rem;
  aspect-ratio: 960 / 600;
  border-radius: 1.25rem;
  container: og-card / inline-size;
  overflow: hidden;
  background-color: color-mix(in srgb, var(--color-vue-blue), #000 20%);
  @media (width <= 480px) {
    width: 21.4375rem;
    border-radius: 0.625rem;
  }
}

.og-card-background {
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  vertical-align: top;
  width: 100%;
}

.og-card-logo {
  position: absolute;
  top: 1.875rem;
  left: 1.875rem;
  height: 2.18rem;
  color: var(--color-white);
  display: flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 1.25rem;
  img {
    height: 100%;
  }
  @media (width <= 480px) {
    top: 0.625rem;
    left: 0.625rem;
    height: 0.8125rem;
    gap: 0.3125rem;
    font-size: 0.625rem;
  }
}

.og-card-avatar {
  display: grid;
  place-items: center;
}

.og-card-avatar-logo-wrapper {
  background: var(--color-vue-green-gradation);
  border: 4px solid var(--color-white);
  border-radius: 50%;
  width: 11.25rem;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  container: avatar / inline-size;
  @media (width <= 480px) {
    width: 5.25rem;
    border-width: 2px;
  }
}

.og-card-avatar-name {
  font-size: 3.125rem;
  font-weight: 700;
  line-height: 1.1;
  margin-top: 1.25rem;
  color: var(--color-white);
  overflow-wrap: anywhere;
  word-break: break-all;
  overflow-y: hidden;
  @media (width <= 480px) {
    font-size: 1.25rem;
    margin-top: 0.625rem;
  }
}

.og-card-role {
  --background-color-role: color-mix(in srgb, var(--color-vue-blue), #000 20%);
  font-size: 2.5rem;
  display: grid;
  place-items: center;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-white);
  background-color: var(--background-color-role);
  padding: 0.25rem 2.5rem;
  margin-top: 1.6875rem;
  border-radius: 0.625rem;
  @media (width <= 480px) {
    font-size: 0.75rem;
    padding: 0.125rem 0.625rem;
    margin-top: 0.625rem;
    border-radius: 0.1875rem;
  }
}

.og-card-sponsor {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 1.25rem;
  width: 13.75rem;
  height: 2.375rem;
  display: grid;
  place-items: center;
  background-color: var(--color-white);
  border-radius: 0.3125rem 0 0 0.3125rem;
  box-shadow: inset -1px 0 0 0 #fff;
  @media (width <= 480px) {
    bottom: 0.615rem;
    width: 5.625rem;
    height: 1.0625rem;
    border-radius: 0.1875rem 0 0 0.1875rem;
    img {
      width: 5rem;
    }
  }
}
</style>
