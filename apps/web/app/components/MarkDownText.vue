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
  <ContentDoc :path="docPath" :head="false">
    <template #default="{ doc }">  
      <ContentRenderer :value="doc" />
    </template>
    <template #not-found>
      <h2>Document not found.</h2>
    </template>
  </ContentDoc>
</template>
