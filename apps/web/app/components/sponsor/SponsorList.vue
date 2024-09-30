<script setup lang="ts">
import type { PersonalSponsorInfo, SponsorInfo } from '@vuejs-jp/model'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'

type Props = SponsorInfo & {
  personal?: PersonalSponsorInfo
}

defineProps<Props>()

const currentLocale = useLocaleCurrent().locale
</script>

<template>
  <section :class="`sponsor-list-container ${type !== 'personal' ? `sponsor-list-${type}` : ''}`">
    <h4 class="sponsor-list-title">
      {{ $t(`sponsor.${title}`) }}
    </h4>
    <ul v-if="type !== 'personal'" class="sponsor-list">
      <li v-for="item in list" :key="item.id" class="sponsor-list-item">
        <NuxtLink
          class="sponsor-list-item-link"
          :to="`${currentLocale === 'ja' ? '/' : `/${currentLocale}/`}sponsors/${item['detail_page_id']}`"
        >
          <NuxtImg
            class="sponsor-list-item-image"
            :src="item['image_url']"
            :alt="item.name"
            loading="lazy"
          />
        </NuxtLink>
      </li>
    </ul>
    <VFCreditList v-else :list="personal?.list" size="large" />
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

  --color-sponsor-list-title: var(--color-hiwamoegi200);
  --border-color-sponsor-list-item: var(--color-hiwamoegi100);
}
.sponsor-list-gold {
  --gap-sponsor-list-item: 1.875rem;
  --columns-sponsor-list-item: 3;
  @media (--mobile) {
    --gap-sponsor-list-item: 0.9375rem;
    --columns-sponsor-list-item: 2;
  }

  --color-sponsor-list-title: var(--color-tohoh200);
  --border-color-sponsor-list-item: var(--color-tohoh100);
}
.sponsor-list-silver {
  --gap-sponsor-list-item: 1.25rem;
  --columns-sponsor-list-item: 4;
  @media (--mobile) {
    --gap-sponsor-list-item: 0.9375rem;
    --columns-sponsor-list-item: 2;
  }

  --color-sponsor-list-title: var(--color-asagi200);
  --border-color-sponsor-list-item: var(--color-asagi100);
}
.sponsor-list-bronze {
  --gap-sponsor-list-item: 0.9375rem;
  --columns-sponsor-list-item: 5;
  @media (--mobile) {
    --gap-sponsor-list-item: 0.9375rem;
    --columns-sponsor-list-item: 3;
  }

  --color-sponsor-list-title: var(--color-sangosyo200);
  --border-color-sponsor-list-item: var(--color-sangosyo100);
}
.sponsor-list-option {
  --gap-sponsor-list-item: 1.25rem;
  --columns-sponsor-list-item: 4;
  @media (--mobile) {
    --gap-sponsor-list-item: 0.9375rem;
    --columns-sponsor-list-item: 2;
  }

  --color-sponsor-list-title: var(--color-vue-blue);
  --border-color-sponsor-list-item: var(--color-vue-blue);
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

  --color-sponsor-list-title: var(--color-vue-blue);
  --border-color-sponsor-list-item: var(--color-vue-blue);
}

.sponsor-list-title {
  color: var(--color-sponsor-list-title);
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
  width: calc(
    (100% - (var(--gap-sponsor-list-item) * (var(--columns-sponsor-list-item) - 1))) /
      var(--columns-sponsor-list-item)
  );
  border: 1px solid var(--border-color-sponsor-list-item);
  border-radius: 12px;
}
.sponsor-list-item-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}
</style>
