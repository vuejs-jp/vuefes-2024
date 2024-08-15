<script setup lang="ts">
import { useTypography } from '@vuejs-jp/composable'
import Typography from '../common/Typography.vue'

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
  /** TextareaHTMLAttribute disabled(default: false) */
  disabled?: boolean
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

const modelValue = defineModel<string>()

const { fontWeight, fontSize } = useTypography()
</script>
<template>
  <label
    :for="id"
    :style="{
      fontWeight: fontWeight('heading/100'),
      fontSize: fontSize('heading/100'),
    }"
    class="textarea-root"
    :class="{ '-error': errorMessage }"
  >
    {{ label }}
    <textarea
      :id="id"
      v-model.trim="modelValue"
      :name="name"
      :style="{
        fontSize: fontSize('heading/100'),
      }"
      class="form-textarea"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @blur="handleBlur"
    />
    <Typography v-if="errorMessage" variant="body/200" color="sangosyo/200">{{ errorMessage }}</Typography>
  </label>
</template>


<style scoped>
.textarea-root {
  --color-placeholder: #c6cacf;
  --border: solid 2px transparent;

  display: grid;
  gap: 10px;
  color: var(--color-vue-blue);
}

.textarea-root.-error .form-textarea {
  --border: solid 2px #CC4F39;
}

.form-textarea {
  padding: 22px 24px;
  border-radius: 6px;
  box-shadow: var(--box-shadow-button);
  border: var(--border);
  outline: none;
  color: var(--color-vue-blue);
  font-weight: normal;
  min-height: 192px;
}

.form-textarea:focus {
  --border: solid 2px var(--color-vue-blue);
}

.form-textarea::placeholder {
  color: var(--color-placeholder);
  font-weight: normal;
}

.form-textarea:disabled {
  background: #c6cacf40;
}
</style>
