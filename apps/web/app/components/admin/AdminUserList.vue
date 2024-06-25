<script setup lang="ts">
import type { AdminUser } from '@vuejs-jp/model'

interface SponsorListProps {
  adminUsers: AdminUser[]
}

const props = defineProps<SponsorListProps>()
</script>

<template>
  <table id="adminUsers">
    <tr>
      <th>email</th>
      <th style="min-width: 80px">action</th>
    </tr>
    <tr v-for="user in adminUsers" :key="user.id">
      <td>{{ user.email }}</td>
      <td>
        <!-- may be removed the user -->
      </td>
    </tr>
  </table>
</template>

<style scoped>
#adminUsers {
  border-collapse: collapse;
  width: 100%;
}

#adminUsers td,
#adminUsers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#adminUsers tr:nth-child(even){
  background-color: #f2f2f2;
}

#adminUsers tr:hover {
  background-color: #ddd;
}

#adminUsers th {
  padding: 12px auto;
  text-align: left;
  background-color: var(--color-vue-green200);
  color: #fff;
}
</style>
