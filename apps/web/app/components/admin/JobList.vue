<script setup lang="ts">
import type { Job, Sponsor } from '@vuejs-jp/model'
import { ref } from 'vue'

interface JobListProps {
  jobs: Job[]
  sponsors: Sponsor[]
}

const emit = defineEmits<{ edit: [id: string] }>()

const props = defineProps<JobListProps>()

const showDialog = ref(false)
const jobId = ref('')
const handleDialog = (id?: string) => {
  showDialog.value = !showDialog.value
  jobId.value = id ?? ''
}
</script>

<template>
  <table id="jobs">
    <tr>
      <th style="max-width: 400px;">link_url</th>
      <th>image_url</th>
      <th>image_alt</th>
      <th>is_open</th>
      <th style="min-width: 80px">action</th>
    </tr>
    <tr v-for="job in jobs" :key="job.id">
      <td style="max-width: 400px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        {{ job.link_url }}
      </td>
      <td>
        <img
          v-if="job.image_url"
          alt=""
          :src="job.image_url"
          height="60"
          decoding="async"
        />
        <p v-if="!job.image_url">
          No image
        </p>
      </td>
      <td>{{ job.image_alt }}</td>
      <td>
        <p>{{ job.is_open ? '表示' : '非表示' }}</p>
        <p v-if="job.display_order">{{ `(${job.display_order})` }}</p>
      </td>
      <td>
        <VFLinkButton
          is="button"
          class="action"
          background-color="white"
          color="vue-blue"
          @click="() => handleDialog(job?.id)"
        >
          Edit
        </VFLinkButton>
      </td>
    </tr>
  </table>
  <VFDialog v-if="showDialog" open>
    <AdminJobItem
      :job="jobs.filter((s) => s.id === jobId)[0]"
      :sponsors
      @close="handleDialog"
    />
  </VFDialog>
</template>

<style scoped>
#jobs {
  border-collapse: collapse;
  width: 100%;
}

#jobs td,
#jobs th {
  border: 1px solid #ddd;
  padding: 8px;
}

#jobs tr:nth-child(even){
  background-color: #f2f2f2;
}

#jobs tr:hover {
  background-color: #ddd;
}

#jobs th {
  padding: 12px auto;
  text-align: left;
  background-color: var(--color-vue-green200);
  color: #fff;
}
</style>
