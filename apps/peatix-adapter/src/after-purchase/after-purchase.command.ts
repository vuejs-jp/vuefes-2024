import { Logger } from '@nestjs/common'
import { CommandRunner, Command } from 'nest-commander'
import { AfterPurchaseService } from './after-purchase.service'

type CommandOptions = {
  id?: number;
};

@Command({ name: 'after-purchase', description: 'An after purchase command.' })
export class AfterPurchaseCommand extends CommandRunner {
  private readonly logger = new Logger(AfterPurchaseCommand.name)

  constructor(readonly afterPurchaseService: AfterPurchaseService) {
    super()
  }

  async run(params: string[], options?: CommandOptions): Promise<void> {
    this.afterPurchaseService.apply()
    return Promise.resolve()
  }
}
