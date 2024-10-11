# スポンサー

## 対象

- プラチナ、ゴールド、シルバー、ブロンズ
- スペシャルネーミングライツ、ネーミングライツ、スペシャルランチ、ランチ、アフターパーティー、ネームカード、同時通訳、託児サポート、ハンズオン、メディア、ツール

## 詳細設計

`sponsors` スキーマのカラム表について。

| # | type | initial | required | unique |
|:----|:----|:----|:----|:----|
| id | uuid |  |  |  |
| detail_page_id | varchar(40) |  |  |  |
| name | varchar(100) |  | ◯ |  |
| description_ja | varchar(500) |  | ◯ |  |
| description_en | varchar(500) |  | ◯ |  |
| link_url | varchar(500) |  |  |  |
| image_url | varchar(500) |  |  |  |
| share_image_url | varchar(500) |  |  |  |
| speaker_id | varchar(100) |  |  |  |
| tag | text array |  |  |  |
| display_order | int |  |  |  |
| is_open | bool |  | ◯ |  |
| created_at | timestamp | `now()` | (auto) |  |
| updated_at | timestamp | `now()` | (auto) |  |

## 参照リポジトリ

`sponsors` スキーマをご確認ください。

https://github.com/vuejs-jp/vuefes-2024/blob/main/supabase/schema.sql#L18
