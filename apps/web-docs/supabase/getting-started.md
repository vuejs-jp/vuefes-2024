# Supabase

昨年に続いて [Supabase](https://supabase.com/) のお世話になります。

## 環境構築

ダッシュボードより各種変数を発行、手元の環境でそれらを使えるよう準備します。

データベースへの追加、更新する際は URL (SUPABASE_URL) と Anon Key (SUPABASE_KEY) が必要となります。

```.env
SUPABASE_URL=
SUPABASE_KEY=
```

[`useRuntimeConfig`](https://nuxt.com/docs/api/composables/use-runtime-config) を利用して、各種変数へアクセスできることを確認してください。

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      serviceKey: process.env.SERVICE_KEY,
    },
  },
})
```

なお、ここで supabase.redirect に `false` を設定しないと、強制的にログイン画面へ遷移されるようになっています。

```ts
export default defineNuxtConfig({
  supabase: {
    redirect: false,
  },
})
```

## メールアドレスを使って招待

[`inviteUserByEmail`](https://supabase.com/docs/reference/javascript/auth-admin-inviteuserbyemail) のお世話になります。事前に Supabase の Auth Admin クライアントを作成する必要があり、直接 Web ブラウザからそれを操作することができません。

Service Role Key も発行しつつ、合わせてこちらも `useRuntimeConfig` を利用してアクセスできることを確認してください。

```ts
import { defineEventHandler, useRuntimeConfig } from '#imports'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const serviceKey = config.public.serviceKey

  if (!supabaseUrl || !serviceKey) {
    return event.node.res.end('No authentication')
  }

  const supabase = createClient(supabaseUrl, serviceKey)
  const { error } = await supabase.auth.admin.inviteUserByEmail(email)

  if (error) {
    return event.node.res.end(error)
  }
})
```

raw_user_meta_data に `{ user_role: 'admin' }` を付与しつつ、それが追加された時に限って public.admin_users へデータが insert される設計を取りました。

```ts
const { error } = await supabase.auth.admin.inviteUserByEmail(
  email,
  { data: { user_role: 'admin' } },
)
```