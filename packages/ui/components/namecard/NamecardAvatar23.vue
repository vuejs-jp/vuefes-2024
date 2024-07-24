<script setup lang="ts">
import NamecardAvatarLogo from './NamecardAvatarLogo.vue'
import type { NamecardUser, Role } from '@vuejs-jp/model'
import { useUserRole } from '@vuejs-jp/composable'

type NamecardAvatarProps = {
  user: NamecardUser
}

const props = defineProps<NamecardAvatarProps>()

const { backgroundColor, textColor } = useUserRole()
</script>

<template>
  <div class="avatar">
    <NamecardAvatarLogo :user="user" size="large" />
    <h3>{{ user.display_name }}</h3>
    <div
      class="role"
      :style="{
        background: backgroundColor(user.role as Role),
        color: textColor(user.role as Role),
      }"
    >
      {{ user.role }}
    </div>
  </div>
</template>

<style scoped>
.avatar {
  display: grid;
  place-items: center;
  gap: 8px;
}

.avatar h3 {
  color: var(--color-white);
  font-size: 22px;
  font-weight: 900;
}

.avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0px 0px 0px calc(var(--unit) * 0.5) rgba(255, 255, 255, 1);
}

.avatar svg {
  width: 42px;
  height: 48px;
}

.role {
  padding: calc(var(--unit) * 1) calc(var(--unit) * 3);
  border-radius: calc(var(--unit) * 6.25);
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
