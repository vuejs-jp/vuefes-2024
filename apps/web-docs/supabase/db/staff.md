# スタッフ

## 対象

- コアスタッフ
- ボランティアスタッフ

## 詳細設計

| # | type | initial | required |
|:----|:----|:----|:----|
| id | uuid |  |  |
| detail_page_id | varchar(40) |  |  |
| image_url | varchar(500) |  |  |
| name | varchar(100) |  | ◯ |
| x_id | varchar(100) |  |  |
| github_id | varchar(100) |  |  |
| is_volunteer | bool |  |  |
| is_open | bool |  | ◯ |
| created_at | timestamp | `now()` | (auto) |
| updated_at | timestamp | `now()` | (auto) |

## 参照

https://github.com/vuejs-jp/vuefes-2024/blob/main/supabase/schema.sql#L146
