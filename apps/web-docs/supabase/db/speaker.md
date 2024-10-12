# スピーカー

## 対象

- 海外・招待スピーカー
- 日本・招待スピーカー
- 海外・Call for Paper (CfP) スピーカー
- 日本・Call for Paper (CfP) スピーカー
- スポンサーセッションスピーカー
- パネラー (次世代フロントエンドクロストーク、Vue.js コミュニティにようこそ！)

## 詳細設計

`speakers` スキーマのカラム表について。

| # | type | initial | required | unique |
|:----|:----|:----|:----|:----|
| id | uuid |  | ◯ | ◯ |
| detail_page_id | varchar(40) |  |  |  |
| name_ja | varchar(100) |  | ◯ |  |
| name_en | varchar(100) |  | ◯ |  |
| image_url | varchar(500) |  |  |  |
| company_ja | varchar(100) |  |  |  |
| company_en | varchar(100) |  |  |  |
| position_ja | varchar(100) |  |  |  |
| position_en | varchar(100) |  |  |  |
| description_ja | varchar(200) |  | ◯ |  |
| description_en | varchar(200) |  | ◯ |  |
| github_id | varchar(100) |  |  |  |
| x_id | varchar(100) |  |  |  |
| session_type | varchar(100) |  |  |  |
| session_title_ja | varchar(100) |  |  |  |
| session_title_en | varchar(100) |  |  |  |
| session_description_ja | varchar(1000) |  |  |  |
| session_description_ja | varchar(1000) |  |  |  |
| session_comment_ja | varchar(200) |  |  |  |
| session_comment_ja | varchar(200) |  |  |  |
| session_place | varchar(100) |  |  |  |
| session_time_from | timestamp |  |  |  |
| session_time_duration | int |  |  |  |
| session_doc_title_ja | varchar(200) |  |  |  |
| session_doc_title_en | varchar(200) |  |  |  |
| session_doc_url | varchar(200) |  |  |  |
| events | text array |  |  |  |
| display_order | int |  |  |  |
| is_open | bool |  | ◯ |  |
| created_at | timestamp | `now()` | (auto) |  |
| updated_at | timestamp | `now()` | (auto) |  |

## 参照リポジトリ

`speakers` スキーマをご確認ください。

https://github.com/vuejs-jp/vuefes-2024/blob/main/supabase/schema.sql#L84
