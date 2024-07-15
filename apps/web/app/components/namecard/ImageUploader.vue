<script setup lang="ts">
import { useTypography } from '@vuejs-jp/composable'

type Props = {
  label: string
}
defineProps<Props>()

const { fontWeight, fontSize } = useTypography()
</script>

<template>
  <!-- TODO 画像アップローダーのブラッシュアップ -->
  <VFDragDropArea
    :style="{
      fontWeight: fontWeight('heading/100'),
      fontSize: fontSize('heading/100'),
    }"
  >
    {{ label }}
    <VFCssResetButton class="select-button" />
  </VFDragDropArea>
</template>

<style scoped></style>
