<script setup lang="ts">
import type { SponsorInfo } from '~/types/app'

type Props = SponsorInfo

defineProps<Props>()
</script>

<template>
  <section :class="`sponsor-list-container sponsor-list-${type}`">
    <h4 class="sponsor-list-title">
      {{ title }}
    </h4>
    <ul class="sponsor-list">
      <li v-for="(item, index) in list" :key="index" class="sponsor-list-item">
        <a class="sponsor-list-item-link" :href="item['link_url']" target="_blank"
          ><img class="sponsor-list-item-image" :src="item['image_url']" :alt="item.name"
        /></a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
@import url('~/assets/media.css');

.sponsor-list-container {
  margin-top: 2.5rem;
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 2;
}
.sponsor-list-platinum {
  --gap-sponsor-list-item: 2.5rem;
  --columns-sponsor-list-item: 2;
  @media (--mobile) {
    --gap-sponsor-list-item: 0.9375rem;
    --columns-sponsor-list-item: 1;
  }

  color: var(--color-hiwamoegi200);
}
.sponsor-list-gold {
  --gap-sponsor-list-item: 1.875rem;
  --columns-sponsor-list-item: 3;
  @media (--mobile) {
    --gap-sponsor-list-item: 0.9375rem;
    --columns-sponsor-list-item: 2;
  }

  color: var(--color-tohoh200);
}
.sponsor-list-silver {
  --gap-sponsor-list-item: 1.25rem;
  --columns-sponsor-list-item: 4;
  @media (--mobile) {
    --gap-sponsor-list-item: 0.9375rem;
    --columns-sponsor-list-item: 2;
  }

  color: var(--color-asagi200);
}
.sponsor-list-bronze {
  --gap-sponsor-list-item: 0.9375rem;
  --columns-sponsor-list-item: 5;
  @media (--mobile) {
    --gap-sponsor-list-item: 0.9375rem;
    --columns-sponsor-list-item: 3;
  }

  color: var(--color-sangosyo200);
}
.sponsor-list-option {
  --gap-sponsor-list-item: 1.25rem;
  --columns-sponsor-list-item: 4;
  @media (--mobile) {
    --gap-sponsor-list-item: 0.9375rem;
    --columns-sponsor-list-item: 2;
  }

  color: var(--color-vue-blue);
}
.sponsor-list-option-separate {
  --gap-sponsor-list-item: 1.25rem;
  --columns-sponsor-list-item: 2;
  @media (--tablet) {
    --gap-sponsor-list-item: 1.25rem;
    --columns-sponsor-list-item: 4;
  }
  @media (--mobile) {
    --gap-sponsor-list-item: 0.9375rem;
    --columns-sponsor-list-item: 2;
  }

  color: var(--color-vue-blue);
}

.sponsor-list-title {
  color: currentColor;
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
  align-self: center;
  line-height: 1.276;
  @media (--mobile) {
    font-size: 1.5625rem;
  }
}
.sponsor-list {
  display: flex;
  gap: var(--gap-sponsor-list-item);
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  margin-top: 1rem;
}
.sponsor-list-item {
  aspect-ratio: 5 / 3;
  width: calc(100% / var(--columns-sponsor-list-item) - var(--gap-sponsor-list-item));
  border: 1px solid currentColor;
  border-radius: 12px;
}
.sponsor-list-item-link {
  display: grid;
  grid-template-columns: 3rem auto 3rem;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  &::before {
    content: '';
  }
  &::after {
    content: '';
  }
  @media (--mobile) {
    grid-template-columns: 1rem auto 1rem;
  }
}
.sponsor-list-item-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
