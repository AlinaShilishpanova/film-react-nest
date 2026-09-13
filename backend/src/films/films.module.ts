import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FILMS_REPOSITORY } from './films.repository';
import { FilmsRepositoryMongo } from './films.repository.mongo';
import { Film, FilmSchema } from './films.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: FILMS_REPOSITORY,
      useClass: FilmsRepositoryMongo,
    },
  ],
  exports: [FILMS_REPOSITORY],
})
export class FilmsModule {}
