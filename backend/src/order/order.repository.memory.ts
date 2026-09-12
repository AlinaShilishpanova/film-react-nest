import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderRepositoryMemory implements OrderRepository {
  private orders: unknown[] = [];

  async save(orders: unknown[]): Promise<void> {
    this.orders.push(...orders);
  }
}
