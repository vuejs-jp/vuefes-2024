<script setup lang="ts">
import { useFetch, useHead } from '#imports'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import type { JobInfo } from '@vuejs-jp/model'
import { conferenceTitle, linkUrl, ogJobboardDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

type Jobs = Record<'allJobs', JobInfo>

const { data, error } = await useFetch('/api/jobs')
if (error.value) {
  console.error(error.value)
}
const { allJobs } = data.value as Jobs

const { path: localePath } = useLocaleCurrent()

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
      <li v-for="(job, index) in allJobs.list" :key="index">
        <nuxt-link :to="job.link_url" target="_blank">
          <img :src="job.image_url" :alt="job.image_alt" />
        </nuxt-link>
      </li>
    </ul>
    <div class="back">
      <VFLinkButton
        class="back-action"
        background-color="white"
        color="vue-blue"
        target=""
        :href="`${localePath}/`"
      >
        {{ $t('back_to_top') }}
      </VFLinkButton>
    </div>
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

.back {
  margin: 40px auto 120px;
  width: 100%;
  max-width: 260px;
}
.back-action {
  --height-button: 66px;

  height: var(--height-button);
  border-radius: var(--height-button);
}

@media (--tablet) {
  .back-action {
    --height-button: 58px;
  }
}

@media (--mobile) {
  .back {
    width: 100%;
    padding: 0 23.5px;
    margin-top: 30px;
    margin-bottom: 60px;
  }
  .back-action {
    --height-button: 58px;
  }
}
</style>
