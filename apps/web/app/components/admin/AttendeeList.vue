<script setup lang="ts">
import type { Attendee } from '@vuejs-jp/model'
import { ref } from 'vue'

interface AttendeeListProps {
  attendees: Attendee[]
}

const emit = defineEmits<{ edit: [id: string] }>()

const props = defineProps<AttendeeListProps>()

const showDialog = ref(false)
const attendeeId = ref('')
const handleDialog = (id?: string) => {
  showDialog.value = !showDialog.value
  attendeeId.value = id ?? ''
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
      <th>role</th>
      <th>receipt_id</th>
      <th>activated_at</th>
      <th style="min-width: 80px">action</th>
    </tr>
    <tr v-for="attendee in attendees" :key="attendee.id">
      <td>{{ attendee.user_id }}</td>
      <td>{{ attendee.email }}</td>
      <td>
        <img
          v-if="attendee.avatar_url"
          alt=""
          :src="attendee.avatar_url"
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
      <td>{{ attendee.role }}</td>
      <td>{{ attendee.receipt_id }}</td>
      <td>{{ attendee.activated_at }}</td>
      <td>
        <VFLinkButton
          is="button"
          class="action"
          background-color="white"
          color="vue-blue"
          @click="() => handleDialog(attendee?.id)"
        >
          Edit
        </VFLinkButton>
      </td>
    </tr>
  </table>
  <VFDialog v-if="showDialog">
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
