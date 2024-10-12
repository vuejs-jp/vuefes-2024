# スタッフ

## 対象

- コアスタッフ
- ボランティアスタッフ

## 詳細設計

`staffs` スキーマのカラム表について。

| # | type | initial | required | unique |
|:----|:----|:----|:----|:----|
| id | uuid |  | ◯ | ◯ |
| detail_page_id | varchar(40) |  |  |  |
| image_url | varchar(500) |  |  |  |
| name | varchar(100) |  | ◯ |  |
| x_id | varchar(100) |  |  |  |
| github_id | varchar(100) |  |  |  |
| is_volunteer | bool |  |  |  |
| is_open | bool |  | ◯ |  |
| created_at | timestamp | `now()` | (auto) |  |
| updated_at | timestamp | `now()` | (auto) |  |

## 参照リポジトリ

`staffs` スキーマをご確認ください。

https://github.com/vuejs-jp/vuefes-2024/blob/main/supabase/schema.sql#L146
