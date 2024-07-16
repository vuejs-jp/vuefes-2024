<script setup lang="ts">
import { useI18n } from '#i18n'
import MarkDownText from '~/components/MarkDownText.vue'
import SvgProcessDown from '~/public/namecard/process-down.svg?component'

const { t } = useI18n()
</script>
<template>
  <div>
    <h2>{{ t('namecard.creation-process.title') }}</h2>
    <ol>
      <li>
        <MarkDownText path="namecard_process_1" />
        <SvgProcessDown />
      </li>
      <li>
        <MarkDownText path="namecard_process_2" />
        <SvgProcessDown />
      </li>
      <li>
        <MarkDownText path="namecard_process_3" />
        <SvgProcessDown />
      </li>
      <li>
        <MarkDownText path="namecard_process_4" />
      </li>
    </ol>
    <MarkDownText path="namecard_process_alert" />
  </div>
</template>
<style scoped></style>
`
