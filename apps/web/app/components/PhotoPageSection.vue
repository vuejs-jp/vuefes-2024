<script setup lang="ts">
import { photos } from '~/utils/constants'
</script>

<template>
  <section class="photos-container">
    <div class="photos">
      <VFTitle id="photo" class="title">
        {{ $t('photo.title') }}
      </VFTitle>
      <div>
        <p>{{ $t('photo.subtitle1') }}</p>
        <p>{{ $t('photo.subtitle2') }}</p>
        <ul>
          <li v-for="(photo, key) in photos" :key>
            <NuxtLink :to="photo.url" target="_blank">
              {{ photo.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('~/assets/media.css');

.photos-container {
  --container-padding: calc(var(--unit) * 15) 6%;

  padding: var(--container-padding);
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(8px);
}

.photos {
  --content-max-width: calc(var(--unit) * 96);

  display: grid;
  max-width: var(--content-max-width);
  margin: 0 auto;
  width: 100%;
}

.title {
  --content-padding-bottom: calc(var(--unit) * 5);

  text-align: center;
  padding-bottom: var(--content-padding-bottom);
  line-height: 1.2;
}

.photos p {
  margin: 0 0 16px;
}

.photos li {
  list-style: disc;
  list-style-position: inside;
}

.photos a {
  color: var(--color-vue-blue);
  text-decoration: underline;
}

.photos a:hover {
  text-decoration: none;
}

@media (--tablet) {
  .photos-container {
    --container-padding: 60px 6%;
  }

  .photos {
    --content-padding-bottom: 30px;
  }
}
</style>