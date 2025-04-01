<script setup lang="ts">
import { useFetch, useHead, usePathWithLocale } from '#imports'
import type { RelatedEventInfo } from '@vuejs-jp/model'
import { conferenceTitle, linkUrl, ogRelatedEventDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

type RelatedEvents = Record<'eventsInfo', RelatedEventInfo>

const { data, error } = await useFetch('/api/events')
if (error.value) {
  console.error(error.value)
}
const { eventsInfo } = data.value as RelatedEvents

const pathWithLocale = usePathWithLocale()

const isClose = (startedAt: string) =>
  new Date() >
  new Date(
    new Date(startedAt).getFullYear(),
    new Date(startedAt).getMonth(),
    new Date(startedAt).getDate(),
  )

useHead({
  titleTemplate: (titleChunk) => `関連イベント | ${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `関連イベント | ${conferenceTitle}`,
      description: ogRelatedEventDescription,
      url: `${linkUrl}events`,
      image: `${linkUrl}og/events.png`,
    }),
    ...twitterOg({
      title: `関連イベント | ${conferenceTitle}`,
      description: ogRelatedEventDescription,
      url: `${linkUrl}events`,
      image: `${linkUrl}og/events.png`,
    }),
  ],
})
</script>

<template>
  <VFPageHeading>{{ $t('related_events.title') }}</VFPageHeading>
  <div class="related-events">
    <ul class="related-events-body">
      <li v-for="(event, index) in eventsInfo.list" :key="index">
        <VFRelatedEventFrame
          :src="event.bannerUrl"
          :alt="event.title"
          :register-url="event.registerUrl"
          :register-action-text="
            isClose(event.startedAt) ? $t('related_events.close') : $t('related_events.register')
          "
          :disabled="isClose(event.startedAt)"
        >
          <template #title>
            {{ event.title }}
          </template>
          <template #description>
            {{ event.description }}
          </template>
        </VFRelatedEventFrame>
      </li>
    </ul>
    <div class="back">
      <VFLinkButton
        class="back-action"
        background-color="white"
        color="vue-blue"
        target=""
        :href="pathWithLocale('/')"
      >
        {{ $t('back_to_top') }}
      </VFLinkButton>
    </div>
  </div>
</template>

<style scoped>
@import url('../assets/base.css');
@import url('../assets/media.css');

.related-events {
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
    content: '';
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

.related-events-body {
  margin: 0 auto;
  padding: 60px 0 120px;
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (--tablet) {
    padding: 20px 0 60px;
    max-width: 100%;
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
