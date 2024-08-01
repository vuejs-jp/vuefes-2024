import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import axios from 'axios'
import { EnvService } from 'src/env/env.service'

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name)

  constructor(
    private readonly envService: EnvService,
    private readonly httpService: HttpService,
  ) {
    //
  }

  public async send(user: string, content: string) {
    await axios.post(
      this.envService.DISCORD_WEBHOOK_URL,
      {
        username: user,
        content: content,
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        },
      },
    )
  }
}
