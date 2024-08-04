import { Logger } from '@nestjs/common'
import { CommandRunner, Command } from 'nest-commander'
import { SalesDailyService } from './sales-daily.service'

type CommandOptions = {
  id?: number;
};

@Command({ name: 'sales-daily', description: 'A sales daily command.' })
export class SalesDailyCommand extends CommandRunner {
  private readonly logger = new Logger(SalesDailyCommand.name)

  constructor(readonly salesDailyService: SalesDailyService) {
    super()
  }

  async run(params: string[], options?: CommandOptions): Promise<void> {
    this.salesDailyService.apply()
  }
}
