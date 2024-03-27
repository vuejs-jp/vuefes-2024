<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: 'dev-test',
})
</script>

<template>
  <section class="container">
    <h1>サンプルネームカード</h1>
    <ul class="cardlist">
      <li v-for="n in 4" :key="n">
        <!-- card 通常はcomponent化する -->
        <div class="card">
          <header class="card-header">
            <div class="card-icon" />
            <p>ネームカード</p>
          </header>
          <p>
            いろはにほへと ちりぬるを わかよたれそ つねならむ うゐのおくやま けふこえて あさきゆめみし ゑひもせす
          </p>
          <footer class="card-footer">
            <ul>
              <li>
                <a href="" class="textlink">twitter</a>
              </li>
              <li>
                <a href="" class="textlink">company</a>
              </li>
            </ul>
          </footer>
        </div>
        <!-- /card -->
      </li>
    </ul>
  </section>
</template>

<style scoped>
@import url("~/assets/media.css");
@import url("~/assets/sample.css");

/**
 * 上書き戦略
 *
 * 1. まずDesktop用のものを定義する
 * 2. タブレット以下（--tablet）で上書き（必要な分のみ）
 *    タブレットのみ、ではなくタブレット以下で上書きをする
 * 3. 必要であればスマホ以下（--mobile）で上書き
 *
 * マージンなど
 * --unitを利用して8の倍数で設定していく calc(var(--unit) * 2) = 16px 
 */

.container {
  /* ローカル変数を定義すると上書きが楽 */
  --container-padding: calc(var(--unit) * 5) 0;

  max-width: 90%;
  margin: 0 auto;
  padding: var(--container-padding);
  background: var(--color-white);
}

h1 {
  text-align: center;
  color: var(--color-vue-blue);
}

.cardlist {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: calc(var(--unit) * 2);
  padding-top: calc(var(--unit) * 2);
}

/* タブレット以下に適用 */
@media (--tablet) {
  .container {
    /* ローカル変数を上書き */
    --container-padding: calc(var(--unit) * 3) calc(var(--unit) * 2);

    max-width: none;
  }

  .cardlist {
    grid-template-columns: none;
  }
}
</style>


<!--
  サンプル用
  基本はscoped付き以外は使わない
-->
<style>
/* html {
  background-color: var(--green-2);
} */
</style>