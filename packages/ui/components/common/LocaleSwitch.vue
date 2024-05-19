<script setup lang="ts">
import { onMounted, ref } from 'vue'

const LANGUAGES = {
  JAPANESE: 'ja',
  ENGLISH: 'en',
} as const

const isChecked = ref(false)

const getPath = () => (window.location.pathname ? `/${LANGUAGES.ENGLISH}` : '/')

const toggleStatus = () => {
  window.location.href = getPath()
}
onMounted(() => {
  isChecked.value = window.location.pathname !== '/'
})
</script>

<template>
  <button
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
        class="locale-switch-button-language locale-switch-button-language-ja"
        :class="{ 'locale-switch-button-language-checked': !isChecked }"
      >
        <span>{{ LANGUAGES.JAPANESE }}</span>
      </span>
      <span
        class="locale-switch-button-circle"
        :class="{ 'locale-switch-button-circle-ja': !isChecked }"
      >
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
& {
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
  /* box-shadow: var(--box-shadow); */
  box-shadow: 0 1px 4px color-mix(in srgb, var(--color-vue-blue), transparent calc(100% - 14%));
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

/* din-2014 の `j` のグリフがずれているため調整 */
.locale-switch-button-language-ja,
.locale-switch-button-circle-ja {
  box-sizing: border-box;
  padding-left: 0.125rem;
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
  /* box-shadow: var(--box-shadow); */
  box-shadow: 0 1px 4px color-mix(in srgb, var(--color-vue-blue), transparent calc(100% - 14%));
}

.locale-switch-button[aria-checked='true'] .locale-switch-button-circle {
  right: 0;
  left: 50%;
}

.locale-switch-button:hover {
  cursor: pointer;
}

/* .locale-switch-button:focus,
.locale-switch-button:hover {
  border-width: 2px;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}

.locale-switch-button:focus-visible {
  border: 2px solid var(--color-vue-blue);
} */
</style>
