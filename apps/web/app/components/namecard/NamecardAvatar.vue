<script setup lang="ts">
import type { NamecardUser } from '@vuejs-jp/model'

type NamecardAvatarProps = {
  user: NamecardUser
  isPlaceholder?: boolean
}
defineProps<NamecardAvatarProps>()

const COLOR_AVATAR_NAME = {
  DEFAULT: 'color-mix(in srgb, var(--color-vue-blue), #000 20%)',
  PLACEHOLDER: 'var(--color-gray100)',
}
</script>

<template>
  <div class="avatar">
    <span class="hook" aria-hidden="true" />
    <div class="vuefes-logo-wrapper">
      <img src="/namecard/vuefes_logo.svg" alt="vuefes logo" />
    </div>
    <div class="avatar-logo-wrapper">
      <img :alt="user.display_name" :src="user.avatar_url" class="avatar-logo" decoding="async" />
    </div>
    <div class="avatar-name-area">
      <h2
        class="avatar-name"
        :style="{
          '--color-avatar-name': isPlaceholder
            ? COLOR_AVATAR_NAME.PLACEHOLDER
            : COLOR_AVATAR_NAME.DEFAULT,
        }"
      >
        {{ user.display_name }}
      </h2>
    </div>
    <div class="avatar-footer">Vue Fes Japan 2024</div>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.avatar {
  display: grid;

  place-items: center;
  background: color-mix(in srgb, #4e5764, #000 20%) url('/namecard/bg_texture.png') no-repeat;
  background-size: cover;
  container: avatar / inline-size;
  box-shadow: var(--shadow-1);
  @media (--mobile) {
    background: #4e5764;
    position: relative;
    &::before {
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
      opacity: 0.5;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-image: url('/namecard/bg_texture.png');
      background-size: cover;
    }
  }
}

.hook {
  margin-top: 1.25rem;
  width: 25px;
  aspect-ratio: 1;
  background-color: #fff;
  border-radius: 50%;
  @media (--mobile) {
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
  @media (--mobile) {
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
  @media (--mobile) {
    margin-top: 1.875rem;
  }
}

.avatar-logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid var(--color-white);
  box-sizing: border-box;
  vertical-align: top;
}

.avatar-name-area {
  width: 85cqi;
  background-color: var(--color-white);
  margin-top: 0.8125rem;
  display: grid;
  place-items: center;
  border-radius: calc(var(--unit) * 1.25);
  padding: 2.8125rem 1rem;
  @media (--mobile) {
    margin-top: 0.625rem;
    padding: 2.25rem 0.5rem;
  }
}

.avatar-name {
  --color-avatar-name: color-mix(in srgb, var(--color-vue-blue), #000 20%);

  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-avatar-name);
  @media (--mobile) {
    font-size: 1.6875rem;
  }
}

.avatar-footer {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-white);
  margin-top: 2.875rem;
  margin-bottom: 0.75rem;
  line-height: 1;
  height: 0.75rem;
  @media (--mobile) {
    font-size: 0.8125rem;
    margin-top: 2.125rem;
    margin-bottom: 0.4rem;
  }
}

.role {
  padding: calc(var(--unit) * 1) calc(var(--unit) * 3);
  border-radius: calc(var(--unit) * 6.25);
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
