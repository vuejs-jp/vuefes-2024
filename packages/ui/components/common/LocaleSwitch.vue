<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const LANGUAGES = {
  JAPANESE: 'ja',
  ENGLISH: 'en',
} as const

const router = useRouter()
const isLoaded = ref(false)
const isChecked = ref(false)

const getPath = () => {
  if (isChecked.value) {
    return `/${LANGUAGES.ENGLISH}${router.currentRoute.value.path}`
  }
  return router.currentRoute.value.path.replace(`/${LANGUAGES.ENGLISH}`, '')
}
const setSwitchStatus = () => {
  isChecked.value = router.currentRoute.value.path.includes(`/${LANGUAGES.ENGLISH}/`)
}

const toggleStatus = () => {
  isChecked.value = !isChecked.value
  const path = getPath()
  router.push(path)
}
onMounted(() => {
  setSwitchStatus()
  isLoaded.value = true
})
watch(
  () => router.currentRoute.value.path,
  () => {
    setSwitchStatus()
  },
)
</script>

<template>
  <button
    v-if="isLoaded"
    type="button"
    role="switch"
    class="locale-switch-button"
    aria-label="translate english"
    :aria-checked="isChecked"
    @click="toggleStatus"
  >
    <span
      class="locale-switch-button-switch"
      :class="{ 'locale-switch-button-switch-checked': !isChecked }"
      aria-hidden="true"
    >
      <span
        v-if="isChecked"
        class="locale-switch-button-language"
        :class="{ 'locale-switch-button-language-checked': !isChecked }"
      >
        <span>{{ LANGUAGES.JAPANESE }}</span>
      </span>
      <span class="locale-switch-button-circle">
        {{ isChecked ? LANGUAGES.ENGLISH : LANGUAGES.JAPANESE }}
      </span>
      <span
        v-if="!isChecked"
        class="locale-switch-button-language"
        :class="{ 'locale-switch-button-language-checked': isChecked }"
      >
        <span>{{ LANGUAGES.ENGLISH }}</span>
      </span>
    </span>
  </button>
</template>

<style scoped>
* {
  --box-shadow: 0 1px 4px color-mix(in srgb, var(--color-vue-blue), transparent calc(100% - 14%));
}

.locale-switch-button {
  border: 0;
  user-select: none;
  line-height: 1.2;
  width: 5.125rem;
  height: 2.5rem;
  display: grid;
  place-content: center;
  color: var(--color-white);
  background-color: transparent;
  position: relative;
}

.locale-switch-button-switch {
  display: flex;
  align-items: center;
  box-shadow: var(--box-shadow);
  background-color: #d2d6db;
  border-radius: 0.9375rem;
  height: 1.8125rem;
  width: 3.5625rem;
  font-size: 1.125rem;
  font-weight: bold;
  padding-left: 0.5rem;
  box-sizing: border-box;
}

.locale-switch-button-switch-checked {
  justify-content: flex-end;
  padding-left: 0;
  padding-right: 0.5rem;
}

.locale-switch-button-language {
  font-size: 0.875rem;
  font-weight: bold;
}

.locale-switch-button-circle {
  position: absolute;
  display: flex;
  justify-content: center;
  padding-top: 0.25rem;
  box-sizing: border-box;
  border-radius: 50%;
  top: calc(50% - 1rem);
  right: 50%;
  height: 2rem;
  width: 2rem;
  background: #34495e;
  box-shadow: var(--box-shadow);
}

.locale-switch-button[aria-checked='true'] .locale-switch-button-circle {
  right: 0;
  left: 50%;
}

.locale-switch-button:hover {
  cursor: pointer;
}
</style>
