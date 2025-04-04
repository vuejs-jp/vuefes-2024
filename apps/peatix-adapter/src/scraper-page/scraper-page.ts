import { Inject } from '@nestjs/common'
import { HTTPRequest } from 'puppeteer'
import { EnvService } from '../env/env.service'
import {
  symbol as IPuppeteerService,
  PuppeteerService,
} from '../puppeteer/puppeteer.service'

export abstract class ScraperPage {
  constructor(
    protected readonly envService: EnvService,
    @Inject(IPuppeteerService)
    protected readonly puppeteerService: PuppeteerService,
  ) {
    //
  }

  protected handleRequest(request: HTTPRequest) {
    switch (request.resourceType()) {
      case 'script':
      case 'document':
      case 'xhr':
        return request.continue()
      case 'image':
      case 'stylesheet':
        return request.abort()
    }
    return request.continue()
  }
}
