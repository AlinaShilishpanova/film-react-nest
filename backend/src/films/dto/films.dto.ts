export class FilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export class ScheduleDto {
  id: string;
  daytime: string;
  // hall числом, потому что этого требует автотест (в film.yml — строка)
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class FilmsListDto {
  total: number;
  items: FilmDto[];
}

export class ScheduleListDto {
  total: number;
  items: ScheduleDto[];
}
