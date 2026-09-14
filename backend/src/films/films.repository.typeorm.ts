import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FilmDto, ScheduleDto } from './dto/films.dto';
import { FilmWithSchedule, FilmsRepository } from './films.repository';
import { Film, Schedule } from './films.entity';

@Injectable()
export class FilmsRepositoryTypeorm implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmRepository.find({ order: { id: 'ASC' } });
    return films.map((film) => this.toFilmDto(film));
  }

  async findById(id: string): Promise<FilmWithSchedule | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
      order: { schedule: { daytime: 'ASC' } },
    });
    if (!film) return null;
    return {
      ...this.toFilmDto(film),
      schedule: film.schedule.map((s) => this.toScheduleDto(s)),
    };
  }

  async reserveSeats(
    items: Array<{ filmId: string; sessionId: string; seats: string[] }>,
  ): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      for (const item of items) {
        const schedule = await manager.findOne(Schedule, {
          where: { id: item.sessionId, film: { id: item.filmId } },
          lock: { mode: 'pessimistic_write' },
        });
        if (!schedule) continue;
        const existing = schedule.taken ?? [];
        schedule.taken = [...existing, ...item.seats];
        await manager.save(schedule);
      }
    });
  }

  private toFilmDto(film: Film): FilmDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags ?? [],
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    };
  }

  private toScheduleDto(s: Schedule): ScheduleDto {
    return {
      id: s.id,
      daytime: s.daytime,
      hall: String(s.hall),
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken ?? [],
    };
  }
}
