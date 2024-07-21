<script setup lang="ts">
import NamecardAvatar from './NamecardAvatar24.vue'
import type { NamecardUser } from '@vuejs-jp/model'
import { useUserRole } from '@vuejs-jp/composable'
import { onMounted, ref } from 'vue'

type NamecardProps = {
  user: NamecardUser
  isPlaceholder?: boolean
}

defineProps<NamecardProps>()

const { backgroundColor } = useUserRole()
const sponsorImagePath = ref('')
onMounted(() => {
  sponsorImagePath.value = new URL('../../assets/namecard/support.svg', import.meta.url).href
})
</script>

<template>
  <div class="namecard-root">
    <NamecardAvatar :user="user" :is-placeholder="isPlaceholder" />
    <div
      class="namecard-role"
      :style="{ '--background-color-role': backgroundColor(user.role ?? 'staff') }"
    >
      {{ user.role }}
    </div>
    <div class="namecard-sponsor">
      <img :src="sponsorImagePath" alt="Supported by Stockmark" />
    </div>
  </div>
</template>

<style scoped>
.namecard-root {
  width: 23.5rem;
  background-color: var(--color-white);
  border-radius: calc(var(--unit) * 1.25);
  overflow: hidden;
  box-shadow: 0px 8px 24px 0px hsla(0, 0%, 0%, 0.239);
  border: 1px solid #000;
  @media (width <= 480px) {
    width: 18rem;
  }
}

.namecard-role {
  --background-color-role: color-mix(in srgb, var(--color-vue-blue), #000 20%);
  font-size: 1.6875rem;
  height: 2.625rem;
  display: grid;
  place-items: center;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-white);
  background-color: var(--background-color-role);
  @media (width <= 480px) {
    font-size: 1.3125rem;
    height: 2.0625rem;
  }
}

.namecard-sponsor {
  display: grid;
  place-items: center;
  height: 3.75rem;
  img {
    width: 16.25rem;
  }
  @media (width <= 480px) {
    height: 2.8125rem;
    img {
      width: 12.5rem;
    }
  }
}
</style>
