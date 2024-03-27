<script setup lang="ts">
import { useHead } from '#imports'
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
    }),
    ...twitterOg({
      title: `行動規範 | ${conferenceTitle}`,
      description: ogCoCDescription,
      url: `${linkUrl}code-of-conduct`,
    }),
  ],
})

const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
</script>

<template>
  <section>
    <div class="coc-root">
      <div class="title">
        <h1
          :style="{
            fontWeight: fontWeight('heading/700'),
            fontSize: fontSize('heading/700'),
            color: color('vue-blue'),
          }"
        >
          {{ $t('code_of_conduct.title') }}
        </h1>
      </div>
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
      <VFLinkButton background-color="white" color="vue-blue" target="" href="/">
        {{ $t('back_to_top') }}
      </VFLinkButton>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 120px 20px 120px;
  background: color(--color-white);
}
.coc-root {
  display: grid;
  gap: 40px;
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  grid-template-columns: minmax(0, 1fr);
}
.title {
  text-align: center;
}
.subtitle {
  display: grid;
  place-items: center;
  &::v-deep h2 {
    margin-top: 60px;
    font-weight: 700;
    font-size: 32px;
  }
  &::v-deep p {
    margin-top: 20px;
  }
  &::v-deep a {
    color: var(--color-vue-green);
    text-decoration: underline;
  }
  &::v-deep a:hover {
    opacity: 0.4;
    transition: .2s;
  }
}
.actions {
  padding-top: 40px;
  text-align: center;
  margin: 0 auto;
  width: 320px;
}
@media (--mobile) {
  .title {
    font-size: 28px;
  }
}
</style>
