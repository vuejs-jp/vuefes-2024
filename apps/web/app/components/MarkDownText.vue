<script setup lang="ts">
import { useLocale } from '~/composables/useLocale'
import type { Path } from '@vuejs-jp/model'

type MarkDownTextProps = {
  path: Path
}

const props = defineProps<MarkDownTextProps>()
</script>

<template>
  <ContentDoc v-slot="{ doc }" :path="useLocale(props.path).docPath" :head="false">
    <ContentRenderer :value="doc" />
  </ContentDoc>
</template>
