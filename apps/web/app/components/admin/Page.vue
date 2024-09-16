<script setup lang="ts">
import { useAsyncData } from '#imports'
import { type AdminPage, type Role, selectableRoleList } from '@vuejs-jp/model'
import { match } from 'ts-pattern'
import { ref, watch } from 'vue'
import { useCsv } from '@vuejs-jp/composable'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseCsv } from '~/composables/useSupabaseCsv'

interface ListProps {
  page: AdminPage
}

const selectedRole = ref<Role>('attendee')

const { fetchData, fetchAttendeeData } = useSupabase()
const { exportSpeaker, exportSponsor, exportJob, exportAttendee, exportStaff } = useSupabaseCsv()
const { write } = useCsv()
const { data: speakers } = await useAsyncData('speakers', async () => {
  return await fetchData('speakers')
})
const { data: sponsors } = await useAsyncData('sponsors', async () => {
  return await fetchData('sponsors')
})
const { data: jobs } = await useAsyncData('jobs', async () => {
  return await fetchData('jobs')
})
const { data: attendees, refresh: refreshAttendee } = await useAsyncData('attendees', async () => {
  return await fetchAttendeeData('attendees', selectedRole.value)
})
const { data: staffs } = await useAsyncData('staffs', async () => {
  return await fetchData('staffs')
})
const { data: adminUsers } = await useAsyncData('admin_users', async () => {
  return await fetchData('admin_users')
})

const props = defineProps<ListProps>()

const showDialog = ref(false)
const handleDialog = () => showDialog.value = !showDialog.value

watch(
  () => selectedRole.value,
  () => refreshAttendee(),
)

const handleCsv = async () => {
  const res = await match(props.page)
    .with('speaker', () => exportSpeaker('speakers'))
    .with('sponsor', () => exportSponsor('sponsors'))
    .with('job', () => exportJob('jobs'))
    .with('adminUser', () => exportStaff('staffs'))
    .with('namecard', () => exportAttendee('attendees'))
    .exhaustive()
  if (!res) return

  write(res)
}

const pageText = props.page.replace(/^[a-z]/g, function (val) {
  return val.toUpperCase()
})
</script>

<template>
  <div class="tab-content">
    <div class="tab-content-header">
      <h2>{{ pageText }}</h2>
      <div>
        <VFLinkButton
          is="button"
          v-if="page !== 'namecard'"
          class="action"
          background-color="white"
          color="vue-blue"
          @click="handleDialog"
        >
          {{ `Add ${pageText === 'AdminUser' ? 'staff' : pageText}` }}
        </VFLinkButton>
        <VFLinkButton
          is="button"
          class="action"
          background-color="white"
          color="vue-blue"
          @click="handleCsv"
        >
          {{ `Export ${pageText === 'AdminUser' ? 'staff' : (pageText === 'namecard' ? 'attendee' : pageText)}` }}
        </VFLinkButton>
        <VFLinkButton
          v-if="page === 'adminUser'"
          href="/staff/invite"
          class="login-action"
          background-color="white"
          color="vue-blue"
        >
          Invite Staff
        </VFLinkButton>
      </div>
    </div>
    <AdminSpeakerList v-if="page === 'speaker'" :speakers="speakers?.data" />
    <AdminSponsorList v-if="page === 'sponsor'" :sponsors="sponsors?.data" :speakers="speakers?.data" />
    <AdminJobList v-if="page === 'job'" :jobs="jobs?.data" :sponsors="sponsors?.data" />
    <div v-if="page === 'namecard'" class="tab-content-attendee">
      <VFDropdownField
        id="selected_role"
        v-model="selectedRole"
        name="selected_role"
        label="Attendee Role"
        :items="selectableRoleList"
      />
      <AdminAttendeeList :attendees="attendees?.data" />
    </div>
    <div v-if="page === 'adminUser'" class="tab-content-admin">
      <AdminStaffList :staffs="staffs?.data" />
      <AdminAdminUserList :admin-users="adminUsers?.data" />
    </div>
    <VFDialog v-if="showDialog" open>
      <AdminSpeakerItem v-if="page === 'speaker'" @close="handleDialog" />
      <AdminSponsorItem v-if="page === 'sponsor'" :speakers="speakers?.data" @close="handleDialog" />
      <AdminJobItem v-if="page === 'job'" :sponsors="sponsors?.data" @close="handleDialog" />
      <AdminStaffItem v-if="page === 'adminUser'" @close="handleDialog" />
    </VFDialog>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.tab-content {
  margin: 0 1.5%;
}
.tab-content-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 40px 0 20px;
}
.tab-content-header a {
  width: 144px;
}
.tab-content-header button {
  width: 184px;
}
.tab-content-attendee,
.tab-content-admin {
  display: grid;
  gap: 20px;
}
.tab-content-attendee label {
  width: 400px;
  display: flex;
  align-items: center;
}
</style>
