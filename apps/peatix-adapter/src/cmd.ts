import { CommandFactory } from 'nest-commander'
import { AfterPurchaseModule } from './after-purchase/after-purchase.module'

async function bootstrap() {
  await CommandFactory.run(AfterPurchaseModule, {
    logger: ['warn', 'error', 'debug', 'log'],
    serviceErrorHandler: (error) => {
      console.error(error)
    }
  }).catch((error) => {
    console.error(error)
  })
}
bootstrap()
