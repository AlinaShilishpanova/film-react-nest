export interface OrderRepository {
  save(orders: unknown[]): Promise<void>;
}

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';
