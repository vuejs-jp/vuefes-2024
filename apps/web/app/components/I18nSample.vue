<script setup>
const { locale } = useI18n();
</script>

<template>
  <form class="locale">
    <select id="locale" v-model="locale">
      <option value="ja">ja</option>
      <option value="en">en</option>
    </select>
    <p>{{ $t("welcome") }}</p>
  </form>
</template>

<style scoped>
.locale {
  margin: 20px;
}
</style>
