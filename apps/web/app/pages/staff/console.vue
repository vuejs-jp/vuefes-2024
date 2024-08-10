<script setup lang="ts">
import { createError, useRuntimeConfig } from '#imports'
import { adminPageList } from '@vuejs-jp/model'
import { useAuth } from '~/composables/useAuth'
import { useAuthSession } from '~/composables/useAuthSession'
import { useAuthStore } from '~/store/auth'

const config = useRuntimeConfig()

if (!config.public.enableOperateAdmin) {
  throw createError({ statusCode: 404, statusMessage: 'You cannot operate the admin.' })
}

const { hasAuth } = useAuthSession()
useAuthStore()

const { signIn, signOut } = useAuth()
</script>

<template>
  <main>
    <div
      class="console-root"
    >
      <div class="header-wrapper">
        <h1 class="title">
          Console
        </h1>
        <div v-if="!hasAuth" class="login-wrapper">
          <VFLinkButton
            class="login-action"
            background-color="vue-green"
            color="white"
            @click="() => signIn('github', '/')"
          >
            Login (GitHub)
          </VFLinkButton>
        </div>
        <div v-if="hasAuth" class="logout-wrapper">
          <VFLinkButton
            is="button"
            class="logout-action"
            background-color="white"
            color="vue-blue"
            @click="signOut"
          >
            Logout
          </VFLinkButton>
        </div>
      </div>
      <div v-if="hasAuth" class="tab-wrapper">
        <VFTab :labels="adminPageList">
          <template #tab_content_0>
            <AdminPage page="speaker" />
          </template>
          <template #tab_content_1>
            <AdminPage page="sponsor" />
          </template>
          <template #tab_content_2>
            <AdminPage page="job" />
          </template>
          <template #tab_content_3>
            <AdminPage page="namecard" />
          </template>
          <template #tab_content_4>
            <AdminPage page="adminUser" />
          </template>
        </VFTab>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('../../assets/base.css');
@import url('../../assets/media.css');

main {
  --header-height: calc(var(--unit) * 10);

  padding: calc(var(--header-height) + 40px) 20px var(--header-height);
  background: color(--color-white);
}

.console-root {
  display: grid;
  gap: 40px;
  margin: 0 auto;
  width: 100%;
  grid-template-columns: minmax(0, 1fr);
}
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  text-align: center;
  font-size: 45px;
  color: var(--color-vue-blue);
}
.login-wrapper,
.logout-wrapper {
  width: 100%;
  max-width: 260px;
}
.tab-wrapper {
  margin: 0 auto;
  width: 100%;
}
.login-action,
.logout-action {
  --height-button: 66px;

  width: 100%;
  height: var(--height-button);
}
</style>
