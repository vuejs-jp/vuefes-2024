import { Logger } from '@nestjs/common'
import { CommandRunner, Command } from 'nest-commander'
import { UnactivatedCheckService } from './unactivated-check.service'

type CommandOptions = {
  id?: number;
};

@Command({ name: 'unactivated-check', description: 'An unactivated check command.' })
export class UnactivatedCheckCommand extends CommandRunner {
  private readonly logger = new Logger(UnactivatedCheckCommand.name)

  constructor(readonly unactivatedCheckService: UnactivatedCheckService) {
    super()
  }

  async run(params: string[], options?: CommandOptions): Promise<void> {
    this.unactivatedCheckService.apply()
  }
}
