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

/* margin等が5の倍数なので、一旦定数で定義 */

.privacy-root {
  width: 100%;
  background-color: var(--color-white);
  color: var(--color-vue-blue);
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    font-weight: 700;
    font-size: var(--h1-font-size);
    line-height: calc(var(--h1-font-size) * var(--h-line-height-ratio));
    margin-bottom: 40px;
  }
}
.markdown-root {
  --tablet-width: 768px;
  max-width: var(--tablet-width);
  
  & :deep(h2) {
    margin-top: 40px;
    margin-bottom: 20px;
  }

  & :deep(h2) a {
    color: var(--color-vue-blue);
    font-weight: 700;
    font-size: var(--h2-font-size);
    line-height: calc(var(--h2-font-size) * var(--h-line-height-ratio));
    text-decoration: none;
  }

  & :deep(p),
  & :deep(ul) li,
  & :deep(ol) li {
    color: var(--color-vue-blue);
    font-weight: 500;
    font-size: var(--p-font-size);
    line-height: calc(var(--p-font-size) * var(--p-line-height-ratio));
  }

  /* 箇条書きとパラグラフ内のリンク */
  & :deep(ul) li a,
  & :deep(p) a {
    color: var(--color-vue-green);
  }

  & :deep(p) {
    color: var(--color-vue-blue);
    margin-bottom: 20px;
  }
} 

@media (--tablet) {
  .markdown-root {
    width: 100%;
    padding: 0 23.5px;
  }
}

@media (--mobile) {
  .privacy-root {
    & h1 {
        font-weight: 700;
        font-size: var(--h1-font-size-mobile);
        line-height: calc(var(--h1-font-size-mobile) * var(--p-line-height-ratio));
        margin-bottom: 30px;
    }
  }
  .markdown-root {
    & :deep(h2) {
      margin-top: 10px;
      margin-bottom: 15px;
    }
  
    & :deep(h2) a {
      font-size: var(--ph2font-size-mobile);
      line-height: calc(var(--h2-font-size-mobile) * var(--p-line-height-ratio));
    }
  
    & :deep(p),
    & :deep(ul) li,
    & :deep(ol) li {
      font-size: var(--p-font-size-mobile);
      line-height: calc(var(--p-font-size-mobile) * var(--p-line-height-ratio));
    }
  } 
}
</style>