# Download CSV

## Peatix の購入情報を取得する

Peatix の購入情報を取得するため、下記の順に実行することを目指します。

- NestJS 内で puppeteer を利用してスクレイピングする
- 購入情報を CSV 形式としてダウンロード、JSON 形式のデータにパースする
- パースして得られたデータを参加者の種別ごとに分けて supabase のデータベースに格納する

### NestJS の Commander を利用する

技術スタックは NestJS の [Commander](https://docs.nestjs.com/recipes/nest-commander) 利用を検討しています。

まず、今回は main.ts をはじめ app.module.ts や app.controller.ts、app.service.ts の使用を想定していません。そもそも initial setup で自動的に入るファイル群であり、ごく一般的な NestJS では逆にこれらを使用していくこととなります。

その上で、ドメインごとに src 配下を分類させるディレクトリをそれぞれ作成していく設計方針を取りました。

::: tip

FigJam でざっくり絵を描きました。

https://www.figma.com/file/mRTYOtFjg3L8ozmjEEhHLh/Vue-Fes-Japan-2024

:::

ファイル構成は下に示す通りとなります。

```
+
├─ src
│ ├─ after-purchase
|   ├- after-purchase.module.ts      # 購入後に自動反映される予定のユーザーを対象として、使用が予定されている依存関係を置く
|   └- after-purchase.service.ts
│ ├─ env
|   ├- env.module.ts                 # 環境変数を読み込む基盤を置く
|   └- env.service.ts
│ ├─ peatix-order
|   ├- peatix-order.module.ts        # Peatix へのログインを試み、購入情報を取得、Supabase へ整形したデータを挿入する基盤を置く
|   └- peatix-order.service.ts
│ ├─ puppeteer
|   └- puppeteer.service.ts          # スクレイピング処理の基盤を置く
│ ├─ sales-daily
|   ├- sales-daily.module.ts         # 各日の購入処理で使用が予定されている依存関係を置く
|   └- sales-daily.service.ts
│ ├─ unactivated-check
|   ├- unactivated-check.module.ts   # 自動反映されなかったユーザーを対象として、処理で使用が予定されている依存関係を置く
|   └- unactivated-check.service.ts
| └- cmd.ts                          # 処理の窓口を置く
├─ nest-cli.json
└- package.json
```

これら Commander を発火させるため、main.ts とは別のエントリーポイントを作成する必要があります。

今回は main.ts と同じ並びに cmd.ts を作成することとします。

```ts
import { CommandFactory } from 'nest-commander'
import { AfterPurchaseModule } from './after-purchase/after-purchase.module'

async function bootstrap() {
  await CommandFactory.run(AfterPurchaseModule, [
    'warn',
    'error',
    'debug',
    'log',
  ])
}
bootstrap()
```

### puppeteer を利用してスクレイピングする

puppeteer の API `launch()` を利用します。

```ts{52,54-55,68}
import { Injectable, Logger } from '@nestjs/common'
import puppeteer, { Browser, HTTPRequest, Page, Target } from 'puppeteer'

interface BrowserAndPage {
  browser: Browser;
  page: Page;
}

export const symbol = Symbol('PuppeteerService')

export interface IPuppeteerService {
  generateBrowser(): Promise<Browser>;
  generate(
    requestHandler?: (request: HTTPRequest) => void,
  ): Promise<BrowserAndPage>;
}

@Injectable()
export class PuppeteerService implements IPuppeteerService {
  private readonly logger = new Logger(PuppeteerService.name)

  constructor() {}

  async generateBrowser(): Promise<Browser> {
    const browser = await puppeteer.launch({
      headless: process.env.DEBUG === 'true' ? false : 'new',
      devtools: process.env.DEBUG === 'true',
      handleSIGTERM: process.env.PROD !== 'true',
      handleSIGINT: process.env.PROD !== 'true',
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      ],
    })

    return browser
  }

  async generate(
    requestHandler?: (request: HTTPRequest) => void,
  ): Promise<BrowserAndPage> {
    const browser = await this.generateBrowser()

    const pages = await browser.pages()
    const [page] = pages
    if (!page) throw new Error('Tab is not created.')

    if (!requestHandler) return { browser, page }
  
    await Promise.all(
      pages.map(async (page) => {
        await page.setRequestInterception(true)
        page.on('request', requestHandler)
      }),
    )

    browser.on('targetcreated', async (target: Target) => {
      const page = await target.page()
      if (!page) {
        return
      }
      await page.setRequestInterception(true)
      page.on('request', requestHandler)
    })

    return { browser, page }
  }
}
```

実際 Peatix の画面で、関連する全てのセレクタを確認します。

- ログインに必要なメールアドレス、パスワードを入力するフィールドの DOM
- ログインのアクションを実行するのに必要なボタンの DOM
- CSV ダウンロードに必要なボタンの DOM

メールアドレス、パスワードを入力するにはこちらで。

![](https://i.imgur.com/Vlxkzvi.png)

ログインに必要なボタンはこちらで。

![](https://i.imgur.com/ZjAZeUo.png)

CSV ダウンロードに必要なボタンはこちらで。

![](https://i.imgur.com/Pek9zJQ.png)

収集できれば、これで OK。

```ts
export const Selectors = {
  ORDERS: {
    PEATIX: {
      SEARCH_INPUT_EMAIL: '#signin-form > ul > li:nth-child(2) > input',
      SEARCH_INPUT_PASSWORD: '#password',
      NEXT_EXECUTE: '#next-button',
      SEARCH_EXECUTE: '#signin-button',
      DOWNLOAD_EXECUTE:
        '#content-main > div > header > div > a.button.action.button-download.js-download-attendances',
    },
  },
}
```

これらのセレクタに、スクレイピングの処理が作成できれば、あとは実際に Peatix 上でスクレイピングする処理を書いていくことになります。

```ts
import { Injectable, Logger } from '@nestjs/common'
import { Page } from 'puppeteer'
import { Constants } from '../constnats'
import { EnvService } from '../env/env.service'
import { IPuppeteerService } from '../puppeteer/puppeteer.service'
import { ScraperPage } from '../scraper-page/scraper-page'

@Injectable()
export class PeatixOrderService extends ScraperPage {
  private readonly logger = new Logger(PeatixOrderService.name)

  constructor(
    envService: EnvService,
    puppeteerService: IPuppeteerService,
  ) {
    super(envService, puppeteerService)
  }

  private async login(page: Page) {
    await page.goto(Constants.PEATIX_LOGIN_URL, {
      waitUntil: 'domcontentloaded',
    })
    await page.type(
      Selectors.ORDERS.PEATIX.SEARCH_INPUT_EMAIL,
      this.envService.PEATIX_BASIC_EMAIL,
    )
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click(Selectors.ORDERS.PEATIX.NEXT_EXECUTE),
    ])

    await page.type(
      Selectors.ORDERS.PEATIX.SEARCH_INPUT_PASSWORD,
      this.envService.PEATIX_BASIC_PASSWORD,
    )
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click(Selectors.ORDERS.PEATIX.SEARCH_EXECUTE),
    ])
  }

  async getOrders() {
    const { browser, page } = await this.puppeteerService.generate(
      (request) => {
        this.handleRequest(request)
      },
    )

    try {
      await this.login(page)

      await browser.close()
    } catch (e) {
      this.logger.error(e)

      await browser.close()
    }
  }
}
```

### CSV 仕様を確認する

CSV ダウンロードを実行すると、下に記したカラムの基で CSV が生成されます。

1. 注文番号
2. 名前
3. 表示名
4. 申込日
5. チケット名
6. 枚数
7. ステータス
8. コンビニ受付番号
9. チケット番号
10. 割引コード
11. メールアドレス
12. 全席ランチ付きとなります。ヴィーガン用お弁当をご希望の方は事前にお申し出ください
13. あなたの職種を教えてください
14. あなたの年齢を教えてください
15. あなたの仕事における経験年数を教えてください
16. 開催の様子を写真や動画で撮影し、広報目的に利用します。チケットのお申し込みには、撮影への同意が必要となります
17. 【個人スポンサーチケットの方のみ】クレジットに掲載するお名前をご入力ください
18. 【個人スポンサーチケットの方のみ】特典 T シャツのサイズをお選びください。T シャツは当日会場でのお渡しとなります

この CSV に入っているということは、全員が「何らかの」チケットを購入しているということを意味しています。

ちなみに、このうち申込日、申込日、チケット名がネームカードの照合処理にとって必要な情報になるため、これらの情報をステートとして持っておくことにします。
