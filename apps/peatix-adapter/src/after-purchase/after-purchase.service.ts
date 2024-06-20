import { Injectable, Logger } from '@nestjs/common'
import { PeatixOrderService } from '../peatix-order/peatix-order.service'

@Injectable()
export class AfterPurchaseService {
  private readonly logger = new Logger(AfterPurchaseService.name)

  constructor(private readonly peatixOrderService: PeatixOrderService) {
    //
  }

  async apply() {
    this.peatixOrderService.getOrders()
  }
}
