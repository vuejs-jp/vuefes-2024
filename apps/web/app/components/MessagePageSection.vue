<template>
  <section class="container">
    <div class="content">
      <VFTitle id="message" class="title">
        {{ $t('message.title') }}
      </VFTitle>
      <div class="body">
        <MarkDownText path="message" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('~/assets/media.css');

.container {
  --container-padding: calc(var(--unit) * 15) 6%;

  padding: var(--container-padding);
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(2px);
}

.content {
  --content-gap: calc(var(--unit) * 5);
  --content-max-width: calc(var(--unit) * 96);

  display: grid;
  gap: var(--content-gap);
  max-width: var(--content-max-width);
  margin: 0 auto;
  width: 100%;
}

.title {
  text-align: center;
}

.body {
  --body-font-size: 1.125rem;
  --body-font-weight: 500;

  color: var(--color-vue-blue);
  font-size: var(--body-font-size);
  font-weight: var(--body-font-weight);

  & :deep(p) {
    --body-p-margin-bottom: calc(var(--unit) * 4);

    margin-bottom: var(--body-p-margin-bottom);
    line-height: 1.8;
  }

  & :deep(p:last-child) {
    text-align: right;
    margin-bottom: 0px;
  }

  & :deep(a) {
    color: inherit;
  }
}

@media (--tablet) {
  .container {
    --container-padding: 60px 6%;
  }

  .content {
    --content-gap: 30px;
  }

  .title {
    font-size: 28px;
  }

  .body {
    --body-font-size: 1rem;

    & :deep(p) {
      --body-p-margin-bottom: 29px;
    }
  }
}
</style>
