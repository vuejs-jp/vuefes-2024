<script setup lang="ts">
import { useDevice, useI18n, useRuntimeConfig, useSwitchLocalePath } from '#imports'
const { isMobile } = useDevice()
const { locale } = useI18n({ useScope: 'global' })
const switchLocalePath = useSwitchLocalePath()
const config = useRuntimeConfig()

type NavLink = {
  text: string
  anchor: string
}

const navLinks: NavLink[] = [
  { text: 'Message', anchor: '#message' },
  { text: 'Speakers', anchor: '#speakers' },
  { text: 'Sponsors', anchor: '#sponsors' },
  // Uncomment out after job board implementation
  // { text: 'Job board', anchor: '#jobboard' },
  { text: 'Contact', anchor: '#form' },
]
</script>

<template>
  <VFSpHeader v-if="isMobile">
    <div class="navigation-mobile">
      <NuxtLink v-if="config.public.enableSwitchLocale" :to="switchLocalePath(locale === 'ja' ? 'en' : 'ja')"
        class="locale-switch-wrapper">
        <VFLocaleSwitch :locale />
      </NuxtLink>
      <VFIcon name="Menu" color="vue-blue" can-hover />
    </div>
  </VFSpHeader>
  <VFHeader v-if="!isMobile">
    <div class="navigation-pc">
      <div class="navigation-links-pc">
        <nuxt-link v-for="link in navLinks" :key="link.anchor" :to="link.anchor">
          <VFTypography variant="heading/200" color="vue-blue">{{ link.text }}</VFTypography>
        </nuxt-link>
      </div>
      <NuxtLink v-if="config.public.enableSwitchLocale" :to="switchLocalePath(locale === 'ja' ? 'en' : 'ja')"
        class="locale-switch-wrapper">
        <VFLocaleSwitch :locale />
      </NuxtLink>
    </div>
  </VFHeader>
</template>

<style scoped>
.locale-switch-wrapper {
  text-decoration: none;
}

.navigation-mobile {
  display: flex;
  align-items: center;
  gap: calc(var(--unit) * 4.75);
  margin-right: 27px;
}

.navigation-pc {
  display: flex;
  align-items: center;
  gap: calc(var(--unit) * 7.5);
}

.navigation-links-pc {
  display: flex;
  gap: calc(var(--unit) * 8);

  a {
    text-decoration: none;
  }
}
</style>
