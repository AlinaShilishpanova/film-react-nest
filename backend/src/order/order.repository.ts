import { OrderResultDto } from './dto/order.dto';

export interface OrderRepository {
  save(orders: OrderResultDto[]): Promise<void>;
}

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';
