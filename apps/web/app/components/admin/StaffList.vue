<script setup lang="ts">
import type { Staff } from '@vuejs-jp/model'
import { ref } from 'vue'

interface StaffListProps {
  staffs: Staff[]
}

const emit = defineEmits<{ edit: [id: string] }>()

const props = defineProps<StaffListProps>()

const showDialog = ref(false)
const staffId = ref('')
const handleDialog = (id?: string) => {
  showDialog.value = !showDialog.value
  staffId.value = id ?? ''
}
</script>

<template>
  <table id="staffs">
    <tr>
      <th>name</th>
      <th>image_url</th>
      <th>x_id</th>
      <th>github_id</th>
      <th>is_open</th>
      <th style="min-width: 80px">action</th>
    </tr>
    <tr v-for="staff in staffs" :key="staff.id">
      <td>{{ staff.name }}</td>
      <td>
        <img
          v-if="staff.image_url"
          alt=""
          :src="staff.image_url"
          height="60"
          decoding="async"
        />
        <p v-if="!staff.image_url">
          No image
        </p>
      </td>
      <td>{{ staff.x_id }}</td>
      <td>{{ staff.github_id }}</td>
      <td>
        <p>{{ staff.is_open ? '表示' : '非表示' }}</p>
        <p v-if="staff.display_order">{{ `(${staff.display_order})` }}</p>
      </td>
      <td>
        <VFLinkButton
          is="button"
          class="action"
          background-color="white"
          color="vue-blue"
          @click="() => handleDialog(staff?.id)"
        >
          Edit
        </VFLinkButton>
      </td>
    </tr>
  </table>
  <VFDialog v-if="showDialog">
    <AdminStaffItem
      :staff="staffs.filter((s) => s.id === staffId)[0]"
      @close="handleDialog"
    />
  </VFDialog>
</template>

<style scoped>
#staffs {
  border-collapse: collapse;
  width: 100%;
}

#staffs td,
#staffs th {
  border: 1px solid #ddd;
  padding: 8px;
}

#staffs tr:nth-child(even){
  background-color: #f2f2f2;
}

#staffs tr:hover {
  background-color: #ddd;
}

#staffs th {
  padding: 12px auto;
  text-align: left;
  background-color: var(--color-vue-green200);
  color: #fff;
}
</style>
