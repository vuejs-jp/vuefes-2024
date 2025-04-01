<script setup lang="ts">
import { useRuntimeConfig, useWithBase } from '#imports'
import { useI18n } from '#i18n'
import { useNav } from '~/composables/useNav'
import { useScreenOrientation, useWindowSize } from '@vueuse/core'
import { ref, watch, onMounted, computed } from 'vue'

const { locale, setLocale } = useI18n({ useScope: 'global' })
const { navLinks } = useNav()

const config = useRuntimeConfig()

const onSwitchLocale = () => {
  setLocale(locale.value === 'ja' ? 'en' : 'ja')
}

const { width } = useWindowSize()
const { orientation } = useScreenOrientation()
const shouldShowSpHeader = ref()
const dialogRef = ref<HTMLDialogElement>()
onMounted(() => {
  shouldShowSpHeader.value = width.value <= 1200
})
watch([width, orientation], () => {
  shouldShowSpHeader.value = width.value <= 1200
})

const showMenu = ref(false)

const toggleMenu = () => {
  if (showMenu.value) {
    dialogRef.value!.close()
  } else {
    dialogRef.value!.show()
  }
  showMenu.value = !showMenu.value
}

const withBase = useWithBase()
const getAnchorPath = computed(
  () => (anchor: string) =>
    locale.value === 'ja' ? withBase(`/${anchor}`) : withBase(`en/${anchor}`),
)
</script>

<template>
  <VFSpHeader v-if="shouldShowSpHeader">
    <div class="navigation-mobile">
      <VFLocaleSwitch
        v-if="config.public.enableSwitchLocale"
        :locale
        @switch-locale="onSwitchLocale"
      />

      <button
        class="navigation-mobile-toggle"
        name="menu"
        :class="{ 'isOpened': showMenu }"
        :aria-expanded="showMenu"
        aria-controls="navigation-mobile-menu-trigger"
        :aria-label="showMenu ? 'メニューを閉じる' : 'メニューを開く'"
        @click="toggleMenu"
      >
        <span /><span /><span />
      </button>
      <!-- <VFIcon name="menu" color="vue-blue" can-hover @click="toggleMenu" /> -->
    </div>
    <!-- hamburger-menu -->
    <dialog id="navigation-mobile-menu-trigger" ref="dialogRef" class="navigation-mobile-menu">
      <ul>
        <li v-for="(link, index) in navLinks" :key="link.anchor">
          <!-- eslint-disable vuejs-accessibility/no-autofocus -->
          <nuxt-link
            :to="getAnchorPath(link.anchor)"
            :autofocus="index === 0 && true"
            @click="toggleMenu"
          >
            <!-- eslint-enable vuejs-accessibility/no-autofocus -->
            <VFTypography variant="heading/200" color="vue-blue">{{ link.text }}</VFTypography>
          </nuxt-link>
        </li>
      </ul>
    </dialog>
  </VFSpHeader>
  <VFHeader v-else>
    <div class="navigation-pc">
      <div class="navigation-links-pc">
        <nuxt-link v-for="link in navLinks" :key="link.anchor" :to="getAnchorPath(link.anchor)">
          <VFTypography variant="heading/200" color="vue-blue">{{ link.text }}</VFTypography>
        </nuxt-link>
      </div>
      <VFLocaleSwitch
        v-if="config.public.enableSwitchLocale"
        :locale
        @switch-locale="onSwitchLocale"
      />
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
  z-index: 10;
}

.navigation-mobile-menu {
  position: fixed;
  top: 71px;
  left: 0;
  width: 100vw;
  text-align: center;
  background-color: var(--color-white);
  padding: calc(var(--unit) * 5) 0;
  border: 0;
  transition:
    translate 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    display 0.6s cubic-bezier(0.4, 0, 0.2, 1) allow-discrete;
  z-index: 1;

  &[open] {
    translate: 0 0;

    @starting-style {
      translate: 0 -100dvh;
    }
  }

  &:not([open]) {
    translate: 0 -100dvh;
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
  gap: calc(var(--unit) * 5);

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
