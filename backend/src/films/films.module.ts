import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FILMS_REPOSITORY } from './films.repository';
import { FilmsRepositoryTypeorm } from './films.repository.typeorm';
import { Film, Schedule } from './films.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: FILMS_REPOSITORY,
      useClass: FilmsRepositoryTypeorm,
    },
  ],
  exports: [FILMS_REPOSITORY, TypeOrmModule],
})
export class FilmsModule {}
