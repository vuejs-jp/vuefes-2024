import { Module } from '@nestjs/common'
import { PeatixOrderService } from './peatix-order.service'

@Module({
  providers: [PeatixOrderService],
  exports: [PeatixOrderService],
})
export class PeatixOrderModule {}
