# Fetch JSON data

::: warning

Vue Fes Japan 2024 では、こちらの方法を取っていません。

:::

## Peatix API

公式に API 提供はアナウンスされていません。

### イベント URL に get_view_data を付けて fetch する

puppeteer を利用しなくても、get_view_data を付けた URL に fetch することで、参加者情報を取得できる可能性があります。

そうした参加者情報の取得は、イベント URL に get_view_data を付けることで対応できます。

- イベント URL: `https://<EVENT ID>.peatix.com/`
- イベント URL に get_view_data を付けた URL: `https://<EVENT ID>.peatix.com/get_view_data`

実際 fetch するため、@nestjs/axios の使える環境を構築します。

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
