<script setup lang="ts">
import type { NamecardUser } from '@vuejs-jp/model'

type NamecardAvatarLogoProps = {
  user: NamecardUser
}

defineProps<NamecardAvatarLogoProps>()
</script>

<template>
  <template v-if="user.avatar_url">
    <img :alt="user.display_name" :src="user.avatar_url" class="avatar-logo" decoding="async" />
  </template>
  <template v-else>
    <img
      alt="vuefes logo avatar sample"
      src="../../assets/namecard/vuefes_logo.svg"
      class="sample-logo"
    />
  </template>
</template>

<style scoped>
.avatar-logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.sample-logo {
  width: 40cqi;
  opacity: 0.5;
  padding-bottom: 4cqi;
}
</style>
