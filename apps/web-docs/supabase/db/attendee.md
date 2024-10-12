# 参加者

## 対象

いずれも照合を経て、注文番号照合完了 or 注文番号照合失敗を果たした者も含んでいます。

- 「一般チケットチケット」購入者のうち、注文番号照合中を果たした者
- 「一般 + アフターパーティーチケット」購入者のうち、注文番号照合中を果たした者

## 詳細設計

昨年の `event_users` スキーマとの違いについて。

- full_name カラムを削除した
- avatar_url カラムのサイズを 200 から 500 に拡大した
- 一意に画像ファイルを識別するため、別途 image_file_name カラムを追加した
- 照合を経て、注文番号照合失敗を果たした者を識別するため、別途 canceled_at カラムを追加した

`attendees` スキーマのカラム表について。

| # | type | initial | required | unique |
|:----|:----|:----|:----|:----|
| id | uuid |  | ◯ | ◯ |
| user_id | uuid |  | ◯ | ◯ |
| image_file_name | uuid |  | ◯ | ◯ |
| email | varchar(100) |  | ◯ |  |
| avatar_url | varchar(500) |  | ◯ |  |
| provider | varchar(20) |  | ◯ |  |
| display_name | varchar(24) |  |  |  |
| role | varchar(16) |  |  |  |
| receipt_id | varchar(20) |  | ◯ | ◯ |
| activated_at | timestamp |  |  |  |
| canceled_at | timestamp |  |  |  |
| created_at | timestamp | `now()` | (auto) |  |
| updated_at | timestamp | `now()` | (auto) |  |

## 参照リポジトリ

### Vue Fes Japan 2024

`attendees` スキーマをご確認ください。

https://github.com/vuejs-jp/vuefes-2024/blob/main/supabase/schema.sql#L177

### Vue Fes Japan 2023

`event_users` スキーマをご確認ください。

https://github.com/vuejs-jp/vuefes-2023/blob/main/supabase/schema.sql#L3
