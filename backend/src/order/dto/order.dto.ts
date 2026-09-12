import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TicketDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsOptional()
  @IsString()
  day?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class OrderDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

export class OrderResultDto extends TicketDto {
  id: string;
}

export class OrderResponseDto {
  total: number;
  items: OrderResultDto[];
}
