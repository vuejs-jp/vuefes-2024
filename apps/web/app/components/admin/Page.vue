<script setup lang="ts">
import { useAsyncData } from '#imports'
import type { AdminPage } from '@vuejs-jp/model'
import { match } from 'ts-pattern'
import { ref } from 'vue'
import { useCsv } from '@vuejs-jp/composable'
import { useSupabase } from '~/composables/useSupabase'
import { useSupabaseCsv } from '~/composables/useSupabaseCsv'
import type AdminUserList from './AdminUserList.vue'

interface ListProps {
  page: AdminPage
}

const { fetchData } = useSupabase()
const { exportSpeaker, exportSponsor, exportStaff } = useSupabaseCsv()
const { write } = useCsv()
const { data: speakers } = await useAsyncData('speakers', async () => {
  return await fetchData('speakers')
})
const { data: sponsors } = await useAsyncData('sponsors', async () => {
  return await fetchData('sponsors')
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

const handleCsv = async () => {
  const res = await match(props.page)
    .with('speaker', () => exportSpeaker('speakers'))
    .with('sponsor', () => exportSponsor('sponsors'))
    .with('adminUser', () => exportStaff('staffs'))
    .with('namecard', () => null)
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
          v-if="page !== 'namecard'"
          class="action"
          background-color="white"
          color="vue-blue"
          @click="handleCsv"
        >
          {{ `Export ${pageText === 'AdminUser' ? 'staff' : pageText}` }}
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
    <div v-if="page === 'adminUser'" class="tab-content-admin">
      <AdminStaffList :staffs="staffs?.data" />
      <AdminUserList :admin-users="adminUsers?.data" />
    </div>
    <VFDialog v-if="showDialog">
      <AdminSpeakerItem v-if="page === 'speaker'" @close="handleDialog" />
      <AdminSponsorItem v-if="page === 'sponsor'" :speakers="speakers?.data" @close="handleDialog" />
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
.tab-content-admin {
  display: grid;
  gap: 20px;
}
</style>
