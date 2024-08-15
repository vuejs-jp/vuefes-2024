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
.page-heading {
  display: flex;
  align-items: center;
  height: 372px;
  margin-top: 80px;
  background: url(/common/bg_pageheading_pc.jpg) no-repeat right center/cover;
  font-size: 3.75rem;

  /*
  メディアクエリの読み込みができなかったため、一旦コメントアウト
  @import url('~/assets/media.css');
  @custom-media --tablet (width <= 768px);
  @custom-media --mobile (width <= 480px);
  */
  @media (width <= 768px) {
    height: 162px;
    font-size: 2.1875rem;
    background-image: url(/common/bg_pageheading_sp.jpg);
  }

  .page-heading-body {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0;
    display: block;

    /*
    メディアクエリの読み込みができなかったため、一旦コメントアウト
    @import url('~/assets/media.css');
    @custom-media --tablet (width <= 768px);
    @custom-media --mobile (width <= 480px);
    */
    @media (width <= 768px) {
      max-width: 100%;
      padding: 0 6%;
    }
  }
}
</style>
