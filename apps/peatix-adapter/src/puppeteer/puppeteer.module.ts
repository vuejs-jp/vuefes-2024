import { Module } from '@nestjs/common'
import { IPuppeteerService, PuppeteerService } from './puppeteer.service'

@Module({
  providers: [
    {
      provide: IPuppeteerService,
      useClass: PuppeteerService,
    },
  ],
  exports: [PuppeteerService],
})
export class PuppteerModule {}
