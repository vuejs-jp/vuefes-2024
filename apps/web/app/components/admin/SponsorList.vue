<script setup lang="ts">
import type { Speaker, Sponsor } from '@vuejs-jp/model'
import { ref } from 'vue'

interface SponsorListProps {
  sponsors: Sponsor[]
  speakers: Speaker[]
}

const emit = defineEmits<{ edit: [id: string] }>()

const props = defineProps<SponsorListProps>()

const showDialog = ref(false)
const sponsorId = ref('')
const handleDialog = (id?: string) => {
  showDialog.value = !showDialog.value
  sponsorId.value = id ?? ''
}
</script>

<template>
  <table id="sponsors">
    <tr>
      <th>name</th>
      <th>detail_page_id</th>
      <th>image_url</th>
      <th>description</th>
      <th>link_url</th>
      <th>speaker_id</th>
      <th>tag</th>
      <th>is_open</th>
      <th style="min-width: 80px">action</th>
    </tr>
    <tr v-for="sponsor in sponsors" :key="sponsor.id">
      <td>{{ sponsor.name }}</td>
      <td>{{ sponsor.detail_page_id }}</td>
      <td>
        <img
          v-if="sponsor.image_url"
          alt=""
          :src="sponsor.image_url"
          height="60"
          decoding="async"
        />
        <p v-if="!sponsor.image_url">
          No image
        </p>
      </td>
      <td>
        <p>{{ sponsor.description_ja }}</p>
        <p>{{ sponsor.description_en }}</p>
      </td>
      <td>{{ sponsor.link_url }}</td>
      <td>{{ sponsor.speaker_id }}</td>
      <td>
        <p v-for="tag in sponsor.tag" :key="tag">
          {{ tag }}
        </p>
      </td>
      <td>
        <p>{{ sponsor.is_open ? '表示' : '非表示' }}</p>
        <p v-if="sponsor.display_order">{{ `(${sponsor.display_order})` }}</p>
      </td>
      <td>
        <VFLinkButton
          is="button"
          class="action"
          background-color="white"
          color="vue-blue"
          @click="() => handleDialog(sponsor?.id)"
        >
          Edit
        </VFLinkButton>
      </td>
    </tr>
  </table>
  <VFDialog v-if="showDialog">
    <AdminSponsorItem
      :sponsor="sponsors.filter((s) => s.id === sponsorId)[0]"
      :speakers="speakers"
      @close="handleDialog"
    />
  </VFDialog>
</template>

<style scoped>
#sponsors {
  border-collapse: collapse;
  width: 100%;
}

#sponsors td,
#sponsors th {
  border: 1px solid #ddd;
  padding: 8px;
}

#sponsors tr:nth-child(even){
  background-color: #f2f2f2;
}

#sponsors tr:hover {
  background-color: #ddd;
}

#sponsors th {
  padding: 12px auto;
  text-align: left;
  background-color: var(--color-vue-green200);
  color: #fff;
}
</style>
