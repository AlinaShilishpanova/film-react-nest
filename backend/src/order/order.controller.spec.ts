import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDto, OrderResultDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  const orderDto: OrderDto = {
    email: 'test@test.ru',
    phone: '+79990000000',
    tickets: [
      {
        film: 'film-1',
        session: 'session-1',
        daytime: '2024-06-28T10:00:53+03:00',
        row: 1,
        seat: 1,
        price: 350,
      },
    ],
  };

  const orderResult: OrderResultDto[] = [
    {
      ...orderDto.tickets[0],
      id: 'order-1',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn().mockResolvedValue(orderResult),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('.create', () => {
    it('should create order and return tickets with total', async () => {
      const result = await controller.create(orderDto);

      expect(result).toEqual({ total: 1, items: orderResult });
      expect(orderService.createOrder).toHaveBeenCalledWith(orderDto);
      expect(orderService.createOrder).toHaveBeenCalledTimes(1);
    });

    it('should return empty list if no tickets created', async () => {
      jest.spyOn(orderService, 'createOrder').mockResolvedValueOnce([]);

      const result = await controller.create(orderDto);

      expect(result).toEqual({ total: 0, items: [] });
    });
  });
});
