import { Injectable } from '@nestjs/common';
import { OrderResultDto } from './dto/order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderRepositoryMemory implements OrderRepository {
  private orders: OrderResultDto[] = [];

  async save(orders: OrderResultDto[]): Promise<void> {
    this.orders.push(...orders);
  }
}
