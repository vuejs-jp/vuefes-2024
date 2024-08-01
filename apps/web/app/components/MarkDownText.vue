<script setup lang="ts">
import { useLocale } from '~/composables/useLocale'
import type { Path } from '@vuejs-jp/model'

type MarkDownTextProps = {
  path: Path
}

const props = defineProps<MarkDownTextProps>()

const { docPath } = useLocale(props.path)
</script>

<template>
  <ContentDoc v-if="docPath" v-slot="{ doc }" :path="docPath" :head="false">
    <ContentRenderer :value="doc" />
  </ContentDoc>
</template>
