<script setup lang="ts"></script>
<template>
  <div class="name-card-user-root">
    <VFLinkButton is="button" background-color="vue-green/200" color="white" href=""
      >hoge</VFLinkButton
    >
  </div>
</template>

<style scoped>
.name-card-user-root {
  --header-height: calc(var(--unit) * 10);
  padding-top: var(--header-height);
}
</style>
