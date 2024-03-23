<script setup lang='ts'>
import { InputHTMLAttributes, InputTypeHTMLAttribute } from 'vue'
import { useColor, useTypography } from '@vuejs-jp/composable'
import Typography from '../common/Typography.vue'

type _InputFieldProps = Omit<InputHTMLAttributes, 'onInput' | 'onBlur'>;
interface Props extends /* @vue-ignore */ _InputFieldProps {
  id: string,
  name: string,
  type?: InputTypeHTMLAttribute,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  /* TextInput Label */
  label: string;
  /* Error Message */
  errorMessage?: string;
};
type Emits = {
  blur: [value: string];
};

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
const { color } = useColor()
</script>

<template>
  <label
    :for="id"
    :style="{ fontWeight: fontWeight('heading/100'), fontSize: fontSize('heading/100') }"
    class="input-root"
  >
    {{ label }}
    <input
      :id="id"
      v-model.trim="modelValue"
      :style="{
        fontWeight: fontWeight('heading/100'),
        fontSize: fontSize('heading/100'),
        boxShadow: errorMessage ? `0 0 2px ${color('sangosyo/200')}` : `0 0 2px ${color('vue-blue')}`,
      }"
      class="form-input"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
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
.input-root {
  display: grid;
  gap: 10px;
  .form-input {
    padding: 24px;
    border: none;
    border-radius: 6px;
  }
}
</style>
