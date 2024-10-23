# 参加者

ドロップダウンで参加者種別（attendee or attendee + party）を選択してください。

なお、ドロップダウンの初期値は `attendee` となります。

| attendee | attendee + party |
|:----|:----|
|![](https://i.imgur.com/bDa1Kto.png)|![](https://i.imgur.com/EI7ROez.png)|

## 対象

いずれも照合を経て、注文番号照合完了 or 注文番号照合失敗を果たした者も含んでいます。

- 「一般チケットチケット」購入者のうち、注文番号照合中を果たした者
- 「一般 + アフターパーティーチケット」購入者のうち、注文番号照合中を果たした者

## できること

- ネームカード作成者を確認する
- 手動で注文番号を照合する or 逆に照合状態を解除する（デバッグ期間に使いたかったため）

## DB (Supabase)

[DB 設計](../../supabase/db/attendee.md)