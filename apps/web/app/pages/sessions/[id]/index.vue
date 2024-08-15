<script setup lang="ts">
import { createError, useAsyncData, useHead, useRoute, useRuntimeConfig } from '#imports'
import type { Speaker } from '@vuejs-jp/model'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import { useSupabase } from '~/composables/useSupabase'
import { useSession } from '~/composables/useSession'
import { conferenceTitle, linkUrl, ogSpeakerDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'
import { useRange } from '@vuejs-jp/composable'

const config = useRuntimeConfig()
const route = useRoute()
const id = route.params.id as string

const { fetchData } = useSupabase()
const { data: speakers } = await useAsyncData('speakers', async () => {
  return await fetchData('speakers', { detailPageId: id })
})
const speakerData = speakers.value?.data as Speaker[]
if (!speakerData) {
  throw createError({ statusCode: 404, statusMessage: 'Speaker not found' })
}

if (!speakerData[0].detail_page_id) {
  throw createError({ statusCode: 404, statusMessage: 'Speaker not found' })
}

const { range } = useRange()
const { color, trackName } = useSession()
const currentLocale = useLocaleCurrent().locale

useHead({
  titleTemplate: (titleChunk) => `${speakerData[0].session_title_ja} | ${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `${speakerData[0].session_title_ja} | ${conferenceTitle}`,
      description: ogSpeakerDescription,
      url: `${linkUrl}sessions/${id}`,
      image: `${config.public.supabaseUrl}/functions/v1/og-image?id=${speakerData[0].id}&page=speaker`,
    }),
    ...twitterOg({
      title: `${speakerData[0].session_title_ja} | ${conferenceTitle}`,
      description: ogSpeakerDescription,
      url: `${linkUrl}sessions/${id}`,
      image: `${config.public.supabaseUrl}/functions/v1/og-image?id=${speakerData[0].id}&page=speaker`,
    }),
  ],
})
</script>

<template>
  <VFPageHeading>{{ $t('speaker.title') }}</VFPageHeading>
  <div class="session-detail">
    <div class="session-detail-body">
      <div class="detailbody-tags">
        <VFTag :label="trackName(speakerData[0].session_place)" :background="color(speakerData[0].session_place)" />
        <VFTag :label="range(speakerData[0].session_time_from, speakerData[0].session_time_duration)" background="vue-green/200" />
      </div>

      <VFTitle id="session-detail" class="detailbody-title">
        {{ currentLocale === 'ja' ? (speakerData[0].session_title_ja ?? 'TBD') : (speakerData[0].session_title_en ?? 'TBD') }}
      </VFTitle>

      <div class="detailbody-explain">
        {{ currentLocale === 'ja' ? (speakerData[0].session_description_ja ?? 'TBD') : (speakerData[0].session_description_en ?? 'TBD') }}
      </div>

      <div class="detailbody-persons">
        <VFSpeaker
          :image="speakerData[0].image_url"
          :company="currentLocale === 'en' ? speakerData[0].company_en : speakerData[0].company_ja"
          :division="currentLocale === 'en' ? speakerData[0].position_en : speakerData[0].position_ja"
          :name="currentLocale === 'en' ? speakerData[0].name_en : speakerData[0].name_ja"
          :github-id="speakerData[0].github_id"
          :x-id="speakerData[0].x_id"
        />
        <div class="person-info">
          {{ currentLocale === 'ja' ? speakerData[0].description_ja : speakerData[0].description_en }}
        </div>
      </div>

      <div class="back">
        <VFLinkButton
          class="back-action"
          background-color="white"
          color="vue-blue"
          target=""
          :href="currentLocale === 'ja' ? '/' : `${currentLocale}/`"
        >
          {{ $t('back_to_top') }}
        </VFLinkButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('../../../assets/base.css');
@import url('../../../assets/media.css');

.session-detail {
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

.session-detail-body {
  --head-img-width: 308px;

  margin: 0 auto;
  padding: 60px 0 120px;
  width: 100%;
  max-width: 960px;

  @media (--tablet) {
    padding: 20px 0 60px;
    max-width: 100%
  }

  .detailbody-title {
    text-align: left;
    font-size: 32px;
    font-weight: 700;
    margin: calc(var(--unit) * 2) 0;
  }

  .detailbody-tags {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--unit) * 1.5);
    column-gap: calc(var(--unit) * 4);
  }

  .detailbody-explain {
    --body-font-size: 1.125rem;

    color: var(--color-vue-blue);
    font-size: var(--body-font-size);
    line-height: 1.8;
    white-space: pre-wrap;

    ::v-deep(p) {
      --body-p-margin-bottom: calc(var(--unit) * 4);

      margin-bottom: var(--body-p-margin-bottom);
      line-height: 1.8;
    }

    ::v-deep(p:last-child) {
      text-align: right;
      margin-bottom: 0px;
    }
  }

  .detailbody-explain ul {
    list-style-type: square;
    margin-left: calc(var(--unit) * 4);
    margin-bottom: calc(var(--unit) * 2);
  }

  .detailbody-explain p {
    color: var(--color-vue-blue);
    font-weight: 500;
    font-size: 18px;
    line-height: 1.8;
  }

  .detailbody-explain p a {
    color: var(--color-vue-green);
    text-decoration: underline;
  }

  .detailbody-explain p a:hover {
    transition: 0.2s;
  }

  .detailbody-persons {
    font-size: 18px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: calc(var(--unit) * 4);
    margin-top: calc(var(--unit) * 10);
  }

  .detailbody-persons ::v-deep(img) {
    width: var(--head-img-width);
  }

  .person-info {
    color: var(--color-vue-blue);
    line-height: 1.8;
  }

  .person-info ::v-deep(ul) {
    list-style-type: square;
    margin-left: calc(var(--unit) * 4);
    margin-bottom: calc(var(--unit) * 2);
  }

  .person-info ::v-deep(p) {
    color: var(--color-vue-blue);
    font-size: 18px;
    line-height: 1.8;
  }

  .person-info ::v-deep(p a) {
    color: var(--color-vue-green);
    text-decoration: underline;
  }

  .person-info ::v-deep(p a:hover) {
    transition: 0.2s;
  }

  .back {
    margin: 40px auto 0;
    width: 100%;
    max-width: 260px;
  }

  .back-action {
    --height-button: 66px;

    height: var(--height-button);
    border-radius: var(--height-button);
    display: flex;
  }

  @media (--tablet) {
    --head-img-width: 368px;

    .back-action {
      --height-button: 58px;
    }
  }

  @media (--mobile) {
    --head-img-width: 100%;

    .detailbody {
      display: block;
    }

    .detailbody-title {
      font-size: 24px;
    }

    .detailbody-explain ::v-deep(p) {
      font-size: 16px;
    }

    .detailbody-persons {
      grid-template-columns: 1fr;
      place-items: center;
    }

    .person-info ::v-deep(p) {
      font-size: 16px;
    }

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

  a {
    border-radius: 12px;
    overflow: hidden;
    display: block;
  }
}
</style>
