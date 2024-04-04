# CSS

## メディアクエリを利用する

apps/web/app/assets/media.css でメディアクエリを定義しています。

```vue
<style scoped>
/* タブレットの CSS は --tablet の下で書く */
@media (--tablet) {}

/* モバイルの CSS は --mobile の下で書く */
@media (--tablet) {}
</style>
```

## Vue コンポーネントで CSS を書く

共通の CSS 変数は packages/css/base.css で、またローカルの CSS 変数は apps/web/app/assets/base.css で定義しましょう。

```vue
<style scoped>
.container {
  /* CSS 変数を定義すると上書きが楽 */
  --container-padding: calc(var(--unit) * 5) 0;

  max-width: 90%;
  margin: 0 auto;
  padding: var(--container-padding);
}
</style>
```

### NG 集

::: danger

基本的に scoped 付き以外を使用しないでください。

```vue
<style>
html {
  background-color: var(--green-2);
}
</style>
```

:::
