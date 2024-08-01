<script setup lang="ts">
import { useI18n, useRuntimeConfig, useSwitchLocalePath } from '#imports'
import { useWindowSize } from '@vueuse/core'
import { ref, watchEffect, onMounted } from 'vue'
const { locale } = useI18n({ useScope: 'global' })
const switchLocalePath = useSwitchLocalePath()
const config = useRuntimeConfig()

const { width } = useWindowSize()
const shouldShowSpHeader = ref()
onMounted(() => {
  shouldShowSpHeader.value = width.value <= 1080
})
watchEffect(() => {
  shouldShowSpHeader.value = width.value <= 1080
})

type NavLink = {
  text: string
  anchor: string
}

const navLinks: NavLink[] = [
  { text: 'Message', anchor: '#message' },
  { text: 'Ticket', anchor: '#ticket' },
  { text: 'Speakers', anchor: '#speakers' },
  { text: 'Sponsors', anchor: '#sponsors' },
  // Uncomment out after job board implementation
  // { text: 'Job board', anchor: '#jobboard' },
  { text: 'Inquiry', anchor: '#form' },
]

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <VFSpHeader v-if="shouldShowSpHeader">
    <div class="navigation-mobile">
      <NuxtLink
        v-if="config.public.enableSwitchLocale"
        :to="switchLocalePath(locale === 'ja' ? 'en' : 'ja')"
        class="locale-switch-wrapper"
      >
        <VFLocaleSwitch :locale />
      </NuxtLink>

      <button
        class="navigation-mobile-toggle"
        name="menu"
        :class="{ 'isOpened': showMenu }"
        @click="toggleMenu"
      >
        <span /><span /><span />
      </button>
      <!-- <VFIcon name="menu" color="vue-blue" can-hover @click="toggleMenu" /> -->
    </div>
    <!-- hamburger-menu -->
    <Transition name="slide-down">
      <div v-show="showMenu" class="navigation-mobile-menu">
        <div>
          <ul>
            <li v-for="link in navLinks" :key="link.anchor">
              <nuxt-link :to="`/${link.anchor}`" @click="toggleMenu">
                <VFTypography variant="heading/200" color="vue-blue">{{ link.text }}</VFTypography>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </VFSpHeader>
  <VFHeader v-else>
    <div class="navigation-pc">
      <div class="navigation-links-pc">
        <nuxt-link v-for="link in navLinks" :key="link.anchor" :to="`/${link.anchor}`">
          <VFTypography variant="heading/200" color="vue-blue">{{ link.text }}</VFTypography>
        </nuxt-link>
      </div>
      <NuxtLink
        v-if="config.public.enableSwitchLocale"
        :to="switchLocalePath(locale === 'ja' ? 'en' : 'ja')"
        class="locale-switch-wrapper"
      >
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
  background-color: var(--color-white);

  & > div {
    padding: calc(var(--unit) * 5) 0;
  }

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

.navigation-mobile-toggle {
  position: relative;
  right: 0;
  top: 0;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;

  span {
    position: absolute;
    inset: 0;
    margin: auto;
    background-color: var(--color-vue-blue);
    width: 24px;
    height: 2px;
    transition-property: transform opacity;
    transition-duration: 0.1s;
    transition-timing-function: linear;

    &:nth-child(1) {
      transform: translateY(-11px);
    }

    &:nth-child(3) {
      transform: translateY(11px);
    }
  }

  &.isOpened {
    span {
      transition-property: transform opacity;
      transition-duration: 0.1s;
      transition-timing-function: linear;

      &:nth-child(1) {
        transform: translateY(0) rotate(-45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(0) rotate(45deg);
      }
    }
  }
}
</style>
