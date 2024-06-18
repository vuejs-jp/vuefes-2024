<script setup lang="ts">
import { createError, useRuntimeConfig } from '#imports'
import { useInvitation } from '~/composables/useInvitation'
import { useFormError } from '~/composables/useFormError'

const config = useRuntimeConfig()

if (!config.public.enableInviteStaff) {
  throw createError({ statusCode: 404, statusMessage: 'You cannot invite a staff.' })
}

const { publish, isSubmittingEmail, isSubmittingId, email, id } = useInvitation()
const { emailError, idError, validateAdminEmail, validateId } = useFormError()

function updateEmail(e: any) {
  email.value = e.target.value
}
function updateId(e: any) {
  id.value = e.target.value
}
function inviteUser() {
  publish('invite', email.value)
}
function deleteUser() {
  publish('delete', id.value)
}
</script>

<template>
  <main>
    <div class="invite-root">
      <h1 class="title">
        Invite or Delete User
      </h1>
      <VFInputField
        id="email"
        v-model="email"
        name="email"
        :label="$t('form.form_email_label')"
        placeholder="hello+supaadmin@vuefes.jp"
        required
        :error="emailError"
        @input="updateEmail"
        @blur="validateAdminEmail"
      />
      <VFSubmitButton :disabled="!isSubmittingEmail" @click="inviteUser">
        Invite User
      </VFSubmitButton>
      <VFInputField
        id="id"
        v-model="id"
        name="id"
        label="ID"
        placeholder="User ID"
        required
        :error="idError"
        @input="updateId"
        @blur="validateId"
      />
      <VFSubmitButton :disabled="!isSubmittingId" @click="deleteUser">
        Delete User
      </VFSubmitButton>
    </div>
  </main>
</template>

<style scoped>
@import url('../../assets/base.css');
@import url('../../assets/media.css');

main {
  --header-height: calc(var(--unit) * 10);

  padding: calc(var(--header-height) + 120px) 20px 0;
  background: color(--color-white);
}

.invite-root {
  display: grid;
  gap: 40px;
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  grid-template-columns: minmax(0, 1fr);
}
.title {
  text-align: center;
  font-size: 45px;
  color: var(--color-vue-blue);
}
.invite-action button {
  height: 28px;
}
</style>
