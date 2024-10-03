<template>
  <div class="partner">
    <article class="partner-body">
      <VFTitle id="partners" class="partner-title">
        {{ $t('partner.title') }}
      </VFTitle>

      <NuxtLink to="https://conf.vuejs.de/" target="_blank">
        <picture>
          <source srcset="/logo/logo_vueconf-de.png" media="(min-width: 768px)" />
          <img
            src="/logo/logo_vueconf-de_sp.png"
            alt="vuejs.de"
            class="partner-image"
            loading="lazy"
          />
        </picture>
      </NuxtLink>
    </article>
  </div>
</template>

<style scoped>
@import url('~/assets/media.css');

.partner {
  --partner-padding: calc(var(--unit) * 7.5) 0;
  --partner-body-padding: calc(var(--unit) * 7.5) calc(var(--unit) * 7.5);
  --partner-term-margin: calc(var(--unit) * 5) auto 0;
  display: flex;
  justify-content: center;
  background-color: var(--color-gray100);
  padding: var(--partner-padding);
  color: var(--color-vue-blue);
}
.partner-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--unit) * 7);
  width: 100%;
  max-width: 960px;
  margin: 0 1.5%;
  padding: var(--partner-body-padding);
  background-color: var(--color-white);
}
.partner-title {
  line-height: 1.2;
}
.partner-image {
  width: 140px;
  height: 75px;
  border: 1px solid var(--color-gray100);
  border-radius: 6px;
}

@media (--tablet) {
  .partner {
    --partner-padding: calc(var(--unit) * 2.25) 0;
    --partner-body-padding: calc(var(--unit) * 3.75) calc(var(--unit) * 2) calc(var(--unit) * 4);
    --partner-term-margin: calc(var(--unit) * 5) auto 0;
  }
  .partner-body {
    gap: calc(var(--unit) * 3);
  }
  .partner-image {
    width: 111px;
    height: 61px;
  }
}
</style>
