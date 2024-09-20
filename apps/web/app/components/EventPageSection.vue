<script setup lang="ts">
import type { PanelerInfo, SpeakerCategory } from '@vuejs-jp/model'
import EventCard from '~/components/event/EventCard.vue'
import EventAsset from '~/components/event/EventAsset.vue'
import EventMultipleAssets from '~/components/event/EventMultipleAssets.vue'
import PanelerList from '~/components/event/PanelerList.vue'

type _PanelerCategory = Extract<SpeakerCategory, 'panelEventPanelers'>
type Panelers = Record<_PanelerCategory, PanelerInfo>

const props = defineProps<{
  data: Panelers
}>()

const { panelEventPanelers } = props.data as Panelers
</script>

<template>
  <div class="event">
    <div class="event-body">
      <VFTitle id="event" color="white" class="title">
        {{ $t('event.title') }}
      </VFTitle>
      <EventCard id="crosstalk" title="nextgen-frontend-crosstalk">
        <PanelerList :panelers="panelEventPanelers.list['nextgen-frontend-crosstalk']" />
      </EventCard>
      <EventCard id="welcome-vuejs-community" title="welcome-vuejs-community">
        <PanelerList :panelers="panelEventPanelers.list['welcome-vuejs-community']" />
      </EventCard>
      <EventCard id="handson" title="vuejs-handson">
        <EventMultipleAssets :title-list="['vuejs-handson', 'vuejs-handson']" />
      </EventCard>
      <div class="event-body-column column-2">
        <EventCard title="creative-wall" font-class="title-2" padding-class="content-2">
          <EventAsset title="creative-wall" />
        </EventCard>
        <EventCard title="free-drinks-and-snacks" font-class="title-2" padding-class="content-2">
          <EventAsset title="free-drinks-and-snacks" />
        </EventCard>
        <EventCard title="tattoo-space" font-class="title-2" padding-class="content-2">
          <EventAsset title="tattoo-space" :margin-top="16" />
        </EventCard>
        <EventCard title="sponsor-booth-fotolary" font-class="title-2" padding-class="content-2" />
      </div>
      <EventCard id="cocktail-bash" title="cocktail-bash">
        <EventMultipleAssets :title-list="['cocktail-bash']" />
      </EventCard>
    </div>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.event {
  --event-padding: calc(var(--unit) * 5.25) 0;
  --event-body-padding: calc(var(--unit) * 6) 0;

  display: flex;
  justify-content: center;
  background-image: url('/sponsor/sponsor-bg-grid.png'),
    linear-gradient(to bottom, #35495e, #353b5e);
  background-position: top -1px left -1px;
  background-size: 30px;
  background-blend-mode: color-dodge;
  padding: var(--event-padding);
  margin: 0 auto;
  color: var(--color-vue-blue);
}

.event-body {
  margin: 0 auto;
  padding: var(--event-body-padding);
  margin: 0 1.5%;
  max-width: 960px;
  display: grid;
  gap: calc(var(--unit) * 3.75);
}

.event-body-column {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: calc(var(--unit) * 5);
  column-gap: calc(var(--unit) * 5);
}

.column-2 div {
  width: calc(50% - 20px);
}

.title {
  text-align: center;
  line-height: 1.2;
}

@media (--tablet) {
  .event {
    --event-padding: calc(var(--unit) * 2) 0;
  }

  .event-body {
    --event-body-padding: calc(var(--unit) * 4) 4.5% calc(var(--unit) * 6);
  }
}

@media (--mobile) {
  .event-body-column {
    flex-direction: column;
    gap: calc(var(--unit) * 3.75);
  }

  .column-2 > div {
    width: 100%;
  }
}
</style>
