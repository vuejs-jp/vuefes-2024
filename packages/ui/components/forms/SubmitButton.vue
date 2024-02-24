<script setup lang="ts">
import { toRefs, ButtonHTMLAttributes } from 'vue'
import CssResetButton from '../CssResetButton.vue'

type _SubmitButtonProps = Omit<ButtonHTMLAttributes, 'disabled' | 'onClick'>
interface SubmitButtonProps extends /* @vue-ignore */ _SubmitButtonProps {
  disabled?: boolean
}
interface SubmitButtonEmit {
  (event: 'on-click'): void
}
const props = defineProps<SubmitButtonProps>()
const { disabled = false } = toRefs(props)
const emit = defineEmits<SubmitButtonEmit>()
const handleClick = () => {
  emit('on-click')
}
</script>

<template>
  <CssResetButton 
    type="submit"
    class="submit-button"
    v-bind="props"
    @click="handleClick"
  >
    <slot />
  </CssResetButton>
</template>

<style scoped>
  /* TODO デザイン適用 */
.submit-button {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  height: 80px;
  border-radius: 40px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  background: #42B983;
  color: #FFFFFF;
}

.submit-button:disabled {
  pointer-events: none;
  background-color: #C9DAEA;
}
</style>