<script setup lang="ts">
import TopPageSection from '~/components/TopPageSection.vue'
import FooterPageSection from '~/components/FooterPageSection.vue'
import MarkDownText from '~/components/MarkDownText.vue'
</script>

<template>
  <main>
    <TopPageSection />
    <div class="privacy-root">
      <h1>プライバシーポリシー</h1>
      <div class="markdown-root">
        <MarkDownText path="privacy" class="explain" />
      </div>

      <div class="back">
        <button to="/" outline>Button</button>
      </div>
    </div>
    <FooterPageSection />
  </main>
</template>

<style scoped>
@import url("../assets/base.css");
@import url("../assets/media.css");

.privacy-root {
  width: 100%;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.privacy-root h1 {
  color: var(--color-vue-blue);
  font-weight: 700;
  font-size: 45px;
  line-height: 54px;
  margin-bottom: 40px;
}
.markdown-root {
  --tablet-width: 768px;
  max-width: var(--tablet-width);
} 
.markdown-root :deep(p){
  color: var(--color-vue-blue);
  font-weight: 500;
  font-size: 18px;
  line-height: 32.4px;
  width: 100%;
  /* marginが5の倍数なので、一旦定数で定義 */
  margin-bottom: 20px;
}

.markdown-root :deep(h2) a{
  color: var(--color-vue-blue);
  font-weight: 700;
  font-size: 24px;
  line-height: 28.8px;
  text-decoration: none;
  margin-top: 40px;
  margin-bottom: 20px;
}

.markdown-root :deep(ul){
  color: var(--color-vue-blue);
  width: 100%;
}

.markdown-root :deep(ul) li{
  color: var(--color-vue-blue);
  font-weight: 700;
  font-size: 18px;
  line-height: 21.6px;
}
.markdown-root :deep(ul) li ul li{
  color: var(--color-vue-blue);
  font-weight: 500;
  font-size: 18px;
  line-height: 32.4px;
}
</style>