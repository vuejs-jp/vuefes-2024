<script setup lang='ts'>
import { SelectHTMLAttributes } from 'vue'
import { useTypography } from '@vuejs-jp/composable'
import Typography from '../common/Typography.vue'

type _DropdownFieldProps = Omit<SelectHTMLAttributes, 'onInput' | 'onBlur'>;
interface Props extends /* @vue-ignore */ _DropdownFieldProps {
  id: string,
  name: string,
  required?: boolean,
  disabled?: boolean,
  items: { value: string; text: string }[]
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
    class="select-root"
    :class="{ '-error': errorMessage }"
  >
    {{ label }}
    <select
      :id="id"
      v-model.trim="modelValue"
      :style="{
        fontSize: fontSize('heading/100'),
      }"
      class="form-select"
      :name="name"
      :required="required"
      :disabled="disabled"
      @blur="handleBlur"
    >
    <option v-for="item in items" :key="item.value" :value="item.value">
      {{ item.text }}
    </option>
    </select>
    <Typography v-if="errorMessage" variant="body/200" color="sangosyo/200">{{ errorMessage }}</Typography>
  </label>
</template>

<style scoped>
.select-root {
  --color-placeholder: #c6cacf;
  --border: solid 2px transparent;

  display: grid;
  gap: 10px;
  color: var(--color-vue-blue);
}

.select-root.-error .form-select {
  --border: solid 2px #CC4F39;
}

.form-select {
  padding: 22px 24px;
  border-radius: 6px;
  box-shadow: var(--box-shadow-button);
  border: var(--border);
  outline: none;
  color: var(--color-vue-blue);
  font-weight: normal;
}

.form-select:focus {
  --border: solid 2px var(--color-vue-blue);
}

.form-select::placeholder {
  color: var(--color-placeholder);
  font-weight: normal;
}
</style>
