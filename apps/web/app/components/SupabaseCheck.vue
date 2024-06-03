<script setup lang="ts">
import { useSupabase } from '~/composables/useSupabase'

const samples = ref([])
const { connecting, authState, hasAuth, logout, loginWithGithub, fetchSample, loginUser } = useSupabase()
const startFetchSample = async () => {
  const data = await fetchSample()
  samples.value = data
}
</script>

<template>
  <section>
    <h2>supabase check
      <!-- ローディング -->
      <span v-if="connecting" class="loading">LOADING</span>
    </h2>
    <div>
      <p>authState: {{ authState }}</p>
      <!-- ログインユーザの情報 -->
      <div v-if="hasAuth">
        <p>ログインユーザの情報</p>
        <div class="loginuser">
          <img :src="loginUser.avatar_url" :alt="loginUser.user_name">
          <p>{{ loginUser }}</p>
        </div>
        <ul>
          <li>
            <!-- ログアウトボタン -->
            <VFButton small @click="logout">logout</VFButton>
          </li>
          <li>
            <!-- サンプルをfetch -->
            <VFButton small @click="startFetchSample">fetchSample</VFButton>
            <ul>
              <li v-for="s in samples">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- ログインボタン -->
      <p v-else>
        <VFButton small @click="loginWithGithub">login (github)</VFButton>
        GitHubアカウントでログインする
      </p>
    </div>
  </section>
</template>

<style scoped>
@import url("~/assets/media.css");

h2 {
  padding: calc(var(--unit) * 2) 0;
}

section {
  color: var(--color-white);
  padding: calc(var(--unit) * 14) calc(var(--unit) * 6);
  background: var(--color-vue-blue-gradation);
}

li+li {
  margin-top: calc(var(--unit) * 2);
}

li button {
  margin-right: calc(var(--unit) * 2);
}

.loginuser {
  display: inline-flex;
  border-radius: 8px;
  padding: calc(var(--unit) * 1);
  color: var(--color-vue-blue-gradation);
  max-width: 600px;

  img {
    display: block;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-right: calc(var(--unit) * 2);
  }
}

.loading {
  display: inline-block;
  padding: calc(var(--unit) * 1) calc(var(--unit) * 2);
  margin: 0 calc(var(--unit) * 2);
  font-size: 14px;
  border: dotted 1px var(--color-white);
  animation: blinkAnime 0.3s infinite alternate;
}

@keyframes blinkAnime {
  0% {
    color: var(--color-white);
  }

  100% {
    color: #969696
  }
}
</style>