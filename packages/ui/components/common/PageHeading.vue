<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'


const { fontWeight } = useTypography()
const { color } = useColor()
</script>

<template>
  <h1 class="page-heading" :style="{ fontWeight: fontWeight('heading/700'), color: color('vue-blue') }">
    <span class="page-heading-body">
      <slot />
    </span>
  </h1>
</template>

<style scoped>
@import url('/assets/media.css');

.page-heading {
  margin-top: 80px;
  padding: 150px 0;
  background: url(/common/bg_pageheading_pc.jpg) no-repeat right center/cover;
  font-size: 3.75rem;

  @media (--tablet) {
    padding: 60px 0;
    font-size: 2.1875rem;
    background-image: url(/common/bg_pageheading_sp.jpg);
  }

  .page-heading-body {
    width: 100%;
    max-width: calc(960px + 3%);
    margin: 0 auto;
    padding: 0 1.5%;
    display: block;

    @media (--tablet) {
      max-width: 100%;
      padding: 0 6%;
    }
  }
}
</style>
