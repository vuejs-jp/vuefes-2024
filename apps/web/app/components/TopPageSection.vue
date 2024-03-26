<script setup lang="ts"></script>

<template>
  <section>
    <div class="top-page-root">
      <div class="image-container">
        <div class="image-wrapper" />
      </div>

      <div class="text-container">
        <h2 class="section-title">Vue Fes Japan 2024</h2>
        <p class="place">
          Otemachi PLACE HALL &amp; CONFERENCET
          <br /><time datetime="2024-10-19T00:00+09:00"
            >2024.10.19<span class="day-of-week">SAT</span></time
          >
        </p>
      </div>
      <div class="sns-link-wrapper">
        <h3 class="official-announcement">
          {{ $t('top_page.latest_information') }}
        </h3>
        <div class="link-buttons">
          <VFButton class="link-button" href="https://twitter.com/vuefes" target="_blank" couple
            ><VFIcon
              class="sns-icon x"
              name="x"
              color="svg-icon"
              :can-hover="false"
            />@vuefes</VFButton
          >
          <VFButton
            class="link-button"
            secondary
            href="https://note.com/vuejs_jp/m/mb35849fee631"
            target="_blank"
            couple
          >
            <VFIcon class="sns-icon note" name="note" color="svg-icon" :can-hover="false" />公式
            note</VFButton
          >
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
  background-image: url('../assets/images/topPage/main-visual.png');
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
  font-size: var(--font-size-heading400);
  font-weight: 700;
  color: var(--color-vue-blue);
}
.link-buttons {
  display: flex;
  gap: 20px;
  margin-top: calc(var(--unit) * 2);
}
.link-button {
  width: 260px;
}
.sns-icon {
  height: 100%;
  &.x {
    position: relative;
    top: 2px;
    width: 14.5px;
    margin-right: 11.5px;
    &:hover {
      color: var(--color-vue-green);
    }
  }
  &.note {
    position: relative;
    top: 3px;
    width: 12px;
    margin-right: 12.5px;
    &:hover {
      color: var(--color-white);
    }
  }
}

@media (--tablet) {
  .top-page-root {
    --background-image-height: 570px;
    --container-margin: 6%;
    --text-container-position-top: 243px;
  }
  .image-wrapper {
    background-size: auto 100%;
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
    width: 100%;
  }
  .sns-icon {
    &.x {
      top: 0;
      width: 11px;
      margin-right: 7px;
    }
    &.note {
      top: 0;
      width: 9px;
      margin-right: 10px;
    }
  }
}

@media (--mobile) {
  .sns-link-wrapper {
    width: calc(100vw - var(--container-margin) * 2);
  }
  .official-announcement {
    font-size: var(--font-size-body200);
  }
}
</style>
