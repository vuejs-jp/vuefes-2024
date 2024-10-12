# ジョブ

::: tip
スポンサーと DB を分けました。
:::

## 対象

- シルバー以上 (プラチナ、ゴールド、シルバー) のスポンサー

## 詳細設計

`jobs` スキーマのカラム表について。

| # | type | initial | required | unique |
|:----|:----|:----|:----|:----|
| id | uuid |  | ◯ | ◯ |
| sponsor_id | uuid |  | ◯ | ◯ |
| link_url | varchar(500) |  |  |  |
| image_url | varchar(500) |  |  |  |
| image_alt | varchar(100) |  |  |  |
| display_order | int |  |  |  |
| is_open | bool |  | ◯ |  |
| created_at | timestamp | `now()` | (auto) |  |
| updated_at | timestamp | `now()` | (auto) |  |

## 参照リポジトリ

`jobs` スキーマをご確認ください。

https://github.com/vuejs-jp/vuefes-2024/blob/main/supabase/schema.sql#L55
