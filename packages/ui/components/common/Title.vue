<script setup lang="ts">
import Typography from './Typography.vue'

type TitleProps = {
  id: string
}

const props = defineProps<TitleProps>()
</script>

<template>
  <Typography :id variant="heading/800" color="vue-blue">
    <slot />
  </Typography>
</template>
