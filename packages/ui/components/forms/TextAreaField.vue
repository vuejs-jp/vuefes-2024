<script setup lang="ts">
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
</script>
<template>
  <label
    :for="id"
    class="textarea-root"
  >
    {{ label }}
    <textarea
      :id="id"
      v-model.trim="inputtedText"
      :name="name"
      class="form-textarea"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      @blur="handleBlur"
    />
    <p
      v-if="errorMessage"
      class="error-message"
    >{{ errorMessage }}</p>
  </label>
</template>


<style scoped>
.textarea-root {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .form-textarea {
    width: 350px;
  }
}
</style>
