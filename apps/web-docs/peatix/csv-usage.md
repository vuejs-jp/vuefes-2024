# Peatix

まず、今年はチケット管理に [Peatix](https://peatix.com/) を使います。

## 購入情報を取得する

Peatix の購入情報を取得するため、下記の順に実行することを目指します。

- NestJS 内で puppeteer を利用してスクレイピングする
- 購入情報を CSV 形式としてダウンロード、JSON 形式のデータにパースする
- パースして得られたデータを参加者の種別ごとに分けて supabase のデータベースに格納する

### puppeteer を利用してスクレイピングする

昨年の Pass Market では、ログイン機構の障壁によりスクレイピングが実現できませんでしたが、今回の Peatix ではそうしたことが払拭され完全自動化が実現されるよう考えています。

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
    private readonly httpService: HttpService,
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

### イベント URL に get_view_data を付けて fetch する

puppeteer を利用しなくても、get_view_data を付けた URL に fetch することで、参加者情報を取得できる可能性があります。

```ts
import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Constants } from '../constnats'
import { EnvService } from '../env/env.service'
import { ScraperPage } from '../scraper-page/scraper-page'

@Injectable()
export class PeatixOrderService extends ScraperPage {
  private readonly logger = new Logger(PeatixOrderService.name)

  constructor(
    envService: EnvService,
    puppeteerService: IPuppeteerService,
    private readonly httpService: HttpService,
  ) {
    super(envService, puppeteerService)
  }

  private async fetchJson<T>() {
    return await this.httpService
      .axiosRef
      .get<T>(`${Constants.PEATIX_DASHBOARD_URL}${this.envService.PEATIX_EVENT_ID}/get_view_data`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data)
      })
  }
}
```

## 技術スタック

技術スタックは NestJS の [Commander](https://docs.nestjs.com/recipes/nest-commander) 利用を検討しています。
