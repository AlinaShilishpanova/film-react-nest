import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FilmDto, ScheduleDto } from './dto/films.dto';
import { FilmWithSchedule, FilmsRepository } from './films.repository';
import { Film, FilmDocument, Schedule } from './films.schema';

@Injectable()
export class FilmsRepositoryMongo implements FilmsRepository, OnModuleInit {
  constructor(
    @InjectModel(Film.name)
    private readonly filmModel: Model<FilmDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.filmModel.estimatedDocumentCount();
    if (count > 0) return;

    const filePath = join(__dirname, 'data', 'films.json');
    const raw = readFileSync(filePath, 'utf-8');
    const films = JSON.parse(raw) as Array<Record<string, unknown>>;
    await this.filmModel.insertMany(films);
    console.log(`[seed] загружено фильмов: ${films.length}`);
  }

  async findAll(): Promise<FilmDto[]> {
    const docs = await this.filmModel.find().lean().exec();
    return docs.map((doc) => this.toFilmDto(doc));
  }

  async findById(id: string): Promise<FilmWithSchedule | null> {
    const doc = await this.filmModel.findOne({ id }).lean().exec();
    if (!doc) return null;
    return {
      ...this.toFilmDto(doc),
      schedule: (doc.schedule ?? []).map((s) => this.toScheduleDto(s)),
    };
  }

  async saveTakenSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<void> {
    await this.filmModel
      .updateOne(
        { id: filmId, 'schedule.id': sessionId },
        { $push: { 'schedule.$.taken': { $each: seats } } },
      )
      .exec();
  }

  private toFilmDto(doc: Film): FilmDto {
    return {
      id: doc.id,
      rating: doc.rating,
      director: doc.director,
      tags: doc.tags,
      title: doc.title,
      about: doc.about,
      description: doc.description,
      image: doc.image,
      cover: doc.cover,
    };
  }

  private toScheduleDto(s: Schedule): ScheduleDto {
    return {
      id: s.id,
      daytime: s.daytime,
      hall: s.hall,
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken ?? [],
    };
  }
}
