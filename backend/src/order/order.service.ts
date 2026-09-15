import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { FILMS_REPOSITORY, FilmsRepository } from '../films/films.repository';
import { OrderDto, OrderResultDto } from './dto/order.dto';
import { ORDER_REPOSITORY, OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject(FILMS_REPOSITORY)
    private readonly filmsRepository: FilmsRepository,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(order: OrderDto): Promise<OrderResultDto[]> {
    const results: OrderResultDto[] = [];
    const toReserve: Array<{
      filmId: string;
      sessionId: string;
      seatKey: string;
    }> = [];

    for (const ticket of order.tickets) {
      const film = await this.filmsRepository.findById(ticket.film);
      if (!film) {
        throw new BadRequestException({ error: 'Film not found' });
      }

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) {
        throw new BadRequestException({ error: 'Session not found' });
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seatKey)) {
        throw new BadRequestException({ error: 'Seat already taken' });
      }

      if (
        toReserve.some(
          (r) => r.sessionId === ticket.session && r.seatKey === seatKey,
        )
      ) {
        throw new BadRequestException({ error: 'Seat already taken' });
      }

      toReserve.push({
        filmId: ticket.film,
        sessionId: ticket.session,
        seatKey,
      });
      results.push({ ...ticket, id: randomUUID() });
    }

    await this.filmsRepository.reserveSeats(
      toReserve.map((r) => ({
        filmId: r.filmId,
        sessionId: r.sessionId,
        seats: [r.seatKey],
      })),
    );

    await this.orderRepository.save(results);
    return results;
  }
}
