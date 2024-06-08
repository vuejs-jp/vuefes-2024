<script setup lang="ts">
import { InputHTMLAttributes, InputTypeHTMLAttribute } from 'vue'
import { useTypography } from '@vuejs-jp/composable'
import Typography from '../common/Typography.vue'

type _InputFieldProps = Omit<InputHTMLAttributes, 'onInput' | 'onBlur'>
interface Props extends /* @vue-ignore */ _InputFieldProps {
  id: string
  name: string
  type?: InputTypeHTMLAttribute
  placeholder?: string
  required?: boolean
  disabled?: boolean
  /* TextInput Label */
  label: string
  /* Error Message */
  errorMessage?: string
}
type Emits = {
  blur: [value: string]
}

withDefaults(defineProps<Props>(), {
  id: '',
  name: '',
  type: 'text',
  placeholder: '',
  required: false,
  disabled: false,
  label: '',
  errorMessage: '',
})

const emit = defineEmits<Emits>()
const modelValue = defineModel<string>()

const handleBlur = (e: Event) => {
  if (!(e.target instanceof HTMLInputElement)) {
    return
  }
  emit('blur', e.target.value)
}

const { fontWeight, fontSize } = useTypography()
</script>

<template>
  <label
    :for="id"
    :style="{
      fontWeight: fontWeight('heading/100'),
      fontSize: fontSize('heading/100'),
    }"
    class="input-root"
    :class="{ '-error': errorMessage }"
  >
    {{ label }}
    <input
      :id="id"
      v-model.trim="modelValue"
      :style="{
        fontSize: fontSize('heading/100'),
      }"
      class="form-input"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @blur="handleBlur"
    />
    <Typography v-if="errorMessage" variant="body/200" color="sangosyo/200">{{
      errorMessage
    }}</Typography>
  </label>
</template>

<style scoped>
.input-root {
  --color-placeholder: #c6cacf;
  --border: solid 2px transparent;

  display: grid;
  gap: 10px;
  color: var(--color-vue-blue);
}

.input-root.-error .form-input {
  --border: solid 2px #cc4f39;
}

.form-input {
  padding: 22px 24px;
  border-radius: 6px;
  box-shadow: var(--box-shadow-button);
  border: var(--border);
  outline: none;
  color: var(--color-vue-blue);
  font-weight: normal;
}

.form-input:focus {
  --border: solid 2px var(--color-vue-blue);
}

.form-input::placeholder {
  color: var(--color-placeholder);
  font-weight: normal;
}
</style>
