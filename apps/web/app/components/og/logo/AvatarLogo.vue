<script setup lang="ts">
import type { NamecardUser } from '@vuejs-jp/model'
import { defineAsyncComponent } from 'vue'

type NamecardAvatarLogoProps = {
  user: NamecardUser
  size?: 'small' | 'large'
}

const props = withDefaults(defineProps<NamecardAvatarLogoProps>(), {
  size: 'small',
})

const VueFesLogo = defineAsyncComponent(
  () => import('../../assets/namecard/vuefes_logo.svg?component'),
)
</script>

<template>
  <template v-if="user?.avatar_url">
    <img
      :alt="user.display_name"
      :src="user?.avatar_url"
      :width="size === 'small' ? 40 : 120"
      :height="size === 'small' ? 40 : 120"
      class="avatar-logo"
      decoding="async"
    />
  </template>
  <template v-else>
    <div class="sample-logo">
      <VueFesLogo />
    </div>
  </template>
</template>

<style scoped>
.avatar-logo,
.sample-logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0px 0px 0px calc(var(--unit) * 0.25) rgba(255, 255, 255, 1);
}

.avatar-logo {
  width: 40px;
  height: 40px;
}

.sample-logo {
  display: grid;
  place-items: center;
  background: linear-gradient(#90b44b, #42b983);
}
</style>
