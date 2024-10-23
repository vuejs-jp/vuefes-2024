# パス設計

ウェブサイト全体を下のツリー図で表しました。

```
. ... トップページ
├── namecard/
│   ├── [id]/
│   │   ├── edit/
│   │   │   ├── complete.vue ... 作成・編集完了画面
│   │   │   └── index.vue ... 作成・編集画面
│   │   ├── share.vue ... シェア URL
│   │   └── index.vue ... ログイン後画面
│   └── index.vue ... 扉ページ
├── sessions/
│   └── [id]/
│       ├── index.vue ... 詳細ページ
│       └── share.vue ... シェア URL
├── sponsors/
│   └── [id]/
│       ├── index.vue ... 詳細ページ
│       └── share.vue ... シェア URL
├── staff/ ... 本番環境ではフラグを切らせてもらっています
│   ├── console.vue ... 管理画面（スピーカー、スポンサー、ジョブ、スタッフ、参加者を管理するため）
│   └── invite.vue ... 招待 (仮機能)
├── staffs/
│   └── [id]/
│       └── share.vue ... シェア URL
├── code-of-conduct.vue ... 行動規範 (Code of Conduct)
├── events.vue ... 関連イベント
├── jobboard.vue ... ジョブボード
├── privacy.vue ... プライバシーポリシー
├── sharemap.vue ... シェア URL
└── tokusho.vue ... 特定商取引法に基づく表記
```

## 参照

[jiyuujin](https://yuma-kitamura.nekohack.me/) 自ら Zenn の「Vue・Nuxt 情報が集まる広場」というパブリケーション上で、記事 [Vue Fes Japan 2024 ウェブサイトのシェア URL で遊んでみよう](https://zenn.dev/comm_vue_nuxt/articles/vuefes-2024-waiwai) を書かせてもらいました。
