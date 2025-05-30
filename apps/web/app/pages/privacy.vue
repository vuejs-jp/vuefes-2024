<script setup lang="ts">
import { useHead, useI18n, usePathWithLocale } from '#imports'
import MarkDownText from '~/components/MarkDownText.vue'
import { useColor } from '@vuejs-jp/composable'
import { conferenceTitle, linkUrl, ogPrivacyDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

const { t } = useI18n()
const pathWithLocale = usePathWithLocale()
const { color } = useColor()

useHead({
  // eslint-disable-next-line no-unused-vars
  titleTemplate: (titleChunk) => `プライバシーポリシー | ${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `プライバシーポリシー | ${conferenceTitle}`,
      description: ogPrivacyDescription,
      url: `${linkUrl}privacy`,
      image: `${linkUrl}og/privacy.png`,
    }),
    ...twitterOg({
      title: `プライバシーポリシー | ${conferenceTitle}`,
      description: ogPrivacyDescription,
      url: `${linkUrl}privacy`,
      image: `${linkUrl}og/privacy.png`,
    }),
  ],
})
</script>

<template>
  <div
    class="privacy-root"
    :style="{
      backgroundColor: color('white'),
      color: color('vue-blue'),
    }"
  >
    <h1 class="section-title">
      {{ t('privacy.title') }}
    </h1>
    <div class="markdown-root">
      <MarkDownText path="privacy" class="explain" />
    </div>
    <div class="back">
      <VFLinkButton
        class="back-action"
        background-color="white"
        color="vue-blue"
        target=""
        :href="pathWithLocale('/')"
      >
        {{ t('back_to_top') }}
      </VFLinkButton>
    </div>
  </div>
</template>

<style scoped>
@import url('../assets/base.css');
@import url('../assets/media.css');

/* margin等が5の倍数なので、一旦定数で定義 */

.privacy-root {
  --header-height: calc(var(--unit) * 10);

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--header-height);

  & .section-title {
    /* モバイル表示時に上書きしたいので、:styleではなくCSS内で指定 */
    --section-title-font-size: var(--font-size-heading700);
    --section-title-line-height: var(--line-height-heading700);
    font-size: var(--section-title-font-size);
    line-height: var(--section-title-line-height);
    font-weight: 700;
    margin-top: 120px;
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
    color: var(--color-vue-green200);
    text-decoration: underline;
  }
  & :deep(ul) li a:hover,
  & :deep(p) a:hover {
    opacity: 0.4;
    transition: 0.2s;
  }
  /* 箇条書き1段目 reset.cssでnoneになったため追加 */
  & :deep(ul) {
    list-style-type: disc;
  }
  /* 箇条書き2段目 */
  & :deep(ul) li ul {
    list-style-type: '- ';
    padding-inline-start: 15px;
  }
  & :deep(ol) li {
    list-style-type: decimal;
  }

  & :deep(p) {
    color: var(--color-vue-blue);
    margin-bottom: 20px;
  }
}
.back {
  margin: 40px auto 120px;
  width: 100%;
  max-width: 260px;
}
.back-action {
  --height-button: 66px;

  height: var(--height-button);
  border-radius: var(--height-button);
}
@media (--tablet) {
  .markdown-root {
    width: 100%;
    padding: 0 23.5px;
  }
  .back-action {
    --height-button: 58px;
  }
}

@media (--mobile) {
  .privacy-root {
    --header-height: calc(var(--unit) * 8);
    & .section-title {
      --section-title-font-size: var(--font-size-heading400);
      --section-title-line-height: var(--line-height-heading400);
      margin-top: 60px;
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
  .back-action {
    --height-button: 58px;
  }
}
</style>
