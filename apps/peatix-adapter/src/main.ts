import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SentryInterceptor } from '@ntegral/nestjs-sentry'
import { HttpException } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(
    new SentryInterceptor({
      filters: [
        {
          type: HttpException,
          filter: (exception: HttpException) => {
            return exception.getStatus() < 500
          },
        },
      ],
    }),
  )

  await app.listen(3000)
}
bootstrap()
