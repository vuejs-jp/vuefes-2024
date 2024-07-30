<script setup lang="ts">
import { Product } from '@vuejs-jp/model'

type StoreItemProps = Product

const props = defineProps<StoreItemProps>()
</script>

<template>
  <div class="store-item">
    <img
      width="308"
      height="308"
      :alt
      :src
      decoding="async"
    />
    <div class="name">{{ name }}</div>
    <div class="price">{{ price }}</div>
    <div class="explain">{{ explain }}</div>
    <div class="supplement">
      <p>{{ size }}</p>
      <p v-if="color">{{ color }}</p>
      <p v-if="weight">{{ weight }}</p>
    </div>
  </div>
</template>

<style scoped>
.store-item {
  width: 308px;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.name {
  font-weight: bold;
  line-height: 1;
}

.explain {
  width: 308px;
  white-space: pre-wrap;
}

.price {
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
}

@media (max-width: 768px) {
  .store-item {
    --img-size: 232px;
    max-width: 232px;
  }
  .explain {
    width: 232px;
  }
}

@media (max-width: 480px) {
  .store-item {
    --img-size: 329px;
    max-width: 329px;
  }
  .store-item img {
    display: block;
    max-width: 80%;
    margin: 0 auto;
  }
  .explain {
    width: auto;
  }
}
</style>
