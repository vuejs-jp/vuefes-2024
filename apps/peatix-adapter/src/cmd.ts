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
