import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmDto, ScheduleDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  const mockFilms: FilmDto[] = [
    {
      id: 'film-1',
      rating: 8.5,
      director: 'Director 1',
      tags: ['tag1'],
      title: 'Film 1',
      about: 'About 1',
      description: 'Description 1',
      image: '/image1.jpg',
      cover: '/cover1.jpg',
    },
  ];

  const mockSchedule: ScheduleDto[] = [
    {
      id: 'session-1',
      daytime: '2024-06-28T10:00:53+03:00',
      hall: '0',
      rows: 5,
      seats: 10,
      price: 350,
      taken: [],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockFilms),
            getSchedule: jest.fn().mockResolvedValue(mockSchedule),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('.findAll', () => {
    it('should return list of films with total', async () => {
      const result = await controller.findAll();

      expect(result).toEqual({ total: 1, items: mockFilms });
      expect(filmsService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty list if no films', async () => {
      jest.spyOn(filmsService, 'findAll').mockResolvedValueOnce([]);

      const result = await controller.findAll();

      expect(result).toEqual({ total: 0, items: [] });
    });
  });

  describe('.getSchedule', () => {
    it('should return schedule for the film with total', async () => {
      const result = await controller.getSchedule('film-1');

      expect(result).toEqual({ total: 1, items: mockSchedule });
      expect(filmsService.getSchedule).toHaveBeenCalledWith('film-1');
    });

    it('should return empty schedule if no sessions', async () => {
      jest.spyOn(filmsService, 'getSchedule').mockResolvedValueOnce([]);

      const result = await controller.getSchedule('film-1');

      expect(result).toEqual({ total: 0, items: [] });
    });
  });
});
