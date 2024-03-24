<script setup lang="ts">
import { useHead } from '#imports'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { conferenceTitle } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

type ErrorProps = {
  error: { statusCode: string }
}

// eslint-disable-next-line no-unused-vars
const props = defineProps<ErrorProps>()

const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

useHead({
  // eslint-disable-next-line no-unused-vars
  titleTemplate: (titleChunk) => `エラーページ | ${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `エラーページ | ${conferenceTitle}`,
      description: '',
      url: '',
    }),
    ...twitterOg({
      title: `エラーページ | ${conferenceTitle}`,
      description: '',
      url: '',
    }),
  ],
})
</script>

<template>
  <div class="error">
    <h1
      :style="{
        fontWeight: fontWeight('heading/700'),
        fontSize: fontSize('heading/700'),
        color: color('vue-blue'),
      }"
    >
      {{ $t('not_found') }}
    </h1>
    <div class="actions">
      <VFLinkButton background-color="white" color="vue-blue" target="" href="/">
        {{ $t('back_to_top') }}
      </VFLinkButton>
    </div>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
h1 {
  text-align: center;
}
.actions {
  padding-top: 40px;
  text-align: center;
  margin: 0 auto;
  width: 320px;
}
</style>
