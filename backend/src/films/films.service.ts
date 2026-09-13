import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FilmDto, ScheduleDto } from './dto/films.dto';
import { FILMS_REPOSITORY, FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILMS_REPOSITORY)
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    return this.filmsRepository.findAll();
  }

  async getSchedule(filmId: string): Promise<ScheduleDto[]> {
    const film = await this.filmsRepository.findById(filmId);
    if (!film) {
      throw new NotFoundException({ error: 'Film not found' });
    }
    return film.schedule;
  }
}
