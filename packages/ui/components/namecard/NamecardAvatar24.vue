<script setup lang="ts">
import NamecardAvatarLogo from './NamecardAvatarLogo24.vue'
import type { NamecardUser } from '@vuejs-jp/model'
import { onMounted, ref } from 'vue'

type NamecardAvatarProps = {
  user: NamecardUser
  isPlaceholder?: boolean
}
defineProps<NamecardAvatarProps>()

const COLOR_AVATAR_NAME = {
  DEFAULT: 'color-mix(in srgb, var(--color-vue-blue), #000 20%)',
  PLACEHOLDER: 'var(--color-gray100)',
}
const vuefesLogoImagePath = ref('')
onMounted(() => {
  vuefesLogoImagePath.value = new URL('../../assets/namecard/vuefes_logo.svg', import.meta.url).href
})
</script>

<template>
  <div class="avatar">
    <span class="avatar-hook" aria-hidden="true" />
    <div class="vuefes-logo-wrapper">
      <img :src="vuefesLogoImagePath" alt="vuefes logo" />
    </div>
    <div class="avatar-logo-wrapper">
      <NamecardAvatarLogo :user="user" />
    </div>
    <div class="avatar-name-area">
      <div
        class="avatar-name"
        :style="{
          '--color-avatar-name': isPlaceholder
            ? COLOR_AVATAR_NAME.PLACEHOLDER
            : COLOR_AVATAR_NAME.DEFAULT,
        }"
      >
        {{ user?.display_name }}
      </div>
    </div>
    <small class="avatar-footer">Vue Fes Japan 2024</small>
  </div>
</template>

<style scoped>
.avatar {
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--color-vue-blue), #000 20%)
    url('../../assets/namecard/bg_texture.png') no-repeat;
  background-size: cover;
  container: avatar / inline-size;
}

.avatar-hook {
  margin-top: 1.25rem;
  width: 25px;
  aspect-ratio: 1;
  background-color: var(--color-white);
  border-radius: 50%;
  @media (width <= 480px) {
    margin-top: 0.9375rem;
    width: 20px;
  }
}

.vuefes-logo-wrapper {
  position: absolute;
  top: 17.98px;
  right: 14.07px;
  width: 29.72px;
  img {
    width: 100%;
  }
  @media (width <= 480px) {
    top: 13.77px;
    right: 10.77px;
    width: 22.76px;
  }
}

.avatar-logo-wrapper {
  width: 36.17cqi;
  aspect-ratio: 1;
  border-radius: 50%;
  margin-top: 2.5rem;
  background: var(--color-vue-green-gradation);
  display: grid;
  place-items: center;
  position: relative;
  border: 4px solid var(--color-white);
  container: avatar-logo / inline-size;
  @media (width <= 480px) {
    border-width: 3px;
    margin-top: 1.875rem;
  }
}

.avatar-name-area {
  --name-area-width: 85cqi;
  --name-area-padding: 1rem;
  width: var(--name-area-width);
  height: 8rem;
  background-color: var(--color-white);
  margin-top: 0.8125rem;
  display: grid;
  place-items: center;
  border-radius: calc(var(--unit) * 1.25);
  padding-inline: var(--name-area-padding);
  overflow-wrap: anywhere;
  word-break: break-all;
  overflow-y: hidden;
  @media (width <= 480px) {
    margin-top: 0.625rem;
    height: 6.125rem;
  }
}

.avatar-name {
  --color-avatar-name: color-mix(in srgb, var(--color-vue-blue), #000 20%);

  font-size: calc((var(--name-area-width) - var(--name-area-padding) * 2) / 12);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-avatar-name);
}

.avatar-footer {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-white);
  margin-top: 2.875rem;
  margin-bottom: 0.75rem;
  line-height: 1;
  height: 0.75rem;
  @media (width <= 480px) {
    font-size: 0.8125rem;
    margin-top: 2.125rem;
    margin-bottom: 0.4rem;
  }
}
</style>
