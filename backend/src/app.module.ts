import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';

import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { Film, Schedule } from './films/films.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'database'),
        port: Number(configService.get<string>('DATABASE_PORT', '5432')),
        username: configService.get<string>('DATABASE_USERNAME', 'prac'),
        password: configService.get<string>('DATABASE_PASSWORD', 'prac'),
        database: configService.get<string>('DATABASE_NAME', 'prac'),
        client_encoding: 'UTF8',
        entities: [Film, Schedule],
        synchronize: false,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
})
export class AppModule {}
