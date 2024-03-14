<script setup lang="ts">
import FooterPageSection from '~/components/FooterPageSection.vue'
import MarkDownText from '~/components/MarkDownText.vue'
</script>

<template>
  <main>
    <NavPageSection />
    <div class="privacy-root">
      <MarkDownText path="privacy" class="explain" />

      <div class="back">
        <button to="/" outline>Button</button>
      </div>
    </div>
    <FooterPageSection />
  </main>
</template>

<style scoped>
</style>