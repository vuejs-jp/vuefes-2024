<script setup lang="ts">
import { useI18n } from '#i18n'
import { useColor, useTypography } from '@vuejs-jp/composable'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import MarkDownText from '~/components/MarkDownText.vue'
import SvgProcessDown from '~/public/namecard/process-down.svg?component'

const { t } = useI18n()
const { locale: currentLocale } = useLocaleCurrent()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
</script>

<template>
  <div class="creation-process-root">
    <h2
      :style="{
        fontWeight: fontWeight('heading/700'),
        fontSize: fontSize('heading/300'),
        color: color('vue-blue'),
      }"
      class="title"
    >
      {{ t('namecard.creation_process.title') }}
    </h2>
    <ol
      :style="{
        fontWeight: fontWeight('body/400'),
        fontSize: fontSize('body/400'),
        color: color('vue-blue'),
      }"
      class="process-list"
    >
      <li>
        <i18n-t keypath="namecard.process_1_message" tag="p">
          <template #ticketUrl>
            <a
              :href="`${currentLocale === 'ja' ? '/' : `/${currentLocale}/`}#ticket`"
              target="_blank"
            >
              {{ $t('namecard.ticket_data') }}
            </a>
          </template>
        </i18n-t>
        <SvgProcessDown class="down-icon" />
      </li>
      <li>
        <i18n-t keypath="namecard.process_2_message" tag="p" />
        <SvgProcessDown class="down-icon" />
      </li>
      <li>
        <i18n-t keypath="namecard.process_3_message" tag="p" />
        <SvgProcessDown class="down-icon" />
      </li>
      <li>
        <i18n-t keypath="namecard.process_4_message" tag="p" />
      </li>
    </ol>
    <div
      :style="{
        color: color('vue-blue'),
      }"
      class="process-alert"
    >
      <MarkDownText path="namecard_process_alert" />
    </div>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.creation-process-root {
  padding: calc(var(--unit) * 3) calc(var(--unit) * 4);
  background-color: #e7eff7;
  line-height: 1.8;
  text-align: left;
}
.title {
  margin-bottom: calc(var(--unit) * 3);
  text-align: center;
}
.process-list {
  padding: 0;
  & :deep(p) {
    margin-bottom: calc(var(--unit) * 2);
  }
  & :deep(a) {
    color: inherit;
  }
}
.process-alert {
  & :deep(h3) {
    font-size: 1.125rem;
    font-weight: 500;
  }
  & :deep(a) {
    color: inherit;
  }
}
.down-icon {
  display: flex;
  justify-content: center;
  margin: 0 auto calc(var(--unit) * 2.5);
}
</style>
`
