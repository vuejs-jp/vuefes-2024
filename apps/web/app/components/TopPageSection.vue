<script setup lang="ts">
import { useI18n } from '#i18n'
import { computed } from 'vue'
import { useWithBase } from '#imports'

const { locale } = useI18n()

const withBase = useWithBase()

const getAnchorPath = computed(
  () => (anchor: string) =>
    locale.value === 'ja' ? withBase(`/${anchor}`) : withBase(`/en/${anchor}`),
)
</script>

<template>
  <section>
    <div class="top-page-root">
      <div class="image-container">
        <div class="image-wrapper" />
      </div>

      <div class="text-container">
        <h1 class="section-title">Vue Fes Japan 2024</h1>
        <p class="place">
          Otemachi PLACE HALL &amp; CONFERENCE
          <br /><time datetime="2024-10-19T00:00+09:00"
            >{{ $t('top_page.date')
            }}<template v-if="locale === 'ja'"><span class="day-of-week">SAT</span></template></time
          >
        </p>
      </div>
      <div class="sns-link-wrapper">
        <h2 class="official-announcement">
          {{ $t('top_page.latest_information') }}
        </h2>
        <div class="link-buttons">
          <VFLinkButton
            class="link-button"
            background-color="vue-green/200"
            color="white"
            :href="getAnchorPath('#timetable')"
            target="_top"
            >{{ $t('time-table.title') }}</VFLinkButton
          >
          <VFLinkButton
            class="link-button"
            background-color="white"
            color="vue-blue"
            :href="getAnchorPath('jobboard')"
            target="_top"
            >{{ $t('jobboard.title') }}
          </VFLinkButton>
          <VFLinkButton
            class="link-button"
            background-color="vue-green/200"
            color="white"
            :href="getAnchorPath('#photo')"
            target="_top"
          >
            {{ $t('photo.title') }}
          </VFLinkButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('~/assets/media.css');

.top-page-root {
  --background-image-height: 864px;
  --container-margin: calc(var(--unit) * 10);
  --text-container-position-top: 386px;

  position: relative;
  height: var(--background-image-height);
  background-color: transparent;
  line-height: 1.2;
}

.image-container {
  position: fixed;
  z-index: -1;
  width: 100%;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: var(--background-image-height);
  background-image: url('/main-visual.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
}

.text-container {
  position: absolute;
  top: var(--text-container-position-top);
  left: var(--container-margin);
  padding-right: var(--container-margin);
}
.section-title {
  font-size: var(--font-size-heading800);
  font-weight: 800;
  color: var(--color-vue-blue);

  @media screen and (max-width: 1020px) {
    font-size: 8vw;
  }
}
.place {
  margin-top: calc(var(--unit));
  font-size: var(--font-size-heading300);
  font-weight: 500;
  color: var(--color-vue-blue);
}
.day-of-week {
  font-size: var(--font-size-body400);
  font-weight: 400;
  color: var(--color-vue-blue);
  margin-left: calc(var(--unit) * 0.5);
}

.sns-link-wrapper {
  position: absolute;
  bottom: 40px;
  left: var(--container-margin);
}
.official-announcement {
  font-size: var(--font-size-heading300);
  font-weight: 700;
  color: var(--color-vue-blue);
}
.link-buttons {
  display: flex;
  gap: 20px;
  margin-top: calc(var(--unit) * 2);
}
.link-button {
  --height-button: 66px;

  width: 260px;
  height: var(--height-button);
  border-radius: var(--height-button);
}

@media (--tablet) {
  .top-page-root {
    --background-image-height: 570px;
    --container-margin: 6%;
    --text-container-position-top: 243px;
  }
  .image-wrapper {
    background-size: auto 100%;
    background-image: url('/main-visual-mobile.jpg');
  }
  .section-title {
    font-size: var(--font-size-heading500);
    font-weight: 700;
    color: var(--color-vue-blue);
    line-height: 1;
  }
  .place {
    font-size: var(--font-size-body300);
    font-weight: 500;
  }
  .day-of-week {
    font-size: var(--font-size-body100);
  }

  .sns-link-wrapper {
    bottom: 20px;
  }
  .official-announcement {
    font-size: var(--font-size-heading200);
  }
  .link-button {
    --height-button: 49px;

    width: 100%;
  }
}

@media (--mobile) {
  .day-of-week {
    font-size: var(--font-size-body100);
  }
  .sns-link-wrapper {
    width: calc(100vw - var(--container-margin) * 2);
  }
  .official-announcement {
    font-size: var(--font-size-body200);
  }
  .link-buttons {
    --height-button: 49px;

    gap: calc(var(--unit) * 2);
  }
}
</style>
