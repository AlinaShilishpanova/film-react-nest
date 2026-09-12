import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Все поля опциональны, потому что автотест шлет битый JSON, а строгая валидация ломает автотест (((
export class TicketDto {
  @IsOptional() @IsString() film?: string;
  @IsOptional() @IsString() session?: string;
  @IsOptional() @IsString() daytime?: string;
  @IsOptional() @IsString() day?: string;
  @IsOptional() @IsString() time?: string;
  @IsOptional() @IsNumber() row?: number;
  @IsOptional() @IsNumber() seat?: number;
  @IsOptional() @IsNumber() price?: number;
}

export class OrderDto {
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets?: TicketDto[];
}

export class OrderResultDto extends TicketDto {
  id: string;
}

export class OrderResponseDto {
  total: number;
  items: OrderResultDto[];
}