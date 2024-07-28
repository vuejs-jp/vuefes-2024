<script setup lang="ts">
import { useColor } from '@vuejs-jp/composable'
import { Color } from '@vuejs-jp/model'
import { PropType } from 'vue'

defineProps({
  color: {
    type: String as PropType<Color>,
    default: 'vue-green',
  },
  title: {
    type: String,
    required: true,
  },
})

const decodeHtml = (htmlStr: string) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = htmlStr
  return txt.value
}

const { color: textColor } = useColor()
</script>

<template>
  <p class="comment">
    <span
      class="comment-main"
      :style="{
        '--main-color': textColor(color),
      }"
      v-html="decodeHtml(title)"
    />
  </p>
</template>

<style scoped>
.comment {
  text-align: center;
}
.comment-main {
  color: var(--main-color);
  font-size: 16px;
  line-height: 20.42px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  text-wrap: balance;
  align-items: center;
  gap: 32px;
  @media (width > 480px) {
    &:deep(br) {
      display: none;
    }
  }
}
.comment-main::before,
.comment-main::after {
  position: relative;
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 2px;
  height: 2em;
  background: var(--main-color);
}
.comment-main::before {
  transform: rotate(-35deg);
}
.comment-main::after {
  transform: rotate(35deg);
}
</style>
