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
      <VFTitle id="form" class="title">
        {{ $t('form.title') }}
      </VFTitle>
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
            placeholder="お問い合わせ"
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
@import url("~/assets/media.css");

section {
  position: relative;
  padding: 120px 20px 120px;
  background-image: linear-gradient(#fff, #ebf0f5);
  &::before {
    content: "";
    position: absolute;
    display: block;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: url('/form-bg.png');
    background-size: auto;
    background-repeat: repeat;
    background-position: top left;
    opacity: 0.8;
    mix-blend-mode: overlay;
  }
}

.form-root {
  display: grid;
  gap: 40px;
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  grid-template-columns: minmax(0, 1fr);
  isolation: isolate;
}

.title {
  text-align: center;
}

.subtitle {
  display: grid;
  place-items: center;
  gap: 40px;
  line-height: 1.8;

  &::v-deep a {
    color: var(--color-vue-green200);
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

@media (--mobile) {
  section {
    padding: 60px 20px 60px;
    &::before {
      background-size: 364px;
    }
  }
  .form-root {
    gap: 30px;
  }
  .form-button {
    width: 100%;
  }
}
</style>
