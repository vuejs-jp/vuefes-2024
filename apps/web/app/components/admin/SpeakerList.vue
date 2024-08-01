<script setup lang="ts">
import type { Speaker } from '@vuejs-jp/model'
import { ref } from 'vue'

interface SpeakerListProps {
  speakers: Speaker[]
}

const emit = defineEmits<{ edit: [id: string] }>()

const props = defineProps<SpeakerListProps>()

const showDialog = ref(false)
const speakerId = ref('')
const handleDialog = (id?: string) => {
  showDialog.value = !showDialog.value
  speakerId.value = id ?? ''
}
</script>

<template>
  <table id="speakers">
    <tr>
      <th>name</th>
      <th>detail_page_id</th>
      <th>image_url</th>
      <th>company</th>
      <th>position</th>
      <th>description</th>
      <th>github_id</th>
      <th>x_id</th>
      <th>session_type</th>
      <th>is_open</th>
      <th style="min-width: 80px">action</th>
    </tr>
    <tr v-for="speaker in speakers" :key="speaker.id">
      <td>
        <p>{{ speaker.name_ja }}</p>
        <p>{{ speaker.name_en }}</p>
      </td>
      <td>{{ speaker.detail_page_id }}</td>
      <td>
        <img
          v-if="speaker.image_url"
          alt=""
          :src="speaker.image_url"
          width="60"
          height="60"
          decoding="async"
        />
        <p v-if="!speaker.image_url">
          No image
        </p>
      </td>
      <td>
        <p>{{ speaker.company_ja }}</p>
        <p>{{ speaker.company_en }}</p>
      </td>
      <td>
        <p>{{ speaker.position_ja }}</p>
        <p>{{ speaker.position_en }}</p>
      </td>
      <td>
        <p>{{ speaker.description_ja }}</p>
        <p>{{ speaker.description_en }}</p>
      </td>
      <td>{{ speaker.github_id }}</td>
      <td>{{ speaker.x_id }}</td>
      <td>
        <template v-if="speaker.session_type !== 'panel-event'">{{ speaker.session_type }}</template>
        <template v-else>
          <p v-for="e in speaker.events" :key="e">{{ e }}</p>
        </template>
      </td>
      <td>
        <p>{{ speaker.is_open ? '表示' : '非表示' }}</p>
        <p v-if="speaker.display_order">{{ `(${speaker.display_order})` }}</p>
      </td>
      <td>
        <VFLinkButton
          is="button"
          class="action"
          background-color="white"
          color="vue-blue"
          @click="() => handleDialog(speaker?.id)"
        >
          Edit
        </VFLinkButton>
      </td>
    </tr>
  </table>
  <VFDialog v-if="showDialog">
    <AdminSpeakerItem :speaker="speakers.filter((s) => s.id === speakerId)[0]" @close="handleDialog" />
  </VFDialog>
</template>

<style scoped>
#speakers {
  border-collapse: collapse;
  width: 100%;
}

#speakers td,
#speakers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#speakers tr:nth-child(even){
  background-color: #f2f2f2;
}

#speakers tr:hover {
  background-color: #ddd;
}

#speakers th {
  padding: 12px auto;
  text-align: left;
  background-color: var(--color-vue-green200);
  color: #fff;
}
</style>
