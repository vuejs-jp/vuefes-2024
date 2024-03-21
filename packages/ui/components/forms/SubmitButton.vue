<script setup lang="ts">
import { ButtonHTMLAttributes } from 'vue'
import CssResetButton from '../common/CssResetButton.vue'

type _SubmitButtonProps = Omit<ButtonHTMLAttributes, 'disabled' | 'onClick'>
interface SubmitButtonProps extends /* @vue-ignore */ _SubmitButtonProps {
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
.submit-button {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #42b883;
  color: #fff;
  width: 100%;
  padding: 22px 66px;
  border-radius: 40px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}

.submit-button:disabled {
  pointer-events: none;
  background-color: #C6CACF !important;
}
</style>
