<script setup lang="ts">
import { useFetch, useHead, useRuntimeConfig } from '#imports'
import type { PanelerInfo, SpeakerCategory, SpeakerInfo, SponsorCategory, SponsorInfo, StaffCategory, StaffInfo } from '@vuejs-jp/model'
import { useLocaleCurrent } from '~/composables/useLocaleCurrent'
import { conferenceTitle, linkUrl, ogSharemapDescription } from '~/utils/constants'
import { generalOg, twitterOg } from '~/utils/og.constants'

type _SpeakerCategory = Extract<SpeakerCategory, 'sessionSpeakers' | 'lightningTalkSpeakers' | 'sponsorSessionSpeakers'>
type _PanelerCategory = Extract<SpeakerCategory, 'panelEventPanelers'>
type Speakers = Record<_SpeakerCategory, SpeakerInfo>
type Panelers = Record<_PanelerCategory, PanelerInfo>

type Sponsors = Record<SponsorCategory, SponsorInfo>

type Staffs = Record<StaffCategory, StaffInfo>

const { data: speakers, error: error1 } = await useFetch('/api/speakers')
const { sessionSpeakers, lightningTalkSpeakers, sponsorSessionSpeakers } = speakers.value as Speakers
const { panelEventPanelers } = speakers.value as Panelers
if (error1.value) {
  console.error(error1.value)
}
const { data: sponsors, error: error2 } = await useFetch('/api/sponsors')
const {
  platinumSponsors,
  goldSponsors,
  silverSponsors,
  bronzeSponsors,
  specialNamingRightSponsors,
  namingRightSponsors,
  specialLunchSponsors,
  lunchSponsors,
  afterPartySponsors,
  nameCardSponsors,
  simultaneousInterpretationSponsors,
  childcareSponsors,
  handsonSponsors,
  mediaSponsors,
  toolSponsors,
} = sponsors.value as Sponsors
if (error2.value) {
  console.error(error2.value)
}
const { data: staffs, error: error3 } = await useFetch('/api/staffs')
const { coreStaffs, volunteerStaffs } = staffs.value as Staffs
if (error3.value) {
  console.error(error3.value)
}

const config = useRuntimeConfig()
const { path: localePath } = useLocaleCurrent()

useHead({
  // eslint-disable-next-line no-unused-vars
  titleTemplate: (titleChunk) => `シェアURL | ${conferenceTitle}`,
  meta: [
    ...generalOg({
      title: `シェアURL | ${conferenceTitle}`,
      description: ogSharemapDescription,
      url: `${linkUrl}sharemap`,
      image: `${config.public.supabaseUrl}/functions/v1/subpage-og-image?title=シェアURL`,
    }),
    ...twitterOg({
      title: `シェアURL | ${conferenceTitle}`,
      description: ogSharemapDescription,
      url: `${linkUrl}sharemap`,
      image: `${config.public.supabaseUrl}/functions/v1/subpage-og-image?title=シェアURL`,
    }),
  ],
})
</script>

<template>
  <VFPageHeading>{{ $t('sharemap.title') }}</VFPageHeading>
  <div class="sharemap">
    <div class="sharemap-body">
      <div>
        <VFTitle id="speaker">{{ $t('speaker.title') }}</VFTitle>
        <VFTextLink
          v-for="speaker in Array.from(
            new Map(
              [
                ...sessionSpeakers.list,
                ...lightningTalkSpeakers.list,
                ...sponsorSessionSpeakers.list,
                ...panelEventPanelers.list['nextgen-frontend-crosstalk'],
                ...panelEventPanelers.list['welcome-vuejs-community'],
              ]
              .map((item) => [JSON.stringify(item), item])
            )
            .values()
          )"
          :key="speaker.id"
          :href="`/sessions/${speaker.detail_page_id}/share`"
          color="vue-blue"
          target="_blank"
        >
          {{ speaker.name_ja }}
        </VFTextLink>
      </div>
      <div>
        <VFTitle id="sponsor">{{ $t('sponsor.title') }}</VFTitle>
        <VFTextLink
          v-for="sponsor in Array.from(
            new Map(
              [
                ...platinumSponsors.list,
                ...goldSponsors.list,
                ...silverSponsors.list,
                ...bronzeSponsors.list,
                ...specialNamingRightSponsors.list,
                ...namingRightSponsors.list,
                ...specialLunchSponsors.list,
                ...lunchSponsors.list,
                ...afterPartySponsors.list,
                ...nameCardSponsors.list,
                ...simultaneousInterpretationSponsors.list,
                ...childcareSponsors.list,
                ...handsonSponsors.list,
                ...mediaSponsors.list,
                ...toolSponsors.list,
              ]
              .map((item) => [JSON.stringify(item), item])
            )
            .values()
          )"
          :key="sponsor.id"
          :href="`/sponsors/${sponsor.detail_page_id}/share`"
          color="vue-blue"
          target="_blank"
        >
          {{ sponsor.name }}
        </VFTextLink>
      </div>
      <div>
        <VFTitle id="staff">{{ $t('staff.title') }}</VFTitle>
        <VFTextLink
          v-for="staff in [...coreStaffs.list, ...volunteerStaffs.list]"
          :key="staff.id"
          :href="`/staffs/${staff.detail_page_id}/share`"
          color="vue-blue"
          target="_blank"
        >
          {{ staff.name }}
        </VFTextLink>
      </div>
    </div>
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

.sharemap {
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

.sharemap-body {
  margin: 0 auto;
  padding: 60px 0 120px;
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;

  > div {
    @media (--tablet) {
      width: 100%;
    }
  }

  h2 {
    font-size: 24px;
  }

  @media (--tablet) {
    padding: 20px 0 60px;
    max-width: 100%;

    h2 {
      font-size: 20px;
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
