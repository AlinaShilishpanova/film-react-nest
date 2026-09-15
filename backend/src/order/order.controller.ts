import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, OrderResponseDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() order: OrderDto): Promise<OrderResponseDto> {
    const items = await this.orderService.createOrder(order);
    return { total: items.length, items };
  }
}
