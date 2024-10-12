# RPA

NestJS 上で Puppeteer を使用して Web サイトをクロール、cron ジョブを設定することで、購入情報の照合に一役を買いました。昨年お世話になっていたチケットプラットフォーム Pass market では、ログイン処理の自動化が困難と判明、やむを得ず購入情報の照合自動化を諦めているが、今年はそれを実現させる方向で進めました。

Puppeteer は Chrome DevTools Protocol (CDP) を介してヘッドレス Chrome または Chromium ブラウザを制御できる便利な API を提供します。

## NestJS とはなんぞや

そもそも NestJS について、深く知りたいという方のためのセクションを設けました。

::: tip

NestJS の構造からたいへん上手くまとまっており、合わせてこちらをご一読いただけますと。

[NestJS の基礎概念の図解と要約](https://zenn.dev/morinokami/articles/nestjs-overview)

:::
