<script setup lang="ts">
import { useColor, useTypography } from '@vuejs-jp/composable'
const { fontWeight, fontSize } = useTypography()
const { color } = useColor()
</script>


<template>
  <section class="access-section">
    <div class="access-section-body">
      <VFTitle id="access" class="title">
        {{ $t('access.title') }}
      </VFTitle>

      <h3
        :style="{
          fontWeight: fontWeight('heading/800'),
          fontSize: fontSize('body/400'),
          color: color('vue-blue')
        }"
        class="place-name"
      >
        {{ $t('access.name') }}
      </h3>

      <div
        class="place-address"
        :style="{
          color: color('vue-blue')
        }"
      >
        <p
          :style="{
            fontWeight: fontWeight('body/300'),
            fontSize: fontSize('body/300'),
          }"
        >
          {{ $t('access.address') }}
        </p>
        <NuxtLink
          :to="$t('access.hp')" target="_blank" :style="{
          fontWeight: fontWeight('body/300'),
          fontSize: fontSize('body/300'),
          color: color('vue-blue')
        }">
          {{ $t('access.hp') }}
        </NuxtLink>
      </div>

      <ul
        class="place_route" :style="{
        color: color('vue-blue')
      }">
        <li>{{ $t('access.route_1') }}</li>
        <li>{{ $t('access.route_2') }}</li>
      </ul>


      <div class="button">
        <VFLinkButton :href="$t('access.map')" target="_blank" rel="noreferrer" background-color="vue-green/200" color="white">
          {{ $t('access.map_text') }}
        </VFLinkButton>
      </div>

      <figure class="place_image">
        <img src="/access/fig_access01.jpg" alt="" />
        <img src="/access/fig_access02.jpg" alt="" />
      </figure>

    </div>
  </section>
</template>


<style scoped>
@import url('~/assets/media.css');

.access-section {
  background-image: url('/access/bg_access.png');
  background-size: 12px;
  background-color: #ffffff;
  display: grid;
  place-items: center;
  padding: 60px 0;
  line-height: 1.6;


  @media (--tablet) {
    padding: 30px 1.5%;
  }

  .title {
    text-align: center;
  }

  .access-section-body {
    max-width: 960px;
    width: 100%;
    display: grid;
    padding: 60px 96px;
    gap: 40px;
    background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, .75) 52%, transparent);

    @media (--tablet) {
      padding: 30px calc(var(--unit) *1.5);
      gap: 30px;
    }
  }

  .place_route {
    margin: 0;
    padding: 0;
  }

  .place_image {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

    @media (--tablet) {
      gap: 15px;
      grid-template-columns: 1fr;
    }
  }

  .button {
    display: block;
    width: 100%;
    max-width: 260px;
    margin: 0 auto;

    @media (--tablet) {
      max-width: 100%;
      font-size: 1.125rem;
    }
  }

  .button a {
    --height-button: 66px;

    @media (--tablet) {
      --height-button: 58px;
    }

    height: var(--height-button);


  }
}
</style>
