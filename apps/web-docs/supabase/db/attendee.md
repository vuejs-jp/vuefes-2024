# 参加者

## 対象

いずれも照合を経て、注文番号照合完了 or 注文番号照合失敗を果たした者も含んでいます。

- 「一般チケットチケット」購入者のうち、注文番号照合中を果たした者
- 「一般 + アフターパーティーチケット」購入者のうち、注文番号照合中を果たした者

## 詳細設計

| # | type | initial | required |
|:----|:----|:----|:----|
| id | uuid |  |  |
| user_id | uuid |  | ◯ |
| email | varchar(100) |  | ◯ |
| avatar_url | varchar(500) |  | ◯ |
| provider | varchar(20) |  | ◯ |
| display_name | varchar(24) |  |  |
| role | varchar(16) |  |  |
| receipt_id | varchar(20) |  | ◯ |
| activated_at | timestamp |  |  |
| created_at | timestamp | `now()` | (auto) |
| updated_at | timestamp | `now()` | (auto) |

## 参照

https://github.com/vuejs-jp/vuefes-2024/blob/main/supabase/schema.sql#L177
