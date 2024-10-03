<script setup lang="ts">
import { Product } from '@vuejs-jp/model'

type StoreItemProps = Product

const props = defineProps<StoreItemProps>()
</script>

<template>
  <div class="store-item">
    <a :href="url" target="_blank">
      <NuxtImg :alt :src width="616" height="616" fit="cover" loading="lazy" class="image" />
    </a>
    <div class="name">{{ name }}</div>
    <div class="price">{{ price }}</div>
    <div class="explain">
      <slot name="explain" />
    </div>
    <div class="supplement">
      <p v-if="color">{{ color }}</p>
      <p v-if="type">{{ type }}</p>
      <p>{{ size }}</p>
      <p v-if="weight">{{ weight }}</p>
    </div>
  </div>
</template>

<style scoped>
.store-item {
  width: 288px;
  color: var(--color-vue-blue);
}

.store-item img {
  border: 1px solid #dce1e5;
  border-radius: 8px;
}

.name {
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
}

.image {
  width: 100%;
  height: 100%;
}

.explain {
  margin-top: 8px;
  white-space: pre-wrap;

  &::v-deep(a) {
    color: var(--color-vue-green200);
    text-decoration: none;
  }

  &::v-deep(a:hover) {
    opacity: 0.4;
    transition: 0.2s;
  }

  &::v-deep(p) {
    font-size: 16px;
    line-height: 1.6;
  }
}

.price {
  margin-top: 4px;
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
}

.supplement {
  margin-top: 16px;
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
    margin: 0 auto;
  }
  .explain {
    width: auto;
  }
}
</style>
