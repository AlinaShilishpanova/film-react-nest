import { FilmDto, ScheduleDto } from './dto/films.dto';

export interface FilmWithSchedule extends FilmDto {
  schedule: ScheduleDto[];
}

export interface FilmsRepository {
  findAll(): Promise<FilmDto[]>;
  findById(id: string): Promise<FilmWithSchedule | null>;
  saveTakenSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<void>;
}

export const FILMS_REPOSITORY = 'FILMS_REPOSITORY';
