<script setup lang="ts">
import type { Attendee } from '@vuejs-jp/model'
import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

interface AttendeeListProps {
  attendees: Attendee[]
}

const emit = defineEmits<{ edit: [id: string] }>()

const props = defineProps<AttendeeListProps>()

const { upsertAttendee } = useSupabase()

const showDialog = ref(false)
const attendeeId = ref('')
const handleDialog = (id?: string) => {
  showDialog.value = !showDialog.value
  attendeeId.value = id ?? ''
}
const handleConfirm = (attendee?: Attendee) => {
  if (confirm(attendee?.activated_at ? 'Deactivate?' : 'Activate?')) {
    upsertAttendee(
      'attendees',
      {
        ...attendee,
        activated_at: attendee?.activated_at ? null : new Date().toISOString(),
        canceled_at: attendee?.activated_at ? new Date().toISOString() : null,
      },
    )
  }
}
</script>

<template>
  <table id="attendees">
    <tr>
      <th>user_id</th>
      <th>email</th>
      <th>avatar_url</th>
      <th>provider</th>
      <th>display_name</th>
      <th>receipt_id</th>
      <th>activated_at</th>
      <th>canceled_at</th>
      <th style="min-width: 80px">action</th>
    </tr>
    <tr v-for="attendee in attendees" :key="attendee.id">
      <td>{{ attendee.user_id }}</td>
      <td>{{ attendee.email }}</td>
      <td :style="{ position: 'relative' }">
        <img
          v-if="attendee.avatar_url"
          alt=""
          :src="attendee.avatar_url"
          :style="{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            objectFit: 'cover',
          }"
          width="60"
          height="60"
          decoding="async"
        />
        <p v-if="!attendee.avatar_url">
          No image
        </p>
      </td>
      <td>{{ attendee.provider }}</td>
      <td>{{ attendee.display_name }}</td>
      <td>{{ attendee.receipt_id }}</td>
      <td>{{ attendee.activated_at }}</td>
      <td>{{ attendee.canceled_at }}</td>
      <td>
        <VFLinkButton
          is="button"
          class="action"
          background-color="white"
          color="vue-blue"
          disabled
          @click="() => handleDialog(attendee?.id)"
        >
          Edit
        </VFLinkButton>
        <VFLinkButton
          is="button"
          class="action"
          background-color="white"
          color="vue-blue"
          disabled
          @click="() => handleConfirm(attendee)"
        >
          {{ attendee.activated_at ? 'Deactivate' : 'Activate' }}
        </VFLinkButton>
      </td>
    </tr>
  </table>
  <VFDialog v-if="showDialog" open>
    <AdminAttendeeItem :attendee="attendees.filter((s) => s.id === attendeeId)[0]" @close="handleDialog" />
  </VFDialog>
</template>

<style scoped>
#attendees {
  border-collapse: collapse;
  width: 100%;
}

#attendees td,
#attendees th {
  border: 1px solid #ddd;
  padding: 8px;
}

#attendees tr:nth-child(even){
  background-color: #f2f2f2;
}

#attendees tr:hover {
  background-color: #ddd;
}

#attendees th {
  padding: 12px auto;
  text-align: left;
  background-color: var(--color-vue-green200);
  color: #fff;
}
</style>
