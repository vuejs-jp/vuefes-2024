<script setup lang="ts">
import { ref } from 'vue'

interface TabProps {
  labels: string[]
}
const props = defineProps<TabProps>()

const selectedIndex = ref(0)

function clickItem(index: number) {
  selectedIndex.value = index
}
</script>

<template>
  <div class="tab">
    <div v-for="(tab, index) in 3" :key="index">
      <input :id="`tab_item_${index}`" type="radio" name="tab-item" :checked="selectedIndex === index" @change="clickItem(index)" />
      <label class="tab-item" :for="`tab_item_${index}`">{{ labels[index] }}</label>
    </div>
    <slot :name="`tab_content_${selectedIndex}`" />
  </div>
</template>

<style scoped>
.tab {
  margin-top: 50px;
  padding-bottom: 40px;
  background-color: var(--color-white);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}
.tab-item {
  width: calc(100%/3);
  height: calc(var(--unit) * 6.25);
  border-bottom: 3px solid var(--color-vue-green);
  background-color: var(--color-white);
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  color: var(--color-vue-blue);
  display: block;
  float: left;
  text-align: center;
  font-weight: bold;
  transition: all 0.2s ease;
}
.tab-item:hover {
  opacity: 0.6;
}
input[name="tab-item"] {
  display: none;
}
.tab-content {
  display: none;
  padding: calc(var(--unit) * 5) calc(var(--unit) * 5) 0;
  clear: both;
  overflow: hidden;
}
#tab_item_0:checked ~ #tab_item_0,
#tab_item_1:checked ~ #tab_item_1,
#tab_item_2:checked ~ #tab_item_2,
#tab_item_3:checked ~ #tab_item_3,
#tab_item_4:checked ~ #tab_item_4 {
  display: block;
}
.tab input:checked + .tab-item {
  background-color: var(--color-vue-green);
  color: var(--color-white);
}
</style>
