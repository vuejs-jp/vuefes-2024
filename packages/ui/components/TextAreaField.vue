<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'
import Typography from './Typography.vue'

type Props = {
  /** HTMLAttribute id */
  id: string
  /** TextareaHTMLAttribute name */
  name: string
  /** Label for textarea */
  label: string
  /** TextareaHTMLAttribute placeholder */
  placeholder?: string
  /** TextareaHTMLAttribute required(default: false) */
  required?: boolean
  /** TextareaHTMLAttribute rows */
  rows?: number
  /** Error message */
  errorMessage?: string | null
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  required: false,
  rows: 5,
  errorMessage: null,
})

const emit = defineEmits<{
  blur: [value: string]
}>()

function handleBlur(e: Event) {
  if (!(e.target instanceof HTMLTextAreaElement)) {
    return
  }
  emit('blur', e.target.value)
}

const inputtedText = defineModel<string>('inputtedText')

const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
</script>
<template>
  <label
    :for="id"
    :style="{ fontWeight: fontWeight('heading/50'), fontSize: fontSize('heading/50') }"
    class="textarea-root"
  >
    {{ label }}
    <textarea
      :id="id"
      v-model.trim="inputtedText"
      :name="name"
      :style="{
        fontWeight: fontWeight('other/200'),
        fontSize: fontSize('other/200'),
        boxShadow: errorMessage ? `0 0 2px ${color('sangosyo/200')}` : `0 0 2px ${color('vue-blue')}`,
      }"
      class="form-textarea"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      @blur="handleBlur"
    />
    <Typography
      v-if="errorMessage"
      variant="body/200"
      color="sangosyo/200"
    >{{ errorMessage }}</Typography>
  </label>
</template>


<style scoped>
.textarea-root {
  display: grid;
  gap: 10px;
  .form-textarea {
    padding: 24px;
    border: none;
    border-radius: 6px;
  }
  .form-textarea:focus {
    box-shadow: 0 0 2px #35495e;
  }
}
</style>
