<script setup lang="ts">
import { useHead, usePathWithLocale } from '#imports'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { conferenceTitle, linkUrl, ogCoCDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

useHead({
  // eslint-disable-next-line no-unused-vars
  titleTemplate: (titleChunk) => `行動規範 | ${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `行動規範 | ${conferenceTitle}`,
      description: ogCoCDescription,
      url: `${linkUrl}code-of-conduct`,
      image: `${linkUrl}og/code-of-conduct.png`,
    }),
    ...twitterOg({
      title: `行動規範 | ${conferenceTitle}`,
      description: ogCoCDescription,
      url: `${linkUrl}code-of-conduct`,
      image: `${linkUrl}og/code-of-conduct.png`,
    }),
  ],
})

const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
const pathWithLocale = usePathWithLocale()
</script>

<template>
  <div class="coc-root">
    <div class="conducts">
      <h1
        :style="{
          fontWeight: fontWeight('heading/700'),
          color: color('vue-blue'),
        }"
        class="title"
      >
        {{ $t('code_of_conduct.title') }}
      </h1>
      <div
        class="subtitle"
        :style="{
          fontWeight: fontWeight('body/400'),
          fontSize: fontSize('body/400'),
          color: color('vue-blue'),
        }"
      >
        <MarkDownText path="code-of-conduct" />
      </div>
    </div>
    <div class="actions">
      <VFLinkButton
        class="action"
        background-color="white"
        color="vue-blue"
        target=""
        :href="pathWithLocale('/')"
      >
        {{ $t('back_to_top') }}
      </VFLinkButton>
    </div>
  </div>
</template>

<style scoped>
@import url('../assets/base.css');
@import url('~/assets/media.css');

.coc-root {
  --header-height: calc(var(--unit) * 10);

  padding: calc(var(--header-height) + 120px) 20px 0;
  background: color(--color-white);
}
.conducts {
  display: grid;
  gap: 40px;
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  grid-template-columns: minmax(0, 1fr);
}
.title {
  text-align: center;
  font-size: 45px;
}
.subtitle {
  display: grid;
  place-items: center;
  &::v-deep(h2) {
    margin-top: 60px;
    font-weight: 700;
    font-size: 24px;
  }
  &::v-deep(p) {
    margin-top: 20px;
    line-height: 1.8;
  }
  &::v-deep(a) {
    color: var(--color-vue-green200);
    text-decoration: underline;
  }
  &::v-deep(a:hover) {
    opacity: 0.4;
    transition: 0.2s;
  }
}
.actions {
  margin: 40px auto 120px;
  width: 100%;
  max-width: 260px;
  border-radius: var(--height-button);
}
.action {
  --height-button: 66px;

  height: var(--height-button);
}

@media (--tablet) {
  .action {
    --height-button: 58px;
  }
}

@media (--mobile) {
  .coc-root {
    --header-height: calc(var(--unit) * 8);
    padding: calc(var(--header-height) + 60px) 20px 60px;
  }
  .conducts {
    gap: 30px;
  }
  .title {
    font-size: 28px;
  }
  .actions {
    width: 100%;
    padding: 0 23.5px;
    margin-top: 30px;
    margin-bottom: 60px;
  }
  .action {
    --height-button: 58px;
  }
}
</style>
