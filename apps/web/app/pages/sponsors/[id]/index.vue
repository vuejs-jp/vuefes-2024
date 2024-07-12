<script setup lang="ts">
import { createError, useAsyncData, useHead, useRoute, useSponsor } from '#imports'
import type { Speaker, Sponsor } from '@vuejs-jp/model'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import { useSupabase } from '~/composables/useSupabase'
import { conferenceTitle, linkUrl, ogSponsorDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

const route = useRoute()
const id = route.params.id as string

const { fetchData } = useSupabase()
const { data: sponsors } = await useAsyncData('sponsors', async () => {
  return await fetchData('sponsors', { detailPageId: id })
})
const sponsorData = sponsors.value?.data as Sponsor[]
if (!sponsorData) {
  throw createError({ statusCode: 404, statusMessage: 'Sponsor not found' })
}

if (!sponsorData[0].detail_page_id) {
  throw createError({ statusCode: 404, statusMessage: 'Sponsor not found' })
}

const { data: speakers } = await useAsyncData('speakers', async () => {
  return await fetchData('speakers', { id: sponsorData[0].speaker_id })
})

const speakerData = speakers.value?.data as Speaker[]
if (!speakerData) {
  throw createError({ statusCode: 404, statusMessage: 'Speaker not found' })
}

if (!speakerData[0].detail_page_id) {
  throw createError({ statusCode: 404, statusMessage: 'Speaker not found' })
}

const currentLocale = useLocaleCurrent().locale
const { color } = useSponsor()

useHead({
  titleTemplate: (titleChunk) => `${sponsorData[0].name} | ${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `${sponsorData[0].name} | ${conferenceTitle}`,
      description: ogSponsorDescription,
      url: `${linkUrl}sponsors/${id}`,
    }),
    ...twitterOg({
      title: `${sponsorData[0].name} | ${conferenceTitle}`,
      description: ogSponsorDescription,
      url: `${linkUrl}sponsors/${id}`,
    }),
  ],
})
</script>

<template>
  <VFPageHeading>{{ $t('sponsor.title') }}</VFPageHeading>
  <div class="sponsor-detail">
    <div class="sponsor-detail-body">
      <ul class="detailhead-tags">
        <li v-for="tag in sponsorData[0].tag" :key="`category-${tag}`">
          <VFTag :label="$t(`sponsor.${tag.replaceAll('-', '_')}`)" :background="color(tag)" />
        </li>
      </ul>

      <div class="detailhead-body">
        <div class="detailhead-left">
          <p class="detailhead-img">
            <img
              :src="`${sponsorData[0].image_url}`"
              :alt="sponsorData[0].name"
              width="570"
              height="322"
              decoding="async"
            />
          </p>
          <a
            class="detailhead-sponsorname"
            :href="sponsorData[0].link_url"
            target="_blank"
            rel="noreferrer"
          >
            {{ $t(sponsorData[0].name) }}
          </a>
        </div>
        <div class="detailhead-right">
          {{ currentLocale === 'ja' ? sponsorData[0].description_ja : sponsorData[0].description_en }}
        </div>
      </div>

      <div v-if="sponsorData[0].speaker_id" class="detailbody-persons">
        <VFSpeaker
          :image="speakerData[0].image_url"
          :company="currentLocale === 'en' ? speakerData[0].caption_en : speakerData[0].caption_ja"
          :division="currentLocale === 'en' ? speakerData[0].description_en : speakerData[0].description_ja"
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

.sponsor-detail {
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

.sponsor-detail-body {
  --head-img-width: 475px;

  margin: 0 auto;
  padding: calc(var(--unit) * 10) calc(var(--unit) * 4);
  width: 100%;
  max-width: 1280px;

  @media (--tablet) {
    padding: 20px 0 60px;
    max-width: 100%
  }

  .detailhead-tags {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin-top: calc(var(--unit) * 8);
    column-gap: calc(var(--unit) * 1.5);
    gap: calc(var(--unit) * 0.5);
  }

  .detailhead-body {
    display: flex;
    margin-top: calc(var(--unit) * 4);
    color: #292C33;
    gap: calc(var(--unit) * 5);
  }

  .detailhead-body ::v-deep(a) {
    color: var(--color-vue-green);
    text-decoration: underline;
  }

  .detailhead-body ::v-deep(a:hover) {
    opacity: 0.4;
    transition: 0.2s;
  }

  .detailhead-left {
    position: relative;
    flex: 0 0 auto;
  }

  .detailhead-right {
    font-size: 18px;
  }

  .detailhead-right ::v-deep(a) {
    text-decoration: underline;
  }

  .detailhead-right ::v-deep(a:hover) {
    transition: 0.2s;
  }

  .detailhead-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--head-img-width);
    height: auto;
    aspect-ratio: 690 / 388;
    box-shadow: 0px 4px 4px 0px #00000040;
    border-radius: calc(var(--space-8) * 1);
  }

  .detailhead-img img {
    max-width: 60%;
    max-height: 60%;
    object-fit: contain;
  }

  .detailhead-sponsorname {
    display: inline-block;
    color: var(--color-vue-green);
    text-decoration: underline;
    margin-top: calc(var(--unit) * 2);
    &:hover {
      transition: .2s;
    }
  }

  .detailbody-persons {
    font-size: 18px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: calc(var(--unit) * 4);
  }

  .detailbody-persons ::v-deep(img) {
    width: var(--head-img-width);
  }

  .person-info ::v-deep(ul) {
    list-style-type: square;
    margin-left: calc(var(--unit) * 4);
    margin-bottom: calc(var(--unit) * 2);
  }

  .person-info ::v-deep(p) {
    color: var(--color-vue-blue);
    font-weight: 500;
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

    .detailhead-body {
      display: block;
    }

    .detailhead-right {
      margin-top: calc(var(--unit) * 4);
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
    color: var(--color-vue-green);
  }
}
</style>
