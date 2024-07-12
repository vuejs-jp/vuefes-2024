<script setup lang="ts">
import { useHead } from '#imports'
import { conferenceTitle, linkUrl, ogJobboardDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'


useHead({
  titleTemplate: (titleChunk) => `ジョブボード | ${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `ジョブボード | ${conferenceTitle}`,
      description: ogJobboardDescription,
      url: `${linkUrl}jobboard`,
    }),
    ...twitterOg({
      title: `ジョブボード | ${conferenceTitle}`,
      description: ogJobboardDescription,
      url: `${linkUrl}jobboard`,
    }),
  ],
})
</script>

<template>
  <VFPageHeading>{{ $t('jobboard.title') }}</VFPageHeading>
  <div class="jobboard">
    <ul class="jobboard-body">
      <li v-for="i in 7">
        <nuxt-link to="hoge" target="_blank"><img src="https://placehold.jp/f0f0f0/ffffff/920x520.png?text=%20" alt="" /></nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import url('../assets/base.css');
@import url('../assets/media.css');

.jobboard {
  margin: 0;
  padding: 0 1.5%;
  background-image: linear-gradient(#fff, #ebf0f5);
  position: relative;
  z-index: 0;
  overflow: hidden;

  @media (--tablet) {
    padding: 0 6%;
  }

  &:before {
    content: "";
    position: absolute;
    display: block;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/form-bg.png');
    background-size: auto;
    background-repeat: repeat;
    background-position: bottom left;
    opacity: 0.8;
    mix-blend-mode: overlay;
    z-index: -1;
  }
}

.jobboard-body {
  margin: 0 auto;
  padding: 60px 0 120px;
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (--tablet) {
    padding: 20px 0 60px;
    max-width: 100%
  }

  li {
    width: calc((100% - 4%) / 2);

    @media (--tablet) {
      width: 100%;
    }

    &:nth-child(even) {
      margin-left: 4%;

      @media (--tablet) {
        margin-left: 0;
      }
    }

    @media (--tablet) {
      &:nth-child(n + 2) {
        margin-top: 20px;
      }
    }

    &:nth-child(n + 3) {
      margin-top: 4%;

      @media (--tablet) {
        margin-top: 20px;
      }
    }
  }

  a {
    border-radius: 12px;
    overflow: hidden;
    display: block;
  }
}
</style>
