import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(data);
    return await this.orderRepository.save(order);
  }

  async getOrder(id: number): Promise<Order> {
    return await this.orderRepository.findOne({ where: { id } });
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    await this.orderRepository.update(id, { status });
    return await this.orderRepository.findOne({ where: { id } });
  }
}
