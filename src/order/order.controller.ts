import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData) {
    return await this.ordersService.createOrder(orderData);
  }
}
