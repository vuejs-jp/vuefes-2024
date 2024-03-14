<script setup lang="ts">
import { ButtonHTMLAttributes } from 'vue'
import CssResetButton from '../common/CssResetButton.vue'
import type { Color } from '@vuejs-jp/model'
import { useColor } from '@vuejs-jp/composable'

type _SubmitButtonProps = Omit<ButtonHTMLAttributes, 'disabled' | 'onClick'>
interface SubmitButtonProps extends /* @vue-ignore */ _SubmitButtonProps {
  backgroundColor: Color
  color: Color
  disabled?: boolean
}
interface SubmitButtonEmit {
  (event: 'click'): void
}
const props = defineProps<SubmitButtonProps>()
const emit = defineEmits<SubmitButtonEmit>()
const handleClick = () => {
  emit('click')
}

const { color } = useColor()
</script>

<template>
  <CssResetButton 
    type="submit"
    :style="{ backgroundColor: color(props.backgroundColor), color: color(props.color) }"
    class="submit-button"
    v-bind="props"
    @click="handleClick"
  >
    <slot />
  </CssResetButton>
</template>

<style scoped>
.submit-button {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 22px 66px;
  border-radius: 40px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}

.submit-button:disabled {
  pointer-events: none;
  background-color: #C6CACF;
}
</style>
