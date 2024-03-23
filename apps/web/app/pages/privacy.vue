<script setup lang="ts">
import TopPageSection from '~/components/TopPageSection.vue'
import FooterPageSection from '~/components/FooterPageSection.vue'
import TextLinkButton from '@vuejs-jp/vuefes-ui/components/TextLinkButton.vue'
import MarkDownText from '~/components/MarkDownText.vue'
import { useColor, useTypography } from '@vuejs-jp/composable'

const { t } = useI18n()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
</script>

<template>
  <main>
    <div 
      class="privacy-root"
      :style="{
        backgroundColor: color('white'),
        color: color('vue-blue'),
      }">
      <h2 
        class="section-title">
        {{ t("privacy.title") }}
      </h2>
      <div class="markdown-root">
        <MarkDownText path="privacy" class="explain" />
      </div>
      <!-- TODO toshickさんの対応を参考に修正する -->
      <div class="back">
        <TextLinkButton
          :href="'/'"
          :color="'vue-blue'"
          :background-color="'white'">
          {{ t("privacy.button") }}
        </TextLinkButton>
      </div>
    </div>
  </main>
  <FooterPageSection />
</template>

<style scoped>
@import url("../assets/base.css");
@import url("../assets/media.css");

/* margin等が5の倍数なので、一旦定数で定義 */

.privacy-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .section-title {
    /* モバイル表示時に上書きしたいので、:styleではなくCSS内で指定 */
    --section-title-font-size: var(--font-size-heading700);
    --section-title-line-height: var(--line-height-heading700);
    font-size: var(--section-title-font-size);
    line-height: var(--section-title-line-height);
    font-weight: 700;
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
    font-size: var(--markdown-font-size-h2);
    line-height: var(--markdown-line-height-h2);
    text-decoration: none;
  }

  & :deep(p),
  & :deep(ul) li,
  & :deep(ol) li {
    color: var(--color-vue-blue);
    font-weight: 500;
    font-size: var(--markdown-font-size-body);
    line-height: var(--markdown-line-height-body);
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
.back {
  width: 240px;
  margin-top: 40px;
  margin-bottom: 120px;
}

@media (--tablet) {
  .markdown-root {
    width: 100%;
    padding: 0 23.5px;
  }
}

@media (--mobile) {
  .privacy-root {
    & .section-title {
      --section-title-font-size: var(--font-size-heading400);
      --section-title-line-height: var(--line-height-heading400);
      margin-bottom: 30px;
    }
  }
  .markdown-root {
    & :deep(h2) {
      margin-top: 10px;
      margin-bottom: 15px;
    }
  
    & :deep(h2) a {
      --markdown-font-size-h2: var(--markdown-font-size-heading200);
      --markdown-line-height-h2: var(--markdown-line-height-heading200);
    }
  
    & :deep(p),
    & :deep(ul) li,
    & :deep(ol) li {
      --markdown-font-size-body: var(--markdown-font-size-body300);
      --markdown-line-height-body: var(--markdown-line-height-body300);
    }
  } 
  .back {
    width: 100%;
    padding: 0 23.5px;
    margin-top: 30px;
    margin-bottom: 60px;
  }
}
</style>