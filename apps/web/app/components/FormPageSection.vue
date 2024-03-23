<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'
import { useForm } from '~/composables/useForm'

const {
  name,
  email,
  detail,
  isSent,
  isSubmitting,
  nameError,
  emailError,
  detailError,
  validateName,
  validateEmail,
  validateDetail,
  onSubmit,
} = useForm()
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()

const updateName = (e: any) => {
  name.value = e.target.value
}
const updateEmail = (e: any) => {
  email.value = e.target.value
}
const updateDetail = (e: any) => {
  detail.value = e.target.value
}
</script>

<template>
  <section>
    <div class="form-root">
      <div class="title">
        <VFTitle id="form">
          {{ $t('form.title') }}
        </VFTitle>
      </div>
      <div
        class="subtitle"
        :style="{
          fontWeight: fontWeight('body/300'),
          fontSize: fontSize('body/300'),
          color: color('vue-blue'),
        }"
      >
        <MarkDownText path="form" />
      </div>
      <div class="form">
        <form @submit="onSubmit">
          <VFInputField
            id="name"
            v-model="name"
            name="name"
            :label="$t('form.form_name_label')"
            :placeholder="$t('form.form_name_placeholder')"
            required
            :error="nameError"
            @input="updateName"
            @blur="validateName"
          />
          <VFInputField
            id="email"
            v-model="email"
            name="email"
            :label="$t('form.form_email_label')"
            placeholder="hello@vuefes.jp"
            required
            :error="emailError"
            @input="updateEmail"
            @blur="validateEmail"
          />
          <VFTextAreaField
            id="detail"
            v-model="detail"
            name="detail"
            :label="$t('form.form_text_label')"
            :rows="3"
            required
            :error="detailError"
            @input="updateDetail"
            @blur="validateDetail"
          />
          <div class="form-button">
            <VFSubmitButton :disabled="!isSubmitting">
              {{ $t('form.submit') }}
            </VFSubmitButton>
          </div>
          <VFTypography v-if="isSent" variant="other/200" color="sangosyo/200">
            {{ $t('form.submit_done') }}
          </VFTypography>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 120px 20px 120px;
  background: url(/form-bg.png), linear-gradient(rgba(255, 255, 255, 0.8), rgba(235, 240, 245, 0.8));
  background-blend-mode: soft-light;
}
.form-root {
  display: grid;
  gap: 40px;
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  grid-template-columns: minmax(0, 1fr);
}
.title {
  text-align: center;
}
.subtitle {
  display: grid;
  place-items: center;
  gap: 40px;
  &::v-deep a {
    color: var(--color-vue-green);
    text-decoration: underline;
  }
  &::v-deep a:hover {
    opacity: 0.4;
    transition: .2s;
  }
}
form {
  display: grid;
  gap: 40px;
}
.form-button {
  margin: 0 auto;
  width: 260px;
}
@supports (-webkit-touch-callout: none) {
  section {
    background: -webkit-linear-gradient(rgba(255, 255, 255, 0.8), rgba(235, 240, 245, 0.8)), url(/form-bg.png); /* for iOS */
    background-size: 200%; /* for iOS */
  }
}
</style>
