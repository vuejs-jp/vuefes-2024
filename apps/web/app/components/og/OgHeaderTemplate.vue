<script setup lang="ts">
// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

interface OgHeaderTemplateProps {
  title: string
}

const props = defineProps<OgHeaderTemplateProps>()
</script>

<template>
  <VFOgHeaderTemplate24 :title="title" />
</template>
