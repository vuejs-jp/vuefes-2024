<script setup lang='ts'>
import { InputHTMLAttributes, InputTypeHTMLAttribute } from 'vue';

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
});

const emit = defineEmits<Emits>();
const modelValue = defineModel<string>();

const handleBlur = (e: Event) => {
  if (!(e.target instanceof HTMLInputElement)) {
    return;
  }
  emit('blur', e.target.value);
};
</script>

<template>
  <label
    :for="id"
    class="input-root"
  >
    {{ label }}
    <input
      :id="id"
      v-model.trim="modelValue"
      class="form-input"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @blur="handleBlur"
    >
    <p
      v-if="errorMessage"
      class="error-message"
    >{{ errorMessage }}</p>
  </label>
</template>

<style scoped>
.input-root {
  font-weight: bold;
}
.error-message {
  color: red;
}
</style>
