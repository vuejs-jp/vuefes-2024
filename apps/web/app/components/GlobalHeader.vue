<script setup lang="ts">
import { useDevice, useI18n, useRuntimeConfig, useSwitchLocalePath } from '#imports'
const { isMobile } = useDevice()
const { locale } = useI18n({ useScope: 'global' })
const switchLocalePath = useSwitchLocalePath()
const config = useRuntimeConfig()
import { ref } from 'vue'

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

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <VFSpHeader v-if="isMobile">
    <div class="navigation-mobile">
      <NuxtLink v-if="config.public.enableSwitchLocale" :to="switchLocalePath(locale === 'ja' ? 'en' : 'ja')"
        class="locale-switch-wrapper">
        <VFLocaleSwitch :locale />
      </NuxtLink>
      <VFIcon name="Menu" color="vue-blue" can-hover @click="toggleMenu" />
    </div>
    <!-- hamburger-menu -->
    <Transition>
      <div v-if="showMenu" class="navigation-mobile-menu">
        <ul>
          <li v-for="link in navLinks" :key="link.anchor">
            <nuxt-link :to="`/${link.anchor}`" @click="toggleMenu">
              <VFTypography variant="heading/200" color="vue-blue">{{ link.text }}</VFTypography>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </Transition>
  </VFSpHeader>
  <VFHeader v-if="!isMobile">
    <div class="navigation-pc">
      <div class="navigation-links-pc">
        <nuxt-link v-for="link in navLinks" :key="link.anchor" :to="`/${link.anchor}`">
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
  gap: calc(var(--unit) * 2);
  margin-right: 27px;
}

.navigation-mobile-menu {
  position: fixed;
  top: 71px;
  left: 0;
  width: 100vw;
  text-align: center;
  padding: calc(var(--unit) * 5) 0;
  background-color: var(--color-white);

  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: calc(var(--unit) * 3);
  }

  a {
    text-decoration: none;
  }
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
