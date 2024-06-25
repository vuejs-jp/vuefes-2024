<script setup lang="ts">
import { useAsyncData } from '#imports'
import type { AdminPage } from '@vuejs-jp/model'
import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'
import type AdminUserList from './AdminUserList.vue'

interface ListProps {
  page: AdminPage
}

const { fetchData } = useSupabase()
const { data: speakers } = await useAsyncData('speakers', async () => {
  return await fetchData('speakers')
})
const { data: sponsors } = await useAsyncData('sponsors', async () => {
  return await fetchData('sponsors')
})
const { data: adminUsers } = await useAsyncData('admin_users', async () => {
  return await fetchData('admin_users')
})

const props = defineProps<ListProps>()

const showDialog = ref(false)
const handleDialog = () => showDialog.value = !showDialog.value

const pageText = props.page.replace(/^[a-z]/g, function (val) {
  return val.toUpperCase()
})
</script>

<template>
  <div class="tab-content">
    <div class="tab-content-header">
      <h2>{{ pageText }}</h2>
      <VFLinkButton
        v-if="page === 'adminUser'"
        href="/staff/invite"
        class="login-action"
        background-color="white"
        color="vue-blue"
      >
        Invite Staff
      </VFLinkButton>
      <VFLinkButton
        is="button"
        v-if="page !== 'adminUser'"
        class="action"
        background-color="white"
        color="vue-blue"
        @click="handleDialog"
      >
        Add
      </VFLinkButton>
    </div>
    <AdminSpeakerList v-if="page === 'speaker'" :speakers="speakers?.data" />
    <AdminSponsorList v-if="page === 'sponsor'" :sponsors="sponsors?.data" :speakers="speakers?.data" />
    <AdminUserList v-if="page === 'adminUser'" :admin-users="adminUsers?.data" />
    <VFDialog v-if="showDialog">
      <AdminSpeakerItem v-if="page === 'speaker'" @close="handleDialog" />
      <AdminSponsorItem v-if="page === 'sponsor'" :speakers="speakers?.data" @close="handleDialog" />
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
  width: 92px;
}
</style>
