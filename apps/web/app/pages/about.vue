<script setup lang="ts">
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { t } = useI18n()
</script>

<template>
  <div class="wrapper">
    <div class="lang">
      <NuxtLink
        v-for="locale in locales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        class="lang__link"
        active-class="lang__link--active"
      >
        {{ locale.name }}
      </NuxtLink>
    </div>
    <p>{{ t('about') }}</p>
    <NuxtLinkLocale
      to="/"
      class="link"
    >
      {{ t('home') }}
    </NuxtLinkLocale>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 16px;
}
.lang {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.lang__link {
  padding: 2px 8px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
}
.lang__link--active {
  background-color: #555;
  color: #fff;
}
.link {
  color: blue;
  text-decoration: underline;
}
</style>